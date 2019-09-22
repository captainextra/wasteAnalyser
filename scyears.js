var today = new Date();
var cyear = today.getFullYear();
var cmonth = today.getMonth();
var cSCYear = [];
var gensumMonListc = [];
var gensumMonListp = [];
var genjand

var scmonq234 = ['04', '05', '06', '07', '08', '09', '10', '11', '12']
var scmonq1 = ['01', '02', '03']

function currentYear() {
    reset()
    cyearCalc()
    overall(cSCYear)
    document.getElementById(`title`).innerHTML = `Service Charge Year ${cyear}`;
}

function cday() {
    reset()
    cyearCalc()
    daily(cSCYear)
    document.getElementById(`title`).innerHTML = `Service Charge Year ${cyear} by Day`;
}

function cMonth() {
    reset()
    cyearCalc()
    monthly(cSCYear)
    document.getElementById(`title`).innerHTML = `Service Charge Year ${cyear} by Month`;
}

function trackcMonth() {
    pmonthlytracker()
    reset()
    cmonthlytracker()

    $("#month-rows").show();
    $("#containergen").show();


    months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

    let totalgen = gensumMonListp.concat(gensumMonListc)
    let totaldmr = dmrsumMonListp.concat(dmrsumMonListc)
    let totalfoo = foosumMonListp.concat(foosumMonListc)
    let totalgls = glssumMonListp.concat(glssumMonListc)

    let gencont = []
    let dmrcont = []
    let foocont = []
    let glscont = []

    let i = 0;
    while (i < 24) {
        gencont.push((6 * 8 * 60 * 52) / 12);
        dmrcont.push((6 * 3 * 40 * 52) / 12);
        foocont.push((1 * 4 * 100 * 52) / 12);
        glscont.push((1 * 4 * 80 * 52) / 12);

        i++;
    }

    var color = ['rgba(66,135,245,1)','rgba(51, 171, 163,1)','rgba(245, 197, 66,1)','rgba(245, 66, 90,1)']


    document.getElementById('containergen').style.height = '80vh';
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
            text: 'Trend Analysis of the Waste Streams'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            categories: months,
            crosshair: true,
            title: {
                text: '2018 ----> 2019'
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
        series: [
            {
                name: 'General',
                data: totalgen,
                marker: false
            }, {
                name: 'DMR',
                data: totaldmr,
                marker: false
            }, {
                name: 'Food',
                data: totalfoo,
                marker: false
            }, {
                name: 'Glass',
                data: totalgls,
                marker: false
            },
            {
                type: 'line',
                name: 'General Contract',
                data: gencont,
                color: 'rgba(0,0,0,0.5)',
                lineWidth: 1,
                marker: false
            },
            {
                type: 'line',
                name: 'DRM Contract',
                data: dmrcont,
                color: 'rgba(0,0,0,0.5)',
                lineWidth: 1,
                marker: false
            },
            {
                type: 'line',
                name: 'Food Contract',
                data: foocont,
                color: 'rgba(0,0,0,0.5)',
                lineWidth: 1,
                marker: false
            },
            {
                type: 'line',
                name: 'Glass Contract',
                data: glscont,
                color: 'rgba(0,0,0,0.5)',
                lineWidth: 1,
                marker: false
            }
        ]
    })
}

function previousYear() {
    reset()
    newArray()
    for (var i = 0; i < mainlist.length; i++) {
        if (((parseFloat(mainlist[i][0][0].slice(6)) === cyear) && (scmonq1.includes(mainlist[i][0][0].slice(3, 5)))) || ((parseFloat(mainlist[i][0][0].slice(6)) === (cyear - 1))) && (scmonq234.includes(mainlist[i][0][0].slice(3, 5)))) {
            cSCYear.push(mainlist[i])
        }
    }
    overall(cSCYear)
    document.getElementById(`title`).innerHTML = `Service Charge Year ${cyear - 1}`;
}

