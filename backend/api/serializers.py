import bleach
from rest_framework import serializers
from .models import Haircut, AvailableDate, Timeslot, Booking, Profile, Gallery
from django.contrib.auth.models import User, Group
from rest_framework.validators import UniqueValidator


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'image']

# ------------------------------------------------------

class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image']


    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

# ------------------------------------------------------

# I create that serializer to make the group information available in the UserSerializer
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']

# ------------------------

#  Add the user to the 'barber' group upon user creation.
# That will enable the automatic process of populating the user with dates and timeslots
# utilizin the create_dates_and_timeslots_for_barber function in the signals.py
class UserSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='profile.image', required=False)
    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'image', 'groups']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
            'password': {'write_only': True, 'required': True},
        }

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.save()

        new_password = validated_data.get('password')
        if new_password:
            instance.set_password(new_password)
            instance.save()

        profile.image = profile_data.get('image', profile.image)
        profile.save()

        return instance

    def validate_username(self, value):
        # Sanitize the username to prevent XSS attacks
        return bleach.clean(value)

# ------------------------------------------------------

class HaircutSerializer(serializers.ModelSerializer):
    class Meta:
        model= Haircut
        fields = ['id','title', 'image', 'price']
        # Data Back-end Validation
        extra_kwargs = {
          # Validate uniqueness of a field
           'title': {
                'validators': [
                    UniqueValidator(
                        queryset=Haircut.objects.all()
                    )
                ]
            }
        }

    def validate_title(self, value):
        # Check if value is None before sanitizing
        if value is not None:
            sanitized_value = bleach.clean(value)
            return sanitized_value
        return value

    def validate_image(self, value):
        # Check if value is None before sanitizing
        if value is not None:
            return bleach.clean(value)
        return value

# ------------------------

class HaircutImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Haircut
        fields = ['image']

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

# ------------------------------------------------------

class AvailableDateSerializer(serializers.ModelSerializer):
    # Including the related Barber's name in the representation
    barber_username = serializers.CharField(source='barber.username', read_only=True) # Display just a field of the Users model. If we want the whole Barber information then we should use UserSerializer instead of serializer. Also, the barber.username refer to the variable we set in the AvailableDate model when we set barber = foreign key that associate with the User Model

    class Meta:
        model = AvailableDate
        fields = ['id', 'date', 'barber', 'barber_username']
        extra_kwargs = {
            'barber': {'write_only': True}
        }

# ------------------------

class TimeslotSerializer(serializers.ModelSerializer):
    # Including human-readable date and barber name
    date = serializers.DateField(source='available_date.date', read_only=True)
    barber_username = serializers.CharField(source='available_date.barber.username', read_only=True)

    class Meta:
        model = Timeslot
        fields = ['id', 'start_time', 'end_time', 'available_date', 'is_booked', 'date', 'barber_username']
        extra_kwargs = {
            'available_date': {'write_only': True}
        }

# ------------------------

class BookingSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(source='user', read_only=True)
    timeslot_info = TimeslotSerializer(source='timeslot', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'timeslot', 'created_at', 'user_info', 'timeslot_info',
                  'name', 'surname', 'phone_number', 'email', 'comment']
        extra_kwargs = {
            'user': {'write_only': True, 'required': False},  # 'required': False allows for anonymous bookings
            'timeslot': {'write_only': True, 'required': True},
            'name': {'required': True},
            'surname': {'required': True},
            'phone_number': {'required': True},
            'email': {'required': True},
            'comment': {'required': False}
        }

    def validate(self, data):
        # object-level sanitization
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = bleach.clean(value)
        return data