let ovgenlist = [];
let ovdmrlist = [];
let ovfoolist = [];
let ovglslist = [];


function compare() {
    reset()
    // cyearCalc()
    document.getElementById(`title`).innerHTML = `SC${cyear - 1} through to SC${cyear}`;
    trackcMonth(cSCYear)
}


// function to show overall waste data
function coverall(mainlist) {

    $("#table-overall").show();

    // toggle tables, title and overall table 

    document.getElementById(`title`).innerHTML = 'To Date Waste Data';

    // parse array and populate lists for each stream
    for (var i = 0; i < mainlist.length; i++) {
        if (mainlist[i][0][1] === 'General Waste') {
            genbintot += parseFloat(mainlist[i][0][2])
            gentontot += parseFloat(mainlist[i][0][3])
        } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
            dmrbintot += parseFloat(mainlist[i][0][2])
            dmrtontot += parseFloat(mainlist[i][0][3])
        } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
            foobintot += parseFloat(mainlist[i][0][2])
            footontot += parseFloat(mainlist[i][0][3])
        } else if (mainlist[i][0][1] === 'Glass') {
            glsbintot += parseFloat(mainlist[i][0][2])
            glstontot += parseFloat(mainlist[i][0][3])
        }
    }

    // sum the lists into variables
    let genconttotal = (genbintot * 60) / 1000
    let dmrcontotal = (dmrbintot * 40) / 1000
    let foocontotal = (foobintot * 100) / 1000
    let glscontotal = (glsbintot * 60) / 1000;


    leftCol = ['Total Bins', 'Total Weight (t)', 'Total Contract Weight (t)', 'Difference (t)', 'Ave Weight per Bin (kg)', 'Contract Weight per Bin (kg)', 'Weight Difference per Bin (kg)']

    ovgenlist = [genbintot, Math.round(gentontot * 10) / 10, Math.round(genconttotal * 10) / 10, Math.round((gentontot - genconttotal) * 10) / 10, Math.round((gentontot * 1000 / genbintot) * 10) / 10, 60, Math.round(((gentontot * 1000 / genbintot) - 60) * 10) / 10]

    ovdmrlist = [dmrbintot, Math.round(dmrtontot * 10) / 10, Math.round(dmrcontotal * 10) / 10, Math.round((dmrtontot - dmrcontotal) * 10) / 10, Math.round((dmrtontot * 1000 / dmrbintot) * 10) / 10, 60, Math.round(((dmrtontot * 1000 / dmrbintot) - 60) * 10) / 10]

    ovfoolist = [foobintot, Math.round(footontot * 10) / 10, Math.round(foocontotal * 10) / 10, Math.round((footontot - foocontotal) * 10) / 10, Math.round((footontot * 1000 / foobintot) * 10) / 10, 60, Math.round(((footontot * 1000 / foobintot) - 60) * 10) / 10]

    ovglslist = [glsbintot, Math.round(glstontot * 10) / 10, Math.round(glscontotal * 10) / 10, Math.round((glstontot - glscontotal) * 10) / 10, Math.round((glstontot * 1000 / glsbintot) * 10) / 10, 60, Math.round(((glstontot * 1000 / glsbintot) - 60) * 10) / 10]


    $('#normal-row').show();
    $('#containerb').show();
    $('#container').show();

    return ovgenlist


}


