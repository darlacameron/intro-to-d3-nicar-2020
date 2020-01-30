// Margin convention
let margin = {top: 30, right: 10, left: 200, bottom: 10}
let width = 700 - margin.right - margin.left
let height = 500 - margin.top - margin.bottom

// because we are hot loading:
if (window.timer) window.timer.stop()
d3.selectAll('svg').remove()

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let scale = d3.scaleLinear()
  .range([0, width])

let heading = d3.select('h1')

let axisG = svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0, -5)')

let axis = d3.axisTop(scale)

let render = (raw) => {
  let data = raw
    .sort((b, a) => +a.healthExpPerCapita - +b.healthExpPerCapita)
    .slice(0, 15)

  let maxValue = d3.max(data, d => +d.healthExpPerCapita)

  scale.domain([0, maxValue])

  axisG.transition().call(axis)

  svg.selectAll('rect')
    .data(data, d => d.name)
    .join(
      enter => enter.append('rect')
        .attr('height', 0)
        .style('fill', '#000')
        .style('opacity', 0)
        .attr('width', d => scale(+d.healthExpPerCapita))
        .attr('transform', (d, i) => `translate(0, ${i * 25})`)
        ,
      update => update,
      exit => exit
        .call(exit => exit.transition()
          .style('opacity', 0)
          .remove())
    )
    .transition()
      .style('opacity', 1)
      .attr('width', d => scale(+d.healthExpPerCapita))
      .attr('height', 20)
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)

  svg.selectAll('text.country-label')
    .data(data, d => d.name)
    .join(
      enter => enter.append('text')
        .attr('class', 'country-label')
        .attr('dx', -3)
        .attr('dy', 16)
        .style('opacity', 0)
        .attr('y', (d, i) => i * 25)
        .style('text-anchor', 'end')
        .text(d => d.name),
      update => update,
      exit => exit
        .call(exit => exit.transition()
          .style('opacity', 0)
          .remove())
    )
    .transition()
    .style('opacity', 1)
    .attr('y', (d, i) => i * 25)
}

d3.csv('../../data/oecd.csv').then(raw => {
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

  let year = 1970

  window.timer = d3.interval(() => {
    heading.text(year)
    render(dataYears['$' + year])
    year += 1
    if (year > 2015) year = 1970
  }, 1000)
})
