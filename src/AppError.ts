import {Error} from './Error';
import {defineReadOnlyProperties} from './defineReadOnlyProperties';

export class AppError<TData = unknown> extends Error {

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
