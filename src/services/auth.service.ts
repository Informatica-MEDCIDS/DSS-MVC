/*Esta classe AuthService é responsável por autenticar um utilizador.

Ou seja, recebe:
	•	username
	•	password

e verifica se:
	1.	o utilizador existe
	2.	a password está correta

Se tudo correr bem, gera um token JWT que poderá depois ser usado nas rotas protegidas.*/



import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { baseDeDadosUsers } from '../database/local-storage';
import { appConfig } from '../config/app.config';

export class AuthService {
    login(username: string, password: string): string {
        const user = baseDeDadosUsers.find(u => u.username === username);

        if (!user) {
            throw new Error('Credenciais inválidas.');
        }

        const passwordValida = bcrypt.compareSync(password, user.password);

        if (!passwordValida) {
            throw new Error('Credenciais inválidas.');
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            appConfig.auth.jwtSecret
        );

        return token;
    }
}