import requests
import json
from datetime import datetime
from babel.numbers import format_number

response = requests.get('https://api.covid19india.org/data.json')
text = response.json()

cts = text['statewise']

tested = text['tested']
l = len(tested)
print(l)

def total_active():
    return format_number(int(cts[0]['active']), locale='en_IN')

def total_confirmed():
    return format_number(int(cts[0]['confirmed']), locale='en_IN')

def total_deaths():
    return format_number(int(cts[0]['deaths']), locale='en_IN')

def total_recovered():
    return format_number(int(cts[0]['recovered']), locale='en_IN')

def total_tested():
    test = 0
    for i in range(l):
        if tested[i]['totalsamplestested'] == '':
            continue
        test += int(tested[i]['totalsamplestested'])
    return format_number(test, locale='en_IN')
