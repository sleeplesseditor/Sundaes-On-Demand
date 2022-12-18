import { setupServer } from 'mws';
import { handlers } from './handlers';

export const server = setupServer(...handlers);