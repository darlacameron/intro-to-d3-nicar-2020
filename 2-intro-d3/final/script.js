let chartContainer = d3.select('div#chart')
let width = 700
let height = 500

let svg = chartContainer
  .append('svg')
    .attr('width', width)
    .attr('height', height)

svg.append('text')
  .attr('x', width / 2)
  .attr('y', 50)
  .attr('text-anchor', 'middle')
  .style('font-size', '40px')
  .style('font-family', 'sans-serif')
  .style('font-weight', 'bold')
  .text('NICAR 2020!')

let hotel = svg.append('g')

let hotelRects = [
  {width: 270, height: 70, x: 100, y: 330},
  {width: 70, height: 150, x: 150, y: 250},
  {width: 70, height: 300, x: 300, y: 100}
]

hotel.selectAll('rect')
  .data(hotelRects)
  .enter().append('rect')
  .attr('width', d => d.width)
  .attr('height', d => d.height)
  .attr('x', d => d.x)
  .attr('y', d => d.y)
