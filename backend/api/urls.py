from django.urls import path
from .views import UserViewSet, LogoutView,RegisterView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("users/login/", TokenObtainPairView.as_view(), name="login"),
    path("users/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("users/logout/", LogoutView.as_view(), name="logout"),
    path("users/register/",RegisterView.as_view(), name="register"),
]

urlpatterns += router.urls
