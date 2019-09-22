// Use Papaparse to parse through the supplied csv report
$(document).ready(function () {

    let dateList = [];
    let wasteStream = [];
    let binQuantity = [];
    // let dayList = [];
    let tonnage = [];
    let newFullList = [];


    $('#submit-file').on("click", function (e) {
        e.preventDefault();
        $('#files').parse({
            config: {
                delimiter: "auto",
                complete: displayHTMLTable
            },
            before: function (file, inputElem) {
                console.log("Parsing file...", file);
            },
            error: function (err, file) {
                //console.log("ERROR:", err, file);
            },
            complete: function () {
                console.log("Done with all files");
            }
        });
    });

    var data;
    var dateStr;

    function displayHTMLTable(results) {
        var table = "<table class='table'>";
        data = results.data;
        var dayList = [];

        for (i = 1; i < data.length - 1; i++) {
            table += "<tr>";
            var row = data[i];
            var cells = row.join(",").split(",");
            dateStr = data[i][0].slice(0, 10);

            dateStr = dateStr.slice(3, 5) + '/' + dateStr.slice(0, 2) + '/' + dateStr.slice(6, 10);
            dateStr = new Date(dateStr);
            var day = dateStr.toLocaleDateString('en-GB', {
                weekday: 'long'
            });
            dayList.push(day);

            for (j = 0; j < cells.length; j++) {
                table += "<td>";
                table += cells[j];
                table += "</th>";
            }
            table += "</tr>";
        }
        table += "</table>";
        $("#parsed_csv_list").html(table);

        let fullList = [];
        for (i = 1; i < data.length - 1; i++) {
            fullList.push(data[i][0] + `,${dayList[i - 1]}`)
        }

        for (i = 0; i < fullList.length; i++) {
            newFullList.push(fullList[i].split(','))
        }
        for (i = 0; i < newFullList.length; i++) {

            dateList.push(newFullList[i][0]);
            wasteStream.push(newFullList[i][1]);
            binQuantity.push(parseFloat(newFullList[i][2]));
            tonnage.push(parseFloat(newFullList[i][3]));
        }
        localStorage.newFullListLS = newFullList;

        return dateList, wasteStream, binQuantity, dayList, tonnage, newFullList;
    }
});

// Navigation from index to detail html
function newPage() {
    window.location.href = "./detail.html";
}

// Loads with body to open overall page to date
function first() {
    reset()
    newArray()
    overall(mainlist)
}

// function to show overall waste data
function overall(mainlist) {

    $("#table-overall").show();
    $('#normal-row').show();
    $('#containerb').show();
    $('#container').show();
    $("#overall-table").show();

    // toggle tables, title and overall table 
    document.getElementById(`title`).innerHTML = 'Overall Waste Data';
    let genbintot = 0;
    let gentontot = 0;
    let dmrbintot = 0;
    let dmrtontot = 0;
    let foobintot = 0;
    let footontot = 0;
    let glsbintot = 0;
    let glstontot = 0;

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

    let ovtotbins = genbintot + dmrbintot + foobintot + glsbintot;
    let ovtotton = Math.round((gentontot + dmrtontot + footontot + glstontot) * 10) / 10;
    let ovconttot = Math.round((genconttotal + dmrcontotal + foocontotal + glscontotal) * 10) / 10;

    leftCol = ['Total Bins', 'Total Weight (t)', 'Total Contract Weight (t)', 'Difference (t)', 'Ave Weight per Bin (kg)', 'Contract Weight per Bin (kg)', 'Weight Difference per Bin (kg)']


    // Create lists for streams  showing bin quantities
    let ovgenlist = [genbintot, Math.round(gentontot * 10) / 10, Math.round(genconttotal * 10) / 10, Math.round((gentontot - genconttotal) * 10) / 10, Math.round((gentontot * 1000 / genbintot) * 10) / 10, 60, Math.round(((gentontot * 1000 / genbintot) - 60) * 10) / 10]

    let ovdmrlist = [dmrbintot, Math.round(dmrtontot * 10) / 10, Math.round(dmrcontotal * 10) / 10, Math.round((dmrtontot - dmrcontotal) * 10) / 10, Math.round((dmrtontot * 1000 / dmrbintot) * 10) / 10, 40, Math.round(((dmrtontot * 1000 / dmrbintot) - 40) * 10) / 10]

    let ovfoolist = [foobintot, Math.round(footontot * 10) / 10, Math.round(foocontotal * 10) / 10, Math.round((footontot - foocontotal) * 10) / 10, Math.round((footontot * 1000 / foobintot) * 10) / 10, 100, Math.round(((footontot * 1000 / foobintot) - 100) * 10) / 10]

    let ovglslist = [glsbintot, Math.round(glstontot * 10) / 10, Math.round(glscontotal * 10) / 10, Math.round((glstontot - glscontotal) * 10) / 10, Math.round((glstontot * 1000 / glsbintot) * 10) / 10, 60, Math.round(((glstontot * 1000 / glsbintot) - 60) * 10) / 10]

    let ovtotlist = [ovtotbins, ovtotton, ovconttot, '', '', '', '']


    let labels = ['General', 'DMR', 'Food', 'Glass']
    let actval = [
        Math.round(gentontot * 10) / 10,
        Math.round(dmrtontot * 10) / 10,
        Math.round(footontot * 10) / 10,
        Math.round(glstontot * 10) / 10
    ]

    let conval = [
        Math.round(genconttotal * 10) / 10,
        Math.round(dmrcontotal * 10) / 10,
        Math.round(foocontotal * 10) / 10,
        Math.round(glscontotal * 10) / 10
    ]

    let genmax = (gentontot * 1.0);
    let dmrmax = (dmrtontot * 1.5);
    let foomax = (footontot * 3);
    let glsmax = (glstontot * 8);

    // Create gauges at top of screen to show waste against contract
    gauges('gengauge', genconttotal, genmax, gentontot, 'General', 'gen', 'rgba(66,135,245,1)')
    gauges('dmrgauge', dmrcontotal, dmrmax, dmrtontot, 'DMR', 'dmr', 'rgba(51, 171, 163,1)')
    gauges('foogauge', foocontotal, foomax, footontot, 'Food', 'foo', 'rgba(245, 197, 66,1)')
    gauges('glsgauge', glscontotal, glsmax, glstontot, 'Glass', 'gls', 'rgba(245, 66, 90,1)')
    var color = ['rgba(66,135,245,0.5)', 'rgba(51, 171, 163,0.5)', 'rgba(245, 197, 66,0.5)', 'rgba(245, 66, 90,0.5)']

    ovChart(labels, actval, conval, 'column', 'containerb', color)

    // Create rows for the Datatable 
    let data = []
    for (var i = 0; i < leftCol.length; i++) {
        window[`row[${i}]`] = [leftCol[i], ovgenlist[i], ovdmrlist[i], ovfoolist[i], ovglslist[i], ovtotlist[i]]
        data.push(window[`row[${i}]`])
    }

    // Create table frame for the Datatable
    displayTable('overall-table')

    // Create Datatable object with options
    $('table').DataTable({
        data: data,
        'order': [],
        'bFilter': false,
        "lengthChange": false,
        "bPaginate": false,
        "bInfo": false,
        destroy: true
    });


    // Build the pie chart showing streams proportions
    Highcharts.chart('container', {
        credits: {
            text: '',
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
            },
        title: {
            text: 'Overall Waste Breakdown'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}t</b>'
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
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<td>{series.name}</td><b>{point.name}</b>: {point.percentage:.1f}%',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Share',
            data: [{
                    name: 'General',
                    y: gentontot
                },
                {
                    name: 'DMR',
                    y: dmrtontot
                },
                {
                    name: 'Food',
                    y: footontot
                },
                {
                    name: 'Glass',
                    y: glstontot
                },
            ]
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
    });

}

