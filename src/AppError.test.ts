import ava from 'ava';
import {Error, AppError} from './AppError';
import {Object} from './global';

ava('create an AppError', (t) => {
    const error = new AppError({code: 'Foo'});
    t.is(error.code, 'Foo');
    t.is(error.message, 'Foo');
});

ava('code and data are fixed', (t) => {
    const error = new Error('foo', 'Expected');
    t.throws(() => Object.assign(error, {code: 'Expected2'}));
    t.throws(() => Object.assign(error, {data: 'Expected'}));
});
