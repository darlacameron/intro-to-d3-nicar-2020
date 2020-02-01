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

If things are working properly, you’ll see an object. If you click on it you’ll see a long list of functions. This is the d3 API! It looks overwhelming, but don’t worry, we’ll focus on learning the most important functions today.

The first function in the API we will use is `select()`. [docs][2] Type the following in the console:

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

	let svg = d3.select('body')
	  .append('svg')
	  .attr('width', 500)
	  .attr('height', 300)

A neat thing that streamlines our D3 code is that both `.append()` and `.attr()` return a Selection, so we can call the next function directly on the Selection the previous function returned in a daisy-chained fashion. To get this code running, add the following line to `index.html` in the `<body>` right after the script tag with d3:

	<script src="script.js"></script>

Refresh your browser and look in the Elements tab of the devtools to check if the `<svg>` is there. Note that the script tag with your code needs to go after the d3 tag because it is expecting that d3 is already loaded on the page.

#### Exercise
Using the `.append()` and `.attr()` functions, recreate the SVG you wrote by hand in exercise 1, but this time entirely in JavaScript. Write this code in `script.js`. Delete everything from that file except for the `svg` that you just added.
---- 
When you were writing code to draw the circles, did it feel like you were repeating yourself? It’s a good instinct to have when you are coding — perhaps the code you just wrote could be streamlined by writing parts of it in a for loop. We could do that, but d3 has a better way. It involves attaching data to your selection.

Let’s write an array containing data specifying the size and location of the snow person’s  circles:

	let snowData = [
	  {'r': 60, 'cx': 150, 'cy': 230},
	  {'r': 40, 'cx': 150, 'cy': 150},
	  {'r': 30, 'cx': 150, 'cy': 90}
	]

Now we will attach this data to a selection using `.selectAll()` which is a version of `.select()` that works with multiple elements. In `script.js` write the following:

	let circleSelection = d3.selectAll('circle')

Now wait a minute! There aren’t any `<circle>`s in the DOM to select. It’s empty. Think of it as a placeholder. We can attach the data using the Selection’s [`.data()` function][3]:

	let circleSelectionWithData = circleSelection.data(snowData)

Now `circleSelectionWithData` is a special kind of Selection with some extra functions that will help us update the DOM. The one we will use for now is `.enter()`.

	let circleEnterSelection = circleSelectionWithData.enter()

This gives a special selection, one that represents only nodes that are “entering” the DOM, that is, elements representing entries in the array passed to `.data()` that don’t already exist in the DOM. Since there weren’t any circles in the DOM already, that means we have a node for every element in `snowData`. Now let’s draw some circles with the familiar `.append()` function.

	let circles = circleEnterSelection.append('circle')
	// now we call the function to trigger it
	circles

Nothing will show up yet, but if you look in your inspector, you should see some `<circle>`s inside your `<svg>`.

Did that seem like a lot of typing? We did that as an exercise to see the kind of Selection each different function returns. When we are writing this code in real life, we often choose to skip over storing the intermediate Selections in variables. Replace the code above with this:

	let circles = svg.selectAll('circle')
		.data(snowData)
		.enter()
		.append('circle')

That’s a bit better. There’s an even more streamlined way to write this with `.join()` replacing `.enter().append()`:

	let circles = svg.selectAll('circle')
		.data(snowData)
		.join('circle')

For our purposes, this does the same thing. We will return to `.join()` in the future.

To fill out the `<circle>` attributes we need, we can use `.attr()` with a twist: that second argument representing the value of the attribute can be a function rather than a literal. D3 will call this function for us and will pass in arguments with the datum (or entry in the data array) and index value. Try it:

	circles.attr('cx', function(datum, index) {
		console.log(datum, index);
		return datum.cx
	});

This syntax can get cumbersome, so I like to use the arrow function shorthand for this, along with `d` and `i` as conventions instead of writing out `datum` and `index`:

	circles.attr('cx', (d, i) => d.cx)

And if you don’t need the index it gets even shorter:

	circles.attr('cx', d => d.cx)

#### Exercise
Draw the snow person’s circles using the `.enter()` pattern described above. 
---- 
D3’s data joins are the trickiest, most counter-intuitive part to understand. Now that we have begun to practice them, let’s bring in some real data.

[1]:	https://github.com/d3/d3-selection
[2]:	https://github.com/d3/d3-selection#select
[3]:	https://github.com/d3/d3-selection#selection_data