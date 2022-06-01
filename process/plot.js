function plot(x, y) {
    let graph = document.getElementById("graph");
    Plotly.newPlot(
        graph,
        [
            {
                x: x,
                y: y,
            },
        ],
        +{
            margin: { t: 0 },
        }
    );
}
function removePlot() {
    let graph = document.getElementById("graph");
    Plotly.newPlot(
        graph,
        [],
        +{
            margin: { t: 0 },
        }
    );
}
export { plot, removePlot };
