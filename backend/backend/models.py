from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class Noticia(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    palabra_clave = models.CharField(max_length=255)
    fecha_busqueda = models.DateField()
    link_noticia = models.URLField()

    def __str__(self):
        return f"{self.usuario.username} - {self.palabra_clave}"

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo de correo electrónico es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    # Otros campos que puedas necesitar

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    # Campos requeridos cuando se utiliza create_superuser
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
