// gapminder code from plotly example - https://plotly.com/javascript/gapminder-example/

d3.csv('https://raw.githubusercontent.com/nithiyasuresh/LifeExpectancy_Project/main/data/Life.csv').then(function (data) {
    console.log(data);

    // Create a lookup table to sort and regroup the columns of data,
    // first by Year, then by region:
    var lookup = {};
    function getData(Year, region) {
        var byYear, trace;
        if (!(byYear = lookup[Year])) {
            ;
            byYear = lookup[Year] = {};
        }
        // If a container for this Year + region doesn't exist yet,
        // then create one:
        if (!(trace = byYear[region])) {
            trace = byYear[region] = {
                yr: [],
                rgn: [],
                x: [],
                y: [],
                id: [],
                text: [],
                marker: { size: [] }
            };
        }
        // console.log(trace);
        return trace;
    }

    // Go through each row, get the right trace, and append the data:
    for (var i = 0; i < data.length; i++) {
        var datum = data[i];
        var trace = getData(datum.Year, datum.region);
        trace.yr.push(datum.Year);
        trace.rgn.push(datum.region);
        trace.text.push(datum.Country);
        trace.id.push(datum.Country);
        trace.x.push(datum.Life_Expectancy);
        trace.y.push(datum.GDP);
        trace.marker.size.push(datum.Population);
    }

    // Get the group names:
    var Years = Object.keys(lookup);
    // In this case, every Year includes every region, so we
    // can just infer the regions from the *first* Year:
    var firstYear = lookup[Years[0]];
    var regions = Object.keys(firstYear);

    // Create the main traces, one for each region:
    var traces = [];
    for (i = 0; i < regions.length; i++) {
        var data = firstYear[regions[i]];
        // One small note. We're creating a single trace here, to which
        // the frames will pass data for the different Years. It's
        // subtle, but to avoid data reference problems, we'll slice 
        // the arrays to ensure we never write any new data into our
        // lookup table:
        traces.push({
            name: regions[i],
            x: data.x.slice(),
            y: data.y.slice(),
            id: data.id.slice(),
            text: data.text.slice(),
            mode: 'markers',
            marker: {
                size: data.marker.size.slice(),
                sizemode: 'area',
                sizeref: 200000
            }
        });
    }

    // Create a frame for each Year. Frames are effectively just
    // traces, except they don't need to contain the *full* trace
    // definition (for example, appearance). The frames just need
    // the parts the traces that change (here, the data).
    var frames = [];
    for (i = 0; i < Years.length; i++) {
        frames.push({
            name: Years[i],
            data: regions.map(function (region) {
                return getData(Years[i], region);
            })
        });
    }

    // Now create slider steps, one for each frame. The slider
    // executes a plotly.js API command (here, Plotly.animate).
    // In this example, we'll animate to one of the named frames
    // created in the above loop.
    var sliderSteps = [];
    for (i = 0; i < Years.length; i++) {
        sliderSteps.push({
            method: 'animate',
            label: Years[i],
            args: [[Years[i]], {
                mode: 'immediate',
                transition: { duration: 300 },
                frame: { duration: 300, redraw: false },
            }]
        });
    }

    var layout = {
        xaxis: {
            title: 'Life Expectancy',
            range: [30, 85]
        },
        yaxis: {
            title: 'GDP per Capita',
            type: 'log'
        },
        hovermode: 'closest',
        //         // We'll use updatemenus (whose functionality includes menus as
        //         // well as buttons) to create a play button and a pause button.
        //         // The play button works by passing `null`, which indicates that
        //         // Plotly should animate all frames. The pause button works by
        //         // passing `[null]`, which indicates we'd like to interrupt any
        //         // currently running animations with a new list of frames. Here
        //         // The new list of frames is empty, so it halts the animation.
        updatemenus: [{
            x: 0,
            y: 0,
            yanchor: 'top',
            xanchor: 'left',
            showactive: false,
            direction: 'left',
            type: 'buttons',
            pad: { t: 87, r: 10 },
            buttons: [{
                method: 'animate',
                args: [null, {
                    mode: 'immediate',
                    fromcurrent: true,
                    transition: { duration: 300 },
                    frame: { duration: 500, redraw: false }
                }],
                label: 'Play'
            }, {
                method: 'animate',
                args: [[null], {
                    mode: 'immediate',
                    transition: { duration: 0 },
                    frame: { duration: 0, redraw: false }
                }],
                label: 'Pause'
            }]
        }],
        //         // Finally, add the slider and use `pad` to position it
        //         // nicely next to the buttons.
        sliders: [{
            pad: { l: 130, t: 55 },
            currentvalue: {
                visible: true,
                prefix: 'Year:',
                xanchor: 'right',
                font: { size: 20, color: '#666' }
            },
            steps: sliderSteps
        }]
    };


    // Create the plot:
    Plotly.plot('bubble_plot_country', {
        data: traces,
        layout: layout,
        config: { showSendToCloud: true },
        frames: frames,
    });

});

// 3rd visualisation - world map

