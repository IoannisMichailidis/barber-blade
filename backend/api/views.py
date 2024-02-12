from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, throttle_classes
from django.core.paginator import Paginator, EmptyPage
from rest_framework.decorators import permission_classes
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group
from .models import Haircut, AvailableDate, Timeslot, Booking
from .serializers import UserSerializer, HaircutSerializer, AvailableDateSerializer, TimeslotSerializer, BookingSerializer, HaircutImageSerializer, ProfileImageSerializer
from rest_framework import generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views import View
from rest_framework.parsers import (MultiPartParser, FormParser)
# -----------
# PAGINATION
# -----------
from .pagination import NoPagination
from rest_framework.pagination import PageNumberPagination
# -----------
# THROTTLING
# -----------
from rest_framework.throttling import AnonRateThrottle
from rest_framework.throttling import UserRateThrottle




# -------------------------------------------------------------------
# Custom permissions
# -------------------------------------------------------------------
class IsAuthenticatedAndInBarberGroup(BasePermission):
    """
    Allows access only to authenticated users who are in the 'barber' group.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated
        is_authenticated = request.user and request.user.is_authenticated
        if not is_authenticated:
            return False

        # Check if the user is in the 'barber' group
        return request.user.groups.filter(name='barber').exists()

class IsAuthenticatedAndInOwnerGroup(BasePermission):
    """
    Allows access only to authenticated users who are in the 'owner' group.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated
        is_authenticated = request.user and request.user.is_authenticated
        if not is_authenticated:
            return False

        # Check if the user is in the 'barber' group
        return request.user.groups.filter(name='owner').exists()

# -------------------------------------------------------------------
# VIEWS
# -------------------------------------------------------------------
# Haircut Image
class UploadHaircutImageAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser ]
    permission_classes= [IsAuthenticatedAndInOwnerGroup]

    def post(self, request, format=None):
        # Assuming the haircut's ID is passed as a URL parameter
        # in params: haircut_id = self.kwargs.get('pk')
        # in body:   haircut_id = request.data.get('haircut_id')
        haircut_id = request.data.get('haircut_id')
        haircut = get_object_or_404(Haircut, pk=haircut_id)

        # haircut = request.haircut
        serializer = HaircutImageSerializer(instance=haircut, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=200)
        else:
            return Response(data=serializer.errors, status=500)

# Haircuts
# Update & Reitrive from RetrieveUpdateAPIView => GET, PUT request for just an item
# Destroy from DestroyAPIView => DELETE request for just an item
class SingleHaircutView( generics.RetrieveUpdateAPIView, generics.DestroyAPIView):
    queryset = Haircut.objects.all()
    serializer_class = HaircutSerializer
    #permission_classes = [IsAuthenticatedAndInOwnerGroup]  # Use your custom permission class here

    def get_permissions(self):
        """Dynamically assign permission classes based on the request method."""
        if self.request.method == "GET":
            # Allow any access for GET requests
            permission_classes = [permissions.AllowAny]
        else:
            # Restrict PUT & DELETE requests to authenticated users in the 'owner' group
            permission_classes = [IsAuthenticatedAndInOwnerGroup]
        return [permission() for permission in permission_classes]

# I use the ListCreateAPIView instead of ListAPIView and CreateAPIView seperatly in order to have them both into one endpoint
class HaircutListCreateView(generics.ListCreateAPIView):
    queryset = Haircut.objects.all()
    serializer_class = HaircutSerializer

    def get_permissions(self):
        """Dynamically assign permission classes based on the request method."""
        if self.request.method == "GET":
            # Allow any access for GET requests
            permission_classes = [permissions.AllowAny]
        else:
            # Restrict POST requests to authenticated users in the 'owner' group
            permission_classes = [IsAuthenticatedAndInOwnerGroup]
        return [permission() for permission in permission_classes]


# Users
# User Image
class UploadUserProfileImageAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]  # Assuming only authenticated users can upload images

    def post(self, request, format=None):
        user = request.user  # Get the logged-in user
        profile = user.profile  # Get the profile of the logged-in user

        serializer = ProfileImageSerializer(instance=profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=200)
        else:
            return Response(data=serializer.errors, status=500)

