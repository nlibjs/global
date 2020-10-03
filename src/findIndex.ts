export interface CodeTester {
    (testee: number | undefined): boolean,
}

export const findIndexOfCharCode = (
    source: string,
    test: CodeTester,
    index = 0,
): number => {
    const {length} = source;
    while (index < length) {
        if (test(source.charCodeAt(index))) {
            return index;
        }
        index++;
    }
    return -1;
};

export const findIndexOfCodePoint = (
    source: string,
    test: CodeTester,
    index = 0,
): number => {
    const {length} = source;
    while (index < length) {
        const codePoint = source.codePointAt(index);
        if (test(codePoint)) {
            return index;
        }
        index += 0x10000 < (codePoint as number) ? 2 : 1;
    }
    return -1;
};
