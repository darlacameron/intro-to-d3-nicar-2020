# Sculpting data

As data journalists, we have to work with data in a variety of shapes: tidy and wide, flat and nested. When we are working with d3, however, the best shape for our data is one that matches the structure of the document we are creating with it. Fortunately, JavaScript and d3 come with some good tools for re-shaping our data. 

But first, let’s use d3 to load some real data into the browser. The functions we are using are in the `d3-fetch` module. 

[Link: documentation for `d3-fetch`][1]

TODO: Darla proposes giving them the starter index and script files here, maybe even with a function sculptData() to get started with. I forsee trouble with var scoping if they don't know where to put each line of the teaching code.

Let’s get started by navigating to `localhost:8080/3-sculpting-data/` in your browser and loading the `3-sculpting-data/script.js` in your text editor.

The data we are trying to load is CSV-formatted. It's located in the `data` folder for the class. To load and parse it into useful data, we can use [`d3.csv()`][2].

	d3.csv('../data/oecd.csv')
		.then(data => {
			console.log('Data is ready:', data);
		})

`d3.csv()` returns a Promise which loads and parses our data. The function we pass to `.then()` will be called when our data is ready to use. 

Now we have data. Let’s examine the structure of one entry in the array, noting the variable names and what type they are.


TODO this next step throws an error for darla- data isn't defined, and it's not clear where to put the map. should it go inside the "then"? same with australia.

Let’s use `.map()` to transform the type of one of those variables

	data = data.map(d => {
		d.healthExpPerCapita = +d.healthExpPerCapita
		return d
	})

and `.filter()` to limit the data to just one country

	australia = data.filter(d => d.name === 'Australia')

and `.sort()` to re-order the data

TODO this sort should be on australia instead of data, right?
	sortedByYear = data.sort((a, b) => a.year - b.year)

On top of built-in JavaScript array methods, D3 provides some useful methods of its own in [d3-array][3].

You can do all kinds of fancy statistics with these methods, but for now we will stick to some simple ones that are useful when making charts, like finding minimum and maximum values in an array.

	let minVal = d3.min(data, d => d.lifeExpectancy)
	let minCountry = d3.least(data, d => d.lifeExpectancy)
	let maxVal = d3.max(data, d => d.lifeExpectancy)
	let maxCountry = d3.greatest(data, d => d.lifeExpectancy)
	let extentVal = d3.extent(data, d => d.lifeExpectancy)

To better match the structure of our chart, we often want to group data into nested structures, which we can do with [`d3.nest()`][4]. The syntax is a bit wonky, but once you learn how to use it, you’ll find it really useful.

Shan Carter built a tool called Mister Nester for trying out `d3.nest()` . We’ve given you a version in this repo, so go check it out now: [/mister-nester/][5]

TODO: more instructions around nest()

Let’s nest our data by year:

	groupedByYear = d3.nest()
	  .key(d => d.year)
	  .map(data)

---- 
#### Nerd note

Mike Bostock has indicated that `d3.nest()` is deprecated. In d3 version 6.0, there will be a new `d3-array` method [`d3.group()`][6]. To be honest, `d3.group()` looks a bit more straightforward than `d3.nest()` but some of us grew up with and will always be nostalgic for `d3.nest()`. You won’t have to switch over to 6.0 as soon as it comes out, but it is good to know that this is on the horizon.
---- 

## Scales
In order to make a chart, we need to do one more kind of data transformation. We need to translate values from our data range into the pixel space available in the SVG. The [`d3-scale` module][7] provides methods for doing this. There are a ton of scales provided, but we’ll focus on just a few today.

Let’s try `.scaleLinear()` to make an x axis scale for our chart:

	let scaleX = d3.scaleLinear()

For this scale to be useful, we need to define the domain of values (this may cause flashbacks to high school math).

	scaleX.domain([0, maxVal])

Try it out:

	console.log(scaleX(0), scaleX(50), scaleX(maxVal))

The scale also has a range, which we can see is set by default to `[0, 1]`. Most of the time, we want this to range to represent something about our visualization. In this case, the scale represents the x axis, so the range should be the width of the chart.

	scaleX.range([0, 500])

Now try this again:

	console.log(scaleX(0), scaleX(50), scaleX(maxVal))

We also need a scale for the y axis. We are going to be making a bar chart, and `d3.scaleBand` gives a us a nice way to figure out how wide our bars should be. In this case the domain is `d3.range(0, 10)`. Try that it in the console to see what it returns. There is one more function here `.padding()` which sets the proportion of white space between the bars.

	let scaleY = d3.scaleBand()
	  .domain(d3.range(0, 10))
	  .range([0, height])
	  .padding(0.05)

Before we move on, I’ll mention two more scales that I use pretty frequently. The first is [`d3.scaleTime()`][8] which is useful when your domain is time (and the type is Date). Another is [`d3.scaleSqrt()`][9] which comes in handy when you want to scale circles by their area (which you should do). 

To conclude this section, let’s make use of our data and scales with an exercise.

#### Exercise
Using the data join we learned in step 2, and the data we loaded as well as the two scales we just set up, draw a basic bar chart with SVG `<rect>`s.


[1]:	https://github.com/d3/d3-fetch
[2]:	[https://github.com/d3/d3-fetch#csv
[3]:	https://github.com/d3/d3-array
[4]:	https://github.com/d3/d3-collection#nests
[5]:	/mister-nester/
[6]:	https://github.com/d3/d3-array/#group
[7]:	https://github.com/d3/d3-scale
[8]:	https://github.com/d3/d3-scale#scaleTime
[9]:	https://github.com/d3/d3-scale#scaleSqrt