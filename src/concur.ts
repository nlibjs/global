import {Promise} from './global';
import {Error} from './error';

export const concur = async <T, S>(
    params: {
        concurrency: number,
        iterator: Iterator<T> | AsyncIterator<T>,
        processor: (item: T, index: number) => Promise<S> | S,
    },
): Promise<Array<S>> => await new Promise((resolve, reject) => {
    const {concurrency} = params;
    if (1 <= concurrency) {
        const {iterator, processor} = params;
        const results: Array<S> = [];
        let activeProcessCount = 0;
        let index = 0;
        const next = () => {
            if (0 <= activeProcessCount && activeProcessCount < concurrency) {
                Promise.resolve(iterator.next())
                .then((result) => {
                    if (result.done) {
                        if (activeProcessCount === 0) {
                            resolve(results);
                        }
                    } else {
                        const itemIndex = index++;
                        activeProcessCount++;
                        Promise.resolve(processor(result.value, itemIndex))
                        .then((value) => {
                            results[itemIndex] = value;
                            activeProcessCount--;
                            next();
                        })
                        .catch((error) => {
                            activeProcessCount = -1;
                            reject(error);
                        });
                        next();
                    }
                })
                .catch((error) => {
                    activeProcessCount = -1;
                    reject(error);
                });
            }
        };
        next();
    } else {
        reject(new Error('InvalidConcurrency', `The concurrency is invalid: ${concurrency}`, params));
    }
});
