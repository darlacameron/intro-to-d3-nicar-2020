# Intro to D3

As we mentioned earlier, D3 is a big collection of modules, each of which can work on their own. To start, we will focus on a module that lets us modify the DOM. It’s called d3-selection.

[Link: Documentation for d3-selection][1]

Let’s get started by navigating to `localhost:8080/2-intro-d3/` in your browser and loading the `2-intro-d3/index.html` in your text editor.

To include d3.js, write the following line inside the `<body>` tag.

	<script src="../d3/d3.js"></script>

The `../` tells the browser to look one directory up, because that’s where we’ve included the d3 files relative to `index.html` in this particular project.

----
#### Pro tip:
> d3.js weighs in at 511kb, which is pretty hefty for a JavaScript library. Fortunately, the minified version `d3.min.js` is half the size. And if you are using a build system like Webpack, you may be able to cut the size down even further by only including the modules you actually use.
----

The d3-selection module is included in d3 by default. So if d3 is loaded properly we are ready to go. You check by opening the console and typing

	d3

![GIF of devtools](https://github.com/darlacameron/intro-to-d3-nicar-2020/blob/master/img/Feb-02-2020%2020-45-13.gif?raw=true)


If things are working properly, you’ll see an object. If you click on it you’ll see a long list of functions. This is the d3 API! It looks overwhelming, but don’t worry, we’ll focus on learning the most important functions today.

The first function in the API we will use is `select()`[2]. Type the following in the console:

	d3.select('body')

This returns an object of the class Selection. If you explore this object you will see that it contains the `<body>` DOM element. Let’s modify it a bit with Selection’s `.html()` function:

	d3.select('body').html('<h1>Hello, world</h1>')

We can also append new DOM elements to the Selection using `.append()`:

	let svg = d3.select('body').append('svg')

Now we have a stored a Selection representing an `<svg>` in a variable. Let's modify the attributes of this SVG using the `.attr()` function:

	svg.attr('width', 500)
	svg.attr('height', 300)

You can pass anything you want to the `.append()` and `.attr()` functions. Try it!

	svg.append('notarealtag')
	  .attr('madeupattr', 'lol')

Check out the Element tab in your devtools to see what happened.

That’s enough of the console for now. Let’s write some code in the repo. Create a new file called `script.js` in this folder and write the following:

	let chartContainer = d3.select('div#chart')
	let width = 700
	let height = 500

	let svg = chartContainer
	  .append('svg')
	  .attr('width', width)
	  .attr('height', height)

A neat thing that streamlines our D3 code is that both `.append()` and `.attr()` return a Selection, so we can call the next function directly on the Selection the previous function returned in a daisy-chained fashion. To get this code running, add the following line to `index.html` in the `<body>` right after the script tag with d3:

	<script src="script.js"></script>

Refresh your browser and look in the Elements tab of your developer tools to check if the `<svg>` is there. Note that the script tag with your code needs to go after the d3 tag because it is expecting that d3 is already loaded on the page.

### Exercise

Using the `.append()` and `.attr()` functions, recreate the SVG you wrote by hand in exercise 1, but this time entirely in JavaScript. Write this code in `script.js`. Delete everything from that file except for the `svg` that you just added.

----

When you were writing code to draw the rects, did it feel like you were repeating yourself? It’s a good instinct to have when you are coding — perhaps the code you just wrote could be streamlined by writing parts of it in a for loop. We could do that, but D3 has a better way. It involves attaching data to your selection.

Let’s write an array containing data specifying the size and location of the \<rect\>s making up your hotel. This is just an example, use the values you actually chose in your SVG:

	let hotelData = [
	  {width: 270, height: 70, x: 100, y: 330},
	  {width: 70, height: 150, x: 150, y: 250},
	  {width: 70, height: 300, x: 300, y: 100}
	]

Now we will attach this data to a selection using `.selectAll()` which is a version of `.select()` that works with multiple elements. In `script.js` write the following:

	let rectSelection = d3.selectAll('rect')

Now wait a minute! There aren’t any `<rect>`s in the DOM to select. It’s empty. Think of it as a placeholder. We can attach the data using the Selection’s [`.data()` function][3]:

	let rectSelectionWithData = rectSelection.data(hotelData)

Now `rectSelectionWithData` is a special kind of Selection with some extra functions that will help us update the DOM. The one we will use for now is `.enter()`.

	let rectEnterSelection = rectSelectionWithData.enter()

This gives a special selection, one that represents only nodes that are “entering” the DOM, that is, elements representing entries in the array passed to `.data()` that don’t already exist in the DOM. Since there weren’t any rects in the DOM already, that means we have a node for every element in `hotelData`. Now let’s draw some rects with the familiar `.append()` function.

	let rects = rectEnterSelection.append('rect')

Nothing will show up yet, but if you look in your inspector, you should see some `<rect>`s inside your `<svg>`.

Did that seem like a lot of typing? We did that as an exercise to see the kind of Selection each different function returns. When we are writing this code in real life, we often choose to skip over storing the intermediate Selections in variables. Replace the code above with this:

	let rects = svg.selectAll('rect')
	  .data(hotelData)
	  .enter()
	  .append('rect')

That’s a bit better. There’s an even more streamlined way to write this with `.join()` replacing `.enter().append()`:

	let rects = svg.selectAll('rect')
	  .data(hotelData)
	  .join('rect')

For our purposes, this does the same thing. We will return to `.join()` in the future.

To fill out the `<rect>` attributes we need, we can use `.attr()` with a twist: that second argument representing the value of the attribute can be a function rather than a literal. D3 will call this function for us and will pass in arguments with the datum (or entry in the data array) and index value. Try it:

	rects.attr('width', function(datum, index) {
	  console.log(datum, index);
	  return datum.width
	});

This is what is know as an *accessor function*.

This syntax can get cumbersome, so I like to use the arrow function shorthand for this, along with `d` and `i` as conventions instead of writing out `datum` and `index`:

	rects.attr('width', (d, i) => d.width)

And if you don’t need the index it gets even shorter:

	rects.attr('width', d => d.width)

#### Exercise

Finish drawing the hotel using the `.enter()` pattern described above.

----
D3’s data joins are the trickiest, most counter-intuitive part to understand. Now that we have begun to practice them, let’s bring in some real data.

[1]:	https://github.com/d3/d3-selection
[2]:	https://github.com/d3/d3-selection#select
[3]:	https://github.com/d3/d3-selection#selection_data
