# Sculpting data

As data journalists, we have to work with data in a variety of shapes: tidy and wide, flat and nested. When we are working with d3, however, the best shape for our data is one that matches the structure of the document we are creating with it. Fortunately, JavaScript and d3 come with some good tools for re-shaping our data. 

But first, let’s use d3 to load some real data into the browser. The functions we are using are in the `d3-fetch` module. 

[Link: documentation for `d3-fetch`][1]

TODO: do we start a new file here?

The data we are trying to load is CSV-formatted. To load and parse it into useful data, we can use [`d3.csv()`][2].

	d3.csv('../data/oecd.csv')
		.then(data => {
			console.log('Data is ready:', data);
		})

`d3.csv()` returns a Promise. The function we pass to `.then()` will be called when our data is ready. 

[1]:	https://github.com/d3/d3-fetch
[2]:	[https://github.com/d3/d3-fetch#csv