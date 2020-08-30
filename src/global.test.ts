import ava from 'ava';
import {undefined, Number, NaN, isNaN} from './global';

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
