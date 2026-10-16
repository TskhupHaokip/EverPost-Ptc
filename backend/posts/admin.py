from django.contrib import admin
from django.forms.models import ModelChoiceField
from .models import Post,Like

@admin.register(Post)
class CustomPostAdmin(admin.ModelAdmin):
    pass

@admin.register(Like)
class CustomLikeAdmin(admin.ModelAdmin):

    def get_list_display(self, request):
        return [
            field.name
            for field in self.model._meta.fields
        ]
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)

        # which user are we creating/editing the like for?
        user_id = (
            obj.user_id if obj
            else request.GET.get("user") or request.POST.get("user")
        )

        post_field = form.base_fields.get("post")
        if user_id and isinstance(post_field, ModelChoiceField):
            liked = Like.objects.filter(user_id=user_id)
            if obj:
                liked = liked.exclude(pk=obj.pk)  # keep this like's own post selectable
            post_field.queryset = Post.objects.exclude(
                pk__in=liked.values("post_id")
            )

        return form