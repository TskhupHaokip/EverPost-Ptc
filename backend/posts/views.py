from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import PostSerializer
from .models import Post
from rest_framework.response import Response

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

    
    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    