// Func to show day data
function day() {
    reset()
    newArray()
    daily(mainlist)
}

// Func to calc day data
function daily(mainlist) {

    $("#month-rows").show();
    $("#table-streams").show();
    $("#containergen").show();

    $("#gen-tab").show();
    $("#dmr-tab").show();
    $("#foo-tab").show();
    $("#gls-tab").show();

    document.getElementById(`title`).innerHTML = 'To Date Waste Data by Day';

    let genmonIndex = 0;
    let dmrmonIndex = 0;
    let foomonIndex = 0;
    let glsmonIndex = 0;

    let gentuesIndex = 0;
    let dmrtuesIndex = 0;
    let glstuesIndex = 0;

    let genwedIndex = 0;
    let dmrwedIndex = 0;

    let genthursIndex = 0;
    let dmrthursIndex = 0;

    let genfriIndex = 0;
    let dmrfriIndex = 0;

    let gensatIndex = 0;
    let dmrsatIndex = 0;

    let genmonQ = 0;
    let dmrmonQ = 0;
    let foomonQ = 0;
    let glsmonQ = 0;

    let gentuesQ = 0;
    let dmrtuesQ = 0;
    let glstuesQ = 0;

    let genwedQ = 0;
    let dmrwedQ = 0;

    let genthursQ = 0;
    let dmrthursQ = 0;

    let genfriQ = 0;
    let dmrfriQ = 0;

    let gensatQ = 0;
    let dmrsatQ = 0;


    for (var i = 0; i < mainlist.length; i++) {
        if (mainlist[i][0][4] === "Monday") {
            if (mainlist[i][0][1] === 'General Waste') {
                genmonIndex += (parseFloat(mainlist[i][0][3]))
                genmonQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                dmrmonIndex += (parseFloat(mainlist[i][0][3]))
                dmrmonQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                foomonIndex += (parseFloat(mainlist[i][0][3]))
                foomonQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Glass') {
                glsmonIndex += (parseFloat(mainlist[i][0][3]))
                glsmonQ += (parseFloat(mainlist[i][0][2]))
            }
        } else if (mainlist[i][0][4] === "Tuesday") {
            if (mainlist[i][0][1] === 'General Waste') {
                gentuesIndex += (parseFloat(mainlist[i][0][3]))
                gentuesQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                dmrtuesIndex += (parseFloat(mainlist[i][0][3]))
                dmrtuesQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                footuesIndex += (parseFloat(mainlist[i][0][3]))
                footuesQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Glass') {
                glstuesIndex += (parseFloat(mainlist[i][0][3]))
                glstuesQ += (parseFloat(mainlist[i][0][2]))
            }
        } else if (mainlist[i][0][4] === "Wednesday") {
            if (mainlist[i][0][1] === 'General Waste') {
                genwedIndex += (parseFloat(mainlist[i][0][3]))
                genwedQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                dmrwedIndex += (parseFloat(mainlist[i][0][3]))
                dmrwedQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                foowedIndex += (parseFloat(mainlist[i][0][3]))
                foowedQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Glass') {
                glswedIndex += (parseFloat(mainlist[i][0][3]))
                glswedQ += (parseFloat(mainlist[i][0][2]))
            }
        } else if (mainlist[i][0][4] === "Thursday") {
            if (mainlist[i][0][1] === 'General Waste') {
                genthursIndex += (parseFloat(mainlist[i][0][3]))
                genthursQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                dmrthursIndex += (parseFloat(mainlist[i][0][3]))
                dmrthursQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                foothursIndex += (parseFloat(mainlist[i][0][3]))
                foothursQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Glass') {
                glsthursIndex += (parseFloat(mainlist[i][0][3]))
                glsthursQ += (parseFloat(mainlist[i][0][2]))
            }
        } else if (mainlist[i][0][4] === "Friday") {
            if (mainlist[i][0][1] === 'General Waste') {
                genfriIndex += (parseFloat(mainlist[i][0][3]))
                genfriQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                dmrfriIndex += (parseFloat(mainlist[i][0][3]))
                dmrfriQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                foofriIndex += (parseFloat(mainlist[i][0][3]))
                foofriQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Glass') {
                glsfriIndex += (parseFloat(mainlist[i][0][3]))
                glsfriQ += (parseFloat(mainlist[i][0][2]))
            }
        } else if (mainlist[i][0][4] === "Saturday") {
            if (mainlist[i][0][1] === 'General Waste') {
                gensatIndex += (parseFloat(mainlist[i][0][3]))
                gensatQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                dmrsatIndex += (parseFloat(mainlist[i][0][3]))
                dmrsatQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                foosatIndex += (parseFloat(mainlist[i][0][3]))
                foosatQ += (parseFloat(mainlist[i][0][2]))
            } else if (mainlist[i][0][1] === 'Glass') {
                glssatIndex += (parseFloat(mainlist[i][0][3]))
                glssatQ += (parseFloat(mainlist[i][0][2]))
            }
        }

    }

    // GENERAL BINS
    // calc to sum gen bin weights per day
    let gensumDays = [Math.round((genmonIndex * 1000) * 10) / 10, Math.round((gentuesIndex * 1000) * 10) / 10, Math.round((genwedIndex * 1000) * 10) / 10, Math.round((genthursIndex * 1000) * 10) / 10, Math.round((genfriIndex * 1000) * 10) / 10, Math.round((gensatIndex * 1000) * 10) / 10];

    let gensumTot = gensumDays.reduce((a, b) => parseFloat(a) + parseFloat(b));
    gensumDays.push(gensumTot)

    // calc general bins collected per day
    let gensumQlist = [genmonQ, gentuesQ, genwedQ, genthursQ, genfriQ, gensatQ];

    let gentotsumQ = gensumQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    gensumQlist.push(gentotsumQ)

    let dailyavelist = [Math.round((genmonIndex * 1000 / genmonQ) * 10) / 10, Math.round((gentuesIndex * 1000 / gentuesQ) * 10) / 10, Math.round((genwedIndex * 1000 / genwedQ) * 10) / 10, Math.round((genthursIndex * 1000 / genthursQ) * 10) / 10, Math.round((genfriIndex * 1000 / genfriQ) * 10) / 10, Math.round((gensatIndex * 1000 / gensatQ) * 10) / 10, Math.round(gensumTot / gentotsumQ * 100) / 10]


    // DMR BINS
    // calc to sum dmr bin weights per day
    let dmrsumDays = [Math.round((dmrmonIndex * 1000) * 10) / 10, Math.round((dmrtuesIndex * 1000) * 10) / 10, Math.round((dmrwedIndex * 1000) * 10) / 10, Math.round((dmrthursIndex * 1000) * 10) / 10, Math.round((dmrfriIndex * 1000) * 10) / 10, Math.round((dmrsatIndex * 1000) * 10) / 10];

    let dmrsumTot = dmrsumDays.reduce((a, b) => parseFloat(a) + parseFloat(b));
    dmrsumDays.push(dmrsumTot)

    // calc drm bins collected per day
    let dmrsumQlist = [dmrmonQ, dmrtuesQ, dmrwedQ, dmrthursQ, dmrfriQ, dmrsatQ];

    let dmrtotsumQ = dmrsumQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    dmrsumQlist.push(dmrtotsumQ)

    let dailydmravelist = [Math.round((dmrmonIndex * 1000 / dmrmonQ) * 10) / 10, Math.round((dmrtuesIndex * 1000 / dmrtuesQ) * 10) / 10, Math.round((dmrwedIndex * 1000 / dmrwedQ) * 10) / 10, Math.round((dmrthursIndex * 1000 / dmrthursQ) * 10) / 10, Math.round((dmrfriIndex * 1000 / dmrfriQ) * 10) / 10, Math.round((dmrsatIndex * 1000 / dmrsatQ) * 10) / 10, Math.round(dmrsumTot / dmrtotsumQ * 10) / 10]


    // FOOD BINS
    // calc to sum food bin weights per day
    let foosumDays = [Math.round(foomonIndex * 1000) / 10];

    let foosumTot = foosumDays.reduce((a, b) => parseFloat(a) + parseFloat(b));
    foosumDays.push(foosumTot)

    // calc food bins collected per day
    let foomonsumQ = foomonQ;
    let footosumQ = foomonsumQ;
    let foosumQlist = [foomonsumQ];

    foosumQlist.push(footosumQ)

    let dailyfooavelist = [Math.round((foomonIndex * 1000 / foomonQ) * 10) / 10, Math.round((foomonIndex * 1000 / foomonQ) * 10) / 10]


    // GLASS BINS
    // calc to sum glass bin weights per day
    let glssumDays = [Math.round(glsmonIndex * 1000), (glstuesIndex * 1000)];

    let glssumTot = glssumDays.reduce((a, b) => parseFloat(a) + parseFloat(b));
    glssumDays.push(glssumTot)

    // calc glass bins collected per day
    let glssumQlist = [glsmonQ, glstuesQ];

    let glstotsumQ = glssumQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    glssumQlist.push(glstotsumQ)


    let labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let abbday = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'to']
    leftCol = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Total']

    let dailyglsavelist = [Math.round((glsmonIndex * 1000 / glsmonQ) * 10) / 10, Math.round((glstuesIndex * 1000 / glstuesQ) * 10) / 10, Math.round((glssumTot / glstotsumQ) * 10) / 10]



    // Generate tables for the different streams
    displayDailyTable('GENERAL', 'tab-side', leftCol, gensumQlist, gensumDays, dailyavelist, 'gen-tab', abbday)

    displayDailyTable('DMR', 'tab-side', leftCol, dmrsumQlist, dmrsumDays, dailydmravelist, 'dmr-tab', abbday)

    leftCol = ['Monday', 'Tuesday', 'Total']
    abbday = ['mo', 'tu', 'to']
    displayDailyTable('GLASS', 'tab-side', leftCol, glssumQlist, glssumDays, dailyglsavelist, 'gls-tab', abbday)

    leftCol = ['Monday', 'Total']
    abbday = ['mo', 'to']
    displayDailyTable('FOOD', 'tab-side', leftCol, foosumQlist, foosumDays, dailyfooavelist, 'foo-tab', abbday)

    gensumDays.pop(gensumTot)
    dmrsumDays.pop(dmrsumTot)
    glssumDays.pop(glssumTot)
    foosumDays.pop(foosumTot)
    gensumQlist.pop(gentotsumQ)
    dmrsumQlist.pop(dmrtotsumQ)
    foosumQlist.pop(footosumQ)
    glssumQlist.pop(glstotsumQ)


    var moncontgenlist = [];
    var moncontdmrlist = [];
    var moncontfoolist = [];
    var moncontglslist = [];

    var color = ['rgba(66,135,245,1)', 'rgba(51, 171, 163,1)', 'rgba(245, 197, 66,1)', 'rgba(245, 66, 90,1)']

    // Calc for the contract values and push into lists
    gensumQlist.forEach(function (x) {
        moncontgenlist.push(x * 60)
    })
    dmrsumQlist.forEach(function (x) {
        moncontdmrlist.push(x * 40)
    })
    foosumQlist.forEach(function (x) {
        moncontfoolist.push(x * 100)
    })
    glssumQlist.forEach(function (x) {
        moncontglslist.push(x * 60)
    })

    // create area chart
    bydayChart(labels, gensumDays, dmrsumDays, foosumDays, glssumDays, moncontgenlist, moncontdmrlist, moncontfoolist, moncontglslist, 'area', 'containergen', color)

}

