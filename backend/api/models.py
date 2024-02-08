from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Category(models.Model):
    slug = models.SlugField()
    title = models.CharField(max_length=255, db_index=True)

    # str convertion
    def __str__(self)-> str:
        return self.title

class Haircut(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    image = models.CharField(max_length=100, db_index=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    def __str__(self)-> str:
        return self.title

# ------------------------------------------------------
# Barber
# ------------------------------------------------------
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    image = models.CharField(max_length=255, default='/images/sample.jpg')  # Adjust the default path as needed

    def __str__(self):
        return f"{self.user.username}'s profile"

class AvailableDate(models.Model):
    date = models.DateField()
    barber = models.ForeignKey(User, related_name='available_dates', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} ({self.barber.username})"

class Timeslot(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    available_date = models.ForeignKey(AvailableDate, related_name='timeslots', on_delete=models.CASCADE)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.start_time} - {self.end_time} ({self.available_date})"

# If the barber makes a reservation on behalf of the customer then it will take information from the User model
class Booking(models.Model):
    user = models.ForeignKey(User, related_name='bookings', on_delete=models.SET_NULL, null=True, blank=True)
    timeslot = models.OneToOneField(Timeslot, related_name='booking', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    # Additional fields for customer details
    name = models.CharField(max_length=255, default= 'John')
    surname = models.CharField(max_length=255, default= 'Smith')
    phone_number = models.CharField(max_length=255, default= '69...')
    email = models.EmailField( default= 'john.smith@gmail.com')
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        if self.user:
            return f"Booking by {self.user.username} for {self.timeslot}"
        else:
            return f"Booking by {self.name} {self.surname} for {self.timeslot}"