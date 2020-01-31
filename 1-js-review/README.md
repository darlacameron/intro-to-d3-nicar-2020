# JS Review + SVGs
We'll start class with a quick refresher on JavaScript and data types, and move into SVGs.

## Part one: D3 requires JavaScript
- Here's why: it's relatively easy to duplicate one of the cool-looking [examples](https://github.com/d3/d3/wiki/Gallery) in D3's documentation. But without a working knowledge of JavaScript, it's much harder to adapt those examples to your data.

### What is JavaScript, again?
- JavaScript is one of the three core technologies that make the internet, along with HTML and CSS. 
	- JS is run in the browser and is primarily used for adding, removing and interacting with elements on a page. 
	- HTML makes up the elements on the page
	- CSS is used to style or change the appearance of these elements.
- JS is typically stored in .js files. It can also be written in html pages. Today, we'll keep your javascript in one or several .js files, which is a good practice as your code gets more complicated.
- For now, you can paste these examples into a browser console in order to see how they work.

#### Variables 
- Variables allow you store pieces of information to use or manipulate later in a JavaScript file.
	- There are three basic data formats in JS: numbers, string and boolean or true/false.
```javascript
var number = 5 + 10; // This is a number
var string = 'JavaScript is '; // This is a string
var boolean = true // This is a true/false value

number // returns 15
string // returns 'JavaScript is'

number += 15;
number // returns 30

string += ' the best programming language ever'; // This will return 'JavaScript is the best programming language ever'
```

- Sometimes it's easy to lose track of the type of a piece of data. The typeof() operand can tell you what's what. 	
```javascript
typeof(number) // returns number
typeof(15) // returns number
typeof(string) // returns string
typeof(boolean) // returns boolean
```

#### How data is stored in JS for use in D3
When using D3, we're usually working with files containing hundreds or thousands of rows, often stored as JSON. Here's the components of those files. 

1. Data type: Arrays
You can store numbers and strings together in one variable using arrays.
```javascript
var array_one = [10, 15, 20]; // Arrays are groups of numbers

// Array indexes start with zero
// To get the first attribute in this array do the following:
array_one[0] // returns 10

// And the second and third
array_one[1] // returns 15
array_one[2] // returns 20

var array_two = ["Welcome", "to", "New Orleans"];

array_two[0] // returns "Welcome"
array_two[1] // returns "to"
array_two[2] // returns "New Orleans"
```

2. Data type: Objects
You can also store data using named attributes. These are called objects.
```javascript
var object_one = {
  "artist": "Louis Armstrong",
  "album": "What a Wonderful World",
  "stars": 5
};

object_one["artist"] // returns 'Louis Armstrong'
object_one["album"] // returns "What a Wonderful World"
object_one["stars"] // returns 5
```

3. Objects inside an array
You can store objects inside arrays. You can store as many as you want.
```javascript
var array_object = [{
  "artist": "Prince",
  "album": "Sign o' the Times",
  "stars": 5
},{
  "artist": "Funkadelic",
  "album": "Cosmic Slop",
  "stars": 5
}];

array_object[0]["artist"] // returns "Prince"
array_object[1]["artist"] // returns "Funkadelic"
```

#### Why does this matter?
- Understanding data types is very important as you work with D3. Often, the data that you are charting in D3 will look like objects inside of an array. For instance, if you're working with a CSV file, D3 will convert it into an array with each row in the spreadsheet as an object inside of the array.
- For more JS basics, see the first section of the [2019 D3 class at NICAR](https://github.com/csessig86/intro-to-d3-nicar-19/tree/master/01-intro-to-js), when JS wasn't a prerequisite. The free e-book [Eloquent Javascript](https://eloquentjavascript.net/) is also a great place to learn.

### Four advanced JS concepts that are good to know for D3
1. [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are a shorter way of writing functions, which are repeatable blocks of code.
```javascript
var sandwiches = [
  'PoBoy',
  'Muffuletta',
  'Burger'
];

// regular function returns the array: [5, 10, 6]
sandwiches.map(function(sandwich) {
  return sandwich.length;
});

// arrow function is much shorter and returns the array: [5, 10, 6]
console.log(sandwiches.map(sandwich => sandwich.length));
```

2. [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) allow you embed expressions in your JS as placeholders. It helps with multi-line strings, and makes your code more readable.
```javascript
let a = 5;
let b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

3. [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are a way to load files that you need, such as JSON, more efficiently. 
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

4. [Chained functions](https://www.tutorialsteacher.com/d3js/method-chaining-in-d3js) are frequently seen in D3 to keep code neat and tidy. (This example won't work in the console because we haven't loaded D3 yet!)
```javascript
// standard JS
document.querySelector("#myDiv").text("Some text").attr("style", "color:red")

//d3
d3.select("body").append("p").text("Hello World!");
```

## Part one: D3 draws SVGs
SVG stands for **scalable vector graphic** and it's an XML format that we often use to draw two-dimensional shapes in D3. SVG shapes are made up of `path` elements.
- D3 comes with handy generators to help you draw paths into specific chart shapes, such as line, area, stack, arc, pie and symbol.

### How they work:
- SVGs have tags and look a lot like HTML, but they have different properties and enable us to use geometry to draw shapes.
```html 
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```
- SVGs are two dimensional, and we can use them to chart  on an X and Y plane. Here, `cx` is the x location of the circle, `cy` is the x location and `r` is the radius. 
- SVGs uses style attributes that are similar to HTML and CSS but just different enough to be annoying sometimes. Note the use of `stroke-width` instead of `border`!

#### Exercise
- Take a couple minutes with your partner to look at this tutorial on [paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
- Here's documentation on possible [SVG style attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).
- Then, in the index.html file of this folder, draw at least two different path shapes in an SVG. Then we'll share a couple examples with the class.

#### Pro tip:
- Adobe Illustrator reads SVGs, and the New York Times graphics team made a great Chrome plugin called [SVG Crowbar](https://nytimes.github.io/svg-crowbar/) that makes it easy to export an SVG from a webpage and open it in Illustrator. A workflow that we like is drawing a crazy shape in D3, Crowbar'ing it out of the browser, editing in Illustrator and publishing with [ai2html](http://ai2html.org/), another free tool from NYT graphics. Here's [an example](https://www.washingtonpost.com/graphics/politics/kushner-conflicts/?utm_term=.8bbce7210bc5) from Darla's days at the Post. 

### Next, we'll start using D3!



