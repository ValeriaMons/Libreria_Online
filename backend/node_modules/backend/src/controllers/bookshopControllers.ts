import { NextFunction, Request, Response } from 'express';
import  {BookshopModels}  from '../models/bookshopModels';
import  errorHandler  from '../middleware/errorHandler';
import {validateBook} from '../middleware/validation-handler';

export class BookControllers {
    private bookshopModels: BookshopModels;

    constructor() {
        this.bookshopModels = new BookshopModels();
    }

    getBooks = async (req: Request, res: Response) => {
        console.log('la richiesta è: ', req);
        try{
            const books = await this.bookshopModels.getBooks();
            console.log('I libri scraricti al primo caricamento sono: ', books)
            res.json(books);
        }catch(error){
            console.error("Error caught in getBooks", error);
            //    res.status(500).json({error: "Errore nell'aggiunta del libro"});
              errorHandler(res,error);
        }
    }

    createNewBook = async (req: Request, res: Response, next: NextFunction) => {
    
        try {
        
            validateBook(req.body);
            const { title, author, published_year, genre, stock } = req.body;
      
            const newBook = await this.bookshopModels.createNewBook({
                title,
                author,
                published_year: published_year ? parseInt(published_year) : null,
                genre: genre || null,
                stock: stock ? parseInt(stock) : 0,
                id: 0
            });
      
            res.status(201).json(newBook);
          } catch (error) {
           console.error("Error caught in getBooks", error);
        //    res.status(500).json({error: "Errore nell'aggiunta del libro"});
           errorHandler(res,error);
          }
    }

    updateBook = async (req: Request, res: Response) => {
        try {

            validateBook(req.body);
            const updateBook = await this.bookshopModels.updateBook(req.body);
            if(updateBook)
            {
                res.json(updateBook);
            }else {
                res.status(404).json({error: 'Libro non trovato'});
            }
        } catch(error) {
            console.error("Error caught in getBooks", error);
        //    res.status(500).json({error: "Errore nell'aggiunta del libro"});
           errorHandler(res,error);
        }
    };


    deleteBook = async (req: Request, res: Response) => {
        try {
            const deleteBook = await this.bookshopModels.deleteBook(parseInt(req.params.id));
            if(deleteBook) {
                res.status(204).send();
            } else {
                res.status(404).json({error: 'Libro non trovato'});
            }
        } catch(error) {
            res.status(500).json({error: 'Errore nella rimozione del libro'});
        }
    };

}


