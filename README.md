# Introduction to D3 at NICAR 2020

Bring your data to life with elegant and intelligent visualizations with the D3 JavaScript library. We'll start with some Scalable Vector Graphics (SVG) basics and learn what makes the D3 library so powerful, then use real-world datasets to build your first D3 chart. We will build on D3 basics by exploring more complex chart forms, covering functions for fetching and manipulating data, and introducing transitions and interaction. We will write working code together, break down how some of our favorite examples of D3 charts work and practice reading documentation so you can gain expertise on your own.

Prerequisites: Attendees should have some knowledge of HTML/CSS and JavaScript. Previous D3 experience is not required.

Instructors: [Darla Cameron](https://www.texastribune.org/about/staff/darla-cameron/) from the Texas Tribune and [John Muyskens](https://www.washingtonpost.com/people/john-muyskens/) from the Washington Post

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

#### What is [D3](https://d3js.org/)?
- While we often use D3 to make charts, it is not technically a charting library!
- D3 is a JavaScript framework for manipulating documents and the DOM with data
- The 3 Ds stand for **Data Driven Documents**

#### When should you use D3?
- In our newsrooms, we try to limit D3 usage to when we need to be extra creative with visualization shape, do fancy transitions or update a graphic regularly. For example:
	- The Washington Post's [police shootings database](https://www.washingtonpost.com/graphics/investigations/police-shootings-database/), which includes lots of dynamic charts and updates annually.
	- The Washington Post's [coronavirus tracker](https://www.washingtonpost.com/world/2020/01/22/mapping-spread-new-coronavirus/?arc404=true), a dynamic map which was updated multiple times per day during the outbreak.
	- The Texas Tribune's [migration tracker](https://apps.texastribune.org/features/2019/migrant-texas-border-trump-policies/), which updates monthly and has dynamic charts. 
	- The Texas Tribune's [political district competitiveness index](https://apps.texastribune.org/features/2019/texas-turn-blue-voting-pattern-history/), where charts form an interactive narrative.
- If you want to make a basic chart or map for the web that *doesn’t* need to be interactive, be republished regularly or use a crazy shape, we highly recommend good ol’ Adobe Illustrator + [ai2html](http://ai2html.org/) or [Datawrapper](https://www.datawrapper.de/)

#### Time to code! Let's fire up a server.
- Open the terminal or command line app on the laptop provided by IRE. They have helpfully installed a [http-server](https://www.npmjs.com/package/http-server) for us.
- Navigate to the class folder, `intro-to-d3-nicar-2020`
- Type `intro-to-d3-nicar-2020` in the terminal.
- In a browser, go to `http://localhost:8080/` to view the class files. 
- We'll leave this server running all though class.



----

## Next steps: How to put what you learned today into action
Here's things that we have learned along the way that are worth considering as you start making graphics with d3.

----
### Graphic technology decision making process

The first step when we take on a new project is deciding what technology to use. This process can vary a bit depending on your team size, project scope and deadline (Darla's team has just four people, but John's team has close to 30!). Here's a list of publication options from simple to complex to help you figure out what to develop.

Any of the following may be the right choice for you depending on your CMS, development skills and what serves the story best. BUT they can all make use of D3!

- Static image
    - Upside: Works everywhere, even in print
    - Downside: not accessible by default, text not right size on all screens
    - D3 workflow: Dev environment -> [SVG crowbar](https://nytimes.github.io/svg-crowbar/) -> vector graphics program such as Adobe Illustrator
- Responsive HTML with [ai2html](http://ai2html.org/)
    - Upside: responsive, accessible, text can be sharp and consistently sized on all screens
    - Downside: requires Adobe Illustrator (not cheap, has a learning curve), more work to design each artboard, may not be supported in your CMS
    - D3 workflow: Dev environment -> [SVG crowbar](https://nytimes.github.io/svg-crowbar/) -> Adobe Illustrator -> [ai2html](http://ai2html.org/) -> back to dev environment or CMS to publish
- Interactive D3 SVG
    - Upside: dynamic, adaptive, interactive, sharp on any screen pixel density, can use joins to manage data updates, code can be re-usable
    - Downside: long turnaround time, difficult development work to get it looking good on all screen sizes, must handle browser quirks, your CMS may not support this and figuring out where to put the code and getting it to play nice with the site can require engineering help, performance can be an issue with complex animations, annotations and design flourishes that are easy to perfect in Illustrator are hard to code in d3, multi-line text in SVG sucks (but text-anchor is pretty nice)
    - D3 workflow: Dev environment -> Code publishing tool such as [Tribune's kit](https://github.com/texastribune/data-visuals-create)
- Interactive [D3 canvas](https://bl.ocks.org/mbostock/1276463)
    - Upside: Improved performance over SVG if you have thousands of elements, some D3 things carry over: scales, shapes. Can be layered with SVG effectively.
    - Downside: Very different programming strategy and concepts from SVG requires leaning new concepts and switching gears. Raster graphics, so it is resolution-dependent and you can’t crowbar out a vector image (you can save a raster image, though).
- WebGL
    - Upside: Even better performance, 3D
    - Downside: steep learning curve that doesn’t carry over from SVG and Canvas concepts and can involve a totally different programming language to write shaders. Few D3 things carry over, though you can still use scales.
- Video
    - Upside: Good performance regardless of the complexity of your visuals
    - Downside: text in videos looks bad, can be large file sizes (though better than GIFs, and internet connections are pretty fast these days), complex/different workflow for producing and hosting
    - TODO > ADD THIS D3 workflow [via Adam Pearce] 

#### How to actually get d3 code on your website
- Custom static pages outside your CMS
	- Most complex, interactive graphics will not fit nicely into your news organization's CMS. At the Post and the Trib, we publish directly to Amazon s3 buckets as a workaround. Yes, it's a lot of work to make sure our code and tracking tags sync up with the main site, but it's worth it to have a sandbox where we can experiment.
	- It's also very important to know that we never write code from scratch — every project that our teams produce starts with a build environment that has a server, file compression, links to Google docs, deploy tools and more built in automatically. 
	- Both the Post and the Tribune work in kits that are written in Node.js, and the [Tribune's kit](https://github.com/texastribune/data-visuals-create) is open source and free for anyone to use. We highly encourage you to use something like this as a base for your work.
	- Both kits take advantage of [Archie Markup Language](http://archieml.org/), a wonderful open-source tool from the NYT's graphics team that renders google docs in graphics. 
- Embeds
	- Sometimes graphics do need to be embedded into the cms for context with a story — that's when iframes come in. The Trib's kit allows for the development of embedded graphics with help from a variation on iframes called [frames](https://github.com/rdmurphy/frames), which is responsive and works great with Google's AMP instant articles (this will make your product and engineering friends happy).
	- Your ability to embed raw html inside of your CMS will vary greatly depend on where you work. About 7 to 8 years ago, it was a common workflow. Generally, d3 requires so many plugins and data files that it's hard to pull off. 

#### How to make your graphics editor happy
- Refine your writing
	- Yes, we make visuals, but clean and clear writing is so important for helping readers understand complex chart shapes. If you want to try something crazy, it has to support your story and you better be able to explain it to the last tech-savvy editor in the newsroom.
- Add clear headlines, notes and source lines
	- The basics of chart-making always apply — leave no axis unlabeled! But all of the text around a graphic matters a lot. Be a good journalist and cite your sources — or even link directly to them. Your future self will thank you when you're trying to track down this data again.
- Annotate all the things
	- As an alternative to tooltips, graphics editors LOVE a nice, clean swoopy arrow with text at the end providing helpful context. (Seriously.) It's very easy to swoop arrows all day long in Illustrator, but unfortunately it's a bit harder in d3. [Swoopy Drag](https://1wheel.github.io/swoopy-drag/) is the best option for adding a bit of elegant annotation.
	- Those arrows have to point to something, and it's usually text. Unfortunately, SVG `<text>` elements don't support multi-line text wrapping, so you'll have to use a function to wrap the text yourself. [This example](https://bl.ocks.org/mbostock/7555321) is fairly helpful. 
		- Pro tip: you could also just put the text in an absolutely positioned `<p>` tag, which does support text wrapping, and use d3.scale to position it.
- Make text more visible with casing
	- Labels on top of a brightly colored map can be hard to read. Use CSS to add subtle white shadow or stroke around the text so text is legible.
		- Pro tip: Set the SVG `paint-order: stroke fill;` to make sure the casing doesn't distort your type. The paint-order attribute specifies the order that the fill, stroke, and markers of a given shape or text element are drawn.

#### How to make your copy editor happy
- [d3-format](https://github.com/d3/d3-format)
	- Sometimes, JS is terrible at formatting numbers, returning crazy rounding errors or worse. d3-format has great options for cleaning up every imaginable number bug. 
- [journalize](https://github.com/rdmurphy/journalize)
	- Ryan Murphy to the rescue — this excellent library converts dates to AP style and more. It's automatically included in the Tribune's development environment, too!

#### Browser testing pitfalls
- As recently as five years ago, SVGs were not supported at all in Internet Explorer, and lots of Post readers used it on their computers at work (read: federal government). We swapped a lot of elaborate graphics out for non-responsive screen grabs.
TODO- John can you add more?

#### Beware of old d3 examples with previous APIs older than v4
- D3 was first released in 2012, and it's now on version 5! For security reasons, we recommend using the latest and greatest version. The last few [changes](https://github.com/d3/d3/blob/master/CHANGES.md) have changed the code's structure in big ways, and examples before v4 will not work with the current versions. As you're googling around to solve a bug, keep an eye out for old examples and avoid them.

#### [Observable](https://observablehq.com/)
- Mike Bostock is all in on his cool new tool for writing code. You'll see lots of newer d3 examples in this format.
- It's a cool tool, and we use it at WaPo a lot.
- Great development experience. you can start coding right away, imports and versioning work very naturally. Good way to experiment with data and see what it tells you.
- But! It is hard to translate your code into the “real world.” It looks a lot like JavaScript but it has a lot of nonstandard stuff mixed in.

#### Scrollytelling
- Scrolling is a native behavior on the web. Unlike clicking filter buttons or hovering for a tooltip, we know that readers know how to get information this way. Thus, you see fancy scrolling techniques implemented in A LOT in graphics. [The Pudding](https://pudding.cool/) does scrollytelling especially well, if you need inspiration.
- Ryan Murphy wrote a handy little [scroller](https://github.com/rdmurphy/scroller) library that we highly recommend if you want a lightweight implementation.

#### Maps
d3 is pretty great for mapping — most newsrooms use d3 + canvas for their election results maps, for instance. But, without a bit of background knowledge in cartography and GIS, there can be a steep learning curve.
- [Intro to Mapping and GIS for Journalists](https://journalismcourses.org/mapping.html): Darla and her colleague Chris Essig taught an free MOOC in 2018 if you want to learn the basics of QGIS, a free and open source mapping program.
- Projections are standardized ways that cartographers have developed to display the 3D earth on a 2D surface. D3 comes with a set of built-in [common projections](https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/), and that will cover most use cases.
- For super custom maps, extra projections are available [d3-geo-projection](https://github.com/d3/d3-geo-projection/).
- There are great tools for converting geographic data from shapefiles, a standard format read by GIS software and available from official sources, to [topojson](https://github.com/topojson/topojson), a slimmed-down extension of geojson. We use [mapshaper](https://mapshaper.org/) to optimize both file size and level of detail.

- TODO: John, can you cover these two? 
- aligning a raster basemap you made in QGIS
- when to use canvas instead of SVG, and what is canvas?

#### Some useful tutorials
- [The 2019 version of this class](https://github.com/csessig86/intro-to-d3-nicar-19)
- [A day-long D3 class that John taught](https://github.com/jmuyskens/big-data-ignite-d3-workshop)
- [Free Code Camp](https://www.freecodecamp.org/learn/) 
- [Learn JS Data](http://learnjsdata.com/index.html)
- [Eloquent Javascript](https://eloquentjavascript.net/) 

