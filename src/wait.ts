import {setTimeout, Promise} from './global';

export const wait = async (
    duration: number,
): Promise<void> => await new Promise((resolve) => setTimeout(resolve, duration));
