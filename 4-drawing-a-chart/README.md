# Drawing a chart

What we’ve done so far is cool, but it’s not a chart yet. Our visual is meaningless without axes and labels. So let’s add some.

## Margin convention

First of all, we need to a make some space for axes. You can do this in many ways, but there is one so common we refer to it here as the Margin Convention.

First, define an object representing the width of the margins

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

	let svg = d3.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)

To actually account for the margin, we need to introduce a new SVG concept: `<g>`. It’s a grouping element. They are invisible, but we can use them to translate all the content inside them. As an added benefit, they keep our SVG structure organized, so it’s easier to find what you are looking for while inspecting with your dev tools. 

We also need to use the `transform` attribute. This is a powerful tool which you can use to rotate and skew your image. All we need to do right now is translate. The syntax looks like this `translate(10, 10)` to move an object 10px left and 10px down.

Let’s append a `<g>` and translate it now:

	let svg = d3.select('body')
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

Now that we have room for axes, let’s draw some. D3 provides a handy generator to draw SVG axes.

