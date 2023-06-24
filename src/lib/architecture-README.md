So far I moved blindly learning the intricacies of
vscode, svelte, typescript, DOM and CSS.
Now I try to organize stuff.

I must be clear
about the role of components and their handling of events.

As for the underlying datastructures, `PBoard` is the central point.


Manual solving a problem using the mouse

One drags tiles from the the TileBoard to the PPBoard components.
For a given problem 
IF the tile fits 





Unlike I expected when wanting to avoid the complexities of modal code, I
probably cannot have different components for tiles because one feature of the
application is to drag them around. Or can I dynamically change the nature of a
tile without flickering.


In term of Z-order Tiles are non top, Grids are on front of PBoards


The Grid components does not know much expect displaying cells, displaying
and editing them. Besides Grid, I expect to support Hexagrid Grid.
Currently on GridMode.TileEditor, it uses a polyline to display a tile.
This is probaby the role of the Tile component. 