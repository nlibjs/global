import {globalThis} from './global';
import {defineReadOnlyProperties} from './defineReadOnlyProperties';

export class Error<T> extends globalThis.Error {

    public readonly code!: string;

    public readonly data!: T | null;

    public constructor(
        codeOrMessage?: string,
        message?: string,
        data: T | null = null,
    ) {
        super(message || codeOrMessage);
        defineReadOnlyProperties(this, {
            code: message ? codeOrMessage : 'Error',
            data,
        });
    }
}
