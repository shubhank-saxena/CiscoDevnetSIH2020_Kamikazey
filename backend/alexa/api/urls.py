from django.urls import path
from backend.alexa.api import skill
from django_ask_sdk.skill_adapter import SkillAdapter

my_skill_view = SkillAdapter.as_view(skill=skill.sb.create())

urlpatterns = [
    path('', my_skill_view, name='index'),
]
