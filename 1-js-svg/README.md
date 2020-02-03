# JS + SVGs
We'll start class by introducing a few useful advanced JavaScript functions, and move into SVGs.

D3 requires JavaScript, and we asked NICAR to make it a prerequisite for this class. Here's why: it's relatively easy to duplicate one of the cool-looking [examples](https://github.com/d3/d3/wiki/Gallery) in D3's documentation. But without a working knowledge of how to manipulate data in JS, it's much harder to adapt those examples to your data. We won't cover JS basics here today, but if you need a refresher, the first section of the [2019 D3 class at NICAR](https://github.com/csessig86/intro-to-d3-nicar-19/tree/master/01-intro-to-js) is helpful. The free e-book [Eloquent Javascript](https://eloquentjavascript.net/) is also a great place to learn.

## Four advanced JS concepts that are good to know for D3


1. [Arrow functions][4] are a shorter way of writing repeatable blocks of code.

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

2. [Template literals][5] allow you embed expressions in your JS as placeholders. It makes it easier to return multi-line strings, and makes your code more readable.
```javascript
let a = 5;
let b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

- Template literals are enclosed by the backtick (\` \`)  (grave accent) character instead of double or single quotes.
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

3. [Promises][6] are a way to load files that you need, such as JSON, more efficiently. Behind the scenes, functions like `d3.csv()` secretly use promises.  

```javascript
let myFirstPromise = new Promise((resolve, reject) =\> {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout( function() {
```
resolve("Success!")  // Yay! Everything went well!
```
  }, 250)
})

myFirstPromise.then((successMessage) =\> {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage)
});
````

4. [Chained functions](https://www.tutorialsteacher.com/d3js/method-chaining-in-d3js) are frequently seen in D3 to keep code neat and tidy.
```javascript
// standard JS
document.querySelector("#myDiv").text("Some text").attr("style", "color:red")

//d3
d3.select("body").append("p").text("Hello World!");
```
----

## Intro to SVGs
SVG stands for **scalable vector graphic** and it's an XML format that we often use to draw two-dimensional shapes in D3. SVGs are two dimensional, and they on an X and Y plane that starts at the top-left corner with 0,0. Unlike raster images, they are scaleable, so they look great at any size. D3 comes with handy generators to help you draw into specific chart elements and shapes, such as circle, line, area, stack, arc, pie and symbol. These are great assists, but none of d3 is magic — it's all code written to generate and manipulate SVGs with links to your data.

#### How SVGs work:
- SVGs have tags and look a lot like HTML, but they have different attributes and enable us to use geometry to draw shapes.
- Let's draw some shapes together. Navigate to `localhost:8080/1-js-svg/` in your browser and load `1-intro-d3/index.html` in a text editor.
- Type the following code:
```html
<svg width="500" height="300">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  <g transform="translate(10px 10px)">
    <rect x="150" y="50" width="100" height="100" fill="black"/>
    <rect x="130" y="140" width="140" height="10" style="fill:black;"/>
  </g>
  <text x="200" y="300" text-anchor="middle">Hello, world</text>
  <path d="M 200,230 L 230,240 L 200,250 z" style="fill:orange;" />
</svg>
```

Let's take a closer look at these attributes and elements.

##### [`<circle>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle)
Think of an SVG as a cartesian plane — `cx` is the x location of the circle, `cy` is the x location and `r` is the radius. D3 provides a helpful formula called d3.scaleSqrt() for when you want to scale circles by their area (which you should do).

##### [`<g>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g)
The `<g>` element in SVGs doesn't render. Instead, it's a grouping element that we use to group similar elements together — in this case, two rectangles. As an added benefit, they keep our SVG structure organized, so it’s easier to find what you are looking for while inspecting with your dev tools.

##### [`<transform>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)
This attribute is a powerful tool which you can use to rotate and skew your image. We often `translate` to add padding and make room for elements such as the chart axis.

##### [`<text>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text)
Text in SVGs works differently than text in HTML — it's less flexible, and it's difficult to wrap text onto a new line. But, sine D3 incorporates data directly into the SVG, so you can use it to poisition text labels using your actual data, which is valuable. The [`text-anchor` attribute][6] is SVG’s way of specifying text alignment. The possible values are `start` (left-aligned, the default), `middle` (centered) and `end` (right-aligned).

##### [`<path>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path)
The least inuitive element here is the `<path>`, which draws a triangle. The `d` attribute contains a series of commands that define the path to be drawn. Don't worry too much about those — d3 hides most of the path drawing steps behind the scenes.

##### [SVG style attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)
There are three ways to change the appearance of shapes in an SVG, and we've used two of them in the example above. You see attributes declared directly on an element and styles grouped under an in in-line style attribute. The third option is a separate CSS file. SVGs use style attributes that are similar to HTML and CSS but just different enough to be annoying sometimes. Note the use of `stroke-width` instead of `border`!

----

### Exercise
- Use at least three `<rect>`s to draw a profile of the [conference hotel][8].

----
#### Pro tip:
> Adobe Illustrator reads SVGs, and the New York Times graphics team made a great Chrome plugin called [SVG Crowbar][9] that makes it easy to export an SVG from a webpage and open it in Illustrator. A workflow that we like is drawing a crazy shape in D3, Crowbar'ing it out of the browser, editing in Illustrator and publishing with [ai2html][10], another free tool from NYT graphics. Here's [an example][11] from Darla's days at the Post.
----

Next, we'll start using D3!



[1]:	https://github.com/d3/d3/wiki/Gallery
[2]:	https://github.com/csessig86/intro-to-d3-nicar-19/tree/master/01-intro-to-js
[3]:	https://eloquentjavascript.net/
[4]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[5]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[6]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[7]:	https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
[8]:	https://www.google.com/search?q=new-orleans-marriott&client=firefox-b-1-d&source=lnms&tbm=isch&sa=X&ved=2ahUKEwifrdnihLLnAhXBknIEHW3OC-8Q_AUoAnoECBAQBA&biw=1440&bih=781
[9]:	https://nytimes.github.io/svg-crowbar/
[10]:	http://ai2html.org/
[11]:	https://www.washingtonpost.com/graphics/politics/kushner-conflicts/?utm_term=.8bbce7210bc5
