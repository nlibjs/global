import ava from 'ava';
import {serialize, Serializable} from './serialize';

let index = 0;
const test = (
    {title, serializable, expected}: {
        title: string,
        serializable: Serializable,
        expected: Array<string>,
    },
) => {
    ava(`#${++index} ${title}`, (t) => {
        t.deepEqual([...serialize(serializable)], expected);
    });
};

test({
    title: 'string',
    serializable: 'foo',
    expected: ['foo'],
});
test({
    title: 'Array<string>',
    serializable: ['foo1', 'foo2'],
    expected: ['foo1', 'foo2'],
});
test({
    title: 'ArrayLike<string>',
    serializable: {
        0: 'foo1',
        1: 'foo2',
        2: 'foo3',
        length: 2,
    },
    expected: ['foo1', 'foo2'],
});
test({
    title: 'Iterable<string>',
    serializable: {
        [Symbol.iterator]: (): Iterator<string> => {
            let count = 0;
            return {
                next: (): IteratorResult<string> => {
                    if (++count <= 3) {
                        return {done: false, value: `foo${count}`};
                    } else {
                        return {done: true, value: 'done'};
                    }
                },
            };
        },
    },
    expected: ['foo1', 'foo2', 'foo3'],
});
test({
    title: 'Generator<string>',
    serializable: (function* () {
        for (let count = 0; count <= 3; count++) {
            yield `foo${count}`;
        }
    }()),
    expected: ['foo0', 'foo1', 'foo2', 'foo3'],
});
test({
    title: 'Iterator<string>',
    serializable: (function () {
        let count = 0;
        return {
            next: (): IteratorResult<string> => {
                if (++count <= 3) {
                    return {done: false, value: `foo${count}`};
                } else {
                    return {done: true, value: 'done'};
                }
            },
        };
    }()),
    expected: ['foo1', 'foo2', 'foo3'],
});
