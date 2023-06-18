<script lang="ts">
    function handleClick() {
      console.log('SVG element clicked!');
    }
    function handleMouse(i : number) {
      console.log('SVG element mouse event!', i);
    }

  </script>
  
  {#each [1, 2, 3] as i}
  <div on:mouseover={() => handleMouse(i)}
  on:focus={handleMouse(i)}>{i}</div>
  {/each}



  
  <svg width="100" height="100">
    {#each [1, 2, 3] as i}
    <rect transform="translate({i * 20}, {i * 20})"
    x="10" y="10" width="10" height="10" fill="red" 
    on:click={handleClick} on:keydown={handleClick} 
    on:mouseover={handleMouse(i)}
    on:focus={handleMouse(i)}
    
    />
    {/each}
  </svg>