from django.conf.urls import include
from django.urls import path

urlpatterns = [
    path("feedback/", include("feedback.urls")),
    path("search/", include("search.urls")),
]
