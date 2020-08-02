from twilio.rest import Client

account_sid = ''
auth_token = ''
client = Client(account_sid, auth_token)

message = client.messages.create(body="Aur chotu kya haal chaal?", from_='+18314259427', to='+919814464733')

print(message.sid)
