from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("", include("djwto.urls")),
    path("admin/", admin.site.urls),
    path("api/", include("events.api_urls")),
    path("api/", include("presentations.api_urls")),
    path("api/", include("accounts.api_urls")),
]
