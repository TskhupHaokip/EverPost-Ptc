
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

    
class Like(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="likes"
        )
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE,
        related_name="likes"
        )

    timestamp = models.DateTimeField(
        auto_now_add=True,
        editable=False
    )
    
    class Meta:
        ordering = ["-timestamp"]
        constraints = [
            models.UniqueConstraint(
                fields=["user","post"],
                name="unique_user_post_like"
            )
        ]

    def __str__(self):
        return f"{self.user} Liked Post {self.post} at {self.timestamp}"