class UserListCreateView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    pagination_class = NoPagination

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.request.method == 'GET':
            permission_classes = [permissions.AllowAny]
        else:  # POST
            permission_classes = [IsAuthenticatedAndInOwnerGroup]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        This view returns a list of all users that are in the 'barber' group for GET requests.
        For POST requests, it doesn't affect the queryset since it's about creating a user.
        """
        # Only filter queryset for GET requests
        if self.request.method == 'GET':
            barber_group = Group.objects.get(name='barber')  # Ensure 'barber' group exists
            return User.objects.filter(groups=barber_group)
        else:
            # For POST requests, the queryset is not directly utilized, but defined for completeness
            return User.objects.all()

    def create(self, request, *args, **kwargs):
        # Ensure that the password is hashed before saving the user
        # This is necessary to securely store the user's password
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)

class SingleUserView(generics.RetrieveUpdateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user  # Get the currently authenticated user

    def perform_update(self, serializer):
        user = serializer.instance
        new_password = serializer.validated_data.get('password')
        # Ensure the new password is hashed before saving it
        if new_password:
            # Use set_password to hash the new password
            user.set_password(new_password)

        # Call super to save the serializer and hence the user instance
        super().perform_update(serializer)

    # def perform_update(self, serializer):
    #     user = serializer.instance
    #     # Ensure the new password is hashed before saving it
    #     new_password = serializer.validated_data.get('password')
    #     if new_password:
    #         serializer.validated_data['password'] = make_password(new_password)
    #     serializer.save()

    def destroy(self, request, pk=None):
        # Directly use 'pk' from URL parameters to fetch the user to be deleted
        user_to_delete = get_object_or_404(User, pk=pk)

        self.perform_destroy(user_to_delete)
        return Response(status=status.HTTP_204_NO_CONTENT)




class CustomLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)

            # Serialize user data instead of token
            user_serializer = UserSerializer(user)
            return Response({'user': user_serializer.data, 'token': token.key}, status=status.HTTP_200_OK)
            # return Response({'user': user_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Timeslots
class SingleTimeslotUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Timeslot.objects.all()
    serializer_class = TimeslotSerializer

    def perform_update(self, serializer):
        # Additional logic (if any) to handle before saving the timeslot
        serializer.save(is_booked=True)  # Automatically set is_booked to True when updating

class TimeslotList(generics.ListCreateAPIView):
    queryset = Timeslot.objects.all()
    serializer_class = TimeslotSerializer
    pagination_class = NoPagination
    throttle_classes = []  # This disables throttling for this view

    def get_queryset(self):
        """
        Optionally filters the returned timeslots to a given barber and date,
        by filtering against a 'barber_id' and 'date' query parameter in the URL.
        """
        queryset = Timeslot.objects.all()
        barber_id = self.request.query_params.get('barber_id')
        date = self.request.query_params.get('date')
        if barber_id is not None and date is not None:
            queryset = queryset.filter(available_date__barber_id=barber_id,
                                        available_date__date=date)
        return queryset

# Bookings
# I use the ListCreateAPIView instead of ListAPIView and CreateAPIView seperatly in order to have them both into one endpoint
class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer

    def get_permissions(self):
        """
        Dynamically assign permission classes based on the user's group.
        """
        if self.request.method == "GET":
            if self.request.user.groups.filter(name='owner').exists():
                permission_classes = [IsAuthenticated, IsAuthenticatedAndInOwnerGroup]
            else:
                permission_classes = [IsAuthenticated, IsAuthenticatedAndInBarberGroup]
        else:
              # Allow any access for POST requests
            permission_classes = [permissions.AllowAny]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        instance = serializer.save()
        # Update related Timeslot's is_booked field to True
        instance.timeslot.is_booked = True
        instance.timeslot.save(update_fields=['is_booked'])

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='owner').exists():
            # The user is an owner, return all bookings
            return Booking.objects.all()
        elif user.groups.filter(name='barber').exists():
            # The user is a barber, return their bookings
            return Booking.objects.filter(timeslot__available_date__barber=user)
        else:
            # Just in case, return an empty queryset for other users
            return Booking.objects.none()
