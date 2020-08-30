import {Object} from './global';

export const defineHiddenReadOnlyProperty = <T, V>(
    object: T,
    key: symbol,
    value: V,
): T => Object.defineProperty(object, key, {value, enumerable: false}) as T;
