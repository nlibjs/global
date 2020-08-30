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

export class AppError<TData = any> extends Error {

    public data?: TData;

    public constructor(
        props: {
            code: string,
            message?: string,
            data?: TData,
        },
    ) {
        super(props.message || props.code, props.code);
        defineReadOnlyProperties(this, {data: props.data});
    }

    public toString() {
        return `${this.code}: ${this.message}`;
    }

}
