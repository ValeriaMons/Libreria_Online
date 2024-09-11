import { db } from '../config/db';
import { User, UserInput } from '../interface/user';

export const userModel = {
    async getUserByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0] || null;
    },
  
    async getUserById(id: number): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0] || null;
    },
  
    async createUser(user: UserInput): Promise<User> {
        const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
        const values = [user.email, user.password];
        const { rows } = await db.query(query, values);
        return rows[0];
    },
  
    async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        const query = 'UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password) WHERE id = $3 RETURNING *';
        const values = [userData.email, userData.password, id];
        const { rows } = await db.query(query, values);
        return rows[0] || null;
    }
};