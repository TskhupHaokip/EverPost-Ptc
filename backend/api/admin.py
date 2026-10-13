from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile, User
from django.forms import ModelChoiceField

@admin.register(User)
class UserControlAdmin(UserAdmin):
    list_display = ("id", "username", "is_active", "is_staff", "last_login", "is_superuser")
    list_display_links = ("username",)

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "groups", "user_permissions")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "password1", "password2"),
        }),
    )

@admin.register(Profile)
class ProfileCustomAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [
            field.name
            for field in self.model._meta.fields
        ]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)

        user_field = form.base_fields["user"]
        if isinstance(user_field, ModelChoiceField):
            user_field.queryset = User.objects.filter(
                profile__isnull=True
            )

        return form

    def get_list_editable(self, request):
        return [
            field.name
            for field in self.model._meta.fields
            if field.name not in ("id", "user")
        ]

    search_fields = ("nick_name", "user__username")
    list_filter = ("user__is_active",)
    list_per_page = 25
    list_display_links = ["id","nick_name","user"]
   
