from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

catchall = TemplateView.as_view(template_name='index.html')

urlpatterns = [
    path('', catchall),
    path('admin/', admin.site.urls),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/school/', include('backend.school.api.urls')),
    path('api/alexa/', include('backend.alexa.api.urls')),
    path('api/food_detection/', include('backend.food_detection.api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
