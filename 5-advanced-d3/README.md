# Advanced Joins and Transitions

If all you ever want to do with d3 is draw static charts, you already know all you need to know. But there’s a good chance you are interested in learning d3 because you saw a dynamic chart with slick transitions. To take advantage of these, we need to learn how d3 handles updating the data attached to our Selection.

Note: some of the code we will write in the following section will go inside our `render()` function and some of it will go outside. In general, only the parts of the code that depend on the data need to be inside `render()`. Now it will become important that code that should only run once should be outside `render()` because we are going to call `render()` multiple times.

Before we get started, lets add a simple interaction to our chart. First, in `index.html` add a button:

`<button>Next year</button>`

Returning to `chart.js`, find our `sculptData()` function. Remember how we grouped the data by year using `.nest()`? Lets use that now by changing the last line of the function to

	return dataYears

Now to add some interactivity. D3 selections have a `.on('event', callback)` method which we can use to do something when the user clicks. Change the `d3.csv()` code to look like this:

	d3.csv('../../data/oecd.csv')
	  .then(sculptData)
	  .then(dataYears => {
	    let year = 1970;
	    d3.select('button').on('click', () => {
	      render(dataYears[++year])
		  // loop back to 1970 after 2015
	      if (year === 2015) year = 1970;
	    })
	    render(dataYears[year])
	  })

Try clicking the button. What happens?

## Joins

We already covered “enter” phase of the data join. There are two more: “update” for nodes that already entered but are sticking around and may have new values, and “exit” for nodes that are leaving the DOM. Here’s a diagram to illustrate what each of these are doing:

![Diagram of D3 data join](https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/data-join.png)

