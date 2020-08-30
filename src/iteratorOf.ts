export const iteratorOf = function* <T>(...iterables: Array<Iterable<T>>): Iterator<T> {
    for (const iterable of iterables) {
        for (const item of iterable) {
            yield item;
        }
    }
};
