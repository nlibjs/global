import ava from 'ava';
import {findCharCodeIndex, findCodePointIndex} from './findIndex';
import {Set} from './global';

ava('findCharCodeIndex', (t) => {
    const target = new Set(['c'.charCodeAt(0)]);
    t.is(findCharCodeIndex('abcabc', target), 2);
    t.is(findCharCodeIndex('abcabc', target, 2), 2);
    t.is(findCharCodeIndex('abcabc', target, 3), 5);
    t.is(findCharCodeIndex('abcabc', new Set()), -1);
});

ava('findCodePointIndex', (t) => {
    const target = new Set(['😊'.codePointAt(0)]);
    t.is(findCodePointIndex('abc😊abc😊', target), 3);
    t.is(findCodePointIndex('abc😊abc😊', target, 3), 3);
    t.is(findCodePointIndex('abc😊abc😊', target, 4), 8);
    t.is(findCodePointIndex('abc😊', new Set()), -1);
});
