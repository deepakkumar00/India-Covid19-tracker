from flask import render_template
from App import app

@app.route('/')
def hello_world():
    states = ['All', 'Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Uttar Pradesh', 'Kerala', 'Delhi', 'West Bengal', 'Odisha', 'Telangana', 'Bihar', 'Rajasthan', 'Assam', 'Chhattisgarh', 'Haryana', 'Gujarat', 'Madhya Pradesh'\
        , 'Punjab', 'Jharkhand', 'Jammu and Kashmir', 'Uttarakhand', 'Goa', 'Puducherry', 'Tripura', \
            'Himachal Pradesh', 'Manipur', 'Arunachal Pradesh', 'Chandigarh', 'Meghalaya', 'Nagaland', 'Ladakh', \
                'Sikkim', 'Mizoram', 'Andaman and Nicobar Islands', 'Lakshadweep', 'Dadra and Nagar Haveli and Daman and Diu']
    states.sort()
    return render_template('index.html', states = states)
