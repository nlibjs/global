import ava from 'ava';
import * as stream from 'stream';
import {Promise, setTimeout} from './global';
import {readLine, readLineAsync} from './readLine';

ava('read lines', (t) => {
    const reader = readLine('\n012\r\n345\r678\n\r\n9');
    t.deepEqual(reader.next(), {value: '', done: false});
    t.deepEqual(reader.next(), {value: '012', done: false});
    t.deepEqual(reader.next(), {value: '345', done: false});
    t.deepEqual(reader.next(), {value: '678', done: false});
    t.deepEqual(reader.next(), {value: '', done: false});
    t.deepEqual(reader.next(), {value: '9', done: false});
    t.deepEqual(reader.next(), {value: undefined, done: true});
});

ava('for-of', (t) => {
    const result: Array<string> = [];
    const reader = readLine('\n012\r\n345\r678\n\r\n9');
    for (const line of reader) {
        result.push(line);
    }
    t.deepEqual(result, ['', '012', '345', '678', '', '9']);
});

ava('node stream usage', async (t) => {
    const source = new stream.PassThrough();
    (async () => {
        source.write('');
        source.write('\n');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('01');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('2\r\n');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('345\r678\n\r\n9');
        await new Promise((resolve) => setTimeout(resolve));
        source.end();
    })().catch((error) => t.fail(error));
    const result: Array<string> = [];
    for await (const line of readLineAsync(source)) {
        result.push(line);
    }
    t.deepEqual(result, ['', '012', '345', '678', '', '9']);
});

ava('CRLF boundary', async (t) => {
    const source = new stream.PassThrough();
    (async () => {
        source.write('');
        source.write('\n');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('01');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('2\r\n');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('345\r678\n\r');
        await new Promise((resolve) => setTimeout(resolve));
        source.write('\n9');
        source.end();
    })().catch((error) => t.fail(error));
    const result: Array<string> = [];
    for await (const line of readLineAsync(source)) {
        result.push(line);
    }
    t.deepEqual(result, ['', '012', '345', '678', '', '9']);
});
