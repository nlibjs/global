import {Object} from './global';

export const defineReadOnlyProperties = <T, V extends Record<string, unknown>>(
    object: T,
    valueMap: V,
): Readonly<V> & T => {
    for (const key of Object.keys(valueMap)) {
        Object.defineProperty(object, key, {value: valueMap[key], enumerable: true});
    }
    return object as Readonly<V> & T;
};
