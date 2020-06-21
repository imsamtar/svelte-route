## svelte-route

A simple routing library for svelte.

### API

- Pages

- Page
    - props
        - route: String [default: '/']
        - src: SvelteComponent
        - guard: Function | Array

- goto
    - args
        - url: String
        - replace: Boolean
