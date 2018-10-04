from feedback import views

from django.urls import path

urlpatterns = [
    path("", views.index, name="index"),
    path("authors/", views.AuthorList.as_view()),
    path(
        "authors/<int:author_id>/", views.author_detail, name="author_detail"),
    # path("authors/<int:author_id>/", views.AuthorDetail.as_view())
]
