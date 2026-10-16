from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import LikeSerializer, PostSerializer
from .models import Post,Like
from rest_framework.response import Response
from rest_framework.decorators import action

class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ["get", "post", "delete", "head", "options"]
   
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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

    