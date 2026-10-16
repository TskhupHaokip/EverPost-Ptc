from rest_framework import serializers
from .models import Post,Like

class LikeSerializer(serializers.ModelSerializer):
  
    user = serializers.SlugRelatedField(
            read_only=True,
            slug_field="username"
        )
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["user"]



class PostSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field="username"
    )

    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ["user"]
        # exclude = ["user"]