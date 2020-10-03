export const findCharCodeIndex = (
    source: string,
    charCodes: Set<number | undefined>,
    index = 0,
): number => {
    const {length} = source;
    while (index < length) {
        if (charCodes.has(source.charCodeAt(index))) {
            return index;
        }
        index++;
    }
    return -1;
};

export const findCodePointIndex = (
    source: string,
    codePoints: Set<number | undefined>,
    index = 0,
): number => {
    const {length} = source;
    while (index < length) {
        const codePoint = source.codePointAt(index);
        if (codePoints.has(codePoint)) {
            return index;
        }
        index += 0x10000 < (codePoint as number) ? 2 : 1;
    }
    return -1;
};
