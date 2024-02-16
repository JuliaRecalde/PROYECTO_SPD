from django.contrib import admin
from django.urls import path
from .views import obtener_noticias_por_categoria, login_registro

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/noticias/everything/', views.obtener_noticias, name='noticias'),
    path('api/noticias/<str:category>/', obtener_noticias_por_categoria, name='obtener_noticias_por_categoria'),
    path('login_registro/', login_registro, name='login_registro'),
    path('api/suscribirse/', views.suscribirse, name='suscribirse'),
]
