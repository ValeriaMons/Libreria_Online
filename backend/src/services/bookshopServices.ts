import { Pool } from "pg";
import { Book } from "../models/books";

import {db} from '../config/db';

export class BookshopServices {

 

     async get(): Promise<Book[]>{
      const query = 'SELECT * FROM books';
    const { rows } = await db.query(query);
    return rows;
    }


    async post (book: Book): Promise<Book[]>{

      if (!book.title || book.title.trim() === '') {
        throw new Error('Il titolo del libro è obbligatorio');
      }
    
     
      if (!book.author || book.author.trim() === '') {
        throw new Error('L\'autore del libro è obbligatorio');
      }
    
      
      if (book.published_year !== undefined) {
        const currentYear = new Date().getFullYear();
        if (!book.published_year || book.published_year > currentYear) {
          throw new Error('L\'anno di pubblicazione non può essere nel futuro');
        }
      }
      try {
        const query = 'INSERT INTO books (title, author, published_year, genre, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [book.title, book.author, book.published_year, book.genre, book.stock];
        const { rows } = await db.query(query, values);
        return rows[0];
      } catch (error) {
        console.error('Errore nell\'esecuzione della query di inserimento:', error);
        throw error;
      }
    }


    async put (id: number, book: Partial<Book>): Promise<Book | null>{
      const query = 'UPDATE books SET title = $1, author = $2, published_year = $3, genre = $4, stock = $5 WHERE id = $6 RETURNING *';
      const values = [book.title, book.author, book.published_year, book.genre, book.stock, id];
      const { rows } = await db.query(query, values);
      return rows[0] || null;
    }


    async delete(id: number): Promise<boolean> {
      const query = 'DELETE FROM books WHERE id = $1';
    const { rowCount } = await db.query(query, [id]);
      return (rowCount ?? 0) > 0;
    }

}




