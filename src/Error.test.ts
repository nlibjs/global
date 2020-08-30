import ava from 'ava';
import {Error} from './AppError';
import {Object} from './global';

ava('create an Error without code', (t) => {
    const error = new Error('foo');
    t.is(error.message, 'foo');
    t.is(error.code, 'Error');
});

ava('create an Error with code', (t) => {
    const error = new Error('foo', 'Expected');
    t.is(error.message, 'foo');
    t.is(error.code, 'Expected');
});

ava('code and data are fixed', (t) => {
    const error = new Error('foo', 'Expected');
    t.throws(() => Object.assign(error, {code: 'Expected2'}));
});
