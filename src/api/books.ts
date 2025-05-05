import axios from 'axios';
import { Book } from '../types/';

const API_URL = 'http://localhost:3001/books';

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBook = async (id: number): Promise<Book> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

export const updateBook = async (id: number, book: Omit<Book, 'id'>): Promise<Book> => {
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
