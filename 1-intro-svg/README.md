# Intro to SVGs

SVG stands for **scalable vector graphic** and it's a flexible XML format that we often use to draw shapes in D3.

SVG shapes are made up of <path> elements
- D3 comes with handy generators to help you draw paths into specific chart shapes, such as line, area, stack, arc, pie and symbol.

### How they work:
- SVGs have tags and look a lot like HTML, but they have different properties and enable us to use geometry to draw shapes.

TO DO:
GET A BIT MORE INTO M, H, V, L https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
- THEN SAY, D3 DOES THIS FOR US! 

COVER CX, CY, R 


```html 
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```


### Try it yourself:
- With your partner, Google "SVG syntax" and try to draw a few shapes in the index file.
- 
#### Pro tip:
- Adobe Illustrator reads SVGs, and the New York Times graphics team made a great Chrome plugin called [SVG Crowbar](https://nytimes.github.io/svg-crowbar/) that makes it easy to export an SVG from a webpage and open it in Illustrator. A workflow that we like is drawing a crazy shape in D3, Crowbar'ing it out of the browser, editing in Illustrator and publishing with [ai2html](http://ai2html.org/), another free tool from NYT graphics. Here's [an example](https://www.washingtonpost.com/graphics/politics/kushner-conflicts/?utm_term=.8bbce7210bc5) from Darla's days at the Post. 


