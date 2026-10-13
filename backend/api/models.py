from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.db.models import ImageField
from .managers import ProfileManager, UserManager

class User(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=150,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self) -> str:
        return str(self.username)

class Profile(models.Model):
    user = models.OneToOneField(
        User,on_delete=models.CASCADE,related_name="profile"
    )
    nick_name = models.CharField(max_length=100,blank=True)
    bio = models.TextField(max_length=1000)
    pic = ImageField(
        upload_to="users/profile",
        default = "defaults/profile_pic.png",
        blank=True
        )
    cover = ImageField(
        upload_to="users/profile",
        default = "defaults/cover.png",
        blank=True
    )
    objects = ProfileManager()

    def save(self, *args, **kwargs):
        if not self.nick_name and self.user:
            self.nick_name = self.user.username
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nick_name}"



    