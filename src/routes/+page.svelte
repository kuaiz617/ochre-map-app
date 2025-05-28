<script lang="ts">
    import { writable, derived } from 'svelte/store';
    import { Input } from '$lib/components/ui/input/index.js';
    import * as Table from '$lib/components/ui/table/index.js';
    import { MapLibre, DefaultMarker } from 'svelte-maplibre';
    import { type Coordinates } from '@digitalculture/ochre-sdk';

    import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
  
    const { data } = $props();
    const items = writable(data.set.items);
    const query = writable('');
    const darkMode = writable(false); // Dark mode toggle
  
    // Object Type 
    const filteredItems = derived([query, items], ([$query, $items]) =>
  $items.filter(item => {
    const lowerQuery = $query.toLowerCase();
    const label = item.identification?.label?.toLowerCase() ?? '';

    const propertiesMatch = item.properties?.some(prop =>
      prop.values?.some(v => v.content?.toLowerCase().includes(lowerQuery))
    );

    return label.includes(lowerQuery) || propertiesMatch;
  })
);

  
    function toggleTheme() {
      darkMode.update(v => !v);
      document.documentElement.classList.toggle('dark');
    }
  </script>
  
  <!--  Toggle Dark Mode Button -->
  <Button onclick={toggleMode} variant="outline" size="icon">
    <SunIcon
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <MoonIcon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
  
  <!-- Map -->
  <MapLibre
    zoom={5}
    center={[34.8, 33.3]}
    class="h-[400px] rounded-lg shadow-xl"
    style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
  >
    {#each $filteredItems as item}
      {#if item.coordinates?.latitude && item.coordinates?.longitude}
        <DefaultMarker
          lngLat={[
            (item.coordinates as Coordinates).longitude,
            (item.coordinates as Coordinates).latitude
          ]}
        />
      {/if}
    {/each}
  </MapLibre>
  
  <!-- search bar） -->
  <div class="p-4">
    <Input bind:value={$query} placeholder="Filter by name or type..." class="max-w-md w-full" />
  </div>
  
  <!--  Table -->
  <div class="overflow-auto">
    <Table.Root class="min-w-full">
      <Table.Caption>OCHRE Spatial Items</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Object Type</Table.Head>
          <Table.Head>Museum Number</Table.Head>
          <Table.Head>Full TEO Findspot</Table.Head>
          <Table.Head>Script</Table.Head>
          <Table.Head>Language</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each $filteredItems as item}
          <Table.Row>
            <Table.Cell class="font-medium">
              <a href={`/item/${item.uuid}`} class="text-black-600 underline">
                {item.identification?.label ?? '[No name]'}
              </a>
            </Table.Cell>
            <Table.Cell>
              {item.properties?.find(p => p.label === 'Object type')?.values?.[0]?.content ?? '—'}
            </Table.Cell>
            <Table.Cell>
              {item.properties?.find(p => p.label === 'Museum Number')?.values?.[0]?.content ?? '—'}
            </Table.Cell>
            <Table.Cell>
              {item.properties?.find(p => p.label === 'Full TEO Findspot')?.values?.[0]?.content ?? '—'}
            </Table.Cell>
            <Table.Cell>
              {item.properties?.find(p => p.label === 'Script')?.values?.[0]?.content ?? '—'}
            </Table.Cell>
            <Table.Cell>
              {item.properties?.find(p => p.label === 'Language')?.values?.[0]?.content ?? '—'}
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  
  <!--  Filtered result note -->
  {#if $filteredItems.length === 1}
    <p class="text-center text-gray-500 italic mt-6">
      Objects discovered outside the kingdom of Ugarit
    </p>
  {/if}
  