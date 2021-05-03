// Use D3 fetch to read JSON file
d3.json("data/samples.json").then((importedData) => {
    let data = importedData;

    d3.select('#selDataset')
    .selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
    .text(d => d)
    .attr("value", d => d)

    console.log(data.samples[0].otu_ids.slice(0,10).reverse());

    updatePlot(0);

    function updatePlot(index) {
        let subjectOTU = data.samples[index].otu_ids;
        console.log(subjectOTU);
        let subjectFreq = data.samples[index].sample_values;
        let otuLabels = data.samples[index].otu_labels;


        let demoEntries = Object.entries(data.metadata[index])
        let demoData = d3.select('#sample-metadata');

        console.log(demoEntries[0][0]);

        demoData.html("");

        for (let i = 0; i < demoEntries.length; ++i) {
            demoData.append("p").text(`${demoEntries[i][0]}:${demoEntries[i][1]}`)
        };

        

        let topTenOTU = subjectOTU.slice(0, 10).reverse();
        let topTenFreq = subjectFreq.slice(0, 10).reverse();
        let topTenToolTips = data.samples[0].otu_labels.slice(0, 10).reverse();
        let topTenLabel = topTenOTU.map((otu => "OTU " + otu));
        topTenLabel = topTenLabel.reverse();

        let trace1 = {
            x: topTenFreq,
            y: topTenLabel,
            text: topTenToolTips,
            type: "bar",
            orientation: "h"
        };

        let barData = [trace1];

        let layout = {
            title: "Top 10 OTUs",
            margin: {
                l: 75,
                r: 75,
                t: 75,
                b: 50
            }
        };

        Plotly.newPlot("bar", barData, layout);

        let trace2 = {
            x: subjectOTU,
            y: subjectFreq,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: subjectOTU,
                opacity: [1, 0.8, 0.6, 0.4],
                size: subjectFreq
            }
        };

        let bubbleData = [trace2];

        layout = {
            title: 'OTU Frequency',
            showlegend: false,
            height: 600,
            width: 930
        }

        Plotly.newPlot('bubble', bubbleData, layout)
    };

    d3.selectAll('#selDataset').on('change', refreshData)

    function refreshData() {
        let dropdownMenu = d3.select('#selDataset')
        let patientID = dropdownMenu.property('value')

        console.log(patientID);

        for (i = 0; i < data.names.length; ++i) {
            if (patientID === data.names[i]) {
                updatePlot(i)
            }
        }
    };
});