function month() {
    reset()
    newArray()
    monthly(mainlist)
}

function monthTD() {
    reset()
    newArray()
    monthlyTD(mainlist)
}

// function for the overall month page - differs by using Jan - Dec
function monthlyTD(mainlist) {

    $("#table-streams").show();
    $("#gen-tab").show();
    $("#dmr-tab").show();
    $("#foo-tab").show();
    $("#gls-tab").show();

    $("#month-rows").show();
    $("#containergen").show();

    document.getElementById(`title`).innerHTML = 'To Date Waste Data by Month';

    monList(mainlist);

    let abbmon = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'tot']
    let months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'Total'];

    // GENERAL WASTE
    let gensumMonList = [Math.round(genjansum * 1000), Math.round(genfebsum * 1000), Math.round(genmarsum * 1000), Math.round(genaprsum * 1000), Math.round(genmaysum * 1000), Math.round(genjunsum * 1000), Math.round(genjulsum * 1000), Math.round(genaugsum * 1000), Math.round(gensepsum * 1000), Math.round(genoctsum * 1000), Math.round(gennovsum * 1000), Math.round(gendecsum * 1000)]

    let sumTot = gensumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    gensumMonList.push(Math.round(sumTot * 10) / 10)


    let genmonQlist = [genjanbinSum, genfebbinSum, genmarbinSum, genaprbinSum, genmaybinSum, genjunbinSum, genjulbinSum, genaugbinSum, gensepbinSum, genoctbinSum, gennovbinSum, gendecbinSum]

    let gensumTotQ = genmonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    genmonQlist.push(gensumTotQ)

    let genavelist = [Math.round((genjansum * 1000 / genjanbinSum) * 10) / 10, Math.round((genfebsum * 1000 / genfebbinSum) * 10) / 10, Math.round((genmarsum * 1000 / genmarbinSum) * 10) / 10, Math.round((genaprsum * 1000 / genaprbinSum) * 10) / 10, Math.round((genmaysum * 1000 / genmaybinSum) * 10) / 10, Math.round((genjunsum * 1000 / genjunbinSum) * 10) / 10, Math.round((genjulsum * 1000 / genjulbinSum) * 10) / 10, Math.round((genaugsum * 1000 / genaugbinSum) * 10) / 10, Math.round((gensepsum * 1000 / gensepbinSum) * 10) / 10, Math.round((genoctsum * 1000 / genoctbinSum) * 10) / 10, Math.round((gennovsum * 1000 / gennovbinSum) * 10) / 10, Math.round((gendecsum * 1000 / gendecbinSum) * 10) / 10, Math.round((sumTot / gensumTotQ) * 10) / 10]



    // DMR WASTE
    let dmrsumMonList = [Math.round(dmrjansum * 1000), Math.round(dmrfebsum * 1000), Math.round(dmrmarsum * 1000), Math.round(dmraprsum * 1000), Math.round(dmrmaysum * 1000), Math.round(dmrjunsum * 1000), Math.round(dmrjulsum * 1000), Math.round(dmraugsum * 1000), Math.round(dmrsepsum * 1000), Math.round(dmroctsum * 1000), Math.round(dmrnovsum * 1000), Math.round(dmrdecsum * 1000)]

    let dmrsumTot = dmrsumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    dmrsumMonList.push(Math.round(dmrsumTot * 10) / 10)


    let dmrmonQlist = [dmrjanbinSum, dmrfebbinSum, dmrmarbinSum, dmraprbinSum, dmrmaybinSum, dmrjunbinSum, dmrjulbinSum, dmraugbinSum, dmrsepbinSum, dmroctbinSum, dmrnovbinSum, dmrdecbinSum]

    let dmrsumTotQ = dmrmonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    dmrmonQlist.push(dmrsumTotQ)

    let dmravelist = [Math.round((dmrjansum * 1000 / dmrjanbinSum) * 10) / 10, Math.round((dmrfebsum * 1000 / dmrfebbinSum) * 10) / 10, Math.round((dmrmarsum * 1000 / dmrmarbinSum) * 10) / 10, Math.round((dmraprsum * 1000 / dmraprbinSum) * 10) / 10, Math.round((dmrmaysum * 1000 / dmrmaybinSum) * 10) / 10, Math.round((dmrjunsum * 1000 / dmrjunbinSum) * 10) / 10, Math.round((dmrjulsum * 1000 / dmrjulbinSum) * 10) / 10, Math.round((dmraugsum * 1000 / dmraugbinSum) * 10) / 10, Math.round((dmrsepsum * 1000 / dmrsepbinSum) * 10) / 10, Math.round((dmroctsum * 1000 / dmroctbinSum) * 10) / 10, Math.round((dmrnovsum * 1000 / dmrnovbinSum) * 10) / 10, Math.round((dmrdecsum * 1000 / dmrdecbinSum) * 10) / 10, Math.round((dmrsumTot / dmrsumTotQ) * 10) / 10]


    // FOOD WASTE
    let foosumMonList = [Math.round(foojansum * 1000), Math.round(foofebsum * 1000), Math.round(foomarsum * 1000), Math.round(fooaprsum * 1000), Math.round(foomaysum * 1000), Math.round(foojunsum * 1000), Math.round(foojulsum * 1000), Math.round(fooaugsum * 1000), Math.round(foosepsum * 1000), Math.round(foooctsum * 1000), Math.round(foonovsum * 1000), Math.round(foodecsum * 1000)]

    let foosumTot = foosumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    foosumMonList.push(Math.round(foosumTot * 10) / 10)


    let foomonQlist = [foojanbinSum, foofebbinSum, foomarbinSum, fooaprbinSum, foomaybinSum, foojunbinSum, foojulbinSum, fooaugbinSum, foosepbinSum, foooctbinSum, foonovbinSum, foodecbinSum]

    let foosumTotQ = foomonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    foomonQlist.push(foosumTotQ)

    let fooavelist = [Math.round((foojansum * 1000 / foojanbinSum) * 10) / 10, Math.round((foofebsum * 1000 / foofebbinSum) * 10) / 10, Math.round((foomarsum * 1000 / foomarbinSum) * 10) / 10, Math.round((fooaprsum * 1000 / fooaprbinSum) * 10) / 10, Math.round((foomaysum * 1000 / foomaybinSum) * 10) / 10, Math.round((foojunsum * 1000 / foojunbinSum) * 10) / 10, Math.round((foojulsum * 1000 / foojulbinSum) * 10) / 10, Math.round((fooaugsum * 1000 / fooaugbinSum) * 10) / 10, Math.round((foosepsum * 1000 / foosepbinSum) * 10) / 10, Math.round((foooctsum * 1000 / foooctbinSum) * 10) / 10, Math.round((foonovsum * 1000 / foonovbinSum) * 10) / 10, Math.round((foodecsum * 1000 / foodecbinSum) * 10) / 10, Math.round((foosumTot / foosumTotQ) * 10) / 10]


    // GLASS WASTE
    let glssumMonList = [Math.round(glsjansum * 1000), Math.round(glsfebsum * 1000), Math.round(glsmarsum * 1000), Math.round(glsaprsum * 1000), Math.round(glsmaysum * 1000), Math.round(glsjunsum * 1000), Math.round(glsjulsum * 1000), Math.round(glsaugsum * 1000), Math.round(glssepsum * 1000), Math.round(glsoctsum * 1000), Math.round(glsnovsum * 1000), Math.round(glsdecsum * 1000)]

    let glssumTot = glssumMonList.reduce((a, b) => parseFloat(a) + parseFloat(b));
    glssumMonList.push(Math.round(glssumTot * 10) / 10)


    let glsmonQlist = [glsjanbinSum, glsfebbinSum, glsmarbinSum, glsaprbinSum, glsmaybinSum, glsjunbinSum, glsjulbinSum, glsaugbinSum, glssepbinSum, glsoctbinSum, glsnovbinSum, glsdecbinSum]

    let glssumTotQ = glsmonQlist.reduce((a, b) => parseFloat(a) + parseFloat(b));
    glsmonQlist.push(glssumTotQ)

    let glsavelist = [Math.round((glsjansum * 1000 / glsjanbinSum) * 10) / 10, Math.round((glsfebsum * 1000 / glsfebbinSum) * 10) / 10, Math.round((glsmarsum * 1000 / glsmarbinSum) * 10) / 10, Math.round((glsaprsum * 1000 / glsaprbinSum) * 10) / 10, Math.round((glsmaysum * 1000 / glsmaybinSum) * 10) / 10, Math.round((glsjunsum * 1000 / glsjunbinSum) * 10) / 10, Math.round((glsjulsum * 1000 / glsjulbinSum) * 10) / 10, Math.round((glsaugsum * 1000 / glsaugbinSum) * 10) / 10, Math.round((glssepsum * 1000 / glssepbinSum) * 10) / 10, Math.round((glsoctsum * 1000 / glsoctbinSum) * 10) / 10, Math.round((glsnovsum * 1000 / glsnovbinSum) * 10) / 10, Math.round((glsdecsum * 1000 / glsdecbinSum) * 10) / 10, Math.round((glssumTot / glssumTotQ) * 10) / 10]

    displayDailyTable('GENERAL', 'tab-side', months, genmonQlist, gensumMonList, genavelist, 'gen-tab', abbmon)

    displayDailyTable('DMR', 'tab-side', months, dmrmonQlist, dmrsumMonList, dmravelist, 'dmr-tab', abbmon)

    displayDailyTable('FOOD', 'tab-side', months, foomonQlist, foosumMonList, fooavelist, 'foo-tab', abbmon)

    displayDailyTable('GLASS', 'tab-side', months, glsmonQlist, glssumMonList, glsavelist, 'gls-tab', abbmon)

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    gensumMonList.pop(sumTot)
    dmrsumMonList.pop(dmrsumTot)
    foosumMonList.pop(foosumTot)
    glssumMonList.pop(glssumTot)

    var color = ['rgba(66,135,245,1)', 'rgba(51, 171, 163,1)', 'rgba(245, 197, 66,1)', 'rgba(245, 66, 90,1)']

    genmonQlist.pop(gensumTotQ)
    dmrmonQlist.pop(dmrsumTotQ)
    foomonQlist.pop(foosumTotQ)
    glsmonQlist.pop(glssumTotQ)

    var contgenlist = [];
    var contdmrlist = [];
    var contfoolist = [];
    var contglslist = [];

    var color = ['rgba(66,135,245,1)', 'rgba(51, 171, 163,1)', 'rgba(245, 197, 66,1)', 'rgba(245, 66, 90,1)']

    genmonQlist.forEach(function (x) {
        contgenlist.push(x * 60)
    })
    dmrmonQlist.forEach(function (x) {
        contdmrlist.push(x * 40)
    })
    foomonQlist.forEach(function (x) {
        contfoolist.push(x * 100)
    })
    glsmonQlist.forEach(function (x) {
        contglslist.push(x * 60)
    })

    bymonthChart(months, gensumMonList, dmrsumMonList, foosumMonList, glssumMonList,contgenlist,contdmrlist, contfoolist,contglslist,'area', 'containergen', color)

}

