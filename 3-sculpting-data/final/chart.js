function sculptData(raw) {
  console.log(raw);
  let data = raw.map(d => {
    d.healthExpPerCapita = +d.healthExpPerCapita
    d.year = +d.year
    return d
  })

  let dataYears = d3.nest()
    .key(function(d) { return d.year })
    .map(data)

  let dataCountries = d3.nest()
    .key(function(d) { return d.name })
    .entries(data)

  return dataYears['$1970']
}

// Margin convention
let margin = {top: 10, right: 10, left: 10, bottom: 10}
let width = 700 - margin.right - margin.left
let height = 500 - margin.top - margin.bottom

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let scale = d3.scaleLinear()
  .range([0, width])

let scaleY = d3.scaleBand()
  .domain(d3.range(0, 10))
  .range([0, height])
  .padding(0.05)


function render(raw) {
  let data = raw
    .sort((b, a) => +a.healthExpPerCapita - +b.healthExpPerCapita)
    .slice(0, 10)

  let maxValue = d3.max(data, d => +d.healthExpPerCapita)

  scale.domain([0, maxValue])

  let bars = svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('fill', '#000')
    .attr('width', d => scale(+d.healthExpPerCapita))
    .attr('height', scaleY.bandwidth())
    .attr('y', (d, i) => scaleY(i))
    .attr('x', 0)
}

d3.csv('../../data/oecd.csv')
  .then(sculptData)
  .then(render)
