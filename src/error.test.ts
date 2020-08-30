import ava from 'ava';
import {Error} from './error';

ava('create an Error without code', (t) => {
    const error = new Error('foo');
    t.is(error.message, 'foo');
    t.is(error.code, 'Error');
});

ava('create an Error with code', (t) => {
    const error = new Error('Expected', 'foo');
    t.is(error.message, 'foo');
    t.is(error.code, 'Expected');
    t.is(error.data, null);
});

ava('create an Error with code and data', (t) => {
    const error = new Error('Expected', 'foo', 123);
    t.is(error.message, 'foo');
    t.is(error.code, 'Expected');
    t.is(error.data, 123);
});

ava('code and data are fixed', (t) => {
    const error = new Error('Expected', 'foo', 123);
    t.throws(() => Object.assign(error, {code: 'Expected2'}));
    t.throws(() => Object.assign(error, {data: 234}));
});
