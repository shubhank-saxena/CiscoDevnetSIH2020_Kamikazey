from twilio.rest import Client

account_sid = 'AC99e080addeef37d9f44eceeab3669431'
auth_token = '244dc41f10a7151b41273b2c2fb8015c'
client = Client(account_sid, auth_token)

call = client.calls.create(url='http://demo.twilio.com/docs/voice.xml', to='+919814464733', from_='+18314259427')

print(call.sid)
