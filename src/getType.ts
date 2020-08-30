import {Object} from './global';
export const getType = ((objectToString) => (object: any) => objectToString.call(object).slice(8, -1))(
    Object.prototype.toString,
);
