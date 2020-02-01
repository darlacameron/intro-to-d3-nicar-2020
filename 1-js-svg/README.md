# JS + SVGs
We'll start class by introducing a few useful advanced JavaScript functions, and move into SVGs.

## Four advanced JS concepts that are good to know for D3
- D3 requires JavaScript. Here's why: it's relatively easy to duplicate one of the cool-looking [examples](https://github.com/d3/d3/wiki/Gallery) in D3's documentation. But without a working knowledge of how to manipulate data in JS, it's much harder to adapt those examples to your data.
- For JS basics, see the first section of the [2019 D3 class at NICAR](https://github.com/csessig86/intro-to-d3-nicar-19/tree/master/01-intro-to-js) JS wasn't a prerequisite last year, so they covered it more than we will today. The free e-book [Eloquent Javascript](https://eloquentjavascript.net/) is also a way place to learn.

1. [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are a shorter way of writing repeatable blocks of code.
```javascript
let sandwiches = [
  'PoBoy',
  'Muffuletta',
  'Burger'
];

// regular function returns the array: [5, 10, 6]
sandwiches.map(function(sandwich) {
  return sandwich.length;
});

// a shorter arrow function also returns the array: [5, 10, 6]
console.log(sandwiches.map(sandwich => sandwich.length));
```

Arrow functions can make your code much more consise. Here's an preview that you'll try out a bit later in class:
```javascript
//regular function
circles.attr('cx', function(datum, index) {
	console.log(datum, index);
	return datum.cx
});

// arrow function
// the parameters "datum" and "index" is replaced with "d" and "i"
// = > replaces return 
circles.attr('cx', (d, i) => d.cx)
```

2. [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) allow you embed expressions in your JS as placeholders. It makes it easier to return multi-line strings, and makes your code more readable.
```javascript
let a = 5;
let b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

- Template literals are enclosed by the backtick (` `)  (grave accent) character instead of double or single quotes.
- Expressions within the template literal are enclosed by a dollar sign and curly braces `${expression}`

Here's an example of template literals in the wild that we'll work with later in class. (It also includes chained functions, which we'll discuss in step 4!)
```javascript
//in the last line, a template literal allows us to embed an expression from higher up in the code
let svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top}`)
```

3. [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are a way to load files that you need, such as JSON, more efficiently. Behind the scenes, functions like `d3.csv()` secretly use promises.  
```javascript
let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout( function() {
    resolve("Success!")  // Yay! Everything went well!
  }, 250) 
}) 

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage) 
});
```

4. [Chained functions](https://www.tutorialsteacher.com/d3js/method-chaining-in-d3js) are frequently seen in D3 to keep code neat and tidy.
```javascript
// standard JS
document.querySelector("#myDiv").text("Some text").attr("style", "color:red")

//d3
d3.select("body").append("p").text("Hello World!");
```

## Intro to SVGs
SVG stands for **scalable vector graphic** and it's an XML format that we often use to draw two-dimensional shapes in D3. D3 comes with handy generators to help you draw into specific chart elements and shapes, such as circle, line, area, stack, arc, pie and symbol. These are great assists, but none of D3 is magic — it's all code written to generate and manipulate SVGs with data.

#### How SVGs work:
- SVGs have tags and look a lot like HTML, but they have different attributes and enable us to use geometry to draw shapes. Here's an example:
```html 
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```
- SVGs are two dimensional, and we can use them to chart  on an X and Y plane. Here, `cx` is the x location of the circle, `cy` is the x location and `r` is the radius. 
- SVGs uses style attributes that are similar to HTML and CSS but just different enough to be annoying sometimes. Note the use of `stroke-width` instead of `border`! SVGs also take style attributes, so they can be styled with CSS via classes and IDs. Here's documentation on possible [SVG style attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute) in case you want to learn more.

#### SVG Drawing Exercise
- Your first exercise is writing code to draw SVGs by hand. You'll write your SVG code directly in the `index.html` file in this folder.
- Start by navigating to `localhost:8080/1-js-svg/` in your browser and loading `1-intro-d3/index.html` in a text editor.
- First, take a couple minutes with your partner to look at this tutorial on [paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
- Then, in the index.html file of this folder, draw at least two different path shapes in an SVG. You can draw any shape you'd like — try this [conference hotel building](https://www.marriott.com/hotels/travel/msyla-new-orleans-marriott/) or a snowman! 

Once you're done drawing your shapes, here's a couple examples to add to your code. Two rectangles:
```html
<rect x="150" y="0" width="100" height="130" style="fill:black;"/>
<rect x="130" y="130" width="140" height="10" style="fill:black;"/>
```

And a triangle. (Check out the file in `final/index.html` to see these shapes in context!)
```html 
<path d="M 200,230 L
      230,240 L
      200,250 z" 
	style="fill:orange;" />
```

#### Pro tip:
> Adobe Illustrator reads SVGs, and the New York Times graphics team made a great Chrome plugin called [SVG Crowbar](https://nytimes.github.io/svg-crowbar/) that makes it easy to export an SVG from a webpage and open it in Illustrator. A workflow that we like is drawing a crazy shape in D3, Crowbar'ing it out of the browser, editing in Illustrator and publishing with [ai2html](http://ai2html.org/), another free tool from NYT graphics. Here's [an example](https://www.washingtonpost.com/graphics/politics/kushner-conflicts/?utm_term=.8bbce7210bc5) from Darla's days at the Post. 

### Next, we'll start using D3!



