import {globalThis} from './global';
import {defineReadOnlyProperties} from './defineReadOnlyProperties';

export class Error extends globalThis.Error {

    public readonly code?: string;

    public constructor(
        message?: string,
        code = 'Error',
    ) {
        super(message);
        defineReadOnlyProperties(this, {code});
    }

}
