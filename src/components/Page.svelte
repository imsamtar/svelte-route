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
  export let scrollReset = "auto";
  export let alt = undefined;
  let slots = $$props.$$slots || {};

  const router = getContext("$router");
  const page = {};
  let context;
  let pass_guards;

  onMount(function() {
    $router.routes = [...$router.routes, page];
    pagejs(route, ...middlewares, function(ctx, next) {
      context = ctx;
      if (pass_guards) {
        const old_route = $router.active;
        $router.active = page;
        if (scrollReset && scrollReset !== "false") {
          if (scrollReset === "auto") old_route !== page && scrollTo(0, 0);
          else scrollTo(0, 0);
        }
      } else if (alt || slots.alt) {
        $router.active = page;
      } else $router.active = null;
    });
  });
  onDestroy(function() {
    $router.routes = $router.routes.filter(_page => _page !== page);
  });

  $: guards = guard instanceof Array ? guard : [guard];

  $: pass_guards = guards.reduce(
    (pass, guard) => pass && (typeof guard === "function" ? guard() : !!guard),
    true
  );
</script>

{#if $router.active === page}
  {#if pass_guards}
    {#if src}
      <svelte:component this={src} {...context.params} />
    {:else}
      <slot {context} params={context.params} />
    {/if}
  {:else if alt}
    <svelte:component this={alt} {context} />
  {:else if slots.alt}
    <slot name="alt" />
  {/if}
{/if}
