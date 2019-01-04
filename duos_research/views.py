# -*- coding: utf-8 -*-s
from django.shortcuts import render


def index(request):
    return render(request, "index.html")
