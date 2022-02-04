# Tuckboxer: a web-based card box designer

Yet another tuckbox template generator.  Or foldable carton template generator.  Or dieline generator.

I couldn't find an affordable tool that gave me the tuckbox template I was looking for, so I'm making it myself.

The goal is to make an open source tool for creating card storage box templates.

I am trying to make it simple to add new template generators so that anybody who needs a new box design can simply add a new generator to get what they need.

# Primary goals
* Template generators create printable content
* Template generators create downloadable images (SVG and PNG)
* Adding a new generator is as easy as editing the example generator to add the needed SVG elements

# eventual desires
* Ability to edit faces
  First just by adding images
	Later add SVG editing features
	* edit image
	* Text
	* Text-on-path
	* ... other svg features

# About tuckbox/foldable carton standards
While researching alternatives, I found that the terms "folding carton", "folding package" and "dieline" are equivalent terms that are much more in use.

In fact, there are at least two standards for folding cartons - ECMA and FEFCO.

In the "resources" folder, I have included some .pdf files to help contributors provide industry standard names for their generators.

# Adding generators
The application is built using React, and each generator is be a React component.

While the ability to download SVG is an eventual requirement (and hopefully will be the easiest way to create templates), the generator doesn't have to render in SVG.

To add a new SVG generator:
* copy the file "box-only.jsx" and give the new file a meaningful name (if possible, the ECMA code for the design - use '_' instead of '.')
* add references to your file to "/components/generators/index.js"
* update the SVG
* Your generator may not create a standard "box" template.  Perhaps you are creating a triangular box (like the Toblerone chocolates package), or octagonal...the sky's the limit, really.  For this situation, you will need change the description details exported by "getDefinition()":
```
{
	name: `${name}`,
	representation: url({exampleImageFile}),
	imputs: [
		{
			label: `${input1Label}`,
			description: `${input1Description`}
		},
		...
	]
}
```

# A primer on SVG paths
SVG paths are a collection of target positions.  The co-ordinate system is generally x on the horizontal plane and y on the vertical with 0,0 being the upper-left corner.

The elements in the path define what will be drawn.  For example, drawing a line from 5,5 to 10,10 the commands would be:
* Move to 5,5
* draw a line to 10,10

Actions are indicated with a command character and details of the action follow the command; the number of parameters are defined by the action itself.

There are two ways this can be specified - absolute and relative.

Absolute actions are indicated with uppercase characters, where relative actions use lowercase.

Relative path actions add their parameters to the prior position, where absolute actions add their x/y co-ordinates to 0,0

The absolute path in this example is `M 5 5 L 10 10`

The relative path is `m 5 5 l 5 5` (this assumes the prior position was 0,0)

To ensure the line is drawn at a specific location, start with an absolute "Move" command, then use the relative line command `M 5 5 l 5 5`

Here is an SVG cheat-sheet you can reference: https://cheatography.com/beccam/cheat-sheets/svg-cheat-sheet/

# The M (move) command
The 'move' command is 'M' for the absolute version and 'm' for the relative version.

It relocates the "current position" without leaving a line behind.

It recieves 2 inputs - the x and y co-ordinates to move to

# Line commands
Line commands always use the current position as the starting point, then draw a straight line to the target co-ordinate.

## Angled lines: "L" and "l"
These commands receive two inputs - the x and y co-ordinate of the end of the line

## Vertical lines: "V" and "v"
Vertical lines only accept one input - the y co-ordinate of the end of the line

## Horizontal lines: "H" and "h"
Vertical lines only accept one input - the x co-ordinate of the end of the line

# Arcs
Arcs are defined using "A" and "a" but are much more complex - to fully understand them, I recommend reading more advanced SVG guides than this.

The arc command receieves these parameters
* x radius
* y radius
* x-axis rotation
* large arc flag
* sweep flag
* ending x value
* ending y value


