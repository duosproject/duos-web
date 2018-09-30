from django.conf.urls import re_path, include
from django.contrib import admin
from feedback import views

urlpatterns = [
    re_path(r"^admin/", admin.site.urls, name="admin"),
    re_path(r"^feedback/", include("feedback.urls")),
]
