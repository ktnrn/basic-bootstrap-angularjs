
var data = [20,10,50,90,40];

<!-- bar char without text -->
var svgContainer = d3.select(".chart1").attr("width", 600).attr("height", 300);
var scaleX = d3.scaleLinear().domain([0, d3.max(data)]).range([0, 600]);
svgContainer.selectAll("rect").data(data).enter().append("rect")
.attr("x", 0)
.attr("y", function(d, i){ return i * 50; })
.attr("height", 20)
.attr("width", function(d){ return scaleX(d);})
.attr("fill", "blue")
.attr("stroke","black");

<!-- Bar chart with Text in it -->
var width = 420, barHeight = 20;
var x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, width - 20]);
var chart = d3.select(".chart2").attr("width", width).attr("height", barHeight * data.length);

var bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function(d, i){
    return "translate(0, "+ i*barHeight +")";
});

bar.append("rect").attr("width", function(d){return x(d)}).attr("height", barHeight - 1).attr("fill", "orange").attr("stroke", "lightgrey");
bar.append("text").attr("x", function(d) { return x(d) + 3 ; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });


<!-- Bar Chart Vertical -->
var width3 = 960,
height3 = 500;

var scaleY = d3.scaleLinear().domain([0, d3.max(data)]).range([height3, 0]);
var ordinalScale = d3.scaleOrdinal().domain(["A", "B", "C", "D", "E", "F"])
    .rangeRoundBands([0, width], .1);
var chart = d3.select(".chart3").attr("width", width3).attr("height", height3);
function type(d){
    d.value = +d.value;
    return d;
}
d3.tsv("data.tsv", type, function(error, data){
    scaleY.domain([0, d3.max(data, function(d){ return d.value})]);
    var barWidth3 = width3 / data.length;
    var bar = chart.selectAll("g").data(data).enter().append("g")
    .attr("transform", function(d, i){
        return "translate("+ i * barWidth3+",0)";
    });
    bar.append("rect")
    .attr("y", function(d, i){ return height3 - scaleY(d.value)})
    .attr("height", function(d, i){ return scaleY(d.value)})
    .attr("width", barWidth3 - 1);
    bar.append("text")
    .attr("x", barWidth3 /2)
    .attr("y", function(d, i){ return height3 - scaleY(d.value) + 3})
    .attr("dy", "0.75em")
    .text(function(d){ return d.key });

    d3.svg.axis().scale(scale)
});
