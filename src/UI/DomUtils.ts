export function elId(id: string) {
    const elem = document.getElementById(id);
    if (elem === null) {
        throw new Error(`Can not select element '${id}'`);
    }
    return elem;
}

export function limitLen(input: string) {
    return input.length > 60 ? input.substr(0, 60) + "..." : input;
}
