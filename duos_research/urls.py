from django.conf.urls import include
from django.urls import path
from django.shortcuts import redirect

from duos_research import views

urlpatterns = [
    path("", views.index, name="index"),
    path("feedback/", include("feedback.urls")),
    path("search/", include("search.urls")),
]
