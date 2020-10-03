export const findCharCodeIndex = (
    source: string,
    charCodes: Set<number | undefined>,
    fromIndex = 0,
): number => {
    const {length} = source;
    for (let index = fromIndex; index < length; index++) {
        if (charCodes.has(source.charCodeAt(index))) {
            return index;
        }
    }
    return -1;
};

export const findCodePointIndex = (
    source: string,
    codePoints: Set<number | undefined>,
    fromIndex = 0,
): number => {
    const {length} = source;
    for (let index = fromIndex; index < length; index++) {
        if (codePoints.has(source.codePointAt(index))) {
            return index;
        }
    }
    return -1;
};
