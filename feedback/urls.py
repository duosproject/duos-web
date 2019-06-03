from django.urls import path

from feedback import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:writes_hash>", views.author_survey, name="author_survey"),
]
