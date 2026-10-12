from django.urls import path
from .views import UserViewSet, LogoutView,RegisterView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet


router = DefaultRouter()
router.register("users", UserViewSet, basename="users")


urlpatterns = [
   
    path("users/logout/", LogoutView.as_view(), name="logout"),
    path("users/register/",RegisterView.as_view(), name="register"),
]


urlpatterns += router.urls
