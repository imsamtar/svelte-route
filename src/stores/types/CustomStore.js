import { get, writable } from "svelte/store";

export default class CustomStore {
    constructor(value) {
        const { subscribe, update, set } = writable(value);
        this.subscribe = subscribe;
        this.update = update;
        this.set = set;
    }
    get() {
        return get(this);
    }
}