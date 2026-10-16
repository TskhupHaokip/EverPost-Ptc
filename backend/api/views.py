from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import ProfileSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.core.exceptions import ValidationError
from .models import Profile

User = get_user_model()

class CheckProfileView(APIView):
    serializer_class = ProfileSerializer

    def get(self, request, pk: int):
        profile = Profile.objects.get(user_id=pk)
        if profile:
            serializer = self.serializer_class(
                profile,
                context={"request": request}
            )
            return Response(serializer.data)
        return Response({"status":False,"message":"Profile Not Found Or Un-Available"},
                        status=status.HTTP_400_BAD_REQUEST)

      
class ProfileView(ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ["get", "put", "patch", "delete","head", "options"]

    # Optional: Filter the queryset so users can only see/edit their own profile
    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        rf_token = request.data.get("refresh")
        if not rf_token:
            return Response({"message":"Refresh Token is Required"},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(rf_token)
            token.blacklist()

            return Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_200_OK
            )
        except TokenError:
            return Response(
                {"message": "Token is invalid or expired"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": "An unexpected error occurred","error":str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        Profile.objects.create(
            user=user,
            nick_name=user.username
        )

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "put", "patch", "delete","head", "options"]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
        