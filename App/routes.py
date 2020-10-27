from flask import render_template
from App import app
from App.get_data import last_updated, total_active, total_deaths, total_recovered, \
total_confirmed, total_tested, delta_confirmed, delta_deaths, delta_recovered


@app.route('/')
def hello_world():
    l_updated = last_updated()
    active = total_active()
    recovered = total_recovered()
    deaths = total_deaths()
    confirmed = total_confirmed()
    tested = total_tested()
    d_confirmed = delta_confirmed()
    d_recovered = delta_recovered()
    d_deaths = delta_deaths()
    return render_template('index.html', active=active, recovered=recovered, \
    deaths=deaths, confirmed=confirmed, tested=tested, d_confirmed=d_confirmed, \
    d_deaths=d_deaths, d_recovered=d_recovered, l_updated=l_updated)
