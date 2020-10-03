import {Object} from './global';

export const LF = 0x0A;
export const CR = 0x0D;

export const findCodePointIndex = (
    source: string,
    fromIndex: number,
    ...codePoints: Array<number>
): number => {
    const {length} = source;
    for (let index = fromIndex; index < length; index++) {
        if (codePoints.includes(source.charCodeAt(index))) {
            return index;
        }
    }
    return -1;
};

export const isCRLF = (
    source: string,
    index: number,
) => source.charCodeAt(index) === CR && source.charCodeAt(index + 1) === LF;

export interface LineFragmentReader {
    readonly flush: () => Generator<string, void, void>,
    (chunk: string): Generator<string, void, void>,
}

export const createLineFragmentReader = (): LineFragmentReader => {
    let remainder = '';
    let maybeCRLF = false;
    return Object.defineProperty(
        function* (
            chunk: string,
        ): Generator<string, void, void> {
            if (!chunk) {
                return;
            }
            let string = `${remainder}${chunk}`;
            if (maybeCRLF && string.charCodeAt(0) === LF) {
                string = string.slice(1);
            }
            let lineStart = 0;
            const {length} = string;
            while (lineStart < length) {
                const lineEnd = findCodePointIndex(string, lineStart, CR, LF);
                if (lineEnd < 0) {
                    break;
                }
                yield string.slice(lineStart, lineEnd);
                lineStart = lineEnd + (isCRLF(string, lineEnd) ? 2 : 1);
            }
            remainder = string.slice(lineStart);
            maybeCRLF = string.charCodeAt(length - 1) === CR;
        },
        'flush',
        {
            *value() {
                if (remainder) {
                    yield remainder;
                }
            },
        },
    ) as LineFragmentReader;
};

export const readLine = function* <T>(
    source: Iterable<T>,
): Generator<string, void, void> {
    const read = createLineFragmentReader();
    for (const chunk of typeof source === 'string' ? [source] : source) {
        yield* read(`${chunk}`);
    }
    yield* read.flush();
};

export const readLineAsync = async function* <T>(
    source: AsyncIterable<T>,
): AsyncGenerator<string, void, void> {
    const read = createLineFragmentReader();
    for await (const chunk of source) {
        yield* read(`${chunk}`);
    }
    yield* read.flush();
};
