import {Object} from './global';
export const getType = ((objectToString) => (object: unknown) => objectToString.call(object).slice(8, -1))(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Object.prototype.toString,
);
