// Check if a string parameter is empty 
export const isStringEmpty = (str: string | null) => {
    return (!str || /^\s*$/.test(str));
}

// Get enum key by his value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEnumKeyByValue = (object: any, value: number) => {
    return Object.keys(object).find(key => object[key] === value);
}