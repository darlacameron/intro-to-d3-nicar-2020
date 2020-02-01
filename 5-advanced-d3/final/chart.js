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

let axisG = svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0, -5)')

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

  axisG
    .transition()
    .call(axis)

  let bars = svg.selectAll('rect')
    .data(data, d => d.name)
    .join(
      enter => enter.append('rect')
        .attr('height', scaleY.bandwidth())
        .attr('x', 0)
        .attr('width', d => scaleX(+d.healthExpPerCapita))
        .attr('y', (d, i) => scaleY(i)),
      update => update,
      exit => exit.call(exit => exit.transition()
        .style('opacity', 0)
        .remove())
    )
    .transition()
    .attr('width', d => scaleX(+d.healthExpPerCapita))
    .attr('y', (d, i) => scaleY(i))


  let text = svg.selectAll('text.country-label')
    .data(data)
    .join('text')
    .attr('class', 'country-label')
    .attr('y', (d, i) => scaleY(i))
    .attr('dx', -3)
    .attr('dy', scaleY.bandwidth() / 2 + 5)
    .style('text-anchor', 'end')
    .text(d => d.name)
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
    console.log(dataYears);
    d3.interval(() => {
      render(dataYears[++year])
      // loop back to 1970 after 2015
      if (year === 2015) year = 1970;
    }, 1000)
    render(dataYears[year])
  })


/* /*svg.selectAll('rect')
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
  .attr('y', (d, i) => i * 25) */
