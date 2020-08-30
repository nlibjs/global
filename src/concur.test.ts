import ava from 'ava';
import {Promise} from './global';
import {concur} from './concur';
import {wait} from './wait';
import {iteratorOf} from './iteratorOf';
import {AppError} from './AppError';

ava('process concurrently', async (t) => {
    const iterator = iteratorOf([5, 4, 3, 2, 1, 0]);
    const events: Array<string> = [];
    const processor = async (item: number, index: number) => {
        events.push(`start ${item} ${index}`);
        await wait((3 ** item) * 10);
        events.push(`end ${item} ${index}`);
        return {item, index};
    };
    const result = await concur({concurrency: 3, iterator, processor});
    t.deepEqual(events, [
        'start 5 0',
        'start 4 1',
        'start 3 2',
        'end 3 2',
        'start 2 3',
        'end 2 3',
        'start 1 4',
        'end 1 4',
        'start 0 5',
        'end 0 5',
        'end 4 1',
        'end 5 0',
    ]);
    t.deepEqual(result, [
        {item: 5, index: 0},
        {item: 4, index: 1},
        {item: 3, index: 2},
        {item: 2, index: 3},
        {item: 1, index: 4},
        {item: 0, index: 5},
    ]);
});

ava('stop at an error', async (t) => {
    const iterator = iteratorOf([5, 4, 3, 2, 1, 0]);
    const events: Array<string> = [];
    const processor = async (item: number, index: number) => {
        events.push(`start ${item} ${index}`);
        if (index === 4) {
            throw new AppError({code: 'ExpectedError'});
        }
        await wait((3 ** item) * 10);
        events.push(`end ${item} ${index}`);
        return {item, index};
    };
    await t.throwsAsync(async () => {
        await concur({concurrency: 3, iterator, processor});
    }, {code: 'ExpectedError'});
    t.deepEqual(events, [
        'start 5 0',
        'start 4 1',
        'start 3 2',
        'end 3 2',
        'start 2 3',
        'end 2 3',
        'start 1 4',
    ]);
});

ava('invalid concurrency', async (t) => {
    const iterator = iteratorOf([5, 4, 3, 2, 1, 0]);
    const processor = async (item: number, index: number) => {
        return await Promise.resolve({item, index});
    };
    await t.throwsAsync(async () => {
        await concur({concurrency: 0.9, iterator, processor});
    }, {code: 'InvalidConcurrency'});
    await t.throwsAsync(async () => {
        await concur({concurrency: 0, iterator, processor});
    }, {code: 'InvalidConcurrency'});
    await t.throwsAsync(async () => {
        await concur({concurrency: -1, iterator, processor});
    }, {code: 'InvalidConcurrency'});
});
