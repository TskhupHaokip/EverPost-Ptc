from django.db import models
from django.conf import settings
from .managers import PostManager


class Post(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="posts",
        on_delete=models.CASCADE,
    )
    caption = models.TextField(max_length=1000)
    image = models.ImageField(
        upload_to="users/posts/",
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = PostManager()
    
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.user.get_username()
