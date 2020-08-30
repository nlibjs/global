import ava from 'ava';
import {defineReadOnlyProperties} from './defineReadOnlyProperties';
import {Object} from './global';

ava('defineReadOnlyProperties', (t) => {
    const map = defineReadOnlyProperties({}, {
        foo: 1 as const,
        bar: 2 as const,
    });
    t.deepEqual(map, {foo: 1, bar: 2});
    t.throws(() => Object.assign(map, {foo: 3}));
});
