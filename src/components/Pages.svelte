<script>
  import { onMount, onDestroy, setContext } from "svelte";
  import { writable } from "svelte/store";
  import routers from "../stores/routers";
  import pagejs from "page";

  export let notfound = undefined;

  const router = writable({ routes: [], active: null });

  setContext("$router", router);

  onMount(function() {
    pagejs.start();
    $routers = [...$routers, router];
  });
  onDestroy(function() {
    $routers = $routers.filter(_router => _router !== router);
  });
</script>

<slot />
{#if !$router.active}
  {#if notfound}
    <svelte:component this={notfound} />
  {:else}
    <slot name="not-found">
      <h1>Error: 404</h1>
      <p>Page not found...</p>
    </slot>
  {/if}
{/if}