function monthly(mainlist) {

    $("#month-rows").show();
    $("#containergen").show();

    $("#table-streams").show();
    $("#gen-tab").show();
    $("#dmr-tab").show();
    $("#foo-tab").show();
    $("#gls-tab").show();

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

    let genavelist = [Math.round((genaprsum * 1000 / genaprbinSum) * 10) / 10, Math.round((genmaysum * 1000 / genmaybinSum) * 10) / 10, Math.round((genjunsum * 1000 / genjunbinSum) * 10) / 10, Math.round((genjulsum * 1000 / genjulbinSum) * 10) / 10, Math.round((genaugsum * 1000 / genaugbinSum) * 10) / 10, Math.round((gensepsum * 1000 / gensepbinSum) * 10) / 10, Math.round((genoctsum * 1000 / genoctbinSum) * 10) / 10, Math.round((gennovsum * 1000 / gennovbinSum) * 10) / 10, Math.round((gendecsum * 1000 / gendecbinSum) * 10) / 10, Math.round((gensumTot / gensumTotQ) * 10) / 10, Math.round((genjansum * 1000 / genjanbinSum) * 10) / 10, Math.round((genfebsum * 1000 / genfebbinSum) * 10) / 10, Math.round((genmarsum * 1000 / genmarbinSum) * 10) / 10]


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

    gensumMonList.pop(gensumTot)
    dmrsumMonList.pop(dmrsumTot)
    foosumMonList.pop(foosumTot)
    glssumMonList.pop(glssumTot)

    // var genmax = ((gensumTot / gensumTotQ) * 1);

    // var glsmax = ((glssumTot / glssumTotQ) * 14);
    // var foomax = ((foosumTot / foosumTotQ) * 4);
    // var dmrmax = ((dmrsumTot / dmrsumTotQ) * 2);
    // var genavr = (gensumTot / gensumTotQ)
    // var dmravr = (dmrsumTot / dmrsumTotQ)
    // var fooavr = (foosumTot / foosumTotQ)
    // var glsavr = (glssumTot / glssumTotQ)

    // gauges('gengauge', 60, genmax, genavr, 'General', 'gen', 'rgba(66,135,245,1)')
    // gauges('dmrgauge', 40, dmrmax, dmravr, 'DMR', 'dmr', 'rgba(51, 171, 163,1)')
    // gauges('foogauge', 100, foomax, fooavr, 'Food', 'foo', 'rgba(245, 197, 66,1)')
    // gauges('glsgauge', 80, glsmax, glsavr, 'Glass', 'gls', 'rgba(245, 66, 90,1)')

    var color = ['rgba(66,135,245,1)', 'rgba(51, 171, 163,1)', 'rgba(245, 197, 66,1)', 'rgba(245, 66, 90,1)']

    genmonQlist.pop(gensumTotQ)
    dmrmonQlist.pop(dmrsumTotQ)
    foomonQlist.pop(foosumTotQ)
    glsmonQlist.pop(glssumTotQ)

    var contgenlist = [];
    var contdmrlist = [];
    var contfoolist = [];
    var contglslist = [];

    var color = ['rgba(66,135,245,1)', 'rgba(51, 171, 163,1)', 'rgba(245, 197, 66,1)', 'rgba(245, 66, 90,1)']

    genmonQlist.forEach(function (x) {
        contgenlist.push(x * 60)
    })
    dmrmonQlist.forEach(function (x) {
        contdmrlist.push(x * 40)
    })
    foomonQlist.forEach(function (x) {
        contfoolist.push(x * 100)
    })
    glsmonQlist.forEach(function (x) {
        contglslist.push(x * 60)
    })

    bymonthChart(months, gensumMonList, dmrsumMonList, foosumMonList, glssumMonList,contgenlist,contdmrlist, contfoolist,contglslist,'area', 'containergen', color)

}

