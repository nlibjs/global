import ava from 'ava';
import {Date} from './global';
import {wait} from './wait';

ava('wait', async (t) => {
    const time1 = Date.now();
    const time2 = Date.now();
    await wait(50);
    const time3 = Date.now();
    t.true(time2 - time1 < time3 - time2);
    await wait(100);
    const time4 = Date.now();
    t.true(time3 - time2 < time4 - time3);
});
