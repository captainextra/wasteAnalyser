function gauges(gloc, con, max, data1, title,tag,color) {
    $("#gauges").show();
    $(`#${tag}gauge`).show();


    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        colors: Highcharts.map([color], function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        }),
        exporting: false,
        title: null,
        pane: {
            center: ['50%', '80%'],
            size: '150%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '53%',
                outerRadius: '113%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            minorGridLineColor: 'black',
            minorGridLineWidth: 3,
            minorTickInterval: '2',
            plotBands: [{
                color: 'rgba(0,0,0,0.9)',
                from: 0,
                to: con,
                outerRadius: 70,
                thickness: 2,
                text: ''
            }],
            softMax: false,
            lineWidth: 2,
            minorTickInterval: null,
            tickColor: 'gray',
            tickWidth: 0.5,
            tickLength: 5,
            tickAmount: 5,
            title: {
                y: 50
            },
            labels: {
                y: 0,
                enabled: false
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: true
            },

        },
    };

    var chart = Highcharts.chart(gloc, Highcharts.merge(gaugeOptions, {

        yAxis: {
            min: 0,
            max: max,
            title: {
                text: `${title}`
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'General',
            data: [data1],
        },
    ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'middle',
                        layout: 'horizontal'
                    },
                    series: [{
                        dataLabels: {
                            enabled: false
                        }
                    }],
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }

    }));

}

function displayMonthTable(title, leftCol, col2, col3, col4, tabloc) {

    var table = "<table class='table table-sm table-striped table-dark shadow-lg p-3 mb-5 rounded'>";
    table += `
    <thead> 
        <tr>
            <th>${title}</th>
            <th>2019 Weights (kg)</th>
            <th>2018 Weights (kg)</th>
            <th>Difference (kg)</th>
        </tr>
    </thead>`

    for (i = 0; i < leftCol.length; i++) {
        table += "<tr>";

        table += `<td>`;
        table += `${leftCol[i]}`;
        table += "</td>";

        table += `<td>`;
        table += `${col2[i]}`;
        table += "</td>";

        table += `<td>`;
        table += `${col3[i]}`;
        table += "</td>";

        table += `<td>`;
        table += `${col4[i]}`;
        table += "</td>";

        table += "</tr>";
    }
    table += "</table>";
    $(`#${tabloc}`).html(table);
}

function displayDailyTable(title, class1, leftCol, col2, col3, col4, tabloc, tag) {

    var table = "<table class='table table-sm table-striped table-dark shadow-lg p-3 mb-5 rounded'>";
    table += `
    <thead> 
    <tr>
        <th>${title}</th>
        <th>Bins Collected</th>
        <th>Total Weight (kg)</th>
        <th>Ave Bin Weight (kg)</th>
        </tr>
    </thead>`

    for (i = 0; i < leftCol.length; i++) {
        table += "<tr>";

        table += `<td class="${class1}">`;
        table += `${leftCol[i]}`;
        table += "</td>";

        table += `<td id="gen-${tag[i]}-binSum">`;
        table += `${col2[i]}`;
        table += "</td>";

        table += `<td id="gen-${tag[i]}-sum">`;
        table += `${col3[i]}`;
        table += "</td>";

        table += `<td id="gen-${tag[i]}-avekg">`;
        table += `${col4[i]}`;
        table += "</td>";

        table += "</tr>";
    }
    table += "</table>";
    $(`#${tabloc}`).html(table);
}

function displayOvTable(tabtitle, class1, leftCol, ovtabids, ovgenlist, ovdmrlist, ovfoolist, ovglslist, ovtotlist, tabloc) {

    var table = "<table class='table table-sm table-striped table-dark shadow-lg p-3 mb-5 rounded'>";
    table += `
    <thead> 
    <tr>
        <th></th>
        <th>General</th>
        <th>DMR</th>
        <th>Food</th>
        <th>Glass</th>
        <th>Totals</th>

        </tr>
    </thead>`

    for (i = 0; i < leftCol.length; i++) {
        table += "<tr>";

        table += `<td class="${class1}">`;
        table += `${leftCol[i]}`;
        table += "</td>";

        table += `<td id="ov-gen-${ovtabids[i]}">`;
        table += `${ovgenlist[i]}`;
        table += "</td>";

        table += `<td id="ov-dmr-${ovtabids[i]}">`;
        table += `${ovdmrlist[i]}`;
        table += "</td>";

        table += `<td id="ov-foo-${ovtabids[i]}">`;
        table += `${ovfoolist[i]}`;
        table += "</td>";

        table += `<td id="ov-gls-${ovtabids[i]}">`;
        table += `${ovglslist[i]}`;
        table += "</td>";

        table += `<td id="ov-${ovtabids[i]}">`;
        table += `${ovtotlist[i]}`;
        table += "</td>";

        table += "</tr>";
    }
    table += "</table>";
    $(`#${tabloc}`).html(table);
}


function buildChart(labels, values, yLabel, tit, type, locContainer = 'containerb',color) {

    Highcharts.chart(locContainer, {
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: type
        },
        title: {
            text: tit
        },
        colors: Highcharts.map([color], function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        }),
        legend: {
            enabled: false
        },
        xAxis: {
            categories: labels,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: yLabel
            }
        },
        tooltip: {
            headerFormat: '<table><span style="font-size:10px">{point.key}</span>',
            pointFormat: '<tr><td>{series.name}</td><td style="padding:0"><b>{point.y:.3f}t</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Weight',
            data: values,
            marker: false

                }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 100
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    })
}



