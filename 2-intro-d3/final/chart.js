let chartContainer = d3.select('div#chart')
let width = 700
let height = 500

let svg = chartContainer
  .append('svg')
    .attr('width', width)
    .attr('height', height)

let snowBody = svg.append('g')
  .attr('fill', 'white')
  .attr('stroke', 'black')

let circles = [
  {'r': 60, 'cx': 150, 'cy': 230},
  {'r': 40, 'cx': 150, 'cy': 150},
  {'r': 30, 'cx': 150, 'cy': 90}
]

snowBody.selectAll('circle')
  .data(circles)
  .enter().append('circle')
  .attr('r', d => d.r)
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
