// Middleware de autenticação.
// Interceta pedidos antes de chegarem ao controller, verifica se existe um
// token JWT no header Authorization, valida esse token e, se for válido,
// guarda os dados do utilizador em req.user e permite continuar para a rota.
// Se o token estiver ausente, mal formatado ou inválido, devolve erro 401.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app.config';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        username: string;
        role: string;
    };
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido.' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ erro: 'Formato do token inválido.' });
    }

    try {
        const decoded = jwt.verify(token, appConfig.auth.jwtSecret) as {
            id: number;
            username: string;
            role: string;
        };

        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
}