function pday() {
    reset()
    newArray()
    for (var i = 0; i < mainlist.length; i++) {
        if (((parseFloat(mainlist[i][0][0].slice(6)) === cyear) && (scmonq1.includes(mainlist[i][0][0].slice(3, 5)))) || ((parseFloat(mainlist[i][0][0].slice(6)) === (cyear - 1))) && (scmonq234.includes(mainlist[i][0][0].slice(3, 5)))) {
            cSCYear.push(mainlist[i])
        }
    }
    daily(cSCYear)
    document.getElementById(`title`).innerHTML = `Service Charge Year ${cyear - 1} by Day`;
}

function pmonth() {
    reset()
    newArray()
    for (var i = 0; i < mainlist.length; i++) {
        if (((parseFloat(mainlist[i][0][0].slice(6)) === cyear) && (scmonq1.includes(mainlist[i][0][0].slice(3, 5)))) || ((parseFloat(mainlist[i][0][0].slice(6)) === (cyear - 1))) && (scmonq234.includes(mainlist[i][0][0].slice(3, 5)))) {
            cSCYear.push(mainlist[i])
        }
    }
    monthly(cSCYear)
    document.getElementById(`title`).innerHTML = `Service Charge Year ${cyear - 1} by Month`;
}

// Funcs to display SC monthly charts - c and p prefix to denote current/previous
function caprChart() {
    reset()

    // func to calc current year data
    cyearCalc()
    // func to calc monthly values from the current year data
    monList(cSCYear)
    // display chart
    monthChart('April', 'apr', cyear)
}

function cmayChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('May', 'may', cyear)
}

function cjunChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('June', 'jun', cyear)
}

function cjulChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('July', 'jul', cyear)
}

function caugChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('August', 'aug', cyear)
}

function csepChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('September', 'sep', cyear)
}

function coctChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('October', 'oct', cyear)
}

function cnovChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('November', 'nov', cyear)
}

function cdecChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('December', 'dec', cyear)
}

function cjanChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('January', 'jan', year = cyear + 1)
}

function cfebChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('February', 'feb', year = cyear + 1)
}

function cmarChart() {
    reset()
    cyearCalc()
    monList(cSCYear)
    monthChart('March', 'mar', year = cyear + 1)
}

function paprChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('April', 'apr', year = cyear - 1)
}

function pmayChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('May', 'may', year = cyear - 1)
}

function pjunChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('June', 'jun', year = cyear - 1)
}

function pjulChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('July', 'jul', year = cyear - 1)
}

function paugChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('August', 'aug', year = cyear - 1)
}

function psepChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('September', 'sep', year = cyear - 1)
}

function poctChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('October', 'oct', year = cyear - 1)
}

function pnovChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('November', 'nov', year = cyear - 1)
}

function pdecChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('December', 'dec', year = cyear - 1)
}

function pjanChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('January', 'jan', year = cyear)
}

function pfebChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('February', 'feb', year = cyear)
}

function pmarChart() {
    reset()
    pyearCalc()
    monList(cSCYear)
    monthChart('March', 'mar', year = cyear)
}

// func to display monthly table data
function monthChart(month, mon, year) {
    let gen = eval(`gen${mon}`)
    let gend = eval(`gen${mon}d`)
    let dmr = eval(`dmr${mon}`)
    let dmrd = eval(`dmr${mon}d`)
    let foo = eval(`foo${mon}`)
    let food = eval(`foo${mon}d`)
    let gls = eval(`gls${mon}`)
    let glsd = eval(`gls${mon}d`)

    $("#containergen").show();
    $("#containerdmr").show();
    $("#containerfoo").show();
    $("#containergls").show();
    $("#month-rows").show();

    document.getElementById(`title`).innerHTML = `Waste Data ${month} ${year}`;

    buildChart(gend, gen, 'Weight (t)', `General Waste`, 'line', 'containergen','rgba(66,135,245,1)')
    buildChart(dmrd, dmr, 'Weight (t)', `DMR Waste`, 'line', 'containerdmr','rgba(51, 171, 163,1)')
    buildChart(food, foo, 'Weight (t)', `Food Waste`, 'line', 'containerfoo','rgba(245, 197, 66,1)')
    buildChart(glsd, gls, 'Weight (t)', `Glass Waste`, 'line', 'containergls','rgba(245, 66, 90,1)')
}

