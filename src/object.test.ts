import ava from 'ava';
import {
    defineHiddenReadOnlyProperty,
    defineReadOnlyProperties,
} from './object';
import {Symbol, Object} from './global';

ava('defineHiddenReadOnlyProperty', (t) => {
    const key = Symbol('foo');
    const value = 123;
    const map = {};
    defineHiddenReadOnlyProperty(map, key, value);
    t.true(key in map);
});

ava('defineReadOnlyProperties', (t) => {
    const map = defineReadOnlyProperties({}, {
        foo: 1 as const,
        bar: 2 as const,
    });
    t.deepEqual(map, {foo: 1, bar: 2});
    t.throws(() => Object.assign(map, {foo: 3}));
});
