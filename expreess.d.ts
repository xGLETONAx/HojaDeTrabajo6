// express.d.ts
import { TokenPayload } from './types';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // Añade la propiedad user
    }
  }
}
