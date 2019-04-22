export function elId(id:string) {
    const elem = document.getElementById(id);
    if (elem === null ) {
        throw new Error(`Can not select element '${id}'`);
    }
    return elem;
}