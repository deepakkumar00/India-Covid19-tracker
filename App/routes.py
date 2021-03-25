from flask import render_template
from App import app
import pandas as pd
import requests

@app.route('/')
def hello_world():
    url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/India.csv"
    res = requests.get(url)
    with open("vaccine.txt", 'w') as f:
        f.write(res.text)
    df = pd.read_csv("vaccine.txt")
    totVaccinated = df['total_vaccinations'].iloc[-1]
    firstDose = df['people_vaccinated'].iloc[-1]
    secondDose = df['people_fully_vaccinated'].iloc[-1]
    states = ['All', 'Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Uttar Pradesh', 'Kerala', 'Delhi', 'West Bengal', 'Odisha', 'Telangana', 'Bihar', 'Rajasthan', 'Assam', 'Chhattisgarh', 'Haryana', 'Gujarat', 'Madhya Pradesh'\
        , 'Punjab', 'Jharkhand', 'Jammu and Kashmir', 'Uttarakhand', 'Goa', 'Puducherry', 'Tripura', \
            'Himachal Pradesh', 'Manipur', 'Arunachal Pradesh', 'Chandigarh', 'Meghalaya', 'Nagaland', 'Ladakh', \
                'Sikkim', 'Mizoram', 'Andaman and Nicobar Islands', 'Lakshadweep', 'Dadra and Nagar Haveli and Daman and Diu']
    states.sort()
    return render_template('index.html', states = states, totVaccinated = totVaccinated, firstDose = firstDose, secondDose = secondDose)
