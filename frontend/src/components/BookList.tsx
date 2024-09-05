import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';
import './BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [title, setTitle] = useState<string>('');
const [author, setAuthor] = useState<string>('');
const [published_year, setPublished_year] = useState<number | null>(null);
const [genre, setGenre] = useState<string | null>(null);
const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei libri:', error);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    const results = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleInsert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Sending POST request to http://localhost:5000/books');
      const response = await axios.post('http://localhost:5000/books', {
        title,
        author,
        published_year,
        genre,
        stock
      });
      console.log('Risposta dal server:', response.data);
      
     
      setTitle('');
      setAuthor('');
      setPublished_year(Number || null); 
      setGenre('' || null);
      setStock(Number || null); 
    } catch (error) {
      console.error('Errore nella creazione del libro:', error);
    }

    window.location.reload();

  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setIsSearching(false);
      setSearchResults([]);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      await fetchBooks();
    } catch (error) {
      console.error('Errore durante l\'eliminazione del libro:', error);
    }
  };
  const renderBooks = () => {
    const booksToRender = isSearching ? searchResults : books;

    if (booksToRender.length === 0) {
      return <p>Nessun libro trovato.</p>;
    }

    return (
      <ul className="books-grid">
        
        {booksToRender.map((book) => (
          <li key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>Autore: {book.author}</p>
            <p>Anno di pubblicazione: {book.published_year}</p>
            <p>Genere: {book.genre}</p>
            <p>Copie disponibili: {book.stock}</p>
            <button className='deleteButton' onClick={() => handleDelete(book.id)}>Elimina</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="book-list">
      <h1 className='title-document'>Libreria Online</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Cerca per titolo o autore"
          className="search-input"
        />
        <button type="submit" className="search-button">Cerca</button>
      </form>




      <form onSubmit={handleInsert} className="add-form">
        <input
          type="text"
          value={title}
         onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title"
          className="insertTite"
        /> 

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)} 
          placeholder="Author"
          className="insertAuthor"
        />

        <input
          type='number'
          value={published_year ?? ''}
          onChange={(e) => setPublished_year(Number(e.target.value))}
          placeholder="Published_Year"
          className="insertPublished_Year"
        />

        <input
          type="text"
          value={genre ?? ''}
          onChange={(e) => setGenre(e.target.value)} 
          placeholder="Genre"
          className="insertGenre"
        />

        <input
          type='number'
          value={stock ?? ''}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Stock"
          className="insertStock"
        />


        <button type="submit" className="insert-button" >Inserisci</button>

      </form>

      {renderBooks()}
    </div>
  );
};
export default BookList;