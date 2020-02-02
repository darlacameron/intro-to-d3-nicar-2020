# Introduction to D3 at NICAR 2020

Bring your data to life with elegant and intelligent visualizations with the D3 JavaScript library. We'll start with some Scalable Vector Graphics (SVG) basics and learn what makes the D3 library so powerful, then use real-world datasets to build your first D3 chart. We will build on D3 basics by exploring more complex chart forms, covering functions for fetching and manipulating data, and introducing transitions and interaction. We will write working code together, break down how some of our favorite examples of D3 charts work and practice reading documentation so you can gain expertise on your own.

Prerequisites: Attendees should have some knowledge of HTML/CSS and JavaScript. Previous D3 experience is not required.

Instructors: [Darla Cameron][1] from the Texas Tribune and [John Muyskens][2] from the Washington Post

## Thanks for joining us today!

#### What we're going to learn today
- What do **you** want to learn? We'll do our best to address your specific questions along the way.
	- Have any of you tried to learn D3 and gotten stuck?
	- What did you find challening about learning D3?
- We hope you leave here today:
	- Knowing basic D3 terminology and concepts
	- With a foundation for getting yourself un-stuck when you inevitably run into something that doesn't work as expected.
- We will have you work through each of the exercises in this repository in pairs. Introduce yourself to your neighbor!
- Here's how **pair programming** works:
	- One person types the code and the other has documentation open, telling the typer what to do next.
	- Why pair program? Most errors are typos, and this saves you from swapping between documentation and the code.
- We have 3 hours and 30 minutes together, and we'll take a bathroom break in the middle of the session. Feel free to get up and stretch whenever you need to.

#### What is [D3][3]?
- While we often use D3 to make charts, it is not technically a charting library!
- D3 is a JavaScript framework for manipulating documents and the DOM with data
- The 3 Ds stand for **Data Driven Documents**

#### When should you use D3?
- In our newsrooms, we try to limit D3 usage to when we need to be extra creative with visualization shape, do fancy transitions or update a graphic regularly. For example:
<<<<<<< HEAD
	- The Washington Post's [police shootings database][4], which includes lots of dynamic charts and updates annually.
	- The Washington Post's [coronavirus tracker][5], a dynamic map which was updated multiple times per day during the outbreak.
	- The Texas Tribune's [migration tracker][6], which updates monthly and has dynamic charts.
	- The Texas Tribune's [political district competitiveness index][7], where charts form an interactive narrative.
- If you want to make a basic chart or map for the web that *doesn’t* need to be interactive, be republished regularly or use a crazy shape, we highly recommend good ol’ Adobe Illustrator + [ai2html][8] or [Datawrapper][9]

#### Time to code! Let's fire up a server.
- Open the terminal or command line app on the laptop provided by IRE. They have helpfully installed a [http-server][10] for us.
- Navigate to the class folder, `intro-to-d3-nicar-2020`
- Type `intro-to-d3-nicar-2020` in the terminal.
- In a browser, go to `http://localhost:8080/` to view the class files.
- We'll leave this server running all though class.



---- 
=======
	- The Washington Post's [police shootings database](https://www.washingtonpost.com/graphics/investigations/police-shootings-database/), which includes lots of dynamic charts and updates annually.
	![Screengrab of shootings tracker][image-1]

	- The Washington Post's [coronavirus tracker](https://www.washingtonpost.com/world/2020/01/22/mapping-spread-new-coronavirus/?arc404=true), a dynamic map which can be updated multiple times per day.
	![coronoavirus tracker][image-2]

	- The Texas Tribune's [migration tracker](https://apps.texastribune.org/features/2019/migrant-texas-border-trump-policies/), which updates monthly and has dynamic charts. 
	![migration tracker][image-3]

	- The Texas Tribune's [political district competitiveness index](https://apps.texastribune.org/features/2019/texas-turn-blue-voting-pattern-history/), where charts form an interactive narrative.
	![heat index][image-4]

