import { Book } from "../interface/books";
import {db} from '../config/db';

export class BookshopModels {

 

     async getBooks(): Promise<Book[]>{
      const query = 'SELECT * FROM books';
      const { rows } = await db.query(query);
      return rows;
    }


    async createNewBook (newBook: Book): Promise<Book>{
        const query = 'INSERT INTO books (title, author, published_year, genre, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [newBook.title, newBook.author, newBook.published_year, newBook.genre, newBook.stock];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async updateBook (id: number, book: Partial<Book>): Promise<Book | null>{
      const query = 'UPDATE books SET title = $1, author = $2, published_year = $3, genre = $4, stock = $5 WHERE id = $6 RETURNING *';
      const values = [book.title, book.author, book.published_year, book.genre, book.stock, id];
      const { rows } = await db.query(query, values);
      return rows[0] || null;
    }

    async deleteBook(id: number): Promise<boolean> {
      const query = 'DELETE FROM books WHERE id = $1';
      const { rowCount } = await db.query(query, [id]);
      return (rowCount ?? 0) > 0;
    }

}




