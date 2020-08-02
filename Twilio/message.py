from twilio.rest import Client

account_sid = 'AC99e080addeef37d9f44eceeab3669431'
auth_token = '244dc41f10a7151b41273b2c2fb8015c'
client = Client(account_sid, auth_token)

message = client.messages.create(body="Aur chotu kya haal chaal?", from_='+18314259427', to='+919814464733')

print(message.sid)