function monthlyc(mainlist) {

    $("#table-streams").show();
    $("#gen-tab").show();
    $("#dmr-tab").show();
    $("#foo-tab").show();
    $("#gls-tab").show();
    $("#containergen").show();


    document.getElementById(`title`).innerHTML = 'To Date Waste Data by Month';

    monList(mainlist);

    let abbmon = ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar', 'tot']
    let months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'Total'];


    // GENERAL WASTE
    let gensumMonList = [Math.round(genaprsum * 1000), Math.round(genmaysum * 1000), Math.round(genjunsum * 1000), Math.round(genjulsum * 1000), Math.round(genaugsum * 1000), Math.round(gensepsum * 1000), Math.round(genoctsum * 1000), Math.round(gennovsum * 1000), Math.round(gendecsum * 1000), Math.round(genjansum * 1000), Math.round(genfebsum * 1000), Math.round(genmarsum * 1000)]

    let gensumTot = gensumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    gensumMonList.push(Math.round(gensumTot * 10) / 10)


    let genmonQlist = [genaprbinSum, genmaybinSum, genjunbinSum, genjulbinSum, genaugbinSum, gensepbinSum, genoctbinSum, gennovbinSum, gendecbinSum, genjanbinSum, genfebbinSum, genmarbinSum]

    let gensumTotQ = genmonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    genmonQlist.push(gensumTotQ)

    let genavelist = [Math.round((genaprsum * 1000 / genaprbinSum) * 10) / 10, Math.round((genmaysum * 1000 / genmaybinSum) * 10) / 10, Math.round((genjunsum * 1000 / genjunbinSum) * 10) / 10, Math.round((genjulsum * 1000 / genjulbinSum) * 10) / 10, Math.round((genaugsum * 1000 / genaugbinSum) * 10) / 10, Math.round((gensepsum * 1000 / gensepbinSum) * 10) / 10, Math.round((genoctsum * 1000 / genoctbinSum) * 10) / 10, Math.round((gennovsum * 1000 / gennovbinSum) * 10) / 10, Math.round((gendecsum * 1000 / gendecbinSum) * 10) / 10, Math.round((sumTot / gensumTotQ) * 10) / 10, Math.round((genjansum * 1000 / genjanbinSum) * 10) / 10, Math.round((genfebsum * 1000 / genfebbinSum) * 10) / 10, Math.round((genmarsum * 1000 / genmarbinSum) * 10) / 10]



    // DMR WASTE
    let dmrsumMonList = [Math.round(dmraprsum * 1000), Math.round(dmrmaysum * 1000), Math.round(dmrjunsum * 1000), Math.round(dmrjulsum * 1000), Math.round(dmraugsum * 1000), Math.round(dmrsepsum * 1000), Math.round(dmroctsum * 1000), Math.round(dmrnovsum * 1000), Math.round(dmrdecsum * 1000), Math.round(dmrjansum * 1000), Math.round(dmrfebsum * 1000), Math.round(dmrmarsum * 1000)]

    let dmrsumTot = dmrsumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    dmrsumMonList.push(Math.round(dmrsumTot * 10) / 10)


    let dmrmonQlist = [dmraprbinSum, dmrmaybinSum, dmrjunbinSum, dmrjulbinSum, dmraugbinSum, dmrsepbinSum, dmroctbinSum, dmrnovbinSum, dmrdecbinSum, dmrjanbinSum, dmrfebbinSum, dmrmarbinSum]

    let dmrsumTotQ = dmrmonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    dmrmonQlist.push(dmrsumTotQ)

    let dmravelist = [Math.round((dmraprsum * 1000 / dmraprbinSum) * 10) / 10, Math.round((dmrmaysum * 1000 / dmrmaybinSum) * 10) / 10, Math.round((dmrjunsum * 1000 / dmrjunbinSum) * 10) / 10, Math.round((dmrjulsum * 1000 / dmrjulbinSum) * 10) / 10, Math.round((dmraugsum * 1000 / dmraugbinSum) * 10) / 10, Math.round((dmrsepsum * 1000 / dmrsepbinSum) * 10) / 10, Math.round((dmroctsum * 1000 / dmroctbinSum) * 10) / 10, Math.round((dmrnovsum * 1000 / dmrnovbinSum) * 10) / 10, Math.round((dmrdecsum * 1000 / dmrdecbinSum) * 10) / 10, Math.round((dmrsumTot / dmrsumTotQ) * 10) / 10, Math.round((dmrjansum * 1000 / dmrjanbinSum) * 10) / 10, Math.round((dmrfebsum * 1000 / dmrfebbinSum) * 10) / 10, Math.round((dmrmarsum * 1000 / dmrmarbinSum) * 10) / 10]


    // FOOD WASTE
    let foosumMonList = [Math.round(fooaprsum * 1000), Math.round(foomaysum * 1000), Math.round(foojunsum * 1000), Math.round(foojulsum * 1000), Math.round(fooaugsum * 1000), Math.round(foosepsum * 1000), Math.round(foooctsum * 1000), Math.round(foonovsum * 1000), Math.round(foodecsum * 1000), Math.round(foojansum * 1000), Math.round(foofebsum * 1000), Math.round(foomarsum * 1000)]

    let foosumTot = foosumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    foosumMonList.push(Math.round(foosumTot * 10) / 10)


    let foomonQlist = [fooaprbinSum, foomaybinSum, foojunbinSum, foojulbinSum, fooaugbinSum, foosepbinSum, foooctbinSum, foonovbinSum, foodecbinSum, foojanbinSum, foofebbinSum, foomarbinSum]

    let foosumTotQ = foomonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    foomonQlist.push(foosumTotQ)

    let fooavelist = [Math.round((fooaprsum * 1000 / fooaprbinSum) * 10) / 10, Math.round((foomaysum * 1000 / foomaybinSum) * 10) / 10, Math.round((foojunsum * 1000 / foojunbinSum) * 10) / 10, Math.round((foojulsum * 1000 / foojulbinSum) * 10) / 10, Math.round((fooaugsum * 1000 / fooaugbinSum) * 10) / 10, Math.round((foosepsum * 1000 / foosepbinSum) * 10) / 10, Math.round((foooctsum * 1000 / foooctbinSum) * 10) / 10, Math.round((foonovsum * 1000 / foonovbinSum) * 10) / 10, Math.round((foodecsum * 1000 / foodecbinSum) * 10) / 10, Math.round((foosumTot / foosumTotQ) * 10) / 10, Math.round((foojansum * 1000 / foojanbinSum) * 10) / 10, Math.round((foofebsum * 1000 / foofebbinSum) * 10) / 10, Math.round((foomarsum * 1000 / foomarbinSum) * 10) / 10]



    // GLASS WASTE
    let glssumMonList = [Math.round(glsaprsum * 1000), Math.round(glsmaysum * 1000), Math.round(glsjunsum * 1000), Math.round(glsjulsum * 1000), Math.round(glsaugsum * 1000), Math.round(glssepsum * 1000), Math.round(glsoctsum * 1000), Math.round(glsnovsum * 1000), Math.round(glsdecsum * 1000), Math.round(glsjansum * 1000), Math.round(glsfebsum * 1000), Math.round(glsmarsum * 1000)]

    let glssumTot = glssumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    glssumMonList.push(Math.round(glssumTot * 10) / 10)


    let glsmonQlist = [glsaprbinSum, glsmaybinSum, glsjunbinSum, glsjulbinSum, glsaugbinSum, glssepbinSum, glsoctbinSum, glsnovbinSum, glsdecbinSum, glsjanbinSum, glsfebbinSum, glsmarbinSum]

    let glssumTotQ = glsmonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    glsmonQlist.push(glssumTotQ)

    let glsavelist = [Math.round((glsaprsum * 1000 / glsaprbinSum) * 10) / 10, Math.round((glsmaysum * 1000 / glsmaybinSum) * 10) / 10, Math.round((glsjunsum * 1000 / glsjunbinSum) * 10) / 10, Math.round((glsjulsum * 1000 / glsjulbinSum) * 10) / 10, Math.round((glsaugsum * 1000 / glsaugbinSum) * 10) / 10, Math.round((glssepsum * 1000 / glssepbinSum) * 10) / 10, Math.round((glsoctsum * 1000 / glsoctbinSum) * 10) / 10, Math.round((glsnovsum * 1000 / glsnovbinSum) * 10) / 10, Math.round((glsdecsum * 1000 / glsdecbinSum) * 10) / 10, Math.round((glssumTot / glssumTotQ) * 10) / 10, Math.round((glsjansum * 1000 / glsjanbinSum) * 10) / 10, Math.round((glsfebsum * 1000 / glsfebbinSum) * 10) / 10, Math.round((glsmarsum * 1000 / glsmarbinSum) * 10) / 10]


    displayDailyTable('GENERAL', 'tab-side', months, genmonQlist, gensumMonList, genavelist, 'gen-tab', abbmon)

    displayDailyTable('DMR', 'tab-side', months, dmrmonQlist, dmrsumMonList, dmravelist, 'dmr-tab', abbmon)

    displayDailyTable('FOOD', 'tab-side', months, foomonQlist, foosumMonList, fooavelist, 'foo-tab', abbmon)

    displayDailyTable('GLASS', 'tab-side', months, glsmonQlist, glssumMonList, glsavelist, 'gls-tab', abbmon)


    months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

    gensumMonList.pop(sumTot)
    dmrsumMonList.pop(dmrsumTot)
    foosumMonList.pop(foosumTot)
    glssumMonList.pop(glssumTot)

}

