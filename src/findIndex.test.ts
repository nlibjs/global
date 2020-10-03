import ava from 'ava';
import {CodeTester, findIndexOfCharCode, findIndexOfCodePoint} from './findIndex';

ava('findIndexOfCharCode', (t) => {
    const test: CodeTester = (charCode) => charCode === 'c'.charCodeAt(0);
    t.is(findIndexOfCharCode('abcabc', test), 2);
    t.is(findIndexOfCharCode('abcabc', test, 2), 2);
    t.is(findIndexOfCharCode('abcabc', test, 3), 5);
    t.is(findIndexOfCharCode('abcabc', () => false), -1);
});

ava('findIndexOfCodePoint', (t) => {
    const test: CodeTester = (codePoint) => codePoint === '😊'.codePointAt(0);
    t.is(findIndexOfCodePoint('abc😊abc😊', test), 3);
    t.is(findIndexOfCodePoint('abc😊abc😊', test, 3), 3);
    t.is(findIndexOfCodePoint('abc😊abc😊', test, 4), 8);
    t.is(findIndexOfCodePoint('abc😊', () => false), -1);
});
