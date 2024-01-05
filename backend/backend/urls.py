from django.contrib import admin
from django.urls import path
from .views import obtener_noticias_por_categoria

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/noticias/everything/', views.obtener_noticias, name='noticias'),
    path('api/noticias/<str:category>/', obtener_noticias_por_categoria, name='obtener_noticias_por_categoria'),
]
