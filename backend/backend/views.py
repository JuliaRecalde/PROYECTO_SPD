import requests
from django.http import JsonResponse

def obtener_noticias(request):
    api_key = 'b3cd3ee7f99e4f9fae3e85bfb2b2f448'
    url = 'https://newsapi.org/v2/top-headlines'
    search_term = request.GET.get('q', '')
    page = request.GET.get('page', 1) 

    parametros = {
        'apiKey': api_key,
        'q': search_term,
        'page': page, 
        'country': 'it',
    }

    try:
        response = requests.get(url, params=parametros)
        response.raise_for_status()  
        datos = response.json()
        return JsonResponse(datos)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Error en la solicitud: {str(e)}'}, status=500)
    except Exception as e:
        return JsonResponse({'error': f'Error inesperado: {str(e)}'}, status=500)
