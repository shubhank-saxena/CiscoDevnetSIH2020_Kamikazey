from rest_framework.generics import CreateAPIView, RetrieveAPIView
from backend.school.models import School
import requests
import datetime
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED
import json
import secrets
from backend.food_detection.models import FileHash


class FoodDetectionView(CreateAPIView):

    queryset = FileHash.objects.all()
    serializer_class = None

    def create(self, request, *args, **kwargs):
        cisco_response = requests.post(
            'https://api-mp.meraki.com/api/v1/devices/Q2JV-BY67-ABC8/camera/generateSnapshot', headers={'X-Cisco-Meraki-API-Key': 'e4edb0ff642754d2b1f7146967edb38b34b3e49c'}
        )
        # cisco_response = {"url": "https://spn4.meraki.com/stream/jpeg/snapshot/b2d123asdf423qd22d2", "expiry": "Access to the image will expire at 2018-12-11T03:12:39Z."}
        org_id = "get from url"

        food_provided = requests.post('http://35.213.147.228:5000/predict', data=cisco_response)

        current_time = datetime.datetime.now()
        food_schedules_of_school = School.objects.get(organisation_id=org_id).foodschedule_set.all()
        food_schedule_of_current_time = food_schedules_of_school[0]
        for food_schedule_of_school in food_schedules_of_school:
            if abs(food_schedule_of_school.time - current_time) < abs(food_schedule_of_current_time.time - current_time):
                food_schedule_of_current_time = food_schedule_of_school

        current_day = datetime.datetime.today().strftime('%A').upper()[:3]
        food_items_of_the_day_time = food_schedule_of_current_time.fooditemdaymap_set.get(day=current_day).food_item.all()

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
        file_hash_instance = FileHash(hash=file_hash, school__organisation_id=org_id)
        file_hash_instance.save()
        return Response({'message': 'The food served is according not to schedule'}, status=HTTP_201_CREATED)


class SnapshotView(RetrieveAPIView):

    queryset = None
    serializer_class = None
    permission_class = None

    def retrieve(self, request, *args, **kwargs):
        cisco_response = requests.post(
            'https://api-mp.meraki.com/api/v1/devices/Q2JV-BY67-ABC8/camera/generateSnapshot', headers={'X-Cisco-Meraki-API-Key': 'e4edb0ff642754d2b1f7146967edb38b34b3e49c'}
        )
        return Response(cisco_response)