function compMonth() {
    reset()
    pmonthlytracker()
    reset()
    cmonthlytracker()

    $("#month-rows").show();
    $("#containergen").show();
    $("#table-streams").show();
    $("#gen-tab").show();
    $("#dmr-tab").show();
    $("#foo-tab").show();
    $("#gls-tab").show();

    months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'Total']
    var color = ['rgba(66,135,245,1)','rgba(51, 171, 163,1)','rgba(245, 197, 66,1)','rgba(245, 66, 90,1)']

    // create area chart
    Highcharts.chart('containergen', {
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: 'area'
        },
        title: {
            text: '2019 Compared Against 2018'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            categories: months,
            crosshair: true,
            title: {
                text: ''
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Weight (kg)'
            }
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
        series: [{
            type: 'area',
            name: 'General 19',
            data: gensumMonListc,
            marker: false
        }, {
            type: 'area',
            name: 'DMR 19',
            data: dmrsumMonListc,
            marker: false
        }, {
            type: 'area',
            name: 'Food 19',
            data: foosumMonListc,
            marker: false
        }, {
            type: 'area',
            name: 'Glass 19',
            data: glssumMonListc,
            marker: false

        }, {
            type: 'line',
            name: 'General 18',
            data: gensumMonListp,
            marker: false,
            color: 'rgb(0,0,0)',
            lineWidth: 1,
            marker: false
        }, {
            type: 'line',
            name: 'DMR 18',
            data: dmrsumMonListp,
            color: 'rgb(0,0,0)',
            lineWidth: 1,
            marker: false
        }, {
            type: 'line',
            name: 'Food 18',
            data: foosumMonListp,
            color: 'rgb(0,0,0)',
            lineWidth: 1,
            marker: false
        }, {
            type: 'line',
            name: 'Glass 18',
            data: glssumMonListp,
            color: 'rgb(0,0,0)',
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

    var difgenlist = []
    var difdmrlist = []
    var diffoolist = []
    var difglslist = []

    for (var i = 0; i < gensumMonListc.length; i++) {
        difgenlist.push(gensumMonListc[i] - gensumMonListp[i]);
        difdmrlist.push(dmrsumMonListc[i] - dmrsumMonListp[i]);
        diffoolist.push(foosumMonListc[i] - foosumMonListp[i]);
        difglslist.push(glssumMonListc[i] - glssumMonListp[i]);
    }

    let difgenlisttot = difgenlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let difdmrlisttot = difdmrlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let diffoolisttot = diffoolist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let difglslisttot = difglslist.reduce((a, b) => parseFloat(a) + parseFloat(b));

    difgenlist.push(difgenlisttot);
    difdmrlist.push(difdmrlisttot);
    diffoolist.push(diffoolisttot);
    difglslist.push(difglslisttot);

    let gensumTotc = gensumMonListc.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let dmrsumTotc = dmrsumMonListc.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let foosumTotc = foosumMonListc.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let glssumTotc = glssumMonListc.reduce((a, b) => parseFloat(a) + parseFloat(b));

    let gensumTotp = gensumMonListp.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let dmrsumTotp = dmrsumMonListp.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let foosumTotp = foosumMonListp.reduce((a, b) => parseFloat(a) + parseFloat(b));
    let glssumTotp = glssumMonListp.reduce((a, b) => parseFloat(a) + parseFloat(b));

    gensumMonListc.push(gensumTotc)
    dmrsumMonListc.push(dmrsumTotc)
    foosumMonListc.push(foosumTotc)
    glssumMonListc.push(glssumTotc)

    gensumMonListp.push(gensumTotp)
    dmrsumMonListp.push(dmrsumTotp)
    foosumMonListp.push(foosumTotp)
    glssumMonListp.push(glssumTotp)

    displayMonthTable('GENERAL', months, gensumMonListc, gensumMonListp, difgenlist, 'gen-tab')

    displayMonthTable('DMR', months, dmrsumMonListc, dmrsumMonListp, difdmrlist, 'dmr-tab')

    displayMonthTable('FOOD', months, foosumMonListc, foosumMonListp, diffoolist, 'foo-tab')

    displayMonthTable('GLASS', months, glssumMonListc, glssumMonListp, difglslist, 'gls-tab')

}


function alldays() {
reset()
newArray()
    // $("#table-overall").show();


    let genbintot = 0;
    let gentontot = [];
    let dmrbintot = 0;
    let dmrtontot = [];
    let foobintot = 0;
    let footontot = [];
    let glsbintot = 0;
    let glstontot = [];
    let datesg = [];
    let datesd = [];
    let datesf = [];
    let datesgl = [];
    let year = 0;
    let month = 0;
    let day = 0;
    let collections = [];


    // toggle tables, title and overall table 

    document.getElementById(`title`).innerHTML = 'To Date Waste Data';

    // parse array and populate lists for each stream
    for (var i = 0; i < mainlist.length; i++) {
        if (mainlist[i][0][1] === 'General Waste') {
            genbintot += parseFloat(mainlist[i][0][2])
            gentontot.push(parseFloat(mainlist[i][0][3]))
            year = parseFloat(mainlist[i][0][0].slice(6))
            month = parseFloat(mainlist[i][0][0].slice(3,5))
            day = parseFloat(mainlist[i][0][0].slice(0,2))

            datesg.push([Date.UTC(year, (month-1), day), parseFloat(mainlist[i][0][3])])

            collections.push(parseFloat(mainlist[i][0][3]))
        } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
            dmrbintot += parseFloat(mainlist[i][0][2])
            dmrtontot.push(parseFloat(mainlist[i][0][3]))

            year = parseFloat(mainlist[i][0][0].slice(6))
            month = parseFloat(mainlist[i][0][0].slice(3,5))
            day = parseFloat(mainlist[i][0][0].slice(0,2))

            datesd.push([Date.UTC(year, (month-1), day), parseFloat(mainlist[i][0][3])])

            // datesd.push(mainlist[i][0][0])
            collections.push(parseFloat(mainlist[i][0][3]))

        } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
            foobintot += parseFloat(mainlist[i][0][2])
            footontot.push(parseFloat(mainlist[i][0][3]))

            year = parseFloat(mainlist[i][0][0].slice(6))
            month = parseFloat(mainlist[i][0][0].slice(3,5))
            day = parseFloat(mainlist[i][0][0].slice(0,2))

            datesf.push([Date.UTC(year, (month-1), day), parseFloat(mainlist[i][0][3])])

        } else if (mainlist[i][0][1] === 'Glass') {
            glsbintot += parseFloat(mainlist[i][0][2])
            glstontot.push(parseFloat(mainlist[i][0][3]))

            year = parseFloat(mainlist[i][0][0].slice(6))
            month = parseFloat(mainlist[i][0][0].slice(3,5))
            day = parseFloat(mainlist[i][0][0].slice(0,2))

            datesgl.push([Date.UTC(year, (month-1), day), parseFloat(mainlist[i][0][3])])
        }
    }
 
    $('#month-rows').show();
    $('#containergen').show();

    var color = ['rgba(66,135,245,1)','rgba(51, 171, 163,1)','rgba(245, 197, 66,1)','rgba(245, 66, 90,1)']

    document.getElementById('containergen').style.height = '80vh';
    // create area chart
    Highcharts.chart('containergen', {
        time: {
            useUTC:true
        },
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: 'area',
            zoomType: 'x'
        },
        title: {
            text: 'All Waste Data Over Time'
        },
        legend: {
            enabled: true
        },
        xAxis: datesg,
        xAxis: { 
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Weight (t)'
            }
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
        series: [
            {
                // type: 'area',
                name: 'General',
                data: datesg,
                marker: false
            },
            
            {
                // type: 'area',
                name: 'DMR',
                data: datesd,
                marker: false
            }, 
            {
                // type: 'area',
                name: 'Food',
                data: datesf,
                marker: false,
            },
            {
                // type: 'area',
                name: 'Glass',
                data: datesgl,
                marker: false
            }
        ]
    })
}
