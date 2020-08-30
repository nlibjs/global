import ava from 'ava';
import {Uint32Array, JSON} from './global';
import {getType} from './getType';

let index = 0;
const test = (
    {input, expected}: {
        input: Parameters<typeof getType>[0],
        expected: ReturnType<typeof getType>,
    },
) => {
    ava(`#${++index} ${JSON.stringify(input)} → ${expected}`, (t) => {
        t.deepEqual(getType(input), expected);
    });
};

test({input: null, expected: 'Null'});
test({input: undefined, expected: 'Undefined'});
test({input: true, expected: 'Boolean'});
test({input: false, expected: 'Boolean'});
test({input: 0, expected: 'Number'});
test({input: NaN, expected: 'Number'});
test({input: Infinity, expected: 'Number'});
test({input: '0', expected: 'String'});
test({input: {}, expected: 'Object'});
test({input: [], expected: 'Array'});
test({input: new Uint32Array(1), expected: 'Uint32Array'});
