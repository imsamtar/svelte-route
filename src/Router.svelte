<script>
  import CustomStore from "./stores/types/CustomStore";
  import { setContext, getContext } from "svelte";
  import { onMount } from "svelte";
  import routes from "./stores/routes";
  import newPath from "./helpers/newPath";
  import removeProperty from "./helpers/removeProperty";

  export let path = "/";
  export let notfound = undefined;
  let uid = parseInt(1000 + Math.random() * 8999);
  let parentRouter = getContext("__router");
  let completePath =
    (parentRouter && newPath($parentRouter.completePath, path)) || path;
  let router = new CustomStore({
    uid,
    completePath,
    routes: [],
    activeRoute: null
  });

  setContext("__router", router);

  onMount(function() {
    $routes = [...$routes, router];
  });
</script>

<slot />
{#if !$router.activeRoute}
  {#if notfound}
    <svelte:component this={notfound} />
  {:else}
    <slot name="not-found" />
  {/if}
{/if}
