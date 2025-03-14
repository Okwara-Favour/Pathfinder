# Pathfinder
An interactive web application for visualizing pathfinding algorithms on provided environment maps,
and user-generated maps. Why User Generated? The app has a blank environment map to which users can draw on it and
run provided algorithms. Click [here](https://okwara-favour.github.io/Pathfinder/) to run the web application.

## Demo
https://github.com/user-attachments/assets/f04f01c5-32a2-41fb-b65c-198ad47e6881

### Developer Mode Preview
https://github.com/user-attachments/assets/b207764d-c292-41de-b5a1-a05d6d3547f2



### Instructions

Toggle grid layout on and off by clicking on **toggleGrid**

Disabled buttons are triggered based on specific maps, and algorithms
- Developer Maze - enables Width, Height, Create, Place mode, and Colors settings
- Debug visualization mode - enables the **next** button
- Algorithm A* and GBEFS - enables the distance type calculation dropdown at the right side of it.

Some modes also disable some buttons, clicks and text boxes
- Place mode - disables the text box and mouse setting of start and end position, also disables the run button.

Developer mode does not reset created maps on switching to one of the other given maps but only by browser refresh
or user changes.


### Controls
**Text inputs:** 
- Inputs for start(**S**) and end(**E**) is of the form _row, column_ e.g **S**: 0,0   **E**: 1,1, then click **Run** to execute
- Inputs for width(**W**) and height(**H**) are valid numbers _>=_ 0, then click **Create**

**Mouse:**
- Hover mouse on the canvas.
- 3 left mouse clicks
  - Set start position on any cell of the grid map.
  - Set end position an any cell that is of the same color as the start position cell.
  - Reset.
- Dragging:
  - Enable drag by clicking on **toggleDrag** button.
  - After the 2nd click which sets the end position, or after manually setting the positions on the text input box for start position and end, by hovering mouse around, the end position automatically changes and new searches will be made.
  - Click the 3rd time to reset, click **toggleDrag** again if enabled to disable.

 
