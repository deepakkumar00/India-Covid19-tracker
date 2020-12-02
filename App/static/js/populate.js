const api_url = 'https://api.covid19india.org/data.json';

async function getapi(url) { 
    const response = await fetch(url); 
    var data = await response.json();
    update(data);
} 

getapi(api_url);

function update(json){
    var active = document.getElementById('active');
    var confirmed = document.getElementById('confirmed');
    var recovered = document.getElementById('recovered');
    var deaths = document.getElementById('deaths');
    var deltaconfirmed = document.getElementById('deltaconfirmed');
    var deltarecovered = document.getElementById('deltarecovered');
    var deltadeaths = document.getElementById('deltadeaths');
    document.getElementById('lastupdated').innerHTML = json.statewise[0].lastupdatedtime;

    var form = document.getElementById('state');

    var init = json.statewise[0];
        active.innerHTML = (parseInt(init.active)).toLocaleString('en-IN');
        confirmed.innerHTML = (parseInt(init.confirmed)).toLocaleString('en-IN');
        recovered.innerHTML = (parseInt(init.recovered)).toLocaleString('en-IN');
        deaths.innerHTML = (parseInt(init.deaths)).toLocaleString('en-IN');
        deltaconfirmed.innerHTML = (parseInt(init.deltaconfirmed)).toLocaleString('en-IN');
        deltarecovered.innerHTML = (parseInt(init.deltarecovered)).toLocaleString('en-IN');
        deltadeaths.innerHTML = (parseInt(init.deltadeaths)).toLocaleString('en-IN');

    document.getElementById('state').addEventListener('change', function(e){
        var index;
        for(var i  = 0; i < json.statewise.length; i++)
        {
            if(form.value === 'All')
            {
                index = 0;
                break;
            }
            if(form.value === json.statewise[i].state)
            {
                index = i;
                break;
            }
        }
        console.log(json.statewise[index].state);
        var fill = json.statewise[index];
        active.innerHTML = (parseInt(fill.active)).toLocaleString('en-IN');
        confirmed.innerHTML = (parseInt(fill.confirmed)).toLocaleString('en-IN');
        recovered.innerHTML = (parseInt(fill.recovered)).toLocaleString('en-IN');
        deaths.innerHTML = (parseInt(fill.deaths)).toLocaleString('en-IN');
        deltaconfirmed.innerHTML = (parseInt(fill.deltaconfirmed)).toLocaleString('en-IN');
        deltarecovered.innerHTML = (parseInt(fill.deltarecovered)).toLocaleString('en-IN');
        deltadeaths.innerHTML = (parseInt(fill.deltadeaths)).toLocaleString('en-IN');
    })

    var graphdata = json.cases_time_series;
    var xaxes = [], confirmedY = [], activeY = [], recoveredY = [], deathsY = [];
    for(var j = 0; j < graphdata.length; j++){
        xaxes.push(graphdata[j].date);
        confirmedY.push(parseInt(graphdata[j].totalconfirmed));
        recoveredY.push(parseInt(graphdata[j].totalrecovered));
        deathsY.push(parseInt(graphdata[j].totaldeceased));
        activeY.push(parseInt(graphdata[j].totalconfirmed) - (parseInt(graphdata[j].totalrecovered) + parseInt(graphdata[j].totaldeceased)));
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: xaxes,
        datasets: [{
            label: 'Confirmed',
            fill: false,
            borderColor: 'rgb(29, 29, 29)',
            pointBackgroundColor: 'rgb(29, 29, 29)',
            borderWidth: 5,
            pointRadius: 0,
            data: confirmedY
        },
        {
            label: 'Active',
            fill: false,
            borderColor: 'rgb(62, 170, 241)',
            pointBackgroundColor: 'rgb(62, 170, 241)',
            borderWidth: 5,
            pointRadius: 0,
            data: activeY
        },
        {
            label: 'Recovered',
            fill: false,
            borderColor: 'rgb(62, 241, 131)',
            pointBackgroundColor: 'rgb(62, 241, 131)',
            borderWidth: 5,
            pointRadius: 0,
            data: recoveredY
        },
        {
            label: 'Deaths',
            fill: false,
            borderColor: 'rgb(243, 44, 44)',
            pointBackgroundColor: 'rgb(243, 44, 44)',
            borderWidth: 5,
            pointRadius: 0,
            data: deathsY
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(0, 0, 0)',
                usePointStyle: true,
            },
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false,
                    min: '01 July '
                }
            }],
            yAxes: [{
                position: 'right',
                gridLines: {
                    display: false,
                },
                ticks: {
                    stepSize: 2000000,
                    callback: function(label, index, labels) {
                        if(label/100000 >= 100){
                            return label/10000000+'Cr';
                        }
                        return label/100000+'L';
                    }
                }
            }]
        }
    }
});
}


