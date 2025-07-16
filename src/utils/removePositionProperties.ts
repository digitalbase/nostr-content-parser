// deno-lint-ignore-file no-explicit-any
export function removePositionProperties(obj: any): any {
    if (Array.isArray(obj)) {
        // Process each element in the array
        return obj.map(removePositionProperties);
    } else if (obj && typeof obj === "object") {
        // Process each property in the object
        return Object.keys(obj).reduce((newObj, key) => {
            if (key !== "position") {
                newObj[key] = removePositionProperties(obj[key]);
            }
            return newObj;
        }, {} as Record<string, any>);
    }
    // If it's not an object or array, return it as is
    return obj;
}
