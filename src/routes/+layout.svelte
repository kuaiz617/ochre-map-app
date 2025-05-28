

<!-- from the website: https://next.shadcn-svelte.com/docs/dark-mode/svelte -->
<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
 </script>
  
 <ModeWatcher />
 {@render children?.()}