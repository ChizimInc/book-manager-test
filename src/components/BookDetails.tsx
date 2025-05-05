import { Book } from '../types';
import { Stack, Text, Title } from '@mantine/core';

interface BookDetailsProps {
  book: Book;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <Stack>
      <Title order={3}>{book.title}</Title>
      <Text><strong>Author:</strong> {book.author}</Text>
      <Text><strong>Year:</strong> {book.year}</Text>
      <Text><strong>Description:</strong></Text>
      <Text>{book.description}</Text>
    </Stack>
  );
};
