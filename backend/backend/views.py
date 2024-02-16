import requests
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json

def obtener_noticias(request):
    api_key = 'b3cd3ee7f99e4f9fae3e85bfb2b2f448'
    url = 'https://newsapi.org/v2/top-headlines'
    search_term = request.GET.get('q', '')
    if not search_term:
        search_term = 'world'
    page = request.GET.get('page', 1) 
    parametros = {
        'apiKey': api_key,
        'q': search_term,
        'page': page,
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

def login_registro(request):
    return render(request, 'login_registro.html')

@csrf_exempt
def suscribirse(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            link = data.get('link')
            correo = data.get('correo')
            if link and correo:
                with connection.cursor() as cursor:
                    cursor.execute("INSERT INTO suscripciones (link, correo) VALUES (%s, %s)", (link, correo))
                    connection.commit()
                return JsonResponse({'message': 'Suscripción guardada exitosamente'}, status=201)
            else:
                return JsonResponse({'error': 'Los datos de suscripción son inválidos'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'Error al procesar la solicitud de suscripción'}, status=500)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
