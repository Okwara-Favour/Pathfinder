Pathfinder

Summary:
An interactive web application for visualizing pathfinding algorithms on provided environment maps,
and user-generated maps. Why User Generated? The app has a blank environment map to which users can draw on it and
run provided algorithms.

Instructions:
Toggle Grid on and off by clicking on the button

Disabled buttons are triggered based on specific maps, and algorithms
Developer Maze - enables Width, Height, Create, Place mode, and Colors settings
Visualization Debug mode - enables the next button
Algorithm A* and GBEFS - enables the distance type calculation button at the side of it.

Some modes also disable some buttons, clicks and text boxes
Place mode - disables the text box and mouse setting of start and end position, also disables the run button.

Developer mode does not reset created maps on switching to one of the other given maps but only refreshed by the browser
or changed by the user.


Controls:
Text inputs:
Inputs for start and end is of the form -    A,B
e.g Start: 0,0 .............. End: 4,4. This example uses the first map, Basic Map

Mouse:
Step 1:
Hover mouse on the canvas.

Step 2:
3 clicks

1. Set start position on any cell of the grid map.
2. Set end position an any cell that is of the same color as the start position cell.
3. Reset.

To Drag:

1. Enable drag by clicking on toggleDrag button.
2. After the 2nd click which sets the end position, or after manually setting the positions on the text input box for
start position and end, by hovering mouse around, the end position automatically changes and new searches will be made.
3. Click the 3rd time to reset, click toggleDrag again if enabled to disable.

 
