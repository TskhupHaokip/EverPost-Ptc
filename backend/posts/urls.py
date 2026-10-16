from django.conf.urls.static import static
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from .views import AllPostView, LikeViewSet, PostViewSet,GetAllUserPostsView

router = DefaultRouter()
router.register("posts",PostViewSet,basename="posts")

router.register("post/likes",LikeViewSet,basename="likes")

urlpatterns = [
   path("all-posts/",AllPostView.as_view(),name="all-posts"),
  path(
    "<int:pk>/posts/",
    GetAllUserPostsView.as_view(),
    name="get-user-posts"
),
   
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
urlpatterns += router.urls
