export function elId(id: string) {
    const elem = document.getElementById(id);
    if (elem === null) {
        throw new Error(`Can not select element '${id}'`);
    }
    return elem;
}

export function limitLen(input: string, maxLength = 50) {
    return input.length > maxLength
        ? input.substr(0, maxLength) + "..."
        : input;
}

const numFormator = new Intl.NumberFormat(navigator.language);
export function thousands(input: number) {
    return numFormator.format(input);
}
