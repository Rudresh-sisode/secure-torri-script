"""
URL configuration for profileproject project.
"""
from django.contrib import admin
from django.urls import path
from profileapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.profile_view, name='profile'),
]
