from django.urls import path
from .views import alerts, meraki_snapshot, mail, AlertListView

urlpatterns = [path('predict/', alerts), path('snapshot/', meraki_snapshot), path('mail/', mail), path('alert/<school_id>/', AlertListView.as_view())]
