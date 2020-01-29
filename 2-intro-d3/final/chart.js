// Margin convention
let margin = {top: 10, right: 10, left: 10, bottom: 10}
let width = 700 - margin.right - margin.left
let height = 500 - margin.top - margin.bottom

// because we are hot loading:
d3.selectAll('svg').remove()

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let snowBody = svg.append('g')
  .attr('fill', 'white')
  .attr('stroke', 'black')

let circles = [
  {'r': 60, 'cx': 150, 'cy': 230},
  {'r', 40, 'cx': 150, 'cy', 150},
  {'r', 30, 'cx': 150, 'cy': 90}
]

snowBody.selectAll('circle')
  .data(circles)
  .enter().append('circle')
  .attr('r' d => d.r)
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)

svg.append('ellipse')
  .attr('rx', 3)
  .attr('ry', 5)
  .attr('cx', 140)
  .attr('cy', 80)

svg.append('ellipse')
  .attr('rx', 3)
  .attr('ry', 5)
  .attr('cx', 160)
  .attr('cy', 80)

svg.append('path')
  .attr('d', `M 150,90
              L 170,95
              L 150,100 z`)

svg.append('text')
  .attr('x', 150)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text('Hello, world!')
