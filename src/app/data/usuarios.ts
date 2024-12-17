export interface Usuarios {
    [userId: string]: {
        userId?: string,
        token: string,
        nombre: string,
        correo: string
    };
};