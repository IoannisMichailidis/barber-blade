from django.contrib import admin
from .models import Haircut, AvailableDate, Timeslot, Booking, Profile, Gallery

# Register your models here.
admin.site.register(Gallery)
admin.site.register(Profile)
admin.site.register(Haircut)
admin.site.register(AvailableDate)
admin.site.register(Timeslot)
admin.site.register(Booking)