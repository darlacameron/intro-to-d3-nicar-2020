# Introduction to D3 at NICAR 2020

Bring your data to life with elegant and intelligent visualizations with the D3 JavaScript library. We'll start with some Scalable Vector Graphics (SVG) basics and learn what makes the D3 library so powerful, then use real-world datasets to build your first D3 chart. We will build on D3 basics by exploring more complex chart forms, covering functions for fetching and manipulating data, and introducing transitions and interaction. We will write working code together, break down how some of our favorite examples of D3 charts work and practice reading documentation so you can gain expertise on your own.

Prerequisites: Attendees should have some knowledge of HTML/CSS and JavaScript. Previous D3 experience is not required.

Instructors: [Darla Cameron](https://www.texastribune.org/about/staff/darla-cameron/) from the Texas Tribune and [John Muyskens](https://www.washingtonpost.com/people/john-muyskens/) from the Washington Post

## Thanks for joining us today!

#### What is [D3](https://d3js.org/)?
- While we often use D3 to make charts, it is not technically a charting library!
- D3 is a JavaScript framework for manipulating documents and the DOM with data
- The 3 Ds stand for **Data Driven Documents**

#### When should you use D3?
- Techy graphics teams used to use D3 for every chart, but we've learned better. In our newsrooms, we try to limit D3 usage to when we need to be extra creative with visualization shape, do fancy transitions or update a graphic regularly. For example:
	- The Washington Post's [police shootings database](https://www.washingtonpost.com/graphics/investigations/police-shootings-database/), which includes lots of dynamic charts and updates annually.
	- The Washington Post's [coronavirus tracker](https://www.washingtonpost.com/world/2020/01/22/mapping-spread-new-coronavirus/?arc404=true), a dynamic map which was updated multiple times per day during the outbreak.
	- The Texas Tribune's [migration tracker](https://apps.texastribune.org/features/2019/migrant-texas-border-trump-policies/), which updates monthly and has dynamic charts. 
	- The Texas Tribune's [political district competitiveness index](https://apps.texastribune.org/features/2019/texas-turn-blue-voting-pattern-history/), where charts form an interactive narrative.
- If you want to make a basic chart or map for the web that *doesn’t* need to be interactive, be republished regularly or use a crazy shape, we highly recommend good ol’ Adobe Illustrator + [ai2html](http://ai2html.org/) or [Datawrapper](https://www.datawrapper.de/)

#### What we're going to learn today
- First, what do **you** want to learn? Have any of you tried to learn D3 and gotten stuck? We hope you leave here today:
	- Knowing basic D3 terminology and concepts
	- With a foundation for getting yourself un-stuck when you inevitably run into something that doesn't work as expected.
- We will have you work through each of the exercises in this repository in pairs. Introduce yourself to your neighbor! 
- Here's how **pair programming** works:
	- One person types the code and the other has documentation open, telling the typer what to do next. 
	- Why pair program? Most errors are typos, and this saves you from swapping between documentation and the code.
- We have 3 hours and 30 minutes together, and we'll take a bathroom break in the middle of the session. Feel free to get up and stretch whenever you need to.


## First, a quick JavaScript and data types refresher

#### D3 requires JavaScript
- Here's why: it's relatively easy to duplicate one of the cool-looking [examples](https://github.com/d3/d3/wiki/Gallery) in D3's documentation. But without a working knowledge of JavaScript, it's much harder to adapt those examples to your data.
- JavaScript is one of the three core technologies that make the internet, along with HTML and CSS. 
	- JS is run in the browser and is primarily used for adding, removing and interacting with elements on a page. 
	- HTML makes up the elements on the page, and CSS is used to style or change the appearance of these elements.
- Javascript is typically stored in .js files. It can also be written in html pages. Today, we'll keep your javascript in one or several .js files, which is a good practice as your code gets more complicated.
- You can paste these examples into a browser console to see how they work. 

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
var number = 5 + 10; // This is a number
var string = 'JavaScript is '; // This is a string
var boolean = TRUE // This is a true/false value

typeof(number) // returns number
typeof(15) // returns number
typeof(boolean) // returns boolean
```

#### How data is stored in JS for use in D3
When using D3, we're usually working with files containing hundreds or thousands of rows, often stored as JSON. Here's the components of those files. 

1. Data type: Arrays
- You can group numbers and strings into one variable using arrays.
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
- You can also store data using named attributes. These are called objects.
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
* You can also store objects inside arrays. You can store as many as you want.
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

- Understanding data types is very important as you work with D3. Often times, your data will look like objects inside of an array. For instance, if you're working with a CSV file, D3 will convert it into an array with each row in the spreadsheet being it's own object inside of that array.
- For more JS basics, see the first section of the [2019 D3 class at NICAR](https://github.com/csessig86/intro-to-d3-nicar-19/tree/master/01-intro-to-js), when JS wasn't a prerequisite. The free e-book [Eloquent Javascript](https://eloquentjavascript.net/) is also a great place to learn.

#### Advanced JS concepts that are good to know for D3
1. [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions): This is a shorter way of writing functions, which are repeatable blocks of code.
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

4. [Chaining functions](https://www.tutorialsteacher.com/d3js/method-chaining-in-d3js) are frequently seen in D3 to keep code neat and tidy. 
```javascript
// standard JS
document.querySelector("#myDiv").text("Some text").attr("style", "color:red")

//d3
d3.select("body").append("p").text("Hello World!");
```

### Now we'll move on to the first exercise, Intro to SVGs!


5. What's next? Our favorite resources and how to make this useful at home. 
	- [The 2019 version of this class](https://github.com/csessig86/intro-to-d3-nicar-19)
	- [A day-long D3 class that John taught](https://github.com/jmuyskens/big-data-ignite-d3-workshop)
