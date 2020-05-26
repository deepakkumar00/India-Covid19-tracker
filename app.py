from flask import Flask, render_template
from get_data import total_active, total_deaths, total_recovered, total_confirmed, total_tested

app = Flask(__name__)

@app.route('/')
def hello_world():
    active = total_active()
    recovered = total_recovered()
    deaths = total_deaths()
    confirmed = total_confirmed()
    tested = total_tested()
    return render_template('index.html', active=active, recovered=recovered, deaths=deaths, confirmed=confirmed, tested=tested)

if __name__ == '__main__':
    app.run(debug=True)
