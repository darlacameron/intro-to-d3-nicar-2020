# Intro to D3

As we mentioned earlier, D3 is a big collection of modules, each of which can work on their own. To start, we will focus on a module that lets us modify the DOM. It’s called d3-selection. 

[Link: Documentation for d3-selection][1]

Let’s get started by navigating to `localhost:8000/2-intro-d3/` in your browser and loading the `2-intro-d3/index.html` in your text editor.

To include d3.js, write the following line inside the `<body>` tag.

\<script src=“../d3/d3.js"\>\</script\>

The `../` tells the browser to look one directory up, because that’s where we’ve included the d3 files relative to `index.html` in this particular project.

#### Pro Tip: 
> d3.js weighs in at 511kb, which is pretty hefty for a JavaScript library. Fortunately, the minified version `d3.min.js` is half the size. And if you are using a build system like Webpack, you may be able to cut the size down even further by only including the modules you actually use.

The d3-selection module is included in d3 by default. So if d3 is loaded properly we are ready to go. You check by opening the console and typing

d3

If things are working properly, you’ll see an object. If you click on it you’ll see a long list of functions. This is the d3 API! It looks overwhelming, but don’t worry, we’ll focus on learning the most important functions today.

The first function in the API we will use is `select()`. [docs][2] Type the following in the console:

d3.select(‘body’)

This returns an object of the class Selection. If you explore this object you will see that it contains the `<body>` DOM element. Let’s modify it a bit with Selection’s `.html()` function:

d3.select(‘body’).html(‘\<h1\>Hello, world\</h1\>’)

We can also append new DOM elements to the Selection using `.append()`:

let svg = d3.select(‘body’).append(‘svg’)

Now we have a stored a Selection representing an `<svg>` in a variable. Let’s modify the attributes of this SVG using the `.attr()` function:

svg.attr(‘width’, 500)
svg.attr(‘height, 300)

You can pass anything you want to the `.append()` and `.attr()` functions. Try it!

svg.append(‘madeuptag’)
.attr(‘madeupattr’, ‘madeupvalue’)

Check out the Element tab in your devtools to see what happened. Of course, 

That’s enough of the console for now. Let’s write some code in the repo. Create a new file called `script.js` and write the following:

let svg = d3.select(‘body’)
  .append(‘svg’)
  .attr(‘width’, 500)
  .attr(‘height, 300)

A neat thing that streamlines our D3 code is that both `.append()` and `.attr()` return a Selection, so we can call the next function directly on the Selection the previous function returned in a daisy-chained fashion. To get this code running, add the following line to `index.html` in the `<body>` right after the script tag with d3:

\<script src=“script.js”\>\</script\>

Refresh your browser and look in the Elements tab of the devtools to check if the `<svg>` is there. Note that the script tag with your code needs to go after the d3 tag because it is expecting that d3 is already loaded on the page.

#### Exercise
Using the `.append()` and `.attr()` functions, recreate the SVG you wrote by hand in the previous step, but this time entirely in JavaScript. Write this code in `script.js`.





[1]:	https://github.com/d3/d3-selection
[2]:	https://github.com/d3/d3-selection#select