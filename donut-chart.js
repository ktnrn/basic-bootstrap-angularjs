var donutData = [{
    color: "red",
    value: 120000
}, {
    color: "orange",
    value: 110000
}, {
    color: "blue",
    value: 60000,
}, {
    color: "yellow",
    value: 25000,
}, {
    color: "green",
    value: 5000
}];

/* <div class="donutChart" style="height: 500px;">
</div> */
function drawResponsivePieOrDonutChart(donutData, isPieChart){
    var maxWidth = document.getElementsByClassName("donutChart")[0].getBoundingClientRect().width;
    var maxHeight = document.getElementsByClassName("donutChart")[0].getBoundingClientRect().height;
    var radius = Math.min(maxWidth, maxHeight) / 2;
    var chartSvg = d3.select(".donutChart").append("svg").attr("viewBox", "0 0 " +
    radius * 2 + " " + radius * 2).attr("preserveAspectRatio", "xMidYMin "+
    "meet").attr("width", "100%").attr("height",
    "100%").append("g").attr("transform", "translate(" + radius + ", " +
    radius+ ")");

    var pieFunction = d3.pie().sort(null).value(function(d) {
        return d.value;
    });
    var innerRadius = isPieChart ? 0 : radius - 120;
    var arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

    chartSvg.selectAll("path").data(pieFunction(donutData)).enter().append('path').attr("fill", function(d, i) {
        return d.data.color;
    }).attr("d", arc).attr("title", "Abc");
}
