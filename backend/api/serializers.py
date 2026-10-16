from rest_framework import serializers
from .models import User,Profile

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
            read_only=True,
            slug_field="username"
        )
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ["user"]
        
       

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

