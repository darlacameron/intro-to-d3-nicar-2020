// Margin convention
let margin = {top: 50, right: 10, left: 200, bottom: 10}
let width = 700 - margin.right - margin.left
let height = 500 - margin.top - margin.bottom

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('text')
  .text('Health spending per person')
  .attr('transform', `translate(${width / 2}, -30)`)
  .attr('text-anchor', 'middle')

let render = (raw) => {
  let data = raw
    .sort((b, a) => +a.healthExpPerCapita - +b.healthExpPerCapita)
    .slice(0, 10)

  let maxValue = d3.max(data, d => +d.healthExpPerCapita)

  let scaleX = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, width])

  let scaleY = d3.scaleBand()
    .domain(d3.range(0, 10))
    .range([0, height])
    .padding(0.05)

  let axis = d3.axisTop(scaleX)

  let axisG = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0, -5)')
    .call(axis)

  let bars = svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('width', d => scaleX(+d.healthExpPerCapita))
    .attr('height', scaleY.bandwidth())
    .attr('y', (d, i) => scaleY(i))
    .attr('x', 0)

  let text = svg.selectAll('text.country-label')
    .data(data)
    .enter().append('text')
    .attr('class', 'country-label')
    .attr('y', (d, i) => scaleY(i))
    .attr('dx', -3)
    .attr('dy', scaleY.bandwidth() / 2 + 5)
    .style('text-anchor', 'end')
    .text(d => d.name)
}

function sculptData(raw) {
  console.log(raw);
  let data = raw.map(d => {
    d.healthExpPerCapita = +d.healthExpPerCapita
    d.year = +d.year
    return d
  })

  let dataYears = d3.nest()
    .key(d => d.year)
    .map(data)

  let dataCountries = d3.nest()
    .key(d => d.name)
    .entries(data)

  return dataYears['$1970']
}

d3.csv('../../data/oecd.csv')
  .then(sculptData)
  .then(render)
