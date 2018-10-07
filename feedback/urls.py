import environ
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

env = environ.Env()
env.read_env(".env")
debug_is_on = lambda: env("DEBUG") == "on"

from feedback import views

urlpatterns = [
    path("", views.index, name="index"),
    path("authors/", views.author_list, name="author_list"),
    path("authors/<int:author_id>/", views.author_detail, name="author_detail"),
]

# Debug configuraiton
if debug_is_on():
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
