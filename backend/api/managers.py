from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,username:str,password:str,**extrafields):
        if not username or not password:
            raise ValueError("Users must have a username and password")
        try:
            user = self.model(
                username=username,
                password=password,
                **extrafields
            )
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            print(e)
            return None

    def create_superuser(self, username, password:str, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(
            username=username,
            password=password,
            **extra_fields
        )
        
