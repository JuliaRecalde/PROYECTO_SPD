import requests
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


def obtener_noticias(request):
    api_key = 'b3cd3ee7f99e4f9fae3e85bfb2b2f448'
    url = 'https://newsapi.org/v2/top-headlines'
    search_term = request.GET.get('q', '')
    page = request.GET.get('page', 1) 
    parametros = {
        'apiKey': api_key,
        'q': search_term,
        'page': page, 
        'country': 'us',
    }
    try:
        response = requests.get(url, params=parametros)
        response.raise_for_status()  
        datos = response.json()
        noticias_con_imagenes = []
        for noticia in datos.get('articles', []):
            if 'urlToImage' in noticia:
                noticias_con_imagenes.append({
                    'title': noticia.get('title', ''),
                    'author': noticia.get('author', ''),
                    'url': noticia.get('url', ''),
                    'urlToImage': noticia['urlToImage'],
                })
        return JsonResponse({'articles': noticias_con_imagenes})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Error en la solicitud: {str(e)}'}, status=500)
    except Exception as e:
        return JsonResponse({'error': f'Error inesperado: {str(e)}'}, status=500)

@require_http_methods(["GET"])  
def obtener_noticias_por_categoria(request, category):
    api_key = 'b3cd3ee7f99e4f9fae3e85bfb2b2f448'
    url = 'https://newsapi.org/v2/top-headlines'
    parametros = {
        'apiKey': api_key,
        'category': category, 
        'country': 'us',
    }
    try:
        response = requests.get(url, params=parametros)
        response.raise_for_status()
        datos = response.json()
        noticias_con_imagenes = []
        for noticia in datos.get('articles', []):
            if 'urlToImage' in noticia:
                noticias_con_imagenes.append({
                    'title': noticia.get('title', ''),
                    'author': noticia.get('author', ''),
                    'url': noticia.get('url', ''),
                    'urlToImage': noticia['urlToImage'],
                })
        return JsonResponse({'articles': noticias_con_imagenes})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Error en la solicitud: {str(e)}'}, status=500)
    except Exception as e:
        return JsonResponse({'error': f'Error inesperado: {str(e)}'}, status=500)

#agg nuevo
def login_registro(request):
    return render(request, 'login_registro.html')