from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import LikeSerializer, PostSerializer
from .models import Post,Like
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ["get", "post", "delete", "head", "options"]
   
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["post"], url_path="toggle")
    def toggle_like(self, request):
        post_id = request.data.get("post_id")

        post = get_object_or_404(Post, id=post_id)

        like = Like.objects.filter(
            user=request.user,
            post=post
        ).first()

        if like:
            like.delete()
            is_liked = False
            print("You Unlike-Post Id: ",post.id)
        else:
            Like.objects.create(user=request.user, post=post)
            is_liked = True
            print("You like-Post Id: ",post.id)

        return Response({
            "has_like":is_liked,
            "num_of_likes":post.likes.count(),
            "message":"You Like The Post" if is_liked else "You Un-Like The Post"
        })


class GetAllUserPostsView(APIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get(self,request,pk:int):
        posts = Post.objects.filter(user_id=pk)
       
        serializers = self.serializer_class(
            posts,many=True,context={"request":request}
        )
   
        return Response(serializers.data)

   
class AllPostView(APIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get(self,request):
        posts = Post.objects.all()
       
        serializers = self.serializer_class(
            posts,many=True,context={"request":request}
        )
   
        return Response(serializers.data)
        
class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=True,
        methods=["get"],
        permission_classes=[AllowAny],
    )
    def likes(self, request, pk=None):
        post = self.get_object()
        likes = post.likes.select_related("user")

        data = [
            {
                "username": like.user.username,
                "timestamp": like.timestamp,
                "user_id":like.user.id
            }
            for like in likes 
        ]

        return Response(data)
    
    def get_queryset(self):
        if self.action == "likes":
            return Post.objects.all()

        return Post.objects.filter(user=self.request.user)
      
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    