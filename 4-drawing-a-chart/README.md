# Drawing a chart

What we’ve done so far is cool, but it’s not a chart yet. Our visual is meaningless without axes and labels. So let’s add some.

If your chart from step 3 is caught up with the example in `3-sculpting-data/final`, then great! You can keep working in the file from step 3. If you're a bit behind, no worries. In your text editor, open up `3-sculpting-data/final/chart.js` and start with that file.

## Margin convention

First of all, we need to a make some space for axes. You can do this in many ways, but there is one so common we refer to it here as the [Margin Convention][1].

![Diagram illustrating the margin convention][image-1]

First, working near the top of `script.js` outside of any functions, define an object representing the width of the margins

	let margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	}

Next, define the width and height. This setup is a bit counterintuitive at first, but the idea is the number you start with is the total width of the chart, but the number you put in the variable is the amount of space for just the data portion.

	let width = 500 - margin.left - margin.right
	let height = 300 - margin.top - margin.bottom

Since we still want the total dimension of our SVG to be 500 x 300, we need to add the margins back in when setting up the SVG.

	let svg = chartContainer
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)

To actually account for the margin, will use the `<g>` grouping element and the `transform` attribute to move an object 10px left and 10px down.

Let’s append a `<g>` and translate it now:

	let svg = chartContainer
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top}`)

We told you those template literals would come in handy!

So far this Margin Convention seems dubiously worth its while, but where it begins to pay off is with our scales. Update them as follows:

	scaleX.range([0, width])
	scaleY.range([0, height])

Simple!

## Axes

Now that we have room for axes, let’s draw some. D3 provides handy generators to draw SVG axes.

[Link: documentation for d3-axis][2]

The three generators we use most often are `d3.axisLeft()`, `d3.axisBottom()`, and `d3.axisTop()`. The position in the name refers to the orientation of the axis relative to the chart. In this case, lets use `d3.axisTop()`. The generator takes an argument which is the d3 scale we want to display on the axis.

	let axis = d3.axisTop(scaleX)

Let’s draw our axis inside a `<g>`. We will give this `<g>` a class “axis,” nudge it up a smidgen, and finally invoke the axis generator on our selection with `.call()`.

	let axisG = svg.append('g')
		.attr('class', 'axis')
	    .attr('transform', 'translate(0, -5)')
	    .call(axis)

If you want to learn more about how `selection.call()` behaves, [check out the documentation][3].

The axis is now on the page! But if might be cut off a bit if our `margin.top` isn’t big enough. Try increasing it until the entire axis is visible.

## Customizing the axis

D3’s default axis design isn’t for everyone. You will likely need to customize it a bit to match your house styles.

First of all lets customize the number and format of the ticks with [`.ticks()`][4]:

	let axis = d3.axisTop(scaleX)
	  .ticks(3, '$,r')

This tells D3 we want about 3 ticks (D3 chooses “nice” values for these, so the exact count may vary) with numbers formatted as currency with commas and decimal notation. These format codes are documented in [the d3-format module][5].

Next, lets kill that horizontal axis line. We can do this with CSS. Open `style.css` and write the following:

	.axis path {
		display: none;
	}

While we are at it, lets make the tick labels a bit larger and the ticks themselves more subtle.

	.axis text {
		font-size: 14px;
	}
	
	.axis line {
		stroke: #bbb;
	}

Finally, lets make the axis tick extend across the entire chart.

	let axis = d3.axisTop(scaleX)
	  .ticks(3, '$,r')
	  .tickSize(height)

And change `axisG`’s transform:
	.attr('transform', `translate(0, ${height - 5})`)

## Labels

To finish our axis, we need to add text describing what it is showing. We can do this with the SVG `<text>` element. To write text, use the `.text()` function. In our transform, the margin convention pays off again: centering is as easy as an x offset of `width / 2`. Another way to nudge your `<text>` position is with the `dx` and `dy` attributes.

	svg.append('text')
	    .text('Health spending per person')
	    .attr('transform', `translate(${width / 2},0)`)
		.attr('dy', -30)
	    .attr('text-anchor', 'middle')

### Exercise
Using a data join, label each bar with the name of its country. Hint: follow the code you wrote to draw the bars as an example.

[1]:	https://bl.ocks.org/mbostock/3019563
[2]:	https://github.com/d3/d3-axis
[3]:	https://github.com/d3/d3-selection#selection_call
[4]:	https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat
[5]:	https://github.com/d3/d3-format
[6]:	https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor

[image-1]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/chart-convention.png
