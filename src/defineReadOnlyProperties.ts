import {Object} from './global';

export const defineReadOnlyProperties = <T, V extends Record<string, any>>(
    object: T,
    valueMap: V,
): T & Readonly<V> => {
    for (const key of Object.keys(valueMap)) {
        Object.defineProperty(object, key, {value: valueMap[key], enumerable: true});
    }
    return object as T & Readonly<V>;
};
