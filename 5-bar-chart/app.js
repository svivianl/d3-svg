var minYear = birthData[0].year;
var maxYear = birthData[birthData.length - 1].year;
var width = 600;
var height = 600;
var numOfBars = 12; // it is 12 months
var barPadding = 10;
var barWidth = width / numOfBars - barPadding;


d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect')
    .data(birthData.filter(data => data.year === minYear))
    .enter()
    .append('rect')
        .attr('width', barWidth)
        .attr('height', data => data.births / 2.5e6 * height)
        .attr('y', data => height - data.births/ 2.5e6 * height)
        .attr('x', (data, index) => (barWidth + barPadding) * index)
        .attr('fill', 'purple');

d3.select('input')
    .on('input', function() {
        // +d3... is to converto into a number
        let year = +d3.event.target.value;
        d3.selectAll('rect')
            .data(birthData.filter(data => data.year === year))
            .attr('height', data => data.births / 2.5e6 * height)
            .attr('y', data => height - data.births/ 2.5e6 * height);
    });