As they say, if anything on this graphic causes confusion, ignore the entire product. For another approach to explaining data joins, I recommend reading [this Observable notebook by Mike Bostock](https://observablehq.com/@d3/selection-join).

Right now, we’ve only implemented code for the “enter” phase, so nothing happens when our data updates. Fortunately, there is an easy shorthand way to handle all the phases of the join. We’ve mentioned it before: `.join()`.

Replace your `.enter().append('rect')` code with `.join('rect')`. Do the same for `.enter().append('text')`, replacing it with `.join('text')`.

Now what happens when you click the button?

This is just a shorthand way to write the function. If we are happy with the way d3 handles the update and exit phases, then we are set. But sometimes we want more control. `.join()` can also take three functions as arguments:

	.join(
		enter => enter,
		update => update,
		exit => exit
	)

Now, if you want something to happen only on the update phase, we can make that happen. To illustrate, lets color the newly entered `<rect>`s different from the updated `<rect>`s. Replace `.join('rect')` with the following:

	.join(
	      enter => enter.append('rect')
	        .attr('fill', 'teal'),
	      update => update.attr('fill', 'silver'),
	      exit => exit.remove()
	)

What happens when we click the button now? Notice how Denmark appears on the chart. Since this is a new `<rect>` we would expect it to be salmon-colored. But instead all the rects are papayawhip, as if they were all already there before.

The issue is that D3 isn’t smart enough to know that we have a new country in our chart. We have to tell D3 that we care about tracking the countries in our join. To do this, we can pass an accessor function to `.data()`:

	let bars = svg.selectAll('rect')
	    .data(data, d => d.name)

Now, D3 will check the `name` of each country in our existing data to see if the incoming data has any new countries. Any countries that don’t exist in the new data will get `.remove()`d.

Note that those other `.attr()` calls after `.join()` can stay right where they are, so long as we want the same code to run on the “enter” and “update” phase. However, code that only has to run once when the element is first appended can get attached to `enter`. Try updating your code as follows:

	let bars = svg.selectAll('rect')
	    .data(data, d => d.name)
	    .join(
	      enter => enter.append('rect')
	        .attr('height', scaleY.bandwidth())
	        .attr('x', 0)
			.attr('fill', 'teal'),
	      update => update.attr('fill', 'silver'),
	      exit => exit.remove()
	    )
	    .attr('width', d => scaleX(+d.healthExpPerCapita))
	    .attr('y', (d, i) => scaleY(i))

## Transitions

Here’s where D3 gets really fun.

[Documentation: d3-transition][1]

Let’s add a transition right after your `.join()` call

	  let bars = svg.selectAll('rect')
	    .data(data, d => d.name)
	    .join(
	      enter => enter.append('rect')
	        .attr('height', scaleY.bandwidth())
	        .attr('x', 0),
	      update => update,
	      exit => exit.remove()
	    )
	    .transition()
	    .attr('width', d => scaleX(+d.healthExpPerCapita))
	    .attr('y', (d, i) => scaleY(i))

We can take advantage of `.join()` to create a customized “enter” transition:

	  let bars = svg.selectAll('rect')
	    .data(data, d => d.name)
	    .join(
	      enter => enter.append('rect')
	        .attr('height', scaleY.bandwidth())
			.attr('width', d => scaleX(+d.healthExpPerCapita))
	        .attr('x', 0)
	        .attr('y', (d, i) => scaleY(i))
			.attr('transform', 'translate(-50, 0)')
	        .attr('opacity', 0)
			.attr('fill', 'teal'),
	      update => update,
	      exit => exit.remove()
	    )
	    .transition()
		.attr('transform', 'translate(0, 0)')
	    .attr('opacity', 1)
	    .attr('width', d => scaleX(+d.healthExpPerCapita))
	    .attr('y', (d, i) => scaleY(i))

Updating the axis is similar:

	  axisG
	    .transition()
	    .call(axis)

One downside of `.join()` is that calling transitions inside it is a bit cumbersome. It looks like this:

	exit => exit.call(exit => exit.transition()
	        .attr('transform', 'translate(-50, 0)')
	        .attr('fill', 'salmon')
	        .style('opacity', 0)
			.remove())

Now the exiting `<rect>` will have a customized exit transition instead of suddenly disappearing.

## Customizing transitions

The most common things we want to customize about our transitions is the duration and the easing.

Transitions have a [`.duration()` method][2] that takes as an argument an number of milliseconds. Since we have a bunch of transitions that we would like to sync up, lets define a variable to store that duration. You can declare this variable however you like, but since this is a variable we don’t want to change, we can use `const` to declare it. An uppercase variable name is a longstanding programming convention for const variables.

`const DURATION = 1000`

Transitions also have an [`.ease()` method][3] that takes an easing function. These easing functions are documented in [the `d3-ease` module][4]. Transitions default to `d3.easeCubic`. Another useful easing function is `d3.easeLinear` for motion at a constant rate. A particularly fun one is `d3.easeElasticOut` – it make your transition feel bouncy.

Let’s try some now, modifying the bars `.transition()` after your `.join()`.

	.transition()
	.duration(DURATION)
	.ease(d3.easeElasticOut)

Try some different durations and easing functions and see what you like best.

One other thing you can do is delay the transition with `.delay()`. This can create a shuffling effect when we pass a function in like the following:

	.transition()
	.duration(DURATION)
	.ease(d3.easePolyOut)
	.delay((d, i) => i * 10)

Just like with PowerPoint, it is possible to overdo the transitions. Have fun for now in this workshop, but keep in mind that excessive transitions can distract from the point you are trying to make with your chart. A well-done transition helps the reader maintain continuity between the steps in your chart, but isn’t the main attraction.

#### Exercise

Update the label code to use the same `.join()` pattern as the `<rect>`s. Add transitions to the labels so they sync up with the `<rects>`.

## Animation

You may be asking, “what’s with this `<button>` nonsense?” After all, the first law of news graphic interaction design is “Nobody clicks buttons.” ([The second law being “Nobody sees your tooltips”][5]).

The upshot of this is not that we don’t do anything interactive anymore, but rather that the interactions we design should be genuinely enriching to the reader’s experience. And if we do have something we want to show the reader, we should just show it to them rather than waiting on them to interact.

So instead of making the reader click a button, lets just have the graphic automatically advance. To do this, we can use [`d3-timer`][6].

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

#### Exercise

Implement a prominent label that updates to show us what year we are looking at.

## Making your chart responsive

If it doesn’t work on mobile, it doesn’t work. We need to design charts that look good on any screen size. Fortunately, D3 makes it easy to adapt our charts to the space we have available.

First of all, we need to figure out how much space we have. Calling `.node()` on a selection gives us access to the DOM element and `.clientWidth` tells us how wide it is.

	let width = chartContainer.node().clientWidth - margin.right - margin.left

Now our chart is as wide as our screen, which looks kind of ridiculous. Let’s limit the width and center it using CSS. In `style.css`:

	#chart {
	  max-width: 980px;
	  margin: 0 auto;
	}

Let’s see what it looks like on a phone. In your developer tools click the second button from the top left to enable device toolbar mode.

Now it looks good when you first load the page, but what happens if the screen size changes? Let’s write a function to take care of this:

	let updateSize = () => {
	  width = chartContainer.node().clientWidth - margin.right - margin.left
	  chartContainer.select('svg').attr('width', width + margin.right + margin.left)
	  scaleX.range([0, width])
	  axisLabel.attr('transform', `translate(${width / 2}, -30)`)
	}

And attach it to the [`window.onresize` event][7] so that it gets called when the window size changes:

`window.onresize = updateSize`

[1]:	https://github.com/d3/d3-transition
[2]:	https://github.com/d3/d3-transition#transition_duration
[3]:	https://github.com/d3/d3-transition#transition_ease
[4]:	https://github.com/d3/d3-ease
[5]:	https://github.com/archietse/malofiej-2016/blob/master/tse-malofiej-2016-slides.pdf
[6]:	https://github.com/d3/d3-timer
[7]:	https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onresize
