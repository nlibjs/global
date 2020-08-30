const g = globalThis;
export {g as globalThis};
export const {Object} = g;
export const {Array} = g;
export const {ArrayBuffer} = g;
export const {Atomics} = g;
export const {BigInt} = g;
export const {BigInt64Array} = g;
export const {BigUint64Array} = g;
export const {Boolean} = g;
export const {DataView} = g;
export const {Date} = g;
// export const {Error} = g;
export class Error extends g.Error {

    public readonly code?: string;

    public constructor(
        codeOrMessage?: string,
        message?: string,
    ) {
        super(message || codeOrMessage);
        this.code = message ? codeOrMessage : 'Error';
    }
}
export const {EvalError} = g;
export const {Float32Array} = g;
export const {Float64Array} = g;
export const {Function} = g;
export const {Infinity} = g;
export const {Int16Array} = g;
export const {Int32Array} = g;
export const {Int8Array} = g;
export const {Intl} = g;
export const {JSON} = g;
export const {Map} = g;
export const {Math} = g;
export const {NaN} = g;
export const {Number} = g;
export const {Promise} = g;
export const {Proxy} = g;
export const {RangeError} = g;
export const {ReferenceError} = g;
export const {Reflect} = g;
export const {RegExp} = g;
export const {Set} = g;
export const {SharedArrayBuffer} = g;
export const {String} = g;
export const {Symbol} = g;
export const {SyntaxError} = g;
export const {TypeError} = g;
export const {URIError} = g;
export const {URL} = g;
export const {URLSearchParams} = g;
export const {Uint16Array} = g;
export const {Uint32Array} = g;
export const {Uint8Array} = g;
export const {Uint8ClampedArray} = g;
export const {WeakMap} = g;
export const {WeakSet} = g;
export const {WebAssembly} = g;
export const {clearInterval} = g;
export const {clearTimeout} = g;
export const {console} = g;
export const {decodeURI} = g;
export const {decodeURIComponent} = g;
export const {encodeURI} = g;
export const {encodeURIComponent} = g;
export const {escape} = g;
// export const {eval} = g;
export const {isFinite} = g;
export const {isNaN} = g;
export const {parseFloat} = g;
export const {parseInt} = g;
export const {setInterval} = g;
export const {setTimeout} = g;
export const {undefined} = g;
export const {unescape} = g;
