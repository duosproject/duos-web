from django.conf.urls import re_path, include

urlpatterns = [re_path(r"^feedback/", include("feedback.urls"))]
