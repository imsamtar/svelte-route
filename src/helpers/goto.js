export default function (url, replace) {
    if (replace) {
        return history.replaceState("", document.title, url);
    }
    return history.pushState("", document.title, url);
}
