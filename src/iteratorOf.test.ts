import ava from 'ava';
import {iteratorOf} from './iteratorOf';

ava('returns an iterator for an array', (t) => {
    const iterator = iteratorOf([3, 2, 1]);
    t.deepEqual(
        [
            iterator.next(),
            iterator.next(),
            iterator.next(),
            iterator.next(),
        ],
        [
            {value: 3, done: false},
            {value: 2, done: false},
            {value: 1, done: false},
            {value: undefined, done: true},
        ],
    );
});

ava('concatenate iterators', (t) => {
    const iterator = iteratorOf([4, 5, 6], [3, 2, 1]);
    t.deepEqual(
        [
            iterator.next(),
            iterator.next(),
            iterator.next(),
            iterator.next(),
            iterator.next(),
            iterator.next(),
            iterator.next(),
        ],
        [
            {value: 4, done: false},
            {value: 5, done: false},
            {value: 6, done: false},
            {value: 3, done: false},
            {value: 2, done: false},
            {value: 1, done: false},
            {value: undefined, done: true},
        ],
    );
});
