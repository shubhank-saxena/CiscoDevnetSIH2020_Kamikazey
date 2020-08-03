from backend.school.models import School
import datetime
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED
import secrets
from backend.food_detection.models import Alert
from rest_framework.decorators import api_view
import requests
import json
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from twilio.rest import Client
from rest_framework.authtoken.models import Token
from django.http import HttpResponseForbidden


account_sid = settings.TWILIO_ACCOUNT_SID
auth_token = settings.TWILIO_AUTH_TOKEN
print(account_sid, auth_token)
client = Client(account_sid, auth_token)


headers = {'content-type': 'application/json', 'X-Cisco-Meraki-API-Key': "e4edb0ff642754d2b1f7146967edb38b34b3e49c"}


@api_view(['GET', 'POST'])
def meraki_snapshot(request):
    if request.method == 'GET':
        data = requests.post("https://api.meraki.com/api/v0/networks/N_711005791171205780/cameras/Q2JV-BY67-ABC8/snapshot", data=json.dumps({}), headers=headers)
        return Response(data.json())


@api_view(['POST'])
def mail(request):
    if request.method == 'POST':
        send_mail(
            'Alert Mid Day Meal', f'{request.data["message"]}', 'middaymealcisco@gmail.com', [f'{request.data["email"]}'], fail_silently=False,
        )
        message = client.messages.create(body="ALERT!! Your child has not been present for mid day meal today", from_='+18314259427', to='+919814464733')
        call = client.calls.create(url='http://demo.twilio.com/docs/voice.xml', to='+919814464733', from_='+18314259427')

        print(message.sid)
        print(call.sid)
        return HttpResponse("Sent")


@api_view(['POST'])
def alerts(request):
    if request.method == 'POST':
        user = Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user
        if user.groups.first().name == "Supervisor":
            # cisco_response = {"url": "https://spn4.meraki.com/stream/jpeg/snapshot/b2d123asdf423qd22d2", "expiry": "Access to the image will expire at 2018-12-11T03:12:39Z."}
            cisco_response = {"url": request.data['image_url']}
            org_id = request.data['school']

            if School.objects.get(organisation_id=org_id) in user.supervisor_set.all():

                food_provided = requests.post('http://35.213.147.228:5000/predict', data=cisco_response)

                # current_time = datetime.datetime.now()
                food_schedule_of_school = School.objects.get(organisation_id=org_id).foodschedule_set.filter(category="LN")[0]
                # food_schedule_of_current_time = food_schedules_of_school[0]
                # for food_schedule_of_school in food_schedules_of_school:
                #     if abs(food_schedule_of_school.time - current_time) < abs(food_schedule_of_current_time.time - current_time):
                #         food_schedule_of_current_time = food_schedule_of_school

                current_day = datetime.datetime.today().strftime('%A').upper()[:3]
                food_items_of_the_day_time = food_schedule_of_school.fooditemdaymap_set.get(day=current_day).food_item.all()

                for food_item_of_the_day_time in food_items_of_the_day_time:
                    if food_provided.upper() == food_item_of_the_day_time.food_item.upper():
                        return Response({'message': 'The food served is according to schedule'}, status=HTTP_200_OK)

                upload_image = requests.get(cisco_response['url'])
                image_hash = requests.post('https://ipfs.infura.io:5001/api/v0/add', files={'upload_file': upload_image.content}).json()['Hash']
                requests.get(f"https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/{image_hash}")  # pin hash

                file_name = f"unmatched_food{secrets.token_hex(16)}.txt"
                f = open(file_name, "a")
                f.write(
                    json.dumps(
                        {
                            'food_items_of_the_day_time': [food_item_of_the_day_time.food_item for food_item_of_the_day_time in food_items_of_the_day_time],
                            'food_provided': food_provided,
                            'image_url': f'https://ipfs.infura.io/ipfs/{image_hash}',
                        }
                    )
                )
                f.close()
                file_hash = requests.post('https://ipfs.infura.io:5001/api/v0/add', files={'upload_file': open(file_name, 'rb')})
                file_hash_instance = Alert(hash=file_hash, school__organisation_id=org_id, expected_item_name=food_items_of_the_day_time[0].food_item, provided_item=food_provided)
                file_hash_instance.save()
                return Response({'food_expected': food_items_of_the_day_time[0].food_item, 'food_provided': food_provided}, status=HTTP_201_CREATED)

        raise HttpResponseForbidden
