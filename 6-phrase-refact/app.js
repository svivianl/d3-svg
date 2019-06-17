function getFrequencies(str){
  var frequencies = [];
  let letters = str.split('').sort();
  let index = -1;
  let checkLetter = '';
  letters.forEach(letter => {
    if(checkLetter !== letter){
      index ++;
      frequencies.push({letter: letter, count: 1});
      checkLetter = letter;
    }else{
      frequencies[index].count ++;
    }
  });
  return frequencies;
}

var width = 800;
var height = 400;
var barPadding = 10;
var svg = d3.select('svg')
            .attr('height', height)
            .attr('width', width);

d3.select('#reset')
  .on('click', () => {
    d3.selectAll('.letter')
      .remove();

    d3.select('#phrase')
      .text('');
    
    d3.count('#count')
      .text('');
    
    input.property('value', '');
});


var submit = d3.select('form');
submit.on('submit', () => {
  d3.event.preventDefault();
  var input = d3.select('input');
  let text = input.property('value');
  let data = getFrequencies(text);
  let barWidth = width / data.length - barPadding;
  
  var letters =  svg
    .selectAll('.letter')
    .data(data, newData => newData.letter);
    
  // to set old letters as not new
  letters
    .classed('new', false)
    .exit()
    .remove();
  
  var letterEnter = letters
    .enter()
    .append('g')
      .classed('letter', true)
      .classed('new', true);
      
  letterEnter.append('rect');
  letterEnter.append('text');
  
  letterEnter.merge(letters)
    .select('rect')
      .attr('width', barWidth) 
      .attr('height', data => data.count * 20)
      .attr('x', (data, index) => (barWidth + barPadding) * index)
      .attr('y', data => height - data.count * 20);
    
  letterEnter.merge(letters)
    .select('text')
      .attr('x', (data, index) => (barWidth + barPadding) * index + barWidth / 2)
      .attr('text-anchor', 'middle')
      .attr('y', data => height - data.count * 20 - 10)
      .text(data => data.letter);
  
  d3.select('#phrase')
    .text('Analysis of: ' + text);
  
  d3.count('#count')
    .text('(New characters: ' + letters.enter().nodes().length +')');
  
  input.property('value', '');
});
