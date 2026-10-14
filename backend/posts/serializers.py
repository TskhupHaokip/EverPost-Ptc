from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field="username"
    )
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ["user"]
        # exclude = ["user"]