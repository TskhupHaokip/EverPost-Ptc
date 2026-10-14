from django.conf.urls.static import static
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from .views import AllPostView, PostViewSet

router = DefaultRouter()
router.register("posts",PostViewSet,basename="posts")

urlpatterns = [
   path("all-posts/",AllPostView.as_view(),name="all-posts")
   
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
urlpatterns += router.urls