function allMonth(mainlist) {
    jan = [];
    feb = [];
    mar = [];
    apr = [];
    may = [];
    jun = [];
    jul = [];
    aug = [];
    sep = [];
    oct = [];
    nov = [];
    dec = [];

    jand = [];
    febd = [];
    mard = [];
    aprd = [];
    mayd = [];
    jund = [];
    juld = [];
    augd = [];
    sepd = [];
    octd = [];
    novd = [];
    decd = [];

    for (var i = 0; i < mainlist.length; i++) {
        switch (mainlist[i][0][0].slice(3, 5)) {
            case '01':
                jan.push(mainlist[i][0][3]);
                jand.push(mainlist[i][0][0]);
                break;
            case '02':
                feb.push(mainlist[i][0][3]);
                febd.push(mainlist[i][0][0]);
                break;
            case '03':
                mar.push(mainlist[i][0][3]);
                mard.push(mainlist[i][0][0]);
                break;
            case '04':
                apr.push(mainlist[i][0][3]);
                aprd.push(mainlist[i][0][0]);
                break;
            case '05':
                mayd.push(mainlist[i][0][0]);
                may.push(mainlist[i][0][3]);
                break;
            case '06':
                jund.push(mainlist[i][0][0]);
                jun.push(mainlist[i][0][3]);
                break;
            case '07':
                juld.push(mainlist[i][0][0]);
                jul.push(mainlist[i][0][3]);
                break;
            case '08':
                augd.push(mainlist[i][0][0]);
                aug.push(mainlist[i][0][3]);
                break;
            case '09':
                sepd.push(mainlist[i][0][0]);
                sep.push(mainlist[i][0][3]);
                break;
            case '10':
                octd.push(mainlist[i][0][0]);
                oct.push(mainlist[i][0][3]);
                break;
            case '11':
                novd.push(mainlist[i][0][0]);
                nov.push(mainlist[i][0][3]);
                break;
            case '12':
                decd.push(mainlist[i][0][0]);
                dec.push(mainlist[i][0][3]);
                break;
        }
    }
}

