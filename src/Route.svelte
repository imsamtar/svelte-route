<script>
  import { onMount, getContext } from "svelte";
  import newPath from "./helpers/newPath";
  import matchPath from "./helpers/matchPath";
  import routes from "./stores/routes";
  import { updateCount } from "./helpers/handleAnchor";

  export let component = undefined;
  export let path = "./";

  let uid = parseInt(1000 + Math.random() * 8999);
  let router = getContext("__router");
  let completePath = newPath($router.completePath, path);
  let route = { uid, completePath, component };
  let firstTime = true;

  $router.routes.push(route);
  let matched;

  function routeChange() {
    if (!$router.activeRoute) {
      matched = matchPath(route.completePath, location.pathname);
      if (matched) $router.activeRoute = uid;
      else $router.activeRoute = null;
    }
    firstTime = false;
  }

  $: routeChange($updateCount);
</script>

{#if $router.activeRoute === uid}
  {#if component}
    <svelte:component this={component} {...matched} />
  {:else}
    <slot params={matched} />
  {/if}
{/if}
