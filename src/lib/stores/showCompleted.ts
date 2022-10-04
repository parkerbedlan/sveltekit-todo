import { writableLocalStorage } from './writableLocalStorage';

export const showCompleted = writableLocalStorage<boolean>('showCompleted', true);