function bymonthChart(cat, genlist,dmrlist,foolist,glslist,gencon,dmrcon,foocon,glscon,type,chloc,color){
    // create bar chart
    Highcharts.chart(chloc, {
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: type
        },
        title: {
            text: 'Waste Streams By Month'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            categories: cat,
            crosshair: true
        },
        colors: Highcharts.map(color, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        }),
        yAxis: {
            min: 0,
            title: {
                text: 'Weight (kg)'
            }
        },
        tooltip: {
            headerFormat: '<table><span style="font-size:10px">{point.key}</span>',
            pointFormat: '<tr><td>{series.name}</td><td style="padding:0"><b>{point.y:.1f}kg</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
            name: 'General',
            data: genlist,
            marker: false

        }, {
            name: 'DMR',
            data: dmrlist,
            marker: false

        }, {
            name: 'Food',
            data: foolist,
            marker: false

        }, {
            name: 'Glass',
            data: glslist,
            marker: false

        },{
            type: 'line',
            name: 'General Contract',
            data: gencon,
            color: 'black',
            lineWidth: 1,
            marker: false
        }, {
            type: 'line',
            name: 'DMR Contract',
            data: dmrcon,
            color: 'black',
            lineWidth: 1,
            marker: false
        }, {
            type: 'line',
            name: 'Food Contract',
            data: foocon,
            color: 'black',
            lineWidth: 1,
            marker: false
        }, {
            type: 'line',
            name: 'Glass Contract',
            data: glscon,
            color: 'black',
            lineWidth: 1,
            marker: false
        }
    ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 100
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    })
}


// func to display overall chart
function ovChart(cat, actval,conval,type,chloc,color){
    // create bar chart
    Highcharts.chart(chloc, {
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: type,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 30
            }
        },
        title: {
            text: 'Total Waste Per Stream Against Contract'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            categories: cat,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Weight (kg)'
            }
        },
        tooltip: {
            headerFormat: '<table><span style="font-size:10px">{point.key}</span>',
            pointFormat: '<tr><td style="padding:0"><b>{point.y:.1f}kg</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        colors: Highcharts.map(color, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        }),
        plotOptions: {
            series: {
                pointWidth: 30
            },
            column: {
                depth: 25
            }
        },
        series: [{
            name: 'Actual Weight',
            data: actval,
            colorByPoint: true,
            pointWidth: 24
        }, {
            name: 'Contracted Weight',
            data: conval,
            color: 'rgba(0,0,0,1)',
            pointWidth: 24
            
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    })
}


// Radialize the colors
Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
    return {
        radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
        },
        stops: [
            [0, color],
            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
        ]
    };
});

function displayTable(tabloc) {

    var table = `<table>`;
    table += `
    <thead> 
        <tr>
            <th></th>
            <th>General</th>
            <th>DMR</th>
            <th>Food</th>
            <th>Glass</th>
            <th>Totals</th>
        </tr>
    </thead>
    <tbody>`

    for (i = 0; i < 7; i++) {
        table += "<tr>";

        table += `<td>`;
        // table += `${leftCol[i]}`;
        table += "</td>";

        table += `<td>`;
        // table += `${ovgenlist[i]}`;
        table += "</td>";

        table += `<td>`;
        // table += `${ovdmrlist[i]}`;
        table += "</td>";

        table += `<td>`;
        // table += `${ovfoolist[i]}`;
        table += "</td>";

        table += `<td>`;
        // table += `${ovglslist[i]}`;
        table += "</td>";

        table += "</tr>";
    }
    table += "</tbody></table>";
    $(`#${tabloc}`).html(table);
}

function bydayChart(cat, genlist,dmrlist,foolist,glslist,gencon,dmrcon,foocon,glscon,type,chloc,color){
    // create chart
    Highcharts.chart(chloc, {
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: type,

        },
        title: {
            text: 'Waste Streams By Day '
        },
        legend: {
            enabled: true
        },
        xAxis: {
            categories: cat,
            crosshair: true
        },
        colors: Highcharts.map(color, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        }),
        yAxis: {
            min: 0,
            title: {
                text: 'Weight (kg)'
            }
        },
        tooltip: {
            headerFormat: '<table><span style="font-size:10px">{point.key}</span>',
            pointFormat: '<tr><td>{series.name}</td><td style="padding:0"><b>{point.y:.1f}kg</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
         series: [{
            name: 'General',
            data: genlist,
            marker: false

        }, {
            name: 'DMR',
            data: dmrlist,
            marker: false

        }, {
            name: 'Food',
            data: foolist,
            marker: false

        }, {
            name: 'Glass',
            data: glslist,
            marker: false

        },{
            type:'line',
            name: 'General Contract',
            data: gencon,
            color: 'black',
            lineWidth: 1,
            marker: false
        }, {
            type:'line',
            name: 'DMR Contract',
            data: dmrcon,
            color: 'black',
            lineWidth: 1,
            marker: false

        }, {
            type:'line',
            name: 'Food Contract',
            data: foocon,
            color: 'black',
            lineWidth: 1,
            marker: false

        }, {
            type:'line',        
            name: 'Glass Contract',
            data: glscon,
            color: 'black',
            lineWidth: 1,
            marker: false

        }
    ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    })
}