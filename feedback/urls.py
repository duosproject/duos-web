from django.conf.urls import include
from django.contrib import admin
from feedback import views

from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("authors/", views.AuthorList.as_view()),
]

