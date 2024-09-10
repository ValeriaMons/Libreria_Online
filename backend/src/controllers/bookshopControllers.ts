import { Request, Response } from 'express';
import  {BookshopModels}  from '../models/bookshopModels'; //{BookShopServices}

export class BookControllers {
    private bookshopModels: BookshopModels;

    constructor() {
        this.bookshopModels = new BookshopModels();
    }

    getBooks = async (req: Request, res: Response) => {
        try{
            const books = await this.bookshopModels.getBooks();
            res.json(books);
        }catch(error){
            res.status(500).json({error: 'Errore nel recupero dei libri'});
        }
    }

    createNewBook = async (req: Request, res: Response) => {
    
        try {
        
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
            console.error('Errore nell\'aggiunta del libro:', error);
            res.status(500).json({ 
              message: 'Errore nell\'aggiunta del libro', 
              error: error instanceof Error ? error.message : String(error)
            });
          }
    }

    updateBook = async (req: Request, res: Response) => {
        try {
            const updateBook = await this.bookshopModels.updateBook(req.body);
            if(updateBook)
            {
                res.json(updateBook);
            }else {
                res.status(404).json({error: 'Libro non trovato'});
            }
        } catch(error) {
            res.status(505).json({error: 'Errore nell\'aggiornamento del libro'});
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


