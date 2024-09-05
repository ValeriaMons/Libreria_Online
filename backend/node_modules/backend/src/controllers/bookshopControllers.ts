import { Request, Response } from 'express';
import  {BookshopServices}  from '../services/bookshopServices'; //{BookShopServices}

export class BookControllers {
    private bookshopServices: BookshopServices;

    constructor() {
        this.bookshopServices = new BookshopServices();
    }

    get = async (req: Request, res: Response) => {
        try{
            const books = await this.bookshopServices.get();
            res.json(books);
        }catch(error){
            res.status(500).json({error: 'Errore nel recupero dei libri'});
        }
    }

    post = async (req: Request, res: Response) => {
    
        try {
            console.log('Received request body:', req.body); // Log del body ricevuto
      
            // Validazione base
            if (!req.body || typeof req.body !== 'object') {
              return res.status(400).json({ message: 'Invalid request body' });
            }
      
            const { title, author, published_year, genre, stock } = req.body;
      
            if (!title || !author) {
              return res.status(400).json({ message: 'Title and author are required' });
            }
      
            const newBook = await this.bookshopServices.post({
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

    put = async (req: Request, res: Response) => {
        try {
            const updateBook = await this.bookshopServices.put(parseInt(req.params.id), req.body);
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


    delete = async (req: Request, res: Response) => {
        try {
            const deleteBook = await this.bookshopServices.delete(parseInt(req.params.id));
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