// const url = "/api/life_2015";
// d3.json(url).then(function (rows) {
//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     // console.log(rows);


d3.csv('https://github.com/nithiyasuresh/LifeExpectancy_Project/blob/main/data/Life_2015.csv').then(function (rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }


    var data_map = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'Country'),
        z: unpack(rows, 'Life_Expectancy'),
        text: unpack(rows, 'Country'),
        autocolorscale: true
    }];

    var layout_map = {
        title: 'Life Expectancy for 2015 across the world',
        geo: {
            projection: {
                type: 'robinson'
            }
        }
    };

    Plotly.newPlot("choropleth", data_map, layout_map, { showLink: false });

});

// ************************************************************************************************** //
// 2nd Visualisation - Box plots
// ************************************************************************************************** //
d3.csv('https://raw.githubusercontent.com/nithiyasuresh/LifeExpectancy_Project/main/data/Life.csv').then(function (databox) {
var firstYear1 = lookup[Years[15]];


var trace_1;
var databox = firstYear1[regions[0]];
trace_1 = databox.x

var trace_1d = {
    y: trace_1,
    type: "box",
    type: 'box',
    name: 'Asia',
    jitter: 0.3,
    pointpos: -1.8,
    marker: {
        color: 'rgb(0,109,44)'
    },
    boxpoints: 'all'
};

var trace_2;
var databox = firstYear1[regions[1]];
trace_2 = data.x

var trace_2d = {
    y: trace_2,
    type: "box",
    type: 'box',
    name: 'Europe',
    jitter: 0.3,
    pointpos: -1.8,
    marker: {
        color: 'rgb(178,226,226)'
    },
    boxpoints: 'all'
};

var trace_3;
var databox = firstYear1[regions[2]];
trace_3 = data.x

var trace_3d = {
    y: trace_3,
    type: "box",
    type: 'box',
    name: 'Africa',
    jitter: 0.3,
    pointpos: -1.8,
    marker: {
        color: 'rgb(237,248,251)'
    },
    boxpoints: 'all'
};

var trace_4;
var databox = firstYear1[regions[3]];
trace_4 = data.x

var trace_4d = {
    y: trace_4,
    type: "box",
    type: 'box',
    name: 'Americas',
    jitter: 0.3,
    pointpos: -1.8,
    marker: {
        color: 'rgb(102,194,164)'
    },
    boxpoints: 'all'
};

var trace_5;
var databox = firstYear1[regions[4]];
trace_5 = data.x

var trace_5d = {
    y: trace_5,
    type: "box",
    type: 'box',
    name: 'Oceania',
    jitter: 0.3,
    pointpos: -1.8,
    marker: {
        color: 'rgb(44,162,95)'
    },
    boxpoints: 'all'
};


var databox = [trace_1d, trace_2d, trace_3d, trace_4d, trace_5d];

var layout = {
    title: 'Box Plot Styling Outliers'
};

Plotly.newPlot('boxplot', data, layout);

});



// // Adding drop down of country

// Plotly.d3.csv('https://raw.githubusercontent.com/nithiyasuresh/LifeExpectancy_Project/main/data/Life.csv').then(function(dropdown){

//     function unpack(dropdown, key) {
//         return dropdown.map(function(dropdown) { return dropdown[key]; });
//     }

// var allCountryNames = unpack(rows, 'Country'),
//     allYear = unpack(rows, 'Year'),
//     allGdp = unpack(rows, 'Population'),
//     listofCountries = [],
//     currentCountry,
//     currentGdp = [],
//     currentYear = [];

//   for (var i = 0; i < allCountryNames.length; i++ ){
//     if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
//       listofCountries.push(allCountryNames[i]);
//     }
//   }

//   function getCountryData(chosenCountry) {
//     currentGdp = [];
//     currentYear = [];
//     for (var i = 0 ; i < allCountryNames.length ; i++){
//       if ( allCountryNames[i] === chosenCountry ) {
//         currentGdp.push(allGdp[i]);
//         currentYear.push(allYear[i]);
//       } 
//     }
//   };

// // Default Country Data
// setBubblePlot('Afghanistan');

// function setBubblePlot(chosenCountry) {
//     getCountryData(chosenCountry);  

//     var trace1 = {
//       x: currentYear,
//       y: currentGdp,
//       mode: 'lines+markers',
//       marker: {
//         size: 12, 
//         opacity: 0.5
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: 'GDP per cap according to Country<br>'+ chosenCountry + ' GDP'
//     };

//     Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
// };

// var innerContainer = document.querySelector('[data-num="0"'),
//     plotEl = innerContainer.querySelector('.plot'),
//     countrySelector = innerContainer.querySelector('.countrydata');

// function assignOptions(textArray, selector) {
//   for (var i = 0; i < textArray.length;  i++) {
//       var currentOption = document.createElement('option');
//       currentOption.text = textArray[i];
//       selector.appendChild(currentOption);
//   }
// }

// assignOptions(listofCountries, countrySelector);

// function updateCountry(){
//     setBubblePlot(countrySelector.value);
// }

// countrySelector.addEventListener('change', updateCountry, false);
// });