// Use D3 fetch to read JSON file
d3.json("data/samples.json").then((importedData) => {
    let data = importedData;


    d3.select('#selDataset')
        .selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text(d => d)

    console.log(data);
});

d3.select('#selDataset').on("change", updatePanel)

function updatePanel() {
    
}