import bleach
from rest_framework import serializers
from .models import Category, Haircut, AvailableDate, Timeslot, Booking, Profile
from django.contrib.auth.models import User, Group
from rest_framework.validators import UniqueValidator

#  Add the user to the 'barber' group upon user creation.
# That will enable the automatic process of populating the user with dates and timeslots
# utilizin the create_dates_and_timeslots_for_barber function in the signals.py
class UserSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='profile.image', required=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'image']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
            'password': {'write_only': True, 'required': True},
        }

    # def create(self, validated_data):
    #     # Create the user
    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password']
    #     )

    #     # Add the user to the 'barber' group
    #     barber_group, _ = Group.objects.get_or_create(name='barber')
    #     user.groups.add(barber_group)

    #     return user
        
    # def create(self, validated_data):
    #     profile_data = validated_data.pop('profile', {})
    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password']
    #     )

    #     # Add the user to the 'barber' group
    #     barber_group, _ = Group.objects.get_or_create(name='barber')
    #     user.groups.add(barber_group)

    #     # Now, create the profile for the user with the image field
    #     Profile.objects.create(user=user, **profile_data)

    #     return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.image = profile_data.get('image', profile.image)
        profile.save()

        return instance

    def validate_username(self, value):
        # Sanitize the username to prevent XSS attacks
        return bleach.clean(value)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','slug','title']

    def validate_title(self, value):
        # Sanitize the title to prevent XSS attacks
        return bleach.clean(value)

class HaircutSerializer(serializers.ModelSerializer):
    # relate the Haircut with the Category
    category = CategorySerializer(read_only=True) # If I will not add the read_only then we will get a validation error when trying to send data with the POST request without adding the category. And we want to add data without the category because the category comes from another table as relationship
    category_id = serializers.IntegerField(write_only=True) # I don't want that field to be visible in GET request but only when sending data with POST
    class Meta:
        model= Haircut
        fields = ['id','title', 'image','category','category_id']
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
        # Sanitize and validate the title
        sanitized_value = bleach.clean(value)
        return sanitized_value

    def validate_image(self, value):
        return bleach.clean(value)

class AvailableDateSerializer(serializers.ModelSerializer):
    # Including the related Barber's name in the representation
    barber_username = serializers.CharField(source='barber.username', read_only=True) # Display just a field of the Users model. If we want the whole Barber information then we should use UserSerializer instead of serializer. Also, the barber.username refer to the variable we set in the AvailableDate model when we set barber = foreign key that associate with the User Model

    class Meta:
        model = AvailableDate
        fields = ['id', 'date', 'barber', 'barber_username']
        extra_kwargs = {
            'barber': {'write_only': True}
        }

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
        # Example of object-level sanitization
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = bleach.clean(value)
        return data