import environ
from django.urls import path

env = environ.Env()
env.read_env(".env")
debug_is_on = lambda: (env("DEBUG") == "on" or env("DEBUG"))

from feedback import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:writes_hash>", views.author_survey, name="author_survey"),
]
