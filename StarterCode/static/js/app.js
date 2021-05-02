// Use D3 fetch to read JSON file
d3.json("data/samples.json").then((importedData) => {
    let data = importedData;
    
    console.log(data);
});