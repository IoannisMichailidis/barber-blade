from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
# --------------------------------
# Haircuts Views
# --------------------------------
    path('gallery', views.GalleryListCreateView.as_view()),
    path('gallery/<int:pk>', views.SingleGalleryView.as_view()),  

    path('haircuts', views.HaircutListCreateView.as_view()),
    path('haircuts/<int:pk>', views.SingleHaircutView.as_view()),
    path('upload', views.UploadHaircutImageAPIView.as_view(), name='upload_haircut_image'),

    path('timeslots', views.TimeslotList.as_view(), name='timeslot-update'),
    path('timeslots/<int:pk>', views.SingleTimeslotUpdateView.as_view(), name='timeslot-update'),

    path('bookings', views.BookingListCreateView.as_view()),

    path('users', views.UserListCreateView.as_view(), name='create-user'),
    path('users/<int:pk>', views.SingleUserView.as_view()),
    path('users/login', views.CustomLoginView.as_view(), name='custom-login'),
    path('users/upload-user', views.UploadUserProfileImageAPIView.as_view(), name='upload_barber_image'),


]