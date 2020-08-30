import ava from 'ava';
import {defineHiddenReadOnlyProperty} from './defineHiddenReadOnlyProperty';
import {Symbol, Object} from './global';

ava('defineHiddenReadOnlyProperty', (t) => {
    const key = Symbol('foo');
    const value = 123;
    const map = {};
    defineHiddenReadOnlyProperty(map, key, value);
    t.true(key in map);
    t.throws(() => Object.assign(map, {[key]: 234}));
});