function cmonthlytracker() {

    cyearCalc()

    monList(cSCYear);

    // GENERAL WASTE
    gensumMonListc = [Math.round(genaprsum * 1000), Math.round(genmaysum * 1000), Math.round(genjunsum * 1000), Math.round(genjulsum * 1000), Math.round(genaugsum * 1000), Math.round(gensepsum * 1000), Math.round(genoctsum * 1000), Math.round(gennovsum * 1000), Math.round(gendecsum * 1000), Math.round(genjansum * 1000), Math.round(genfebsum * 1000), Math.round(genmarsum * 1000)]

    // DMR WASTE
    dmrsumMonListc = [Math.round(dmraprsum * 1000), Math.round(dmrmaysum * 1000), Math.round(dmrjunsum * 1000), Math.round(dmrjulsum * 1000), Math.round(dmraugsum * 1000), Math.round(dmrsepsum * 1000), Math.round(dmroctsum * 1000), Math.round(dmrnovsum * 1000), Math.round(dmrdecsum * 1000), Math.round(dmrjansum * 1000), Math.round(dmrfebsum * 1000), Math.round(dmrmarsum * 1000)]

    // FOOD WASTE
    foosumMonListc = [Math.round(fooaprsum * 1000), Math.round(foomaysum * 1000), Math.round(foojunsum * 1000), Math.round(foojulsum * 1000), Math.round(fooaugsum * 1000), Math.round(foosepsum * 1000), Math.round(foooctsum * 1000), Math.round(foonovsum * 1000), Math.round(foodecsum * 1000), Math.round(foojansum * 1000), Math.round(foofebsum * 1000), Math.round(foomarsum * 1000)]


    // GLASS WASTE
    glssumMonListc = [Math.round(glsaprsum * 1000), Math.round(glsmaysum * 1000), Math.round(glsjunsum * 1000), Math.round(glsjulsum * 1000), Math.round(glsaugsum * 1000), Math.round(glssepsum * 1000), Math.round(glsoctsum * 1000), Math.round(glsnovsum * 1000), Math.round(glsdecsum * 1000), Math.round(glsjansum * 1000), Math.round(glsfebsum * 1000), Math.round(glsmarsum * 1000)]


}

