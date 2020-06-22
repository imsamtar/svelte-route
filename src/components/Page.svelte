<script>
  import { onMount, onDestroy, getContext } from "svelte";
  import pagejs from "page";

  export let route = "/";
  export let src = undefined;
  export let guard = [];
  export let guards = guard instanceof Array ? guard : [guard];
  export let middleware = [];
  export let middlewares =
    typeof middleware === "function" ? [middleware] : middleware;

  const router = getContext("$router");
  const page = {};
  let context;

  onMount(function() {
    $router.routes = [...$router.routes, page];
    pagejs(route, ...middlewares, function(ctx, next) {
      const pass = guards.reduce(function(pass, guard) {
        return pass && (typeof guard === "function" ? guard(ctx) : guard);
      }, true);
      if (pass) {
        $router.active = page;
        context = ctx;
      } else {
        $router.active = null;
      }
    });
  });
  onDestroy(function() {
    $router.routes = $router.routes.filter(_page => _page !== page);
  });
</script>

{#if $router.active === page}
  {#if src}
    <svelte:component this={src} {...context.params} />
  {:else}
    <slot {context} params={context.params} />
  {/if}
{/if}