- If you want to make a basic chart or map for the web that *doesn’t* need to be interactive, be republished regularly or use a crazy shape, we highly recommend good ol’ Adobe Illustrator + [ai2html](http://ai2html.org/) or [Datawrapper](https://www.datawrapper.de/). We'll share our detailed graphic technology decision-making process at the end of class.

#### Time to code! Let's fire up a server.
- Open the terminal or command line app on the laptop provided by IRE. They have helpfully installed a [http-server](https://www.npmjs.com/package/http-server) for us.
- Navigate to the class folder, `intro-to-d3-nicar-2020`.
- Type `http-server -c-1` in the terminal. (The `-c-1` command disables caching.)
- In a browser, go to `http://localhost:8080/` to view the class files. 
- We'll leave this server running all though class.

----
>>>>>>> 4a91d3119b06bf87b3286c2caa6bd625e57f5d31

## Next steps: How to put what you learned today into action
Here's things that we have learned along the way that are worth considering as you start making graphics with d3.

<<<<<<< HEAD
---- 
=======

>>>>>>> 4a91d3119b06bf87b3286c2caa6bd625e57f5d31
### Graphic technology decision making process

The first step when we take on a new project is deciding what technology to use. This process can vary a bit depending on your team size, project scope and deadline (Darla's team has just four people, but John's team has close to 30!). Here's a list of publication options from simple to complex to help you figure out what to develop.

Any of the following may be the right choice for you depending on your CMS, development skills and what serves the story best. BUT they can all make use of D3!

- Static image
	- Upside: Works everywhere, even in print
	- Downside: not accessible by default, text not right size on all screens
	- D3 workflow: Dev environment -\> [SVG crowbar][11] -\> vector graphics program such as Adobe Illustrator
- Responsive HTML with [ai2html][12]
	- Upside: responsive, accessible, text can be sharp and consistently sized on all screens
	- Downside: requires Adobe Illustrator (not cheap, has a learning curve), more work to design each artboard, may not be supported in your CMS
	- D3 workflow: Dev environment -\> [SVG crowbar][13] -\> Adobe Illustrator -\> [ai2html][14] -\> back to dev environment or CMS to publish
- Interactive D3 SVG
	- Upside: dynamic, adaptive, interactive, sharp on any screen pixel density, can use joins to manage data updates, code can be re-usable
	- Downside: long turnaround time, difficult development work to get it looking good on all screen sizes, must handle browser quirks, your CMS may not support this and figuring out where to put the code and getting it to play nice with the site can require engineering help, performance can be an issue with complex animations, annotations and design flourishes that are easy to perfect in Illustrator are hard to code in d3, multi-line text in SVG sucks (but text-anchor is pretty nice)
	- D3 workflow: Dev environment -\> Code publishing tool such as [Tribune's kit][15]
- Interactive [D3 canvas][16]
	- Upside: Improved performance over SVG if you have thousands of elements, some D3 things carry over: scales, shapes. Can be layered with SVG effectively.
	- Downside: Very different programming strategy and concepts from SVG requires leaning new concepts and switching gears. Raster graphics, so it is resolution-dependent and you can’t crowbar out a vector image (you can save a raster image, though).
- WebGL
	- Upside: Even better performance, 3D
	- Downside: steep learning curve that doesn’t carry over from SVG and Canvas concepts and can involve a totally different programming language to write shaders. Few D3 things carry over, though you can still use scales.
- Video
	- Upside: Good performance regardless of the complexity of your visuals
	- Downside: text in videos looks bad, can be large file sizes (though better than GIFs, and internet connections are pretty fast these days), complex/different workflow for producing and hosting
	- D3 workflow [via Adam Pearce][17]

#### How to actually get d3 code on your website
- Custom static pages outside your CMS
	- Most complex, interactive graphics will not fit nicely into your news organization's CMS. At the Post and the Trib, we publish directly to Amazon s3 buckets as a workaround. Yes, it's a lot of work to make sure our code and tracking tags sync up with the main site, but it's worth it to have a sandbox where we can experiment.
	- It's also very important to know that we never write code from scratch — every project that our teams produce starts with a build environment that has a server, file compression, links to Google docs, deploy tools and more built in automatically.
	- Both the Post and the Tribune work in kits that are written in Node.js, and the [Tribune's kit][18] is open source and free for anyone to use. We highly encourage you to use something like this as a base for your work.
	- Both kits take advantage of [Archie Markup Language][19], a wonderful open-source tool from the NYT's graphics team that renders google docs in graphics.
- Embeds
	- Sometimes graphics do need to be embedded into the cms for context with a story — that's when iframes come in. The Trib's kit allows for the development of embedded graphics with help from a variation on iframes called [frames][20], which is responsive and works great with Google's AMP instant articles (this will make your product and engineering friends happy).
	- Your ability to embed raw html inside of your CMS will vary greatly depend on where you work. About 7 to 8 years ago, it was a common workflow. Generally, d3 requires so many plugins and data files that it's hard to pull off.

#### How to make your graphics editor happy
- Refine your writing
	- Yes, we make visuals, but clean and clear writing is so important for helping readers understand complex chart shapes. If you want to try something crazy, it has to support your story and you better be able to explain it to the last tech-savvy editor in the newsroom.
- Add clear headlines, notes and source lines
	- The basics of chart-making always apply — leave no axis unlabeled! But all of the text around a graphic matters a lot. Be a good journalist and cite your sources — or even link directly to them. Your future self will thank you when you're trying to track down this data again.
- Annotate all the things
<<<<<<< HEAD
	- As an alternative to tooltips, graphics editors LOVE a nice, clean swoopy arrow with text at the end providing helpful context. (Seriously.) It's very easy to swoop arrows all day long in Illustrator, but unfortunately it's a bit harder in d3. [Swoopy Drag][21] is the best option for adding a bit of elegant annotation.
	- Those arrows have to point to something, and it's usually text. Unfortunately, SVG `<text>` elements don't support multi-line text wrapping, so you'll have to use a function to wrap the text yourself. [This example][22] is fairly helpful.
=======
	- ![annotation example][image-5]
	- As an alternative to tooltips, graphics editors LOVE a nice, clean swoopy arrow with text at the end providing helpful context. (Seriously.) It's very easy to swoop arrows all day long in Illustrator, but unfortunately it's a bit harder in d3. [Swoopy Drag](https://1wheel.github.io/swoopy-drag/) is the best option for adding a bit of elegant annotation.
	- Those arrows have to point to something, and it's usually text. Unfortunately, SVG `<text>` elements don't support multi-line text wrapping, so you'll have to use a function to wrap the text yourself. [This example](https://bl.ocks.org/mbostock/7555321) is fairly helpful. 
>>>>>>> 4a91d3119b06bf87b3286c2caa6bd625e57f5d31
		- Pro tip: you could also just put the text in an absolutely positioned `<p>` tag, which does support text wrapping, and use d3.scale to position it.
- Make text more visible with casing
	- ![casing example][image-6]
	- Labels on top of a brightly colored map can be hard to read. Use CSS to add subtle white shadow or stroke around the text so text is legible.
		- Pro tip: Set the SVG `paint-order: stroke fill;` to make sure the casing doesn't distort your type. The paint-order attribute specifies the order that the fill, stroke, and markers of a given shape or text element are drawn.

#### How to make your copy editor happy
- [d3-format][23]
	- Sometimes, JS is terrible at formatting numbers, returning crazy rounding errors or worse. d3-format has great options for cleaning up every imaginable number bug.
- [journalize][24]
	- Ryan Murphy to the rescue — this excellent library converts dates to AP style and more. It's automatically included in the Tribune's development environment, too!

#### Browser testing

Testing your work in various browsers is an important step in the development process. Talk to whomever is in charge of your organization’s website to learn which browsers you need to support. The website [caniuse.com][25] is a great resource for figuring out what features different browsers support.

Internet Explorer [did not support SVG until version 9][26], and lots of Washington Post readers used older versions on their computers at work (read: federal government). We used to swap a lot of elaborate graphics out for non-responsive screen grabs.

Some of the newer features we use in this workshop don’t work in older browsers. [Promises][27], [Arrow functions][28] and [Template literals][29] work in all modern browsers, but not IE11. If you want to use these features in older browsers you’ll need to provide [polyfills][30] for them. D3 version five [only supports modern browsers][31] and if you need to support older ones you’ll have to use older versions of the library or individual modules. 

#### Beware of old d3 examples with previous APIs older than v4
- D3 was first released in 2012, and it's now on version 5! For security reasons, we recommend using the latest and greatest version. The last few [changes][32] have changed the code's structure in big ways, and examples before v4 will not work with the current versions. As you're googling around to solve a bug, keep an eye out for old examples and avoid them. 

#### [Observable][33]
- Mike Bostock is all in on his cool new tool for writing code. You'll see lots of newer d3 examples in this format.
- It's a cool tool, and we use it at WaPo a lot.
- Great development experience. you can start coding right away, imports and versioning work very naturally. Good way to experiment with data and see what it tells you.
- But! It is hard to translate your code into the “real world.” It looks a lot like JavaScript but it has a lot of nonstandard stuff mixed in.

#### Scrollytelling
- Scrolling is a native behavior on the web. Unlike clicking filter buttons or hovering for a tooltip, we know that readers know how to get information this way. Thus, you see fancy scrolling techniques implemented in A LOT in graphics. [The Pudding][34] does scrollytelling especially well, if you need inspiration.
- Ryan Murphy wrote a handy little [scroller][35] library that we highly recommend if you want a lightweight implementation.

#### Maps
d3 is pretty great for mapping — most newsrooms use d3 + canvas for their election results maps, for instance. But, without a bit of background knowledge in cartography and GIS, there can be a steep learning curve.
- [Intro to Mapping and GIS for Journalists][36]: Darla and her colleague Chris Essig taught an free MOOC in 2018 if you want to learn the basics of QGIS, a free and open source mapping program.
- Projections are standardized ways that cartographers have developed to display the 3D earth on a 2D surface. D3 comes with a set of built-in [common projections][37], and that will cover most use cases.
- For super custom maps, extra projections are available [d3-geo-projection][38].
- There are great tools for converting geographic data from shapefiles, a standard format read by GIS software and available from official sources, to [topojson][39], a slimmed-down extension of geojson. We use [mapshaper][40] to optimize both file size and level of detail.

#### Canvas

Canvas, like SVG, is tool you can use to draw graphics that comes built-in to your browser. The big difference is that Canvas is a raster (read: pixel) rather than vector-based technology. It is not resolution-independent, so if you blow it up it will look pixelated. In fact, the default Canvas pixel ratio looks pixelated on today’s high density displays (you can adjust this to match the display). 

[Link: MDN documentation for Canvas][41]

The way you work with Canvas in D3 is quite different as well. The biggest thing is that the Join pattern doesn’t work anymore, which means that D3’s convenient transitions are out the window as well. The reason being that Canvas doesn’t have different DOM elements for each shape. Instead there is one DOM element (the `<canvas>`) and you have to paint each shape individually onto it. 

<<<<<<< HEAD
For instance, to draw a rectangle, instead of a `<rect>` there is [`.fillRect()`][42]. To draw a circle there is [`.arc()`][43]. If you want to draw many shapes based on your data you’ll need to loop over your data instead of using a data join. If you want to implement an animation, you’ll need to write code that draws each frame in succession. Implementing interaction is also more complex because there is no built-in way for the browser to tell whether the place you tapped has a shape on it or not – you have to manage this yourself.

The main reason to use Canvas over SVG is that it performs much better when your graphic is complex, for instance, a scatter plot with thousands of circles or a map with detailed country borders. Where this makes a big difference is if you want to animate your graphic.

D3 feels more native when working with SVG, but a few parts of D3 can be used with either SVG or Canvas. The generators in [the d3-shape module][44] can be used with either technology. Likewise, [d3.geoPath][45] can be used to draw GeoJSON features on an SVG or Canvas-based map. 

You can mix SVG and Canvas to get the best of both worlds. For instance, the Washington Post’s [database of school shootings][46] uses a canvas layer for animation and an SVG layer for axes, annotations and interaction. Another example is [this graphic][47] which shows how each county voted in the presidential elections from 2000-2012. The axes and labels are drawn in SVG while the lines for all the counties are in Canvas. 

#### Some useful tutorials
- [The 2019 version of this class][48]
- [A day-long D3 class that John taught][49]
- [Free Code Camp][50]
- [Learn JS Data][51]
- [Eloquent Javascript][52]

[1]:	https://www.texastribune.org/about/staff/darla-cameron/
[2]:	https://www.washingtonpost.com/people/john-muyskens/
[3]:	https://d3js.org/
[4]:	https://www.washingtonpost.com/graphics/investigations/police-shootings-database/
[5]:	https://www.washingtonpost.com/world/2020/01/22/mapping-spread-new-coronavirus/?arc404=true
[6]:	https://apps.texastribune.org/features/2019/migrant-texas-border-trump-policies/
[7]:	https://apps.texastribune.org/features/2019/texas-turn-blue-voting-pattern-history/
[8]:	http://ai2html.org/
[9]:	https://www.datawrapper.de/
[10]:	https://www.npmjs.com/package/http-server
[11]:	https://nytimes.github.io/svg-crowbar/
[12]:	http://ai2html.org/
[13]:	https://nytimes.github.io/svg-crowbar/
[14]:	http://ai2html.org/
[15]:	https://github.com/texastribune/data-visuals-create
[16]:	https://bl.ocks.org/mbostock/1276463
[17]:	https://roadtolarissa.com/d3-mp4/
[18]:	https://github.com/texastribune/data-visuals-create
[19]:	http://archieml.org/
[20]:	https://github.com/rdmurphy/frames
[21]:	https://1wheel.github.io/swoopy-drag/
[22]:	https://bl.ocks.org/mbostock/7555321
[23]:	https://github.com/d3/d3-format
[24]:	https://github.com/rdmurphy/journalize
[25]:	https://caniuse.com/
[26]:	https://caniuse.com/#feat=svg
[27]:	https://caniuse.com/#search=Promises
[28]:	https://caniuse.com/#search=Arrow%20functions
[29]:	https://caniuse.com/#search=Template%20literals
[30]:	https://developer.mozilla.org/en-US/docs/Glossary/Polyfill
[31]:	https://github.com/d3/d3/wiki#supported-environments
[32]:	https://github.com/d3/d3/blob/master/CHANGES.md
[33]:	https://observablehq.com/
[34]:	https://pudding.cool/
[35]:	https://github.com/rdmurphy/scroller
[36]:	https://journalismcourses.org/mapping.html
[37]:	https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/
[38]:	https://github.com/d3/d3-geo-projection/
[39]:	https://github.com/topojson/topojson
[40]:	https://mapshaper.org/
[41]:	[https://developer.mozilla.org/en-US/docs/Web/API/Canvas%5C_API]
[42]:	https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
[43]:	https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
[44]:	https://github.com/d3/d3-shape
[45]:	https://github.com/d3/d3-geo#geoPath
[46]:	https://www.washingtonpost.com/graphics/2018/local/school-shootings-database/
[47]:	https://www.washingtonpost.com/graphics/politics/2016-election/swing-counties/
[48]:	https://github.com/csessig86/intro-to-d3-nicar-19
[49]:	https://github.com/jmuyskens/big-data-ignite-d3-workshop
[50]:	https://www.freecodecamp.org/learn/
[51]:	http://learnjsdata.com/index.html
[52]:	https://eloquentjavascript.net/
=======

[image-1]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/shootings.png?v0
[image-2]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/virus.png
[image-3]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/migration.png
[image-4]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/heat-index.png
[image-5]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/anno.png
[image-6]:	https://github.com/darlacameron/intro-to-d3-nicar-2020/raw/master/img/casing.png
>>>>>>> 4a91d3119b06bf87b3286c2caa6bd625e57f5d31
