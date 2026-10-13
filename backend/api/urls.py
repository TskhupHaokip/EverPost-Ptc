from django.conf.urls.static import static
from django.urls import path,include
from .views import ProfileView, UserViewSet, LogoutView,RegisterView,CheckProfileView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from django.conf import settings

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")

router.register("user/profile",ProfileView,basename="profile")


urlpatterns = [
 
    path("users/profiles/<int:pk>/", CheckProfileView.as_view(), name="view-profile"),
    path("users/logout/", LogoutView.as_view(), name="logout"),
    path("users/register/",RegisterView.as_view(), name="register"),
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
urlpatterns += router.urls
