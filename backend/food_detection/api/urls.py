from django.urls import path
from .views import alerts, meraki_snapshot, mail

urlpatterns = [path('predict/', alerts), path('snapshot/', meraki_snapshot), path('mail/', mail)]
