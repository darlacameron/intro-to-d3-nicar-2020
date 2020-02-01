let chartContainer = d3.select('div#chart')
let width = 700
let height = 500

let svg = chartContainer
  .append('svg')
    .attr('width', width)
    .attr('height', height)

let scale = d3.scaleLinear()
  .range([0, width])

let scaleY = d3.scaleBand()
  .domain(d3.range(0, 10))
  .range([0, height])
  .padding(0.05)

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

function render(raw) {
  let data = raw
    .sort((b, a) => +a.healthExpPerCapita - +b.healthExpPerCapita)
    .slice(0, 10)

  let maxValue = d3.max(data, d => +d.healthExpPerCapita)

  scale.domain([0, maxValue])

  let bars = svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('width', d => scale(+d.healthExpPerCapita))
    .attr('height', scaleY.bandwidth())
    .attr('y', (d, i) => scaleY(i))
    .attr('x', 0)
}

d3.csv('../../data/oecd.csv')
  .then(sculptData)
  .then(render)