function monList(mainlist) {

    genjan = [];
    genfeb = [];
    genmar = [];
    genapr = [];
    genmay = [];
    genjun = [];
    genjul = [];
    genaug = [];
    gensep = [];
    genoct = [];
    gennov = [];
    gendec = [];

    genjand = [];
    genfebd = [];
    genmard = [];
    genaprd = [];
    genmayd = [];
    genjund = [];
    genjuld = [];
    genaugd = [];
    gensepd = [];
    genoctd = [];
    gennovd = [];
    gendecd = [];

    dmrjand = [];
    dmrfebd = [];
    dmrmard = [];
    dmraprd = [];
    dmrmayd = [];
    dmrjund = [];
    dmrjuld = [];
    dmraugd = [];
    dmrsepd = [];
    dmroctd = [];
    dmrnovd = [];
    dmrdecd = [];

    foojand = [];
    foofebd = [];
    foomard = [];
    fooaprd = [];
    foomayd = [];
    foojund = [];
    foojuld = [];
    fooaugd = [];
    foosepd = [];
    foooctd = [];
    foonovd = [];
    foodecd = [];
    
    glsjand = [];
    glsfebd = [];
    glsmard = [];
    glsaprd = [];
    glsmayd = [];
    glsjund = [];
    glsjuld = [];
    glsaugd = [];
    glssepd = [];
    glsoctd = [];
    glsnovd = [];
    glsdecd = [];

    dmrjan = [];
    dmrfeb = [];
    dmrmar = [];
    dmrapr = [];
    dmrmay = [];
    dmrjun = [];
    dmrjul = [];
    dmraug = [];
    dmrsep = [];
    dmroct = [];
    dmrnov = [];
    dmrdec = [];

    foojan = [];
    foofeb = [];
    foomar = [];
    fooapr = [];
    foomay = [];
    foojun = [];
    foojul = [];
    fooaug = [];
    foosep = [];
    foooct = [];
    foonov = [];
    foodec = [];

    glsjan = [];
    glsfeb = [];
    glsmar = [];
    glsapr = [];
    glsmay = [];
    glsjun = [];
    glsjul = [];
    glsaug = [];
    glssep = [];
    glsoct = [];
    glsnov = [];
    glsdec = [];

    genjansum = 0;
    genjanbinSum = 0;
    genfebsum = 0;
    genfebbinSum = 0;
    genmarsum = 0;
    genmarbinSum = 0;
    genaprsum = 0;
    genaprbinSum = 0;
    genmaysum = 0;
    genmaybinSum = 0;
    genjunsum = 0;
    genjunbinSum = 0;
    genjulsum = 0;
    genjulbinSum = 0;
    genaugsum = 0;
    genaugbinSum = 0;
    gensepsum = 0;
    gensepbinSum = 0;
    genoctsum = 0;
    genoctbinSum = 0;
    gennovsum = 0;
    gennovbinSum = 0;
    gendecsum = 0;
    gendecbinSum = 0;

    dmrjansum = 0;
    dmrjanbinSum = 0;
    dmrfebsum = 0;
    dmrfebbinSum = 0;
    dmrmarsum = 0;
    dmrmarbinSum = 0;
    dmraprsum = 0;
    dmraprbinSum = 0;
    dmrmaysum = 0;
    dmrmaybinSum = 0;
    dmrjunsum = 0;
    dmrjunbinSum = 0;
    dmrjulsum = 0;
    dmrjulbinSum = 0;
    dmraugsum = 0;
    dmraugbinSum = 0;
    dmrsepsum = 0;
    dmrsepbinSum = 0;
    dmroctsum = 0;
    dmroctbinSum = 0;
    dmrnovsum = 0;
    dmrnovbinSum = 0;
    dmrdecsum = 0;
    dmrdecbinSum = 0;

    foojansum = 0;
    foojanbinSum = 0;
    foofebsum = 0;
    foofebbinSum = 0;
    foomarsum = 0;
    foomarbinSum = 0;
    fooaprsum = 0;
    fooaprbinSum = 0;
    foomaysum = 0;
    foomaybinSum = 0;
    foojunsum = 0;
    foojunbinSum = 0;
    foojulsum = 0;
    foojulbinSum = 0;
    fooaugsum = 0;
    fooaugbinSum = 0;
    foosepsum = 0;
    foosepbinSum = 0;
    foooctsum = 0;
    foooctbinSum = 0;
    foonovsum = 0;
    foonovbinSum = 0;
    foodecsum = 0;
    foodecbinSum = 0;

    glsjansum = 0;
    glsjanbinSum = 0;
    glsfebsum = 0;
    glsfebbinSum = 0;
    glsmarsum = 0;
    glsmarbinSum = 0;
    glsaprsum = 0;
    glsaprbinSum = 0;
    glsmaysum = 0;
    glsmaybinSum = 0;
    glsjunsum = 0;
    glsjunbinSum = 0;
    glsjulsum = 0;
    glsjulbinSum = 0;
    glsaugsum = 0;
    glsaugbinSum = 0;
    glssepsum = 0;
    glssepbinSum = 0;
    glsoctsum = 0;
    glsoctbinSum = 0;
    glsnovsum = 0;
    glsnovbinSum = 0;
    glsdecsum = 0;
    glsdecbinSum = 0;


    for (var i = 0; i < mainlist.length; i++) {
        switch (mainlist[i][0][0].slice(3, 5)) {
            case '01':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genjand.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genjand.indexOf(mainlist[i][0][0].slice(0, 2))
                        genjan[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genjand.push(mainlist[i][0][0].slice(0, 2))
                        genjan.push(parseFloat(mainlist[i][0][3]))
                    }
                    genjanbinSum += parseFloat(mainlist[i][0][2])
                    genjansum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrjand.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrjand.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrjan[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrjan.push(parseFloat(mainlist[i][0][3]))
                        dmrjand.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrjanbinSum += parseFloat(mainlist[i][0][2])
                    dmrjansum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foojand.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foojand.indexOf(mainlist[i][0][0].slice(0, 2))
                        foojan[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foojan.push(parseFloat(mainlist[i][0][3]))
                        foojand.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foojanbinSum += parseFloat(mainlist[i][0][2])
                    foojansum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsjand.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsjand.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsjan[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsjan.push(parseFloat(mainlist[i][0][3]))
                        glsjand.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsjanbinSum += parseFloat(mainlist[i][0][2])
                    glsjansum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '02':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genfebd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genfebd.indexOf(mainlist[i][0][0].slice(0, 2))
                        genfeb[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genfebd.push(mainlist[i][0][0].slice(0, 2))
                        genfeb.push(parseFloat(mainlist[i][0][3]))
                    }
                    genfebbinSum += parseFloat(mainlist[i][0][2])
                    genfebsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrfebd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrfebd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrfeb[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrfeb.push(parseFloat(mainlist[i][0][3]))
                        dmrfebd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrfebbinSum += parseFloat(mainlist[i][0][2])
                    dmrfebsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foofebd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foofebd.indexOf(mainlist[i][0][0].slice(0, 2))
                        foofeb[a] += (parseFloat(mainlist[i][0][3]))

                    } else {
                        foofeb.push(parseFloat(mainlist[i][0][3]))
                        foofebd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foofebbinSum += parseFloat(mainlist[i][0][2])
                    foofebsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsfebd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsfebd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsfeb[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsfeb.push(parseFloat(mainlist[i][0][3]))
                        glsfebd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsfebbinSum += parseFloat(mainlist[i][0][2])
                    glsfebsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '03':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genmard.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genmard.indexOf(mainlist[i][0][0].slice(0, 2))
                        genmar[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genmard.push(mainlist[i][0][0].slice(0, 2))
                        genmar.push(parseFloat(mainlist[i][0][3]))
                    }
                    genmarbinSum += parseFloat(mainlist[i][0][2])
                    genmarsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrmard.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrmard.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrmar[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrmar.push(parseFloat(mainlist[i][0][3]))
                        dmrmard.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrmarbinSum += parseFloat(mainlist[i][0][2])
                    dmrmarsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foomard.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foomard.indexOf(mainlist[i][0][0].slice(0, 2))
                        foomar[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foomar.push(parseFloat(mainlist[i][0][3]))
                        foomard.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foomarbinSum += parseFloat(mainlist[i][0][2])
                    foomarsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsmard.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsmard.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsmar[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsmar.push(parseFloat(mainlist[i][0][3]))
                        glsmard.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsmarbinSum += parseFloat(mainlist[i][0][2])
                    glsmarsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '04':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genaprd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genaprd.indexOf(mainlist[i][0][0].slice(0, 2))
                        genapr[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genaprd.push(mainlist[i][0][0].slice(0, 2))
                        genapr.push(parseFloat(mainlist[i][0][3]))
                    }
                    genaprbinSum += parseFloat(mainlist[i][0][2])
                    genaprsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmraprd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmraprd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrapr[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrapr.push(parseFloat(mainlist[i][0][3]))
                        dmraprd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmraprbinSum += parseFloat(mainlist[i][0][2])
                    dmraprsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (fooaprd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = fooaprd.indexOf(mainlist[i][0][0].slice(0, 2))
                        fooapr[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        fooapr.push(parseFloat(mainlist[i][0][3]))
                        fooaprd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    fooaprbinSum += parseFloat(mainlist[i][0][2])
                    fooaprsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsaprd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsaprd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsapr[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsapr.push(parseFloat(mainlist[i][0][3]))
                        glsaprd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsaprbinSum += parseFloat(mainlist[i][0][2])
                    glsaprsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '05':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genmayd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genmayd.indexOf(mainlist[i][0][0].slice(0, 2))
                        genmay[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genmayd.push(mainlist[i][0][0].slice(0, 2))
                        genmay.push(parseFloat(mainlist[i][0][3]))
                    }
                    genmaybinSum += parseFloat(mainlist[i][0][2])
                    genmaysum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrmayd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrmayd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrmay[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrmay.push(parseFloat(mainlist[i][0][3]))
                        dmrmayd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrmaybinSum += parseFloat(mainlist[i][0][2])
                    dmrmaysum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foomayd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foomayd.indexOf(mainlist[i][0][0].slice(0, 2))
                        foomay[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foomay.push(parseFloat(mainlist[i][0][3]))
                        foomayd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foomaybinSum += parseFloat(mainlist[i][0][2])
                    foomaysum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsmayd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsmayd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsmay[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsmay.push(parseFloat(mainlist[i][0][3]))
                        glsmayd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsmaybinSum += parseFloat(mainlist[i][0][2])
                    glsmaysum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '06':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genjund.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genjund.indexOf(mainlist[i][0][0].slice(0, 2))
                        genjun[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genjund.push(mainlist[i][0][0].slice(0, 2))
                        genjun.push(parseFloat(mainlist[i][0][3]))
                    }
                    genjunbinSum += parseFloat(mainlist[i][0][2])
                    genjunsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrjund.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrjund.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrjun[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrjun.push(parseFloat(mainlist[i][0][3]))
                        dmrjund.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrjunbinSum += parseFloat(mainlist[i][0][2])
                    dmrjunsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foojund.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foojund.indexOf(mainlist[i][0][0].slice(0, 2))
                        foojun[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foojun.push(parseFloat(mainlist[i][0][3]))
                        foojund.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foojunbinSum += parseFloat(mainlist[i][0][2])
                    foojunsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsjund.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsjund.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsjun[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsjun.push(parseFloat(mainlist[i][0][3]))
                        glsjund.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsjunbinSum += parseFloat(mainlist[i][0][2])
                    glsjunsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '07':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genjuld.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genjuld.indexOf(mainlist[i][0][0].slice(0, 2))
                        genjul[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genjuld.push(mainlist[i][0][0].slice(0, 2))
                        genjul.push(parseFloat(mainlist[i][0][3]))
                    }
                    genjulbinSum += parseFloat(mainlist[i][0][2])
                    genjulsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrjuld.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrjuld.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrjul[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrjul.push(parseFloat(mainlist[i][0][3]))
                        dmrjuld.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrjulbinSum += parseFloat(mainlist[i][0][2])
                    dmrjulsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foojuld.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foojuld.indexOf(mainlist[i][0][0].slice(0, 2))
                        foojul[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foojul.push(parseFloat(mainlist[i][0][3]))
                        foojuld.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foojulbinSum += parseFloat(mainlist[i][0][2])
                    foojulsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsjuld.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsjuld.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsjul[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsjul.push(parseFloat(mainlist[i][0][3]))
                        glsjuld.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsjulbinSum += parseFloat(mainlist[i][0][2])
                    glsjulsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '08':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genaugd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genaugd.indexOf(mainlist[i][0][0].slice(0, 2))
                        genaug[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genaugd.push(mainlist[i][0][0].slice(0, 2))
                        genaug.push(parseFloat(mainlist[i][0][3]))
                    }
                    genaugbinSum += parseFloat(mainlist[i][0][2])
                    genaugsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmraugd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmraugd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmraug[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmraug.push(parseFloat(mainlist[i][0][3]))
                        dmraugd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmraugbinSum += parseFloat(mainlist[i][0][2])
                    dmraugsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (fooaugd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = fooaugd.indexOf(mainlist[i][0][0].slice(0, 2))
                        fooaug[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        fooaug.push(parseFloat(mainlist[i][0][3]))
                        fooaugd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    fooaugbinSum += parseFloat(mainlist[i][0][2])
                    fooaugsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsaugd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsaugd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsaug[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsaug.push(parseFloat(mainlist[i][0][3]))
                        glsaugd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsaugbinSum += parseFloat(mainlist[i][0][2])
                    glsaugsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '09':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (gensepd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = gensepd.indexOf(mainlist[i][0][0].slice(0, 2))
                        gensep[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        gensepd.push(mainlist[i][0][0].slice(0, 2))
                        gensep.push(parseFloat(mainlist[i][0][3]))
                    }
                    gensepbinSum += parseFloat(mainlist[i][0][2])
                    gensepsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrsepd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrsepd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrsep[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrsep.push(parseFloat(mainlist[i][0][3]))
                        dmrsepd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrsepbinSum += parseFloat(mainlist[i][0][2])
                    dmrsepsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foosepd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foosepd.indexOf(mainlist[i][0][0].slice(0, 2))
                        foosep[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foosep.push(parseFloat(mainlist[i][0][3]))
                        foosepd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foosepbinSum += parseFloat(mainlist[i][0][2])
                    foosepsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glssepd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glssepd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glssep[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glssep.push(parseFloat(mainlist[i][0][3]))
                        glssepd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glssepbinSum += parseFloat(mainlist[i][0][2])
                    glssepsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '10':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (genoctd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = genoctd.indexOf(mainlist[i][0][0].slice(0, 2))
                        genoct[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        genoctd.push(mainlist[i][0][0].slice(0, 2))
                        genoct.push(parseFloat(mainlist[i][0][3]))
                    }
                    genoctbinSum += parseFloat(mainlist[i][0][2])
                    genoctsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmroctd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmroctd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmroct[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmroct.push(parseFloat(mainlist[i][0][3]))
                        dmroctd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmroctbinSum += parseFloat(mainlist[i][0][2])
                    dmroctsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foooctd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foooctd.indexOf(mainlist[i][0][0].slice(0, 2))
                        foooct[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foooct.push(parseFloat(mainlist[i][0][3]))
                        foooctd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foooctbinSum += parseFloat(mainlist[i][0][2])
                    foooctsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsoctd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsoctd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsoct[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsoct.push(parseFloat(mainlist[i][0][3]))
                        glsoctd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsoctbinSum += parseFloat(mainlist[i][0][2])
                    glsoctsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '11':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (gennovd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = gennovd.indexOf(mainlist[i][0][0].slice(0, 2))
                        gennov[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        gennovd.push(mainlist[i][0][0].slice(0, 2))
                        gennov.push(parseFloat(mainlist[i][0][3]))
                    }
                    gennovbinSum += parseFloat(mainlist[i][0][2])
                    gennovsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrnovd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrnovd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrnov[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrnov.push(parseFloat(mainlist[i][0][3]))
                        dmrnovd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrnovbinSum += parseFloat(mainlist[i][0][2])
                    dmrnovsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foonovd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foonovd.indexOf(mainlist[i][0][0].slice(0, 2))
                        foonov[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foonov.push(parseFloat(mainlist[i][0][3]))
                        foonovd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foonovbinSum += parseFloat(mainlist[i][0][2])
                    foonovsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsnovd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsnovd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsnov[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsnov.push(parseFloat(mainlist[i][0][3]))
                        glsnovd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsnovbinSum += parseFloat(mainlist[i][0][2])
                    glsnovsum += parseFloat(mainlist[i][0][3])
                }
                break;
            case '12':
                if (mainlist[i][0][1] === 'General Waste') {
                    if (gendecd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = gendecd.indexOf(mainlist[i][0][0].slice(0, 2))
                        gendec[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        gendecd.push(mainlist[i][0][0].slice(0, 2))
                        gendec.push(parseFloat(mainlist[i][0][3]))
                    }
                    gendecbinSum += parseFloat(mainlist[i][0][2])
                    gendecsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Dry Mixed Recyclate') {
                    if (dmrdecd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = dmrdecd.indexOf(mainlist[i][0][0].slice(0, 2))
                        dmrdec[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        dmrdec.push(parseFloat(mainlist[i][0][3]))
                        dmrdecd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    dmrdecbinSum += parseFloat(mainlist[i][0][2])
                    dmrdecsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Kitchen/Canteen Wast') {
                    if (foodecd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = foodecd.indexOf(mainlist[i][0][0].slice(0, 2))
                        foodec[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        foodec.push(parseFloat(mainlist[i][0][3]))
                        foodecd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    foodecbinSum += parseFloat(mainlist[i][0][2])
                    foodecsum += parseFloat(mainlist[i][0][3])
                } else if (mainlist[i][0][1] === 'Glass') {
                    if (glsdecd.includes(mainlist[i][0][0].slice(0, 2))) {
                        let a = glsdecd.indexOf(mainlist[i][0][0].slice(0, 2))
                        glsdec[a] += (parseFloat(mainlist[i][0][3]))
                    } else {
                        glsdec.push(parseFloat(mainlist[i][0][3]))
                        glsdecd.push(mainlist[i][0][0].slice(0, 2))
                    }
                    glsdecbinSum += parseFloat(mainlist[i][0][2])
                    glsdecsum += parseFloat(mainlist[i][0][3])
                }
                break;
        }
    }

}


function reset() {
    document.getElementById('containergen').style.height = '40vh';

    $("#gen-tab").empty().hide();
    $("#dmr-tab").empty().hide();
    $("#foo-tab").empty().hide();
    $("#gls-tab").empty().hide();
    $("#containerb").hide();
    $("#container").hide();
    $("#containergen").hide();
    $("#containerdmr").hide();
    $("#containerfoo").hide();
    $("#containergls").hide();
    $("#normal-row").hide();
    $("#month-rows").hide();
    $("#overall-table").hide();
    $("table").empty();


    $("#table-overall").hide();
    $("#table-streams").hide();

    $("#gengauge").hide();
    $("#dmrgauge").hide();
    $("#foogauge").hide();
    $("#glsgauge").hide();
    $("#gauges").hide();

    mainlist = [];
    cSCYear = [];
    list1 = [];
    fullList = [];
    fullList1 = [];
}

var mainlist = [];

function newArray() {
    var list1 = []
    fullList1 = []
    mainlist = []
    mainlist.length = 0;

    list1 = localStorage.newFullListLS.split(',');
    for (var i = 0; i < list1.length - 5; i += 5) {
        fullList1.push(`${list1[i + 0]},${list1[i + 1]},${list1[i + 2]},${list1[i + 3]},${list1[i + 4]}`)
    }
    for (var i = 0; i < fullList1.length; i++) {
        var a = [fullList1[i].split(',')]
        mainlist.push(a)
    }
    return mainlist
}