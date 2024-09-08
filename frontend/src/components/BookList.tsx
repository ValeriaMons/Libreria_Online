import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';
import './BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isInsertFormVisible, setIsInsertFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    published_year: null as number | null,
    genre: '' as string | null,
    stock: null as number | null
  });

  const [editingBook, setEditingBook] = useState<Book | null>(null);

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
      await axios.post('http://localhost:5000/books', newBook);
      setNewBook({
        title: '',
        author: '',
        published_year: null,
        genre: '',
        stock: null
      });
      setIsInsertFormVisible(false);
      fetchBooks();
    } catch (error) {
      console.error('Errore nell\'inserimento del libro:', error);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBook) return;
    try {
      await axios.put(`http://localhost:5000/books/${editingBook.id}`, editingBook);
      setIsEditFormVisible(false);
      fetchBooks();
    } catch (error) {
      console.error('Errore nella modifica del libro:', error);
    }
  };

  const toggleInsertForm = () => {
    setIsInsertFormVisible(!isInsertFormVisible);
  };

  const openEditForm = (book: Book) => {
    setEditingBook({...book});
    setIsEditFormVisible(true);
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
            <button className='editButton' onClick={() => openEditForm(book)}>Modifica</button>
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

      <button onClick={toggleInsertForm} className="mostra-button">
        {isInsertFormVisible ? 'Nascondi' : 'Inserisci Nuovo Libro'}
      </button>

      {isInsertFormVisible && (
        <form onSubmit={handleInsert} className="add-form">
          <input
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            placeholder="Title"
            className="insertTitle"
          /> 
          <input
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            placeholder="Author"
            className="insertAuthor"
          />
          <input
            type='number'
            value={newBook.published_year ?? ''}
            onChange={(e) => setNewBook({...newBook, published_year: Number(e.target.value)})}
            placeholder="Published Year"
            className="insertPublished_Year"
          />
          <input
            type="text"
            value={newBook.genre ?? ''}
            onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
            placeholder="Genre"
            className="insertGenre"
          />
          <input
            type='number'
            value={newBook.stock ?? ''}
            onChange={(e) => setNewBook({...newBook, stock: Number(e.target.value)})}
            placeholder="Stock"
            className="insertStock"
          />
          <button type="submit" className="insert-button">Inserisci</button>
        </form>
      )}

      {isEditFormVisible && editingBook && (
        <div className="edit-form-overlay">
          <div className="edit-form-container">
            <h2 className='modificaLibro'>Modifica Libro</h2>
            <form onSubmit={handleEdit} className="edit-form">
              <input
                type="text"
                value={editingBook.title}
                onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                placeholder="Title"
                className="editTitle"
              /> 
              <input
                type="text"
                value={editingBook.author}
                onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                placeholder="Author"
                className="editAuthor"
              />
              <input
                type='number'
                value={editingBook.published_year ?? ''}
                onChange={(e) => setEditingBook({...editingBook, published_year: Number(e.target.value)})}
                placeholder="Published Year"
                className="editPublished_Year"
              />
              <input
                type="text"
                value={editingBook.genre ?? ''}
                onChange={(e) => setEditingBook({...editingBook, genre: e.target.value})}
                placeholder="Genre"
                className="editGenre"
              />
              <input
                type='number'
                value={editingBook.stock ?? ''}
                onChange={(e) => setEditingBook({...editingBook, stock: Number(e.target.value)})}
                placeholder="Stock"
                className="editStock"
              />
              <button type="submit" className="edit-button">Salva Modifiche</button>
              <button type="button" onClick={() => setIsEditFormVisible(false)} className="cancel-button">Annulla</button>
            </form>
          </div>
        </div>
      )}

      {renderBooks()}
    </div>
  );
};

export default BookList;