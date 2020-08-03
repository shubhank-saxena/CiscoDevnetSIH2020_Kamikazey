import os
import environ

env = environ.Env()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))

environ.Env.read_env(env_file=os.path.join(BASE_DIR, "../.env"))

DEBUG = env.bool("DEBUG", default=True)

SECRET_KEY = env("SECRET_KEY", default='secret-key-of-at-least-50-characters-to-pass-check-deploy',)

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'django_cleanup.apps.CleanupConfig',
    'corsheaders',
    'profanity',
    'django_filters',
    "rest_framework",
    'backend.school',
    'backend.food_detection',
    'rest_framework.authtoken',
    'rest_auth',
    'backend.alexa',
    'backend.user',
]

if DEBUG:
    STATICFILES_DIRS = [os.path.join(FRONTEND_DIR, 'build', 'static')]
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    STATIC_URL = "/static/"
    WHITENOISE_ROOT = os.path.join(FRONTEND_DIR, 'build', 'root')
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")
else:
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    GS_BUCKET_NAME = env("GS_BUCKET_NAME")
    STATIC_ROOT = "static/"
    MEDIA_ROOT = "media/"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(FRONTEND_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.config.wsgi.application'

IN_DOCKER = env.bool("IN_DOCKER", default=False)

if not IN_DOCKER:
    DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),}}
else:
    DATABASES = {
        "default": {
            "ENGINE": env("SQL_ENGINE", default="django.db.backends.postgresql"),
            "NAME": env("SQL_DATABASE", default="cisco"),
            "USER": env("SQL_USER", default="cisco"),
            "PASSWORD": env("SQL_PASSWORD", default="cisco"),
            "HOST": env("SQL_HOST", default="db"),
            "PORT": env("SQL_PORT", default="5432"),
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# CORS SETTINGS
CORS_ORIGIN_ALLOW_ALL = True

# REST FRAMEWORK AUTH SETUP
REST_FRAMEWORK = {'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.TokenAuthentication',]}

REST_AUTH_SERIALIZERS = {'TOKEN_SERIALIZER': 'backend.config.api.serializers.LoginResponseSerializer'}

# EMAIL SETTINGS
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')


# TWILIO SETTINGS
TWILIO_ACCOUNT_SID = env("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = env("TWILIO_AUTH_TOKEN")
