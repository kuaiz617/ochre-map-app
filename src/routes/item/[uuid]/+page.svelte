<script lang="ts">
  import { goto } from '$app/navigation';

  export let data;
  const item = data.item;

  let imageUrl = item.image?.url || item.hasRepresentation?.[0]?.representation?.url;


  let properties = {};
  let subtype = {};
  item.properties.forEach(prop => {
    const label = prop.label;
    const value = prop.values?.[0]?.content || '[No value]';
    let subprop = prop.properties;
    let subtypes = {};
    subprop.forEach(property => {
      const label_ = property.label;
      const value_ = property.values?.[0]?.content || '[No value]';
      subtypes[label_] = value_;
    })
    properties[label] = value;
    subtype[label] = subtypes;
  });

  console.log(subtype);
  console.log(properties);
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
  <!-- Home button I search online find rounded shadow style make it look better -->
  <button
    class="mb-6 px-4 py-2 bg-white-200 hover:bg-gray-300 rounded shadow"
    on:click={goHome}
  >
    Home
  </button>

  <!-- Title -->
  <h1 class="text-3xl font-bold text-left mb-6">{item.identification?.label ?? '[No label]'}</h1>

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
      {#each Object.entries(subtype[label]) as [label_, value_]}
        <div class="font-semibold">&emsp;&emsp;{label_}</div>
        <div>{value_}</div>
      {/each}
    {/each}
  </div>
</div>
