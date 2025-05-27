<script lang="ts">
    import { goto } from '$app/navigation';
  
    export let data;
    const item = data.item;
  
    let imageUrl = item.image?.url || item.hasRepresentation?.[0]?.representation?.url;

  
    let properties = {};
    item.properties.forEach(prop => {
      const label = prop.label;
      const value = prop.values?.[0]?.content || '[No value]';
      properties[label] = value;
    });
    
function getProperty(label) {
  const prop = item.properties.find(p => p.label.toLowerCase() === label.toLowerCase());
  return prop?.values?.map(v => v.content).join(', ') || '—';
}

    const objectType = item.properties.find(p => p.label === 'Object type')?.values?.[0]?.content ?? '—';
  
    function goHome() {
      goto('/');
    }
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <!-- Home button -->
    <button
      class="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded shadow"
      on:click={goHome}
    >
      Home
    </button>
  
    <!-- Title -->
    <h1 class="text-3xl font-bold text-center mb-6">{item.identification?.label ?? '[No label]'}</h1>
  
    <!-- Image -->
    {#if imageUrl}
      <div class="flex justify-center mb-6">
        <img src={imageUrl} alt={item.identification?.label} class="max-w-lg w-full rounded shadow" />
      </div>
    {/if}
  
    <!-- Properties grid -->
    <div class="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-lg">
      {#each Object.entries(properties) as [label, value]}
        <div class="font-semibold">{label}</div>
        <div>{value}</div>
      {/each}
  
      <!-- Add Object type separately -->
      <div class="font-semibold">Object type</div>
      <div></div>
    </div>
  </div>
  