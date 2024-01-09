from django.db import models

class Noticia(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    enlace = models.URLField()

    def __str__(self):
        return f'{self.fecha} - {self.enlace}'
