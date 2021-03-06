## svelte-route

A simple routing library for svelte.

### API

- Pages
    - props
        - alt: Component [optional]
            - this component will be shown when current route does not match any page.

    - slot
        - default:
            - always shown
        - alt
            - only shown when not alt prop is passed and current route does not match any page.

- Page
    - props
        - route: string [default: '/']
        - src: component [optional]
        - middleware:
            - types
                - function(context, next)
                - array[function(context, next)]
            - description:
                - middleware must call next() in order to enter the page.
        - middlewares:
            - types
                - array[function(context, next)]
            - description:
                - every middleware must call next() in order to enter the page.
        - guard: truthy/falsey | function | array[function] | array[truthy/falsey]
        - guards: array[function] | array[truthy/falsey]
        - scrollReset:
            - options
                - "auto" [default]
                    - Reset scroll position only if actual change in route.
                - true | truthy
                    - Always reset scroll position.
                - false | "false" | falsey
                    - Don't reset scroll position at all.
        - alt: component [optional]
            - if failed to pass guards.

    - slots
        - default
            - shown only if not src prop is passed.
        - alt
            - if failed to pass guards and alt prop not passed.

- goto
    - description
        - to navigate around programmatically with javascript.
    - arguments
        - url: string
        - replace: Boolean
- _goto
    - description
        - can be useful in cases like, on:click={() => goto("/")} can be replaced by on:click={_goto("/)}.
        - helps keep your code little clean.
    - arguments
        - url: string
        - replace: Boolean
    - returns
        - a function which will call orignal goto function.
        - () => goto(url, replace)
