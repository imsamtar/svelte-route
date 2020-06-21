export default function removeProp(obj, prop = "") {
    obj = { ...obj };
    delete obj[prop];
    return obj;
}
