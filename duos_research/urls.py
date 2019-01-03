from django.conf.urls import include
from django.urls import path
from django.shortcuts import redirect

urlpatterns = [
    path("", lambda request: redirect("https://duosproject.github.io//")),
    path("feedback/", include("feedback.urls")),
    path("search/", include("search.urls")),
]
