from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.contrib.auth.models import User, Group
from .models import AvailableDate, Timeslot, Profile
from datetime import datetime, timedelta, time, date
from django.db import transaction
from django.conf import settings

# This signal ensures the user is added to the 'barber' group upon creation
@receiver(post_save, sender=User)
def assign_barber_group(sender, instance, created, **kwargs):
    if created:
        barber_group, _ = Group.objects.get_or_create(name='barber')
        instance.groups.add(barber_group)
        # Ensure a Profile is created whenever a new User is created
        Profile.objects.get_or_create(user=instance)

# That function is triggered only after the assign_barber_group finishes
@receiver(m2m_changed, sender=User.groups.through)
def create_dates_and_timeslots_for_barber(sender, instance, action, pk_set, **kwargs):
    # Check if the 'barber' group is among the changed groups and the action is 'post_add'
    if action == 'post_add' and Group.objects.filter(name='barber', id__in=pk_set).exists():
        print("Signal triggered for user:", instance.username)
        # Define your start and end times
        start_time_weekday = time(9, 0)  # 9:00 AM
        end_time_weekday = time(17, 0)  # 5:00 PM (8 hours later)
        end_time_saturday = time(15, 0)  # 3:00 PM (6 hours later)

        # Generate dates for the current year
        current_year = datetime.now().year
        start_date = date(current_year, 1, 1)  # Start of the current year
        end_date = date(current_year, 12, 31)  # End of the current year
        current_date = start_date

        while current_date <= end_date:
            available_date = AvailableDate.objects.create(date=current_date, barber=instance)

            if 0 <= current_date.weekday() <= 4:  # Monday to Friday
                generate_timeslots(available_date, start_time_weekday, end_time_weekday)
            elif current_date.weekday() == 5:  # Saturday
                generate_timeslots(available_date, start_time_weekday, end_time_saturday)
            # Sundays are off, so no timeslots are generated

            current_date += timedelta(days=1)

def generate_timeslots(date, start_time, end_time):
    current_time = start_time
    while current_time < end_time:
        Timeslot.objects.create(
            available_date=date,
            start_time=current_time,
            end_time=(datetime.combine(datetime.today(), current_time) + timedelta(minutes=30)).time()
        )
        current_time = (datetime.combine(datetime.today(), current_time) + timedelta(minutes=30)).time()


# Ensure the profile is updated whenever the User model is saved
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    # This will not create a profile if it doesn't exist, hence the creation logic is in the 'assign_barber_group'
    instance.profile.save()