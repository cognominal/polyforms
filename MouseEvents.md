Debugging has developped into a full sidequest.
The default key combo to start the svelte inspector 
interfer with the screen capture keybinding.
Anyway the vscode new drag and drop feature is nice.

In the first picture we see that when we check the
debug box we have info about the laid tiles involved
in the solution. I would like to hilight the info 
about a given tile when hovering over it.

The idea is to set a event handler for the laid tiles and toggle
the corresponding entry in `infoEltsHighlight` to  update the class
`highlight` to the info entry corresponding the hovered laid tile.

this is unrelated be we see the setting of style variable to do 
a translate (not shown)



```
	$: infoEltsHighlight = pboard.laidTiles.map(() => false);
```


```
		{#each pboard.laidTiles as ltile, i}
			<g class="absolute" data-i={i} style="--posx:{posx(ltile)};--posy:{posy(ltile)}"
			on:mouseover={onMouseEvent}
			on:mouseleave={onMouseEvent}
```

```
		{#each pboard.laidTiles as ltile, i}
			<div 
			class:highlight={infoEltsHighlight[i]}>
				{debugInfos(ltile)}
			</div>
		{/each}
```


![Alt text](<Screenshot 2023-06-17 at 04.03.58.png>)
![Alt text](<Screenshot 2023-06-17 at 04.00.32.png>)

The event handler is set on the g svg element and we 
want to understand the `mouseover` and `mouseleave` event to 
set up the class.

On the screen capture, appears the console.logged events.
under --t, we respectivelty have the target element and under --r the relatedTarget
element of the said event.