function pmonthlytracker() {

    pyearCalc()

    monList(cSCYear);

    // GENERAL WASTE
    gensumMonListp = [Math.round(genaprsum * 1000), Math.round(genmaysum * 1000), Math.round(genjunsum * 1000), Math.round(genjulsum * 1000), Math.round(genaugsum * 1000), Math.round(gensepsum * 1000), Math.round(genoctsum * 1000), Math.round(gennovsum * 1000), Math.round(gendecsum * 1000), Math.round(genjansum * 1000), Math.round(genfebsum * 1000), Math.round(genmarsum * 1000)]
    // DMR WASTE
    dmrsumMonListp = [Math.round(dmraprsum * 1000), Math.round(dmrmaysum * 1000), Math.round(dmrjunsum * 1000), Math.round(dmrjulsum * 1000), Math.round(dmraugsum * 1000), Math.round(dmrsepsum * 1000), Math.round(dmroctsum * 1000), Math.round(dmrnovsum * 1000), Math.round(dmrdecsum * 1000), Math.round(dmrjansum * 1000), Math.round(dmrfebsum * 1000), Math.round(dmrmarsum * 1000)]

    // FOOD WASTE
    foosumMonListp = [Math.round(fooaprsum * 1000), Math.round(foomaysum * 1000), Math.round(foojunsum * 1000), Math.round(foojulsum * 1000), Math.round(fooaugsum * 1000), Math.round(foosepsum * 1000), Math.round(foooctsum * 1000), Math.round(foonovsum * 1000), Math.round(foodecsum * 1000), Math.round(foojansum * 1000), Math.round(foofebsum * 1000), Math.round(foomarsum * 1000)]


    // GLASS WASTE
    glssumMonListp = [Math.round(glsaprsum * 1000), Math.round(glsmaysum * 1000), Math.round(glsjunsum * 1000), Math.round(glsjulsum * 1000), Math.round(glsaugsum * 1000), Math.round(glssepsum * 1000), Math.round(glsoctsum * 1000), Math.round(glsnovsum * 1000), Math.round(glsdecsum * 1000), Math.round(glsjansum * 1000), Math.round(glsfebsum * 1000), Math.round(glsmarsum * 1000)]

}

// func to filter mainlist and return current year data
function cyearCalc() {
    newArray()
    cSCYear.length = 0;
    for (var i = 0; i < mainlist.length; i++) {
        if (((parseFloat(mainlist[i][0][0].slice(6)) === cyear + 1) && (scmonq1.includes(mainlist[i][0][0].slice(3, 5)))) || ((parseFloat(mainlist[i][0][0].slice(6)) === (cyear))) && (scmonq234.includes(mainlist[i][0][0].slice(3, 5)))) {
            cSCYear.push(mainlist[i])
        }
    }
    return cSCYear
}

// func to filter mainlist and return previous year data
function pyearCalc() {
    newArray()
    cSCYear.length = 0;
    for (var i = 0; i < mainlist.length; i++) {
        if (((parseFloat(mainlist[i][0][0].slice(6)) === cyear) && (scmonq1.includes(mainlist[i][0][0].slice(3, 5)))) || ((parseFloat(mainlist[i][0][0].slice(6)) === (cyear - 1))) && (scmonq234.includes(mainlist[i][0][0].slice(3, 5)))) {
            cSCYear.push(mainlist[i])
        }

    }

}

