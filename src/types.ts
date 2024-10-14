export interface User {
    dpi: string;
    name: string;
    email: string;
    password: string;
    newDpi?: string;  
  }
  
  
  export interface TokenPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
  }
  
  // Extender la interfaz Request de Express
export interface CustomRequest extends Request {
    user?: TokenPayload;  // Se agrega la propiedad `user` que podría no estar presente
}