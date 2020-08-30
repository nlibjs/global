import ava from 'ava';
import {AppError} from './AppError';
import {Object, undefined} from './global';

ava('create an AppError', (t) => {
    const error = new AppError({code: 'Foo'});
    t.is(error.code, 'Foo');
    t.is(error.message, 'Foo');
    t.is(error.data, undefined);
});

ava('create an AppError with data', (t) => {
    const error = new AppError({code: 'Foo', data: 123});
    t.is(error.code, 'Foo');
    t.is(error.message, 'Foo');
    t.is(error.data, 123);
});

ava('code and data are fixed', (t) => {
    const error = new AppError({code: 'Foo', data: 123});
    t.throws(() => Object.assign(error, {code: 'Expected'}));
    t.throws(() => Object.assign(error, {data: 234}));
});
