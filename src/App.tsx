import { useState } from 'react';
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from './hooks/useBooks';
import { Book } from './types';
import '@mantine/core/styles.css';
import { Loader, Container, Table, Button, Group, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { BookForm } from './components/BookForm';
import { BookDetails } from './components/BookDetails';

function App() {
  const { data: books, isLoading, isError } = useBooks();
  const [search, setSearch] = useState('');

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  const handleCreate = () => {
    modals.open({
      title: 'Create Book',
      children: (
        <BookForm
          onSubmit={(values) => {
            createBook.mutate(values, {
              onSuccess: () => {
                modals.closeAll();
                notifications.show({ message: 'Book created', color: 'green' });
              },
              onError: () => {
                notifications.show({ message: 'Failed to create book', color: 'red' });
              },
            });
          }}
        />
      ),
    });
  };

  const handleViewDetails = (book: Book) => {
    modals.open({
      title: 'Book Details',
      children: <BookDetails book={book} />,
    });
  };
  

  const handleEdit = (book: Book) => {
    modals.open({
      title: 'Edit Book',
      children: (
        <BookForm
          initialValues={book}
          onSubmit={(values) => {
            updateBook.mutate(
              { id: book.id, book: values },
              {
                onSuccess: () => {
                  modals.closeAll();
                  notifications.show({ message: 'Book updated', color: 'green' });
                },
                onError: () => {
                  notifications.show({ message: 'Failed to update book', color: 'red' });
                },
              }
            );
          }}
        />
      ),
    });
  };

  const handleDelete = (id: number) => {
    deleteBook.mutate(id, {
      onSuccess: () => {
        notifications.show({ message: 'Book deleted', color: 'green' });
      },
      onError: () => {
        notifications.show({ message: 'Failed to delete book', color: 'red' });
      },
    });
  };

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
  

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading books.</div>;

  return (
    <Container>
      <h1>Book Manager</h1>
      <TextInput
        placeholder="Search by title"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        mb="md"
      />
      <Button onClick={handleCreate} mb="md">
        Add Book
      </Button>
      <Table>
        
        <tbody>
          {filteredBooks?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <Group>
                  <Button size="xs" onClick={() => handleEdit(book)}>
                    Edit
                  </Button>
                  <Button size="xs" color="blue" onClick={() => handleViewDetails(book)}>
                    View
                  </Button>
                  <Button size="xs" color="red" onClick={() => handleDelete(book.id)}>
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
