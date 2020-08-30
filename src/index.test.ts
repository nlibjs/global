import ava from 'ava';
import {Error, undefined, Number, NaN, isNaN} from '.';

ava('create an Error without code', (t) => {
    const error = new Error('foo');
    t.is(error.code, 'Error');
    t.is(error.message, 'foo');
});

ava('create an Error with code', (t) => {
    const error = new Error('Expected', 'foo');
    t.is(error.code, 'Expected');
    t.is(error.message, 'foo');
});

ava('undefined is undefined', (t) => {
    t.is(undefined, [][0]);
});

ava('Infinity is Infinity', (t) => {
    t.false(Number.isFinite(Infinity));
});

ava('NaN is NaN', (t) => {
    t.true(Number.isNaN(NaN));
});

ava('isNaN is strict', (t) => {
    t.false(isNaN('NaN'));
    t.false(isNaN(undefined));
    t.false(isNaN({}));
    t.false(isNaN('a'));
});
