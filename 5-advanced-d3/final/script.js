// Margin convention
let chartContainer = d3.select('div#chart')
let margin = {top: 60, right: 10, left: 120, bottom: 10}
let width = chartContainer.node().clientWidth - margin.right - margin.left
let height = 500 - margin.top - margin.bottom

const DURATION = 1000

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let scaleX = d3.scaleLinear()
  .range([0, width])

let scaleY = d3.scaleBand()
  .domain(d3.range(0, 10))
  .range([0, height])
  .padding(0.05)

let axis = d3.axisTop(scaleX)
  .ticks(3, '$,r')
  .tickSize(height + 15)

let axisG = svg.append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height + 5})`)

let axisLabel = svg.append('text')
  .text('Health spending per person')
  .attr('transform', `translate(${width / 2}, -40)`)
  .attr('text-anchor', 'middle')

let yearLabel = svg.append('text')
  .attr('transform', `translate(-20, -10)`)
  .style('font-size', '24px')
  .style('font-weight', 'bold')
  .attr('text-anchor', 'end')

let updateSize = () => {
  width = chartContainer.node().clientWidth - margin.right - margin.left
  chartContainer.select('svg').attr('width', width + margin.right + margin.left)
  scaleX.range([0, width])
  axisLabel.attr('transform', `translate(${width / 2}, -30)`)
}

let render = (raw) => {
  let data = raw
    .sort((b, a) => +a.healthExpPerCapita - +b.healthExpPerCapita)
    .slice(0, 10)

  let maxValue = d3.max(data, d => +d.healthExpPerCapita)

  scaleX
    .domain([0, maxValue])

  axisG
    .transition()
    .duration(DURATION)
    .ease(d3.easePolyOut)
    .call(axis)

  let bars = svg.selectAll('rect')
    .data(data, d => d.name)
    .join(
      enter => enter.append('rect')
        .attr('height', scaleY.bandwidth())
        .attr('x', 0)
        .attr('width', d => scaleX(+d.healthExpPerCapita))
        .attr('y', (d, i) => scaleY(i))
        .attr('transform', 'translate(-50, 0)')
        .attr('opacity', 0)
        .attr('fill', 'teal'),
      update => update.attr('fill', 'silver'),
      exit => exit.call(exit => exit.transition()
        .duration(DURATION - 50)
        .ease(d3.easePolyOut)
        .attr('transform', 'translate(-50, 0)')
        .attr('fill', 'salmon')
        .style('opacity', 0)
        .remove())
    )
    .transition()
    .duration(DURATION)
    .ease(d3.easePolyOut)
    .delay((d, i) => i * 75)
    .attr('transform', 'translate(0, 0)')
    .attr('opacity', 0.5)
    .attr('width', d => scaleX(+d.healthExpPerCapita))
    .attr('y', (d, i) => scaleY(i))

  let text = svg.selectAll('text.country-label')
    .data(data, d => d.name)
    .join(
      enter => enter.append('text')
        .attr('class', 'country-label')
        .attr('y', (d, i) => scaleY(i))
        .attr('dx', -3)
        .attr('dy', scaleY.bandwidth() / 2 + 5)
        .attr('fill', 'teal')
        .attr('transform', 'translate(-50, 0)')
        .attr('opacity', 0)
        .style('text-anchor', 'end')
        .text(d => d.name),
      update => update.attr('fill', 'black'),
      exit => exit.call(exit => exit.transition()
        .duration(DURATION - 50)
        .ease(d3.easePolyOut)
        .attr('transform', 'translate(-50, 0)')
        .attr('fill', 'salmon')
        .attr('opacity', 0).remove())
    )
    .transition()
    .duration(DURATION)
    .ease(d3.easePolyOut)
    .delay((d, i) => i * 75)
    .attr('transform', 'translate(0, 0)')
    .attr('opacity', 1)
    .attr('y', (d, i) => scaleY(i))
}

function sculptData(raw) {
  let data = raw.map(d => {
    d.healthExpPerCapita = +d.healthExpPerCapita
    d.year = +d.year
    return d
  })

  let dataYears = d3.nest()
    .key(d => d.year)
    .object(data)

  let dataCountries = d3.nest()
    .key(d => d.name)
    .entries(data)

  return dataYears;
}

d3.csv('../../data/oecd.csv')
  .then(sculptData)
  .then(dataYears => {
    let year = 1970;
    let renderNextYear = () => {
      yearLabel.text(year)
      render(dataYears[year])
      if (++year > 2015) year = 1970;
    }
    renderNextYear();
    d3.interval(renderNextYear, DURATION * 2);
  })

window.onresize = updateSize
