from twilio.rest import Client

account_sid = ''
auth_token = ''
client = Client(account_sid, auth_token)

call = client.calls.create(url='http://demo.twilio.com/docs/voice.xml', to='+919814464733', from_='+18314259427')

print(call.sid)
