import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Textarea, Button, Stack } from '@mantine/core';
import { Book } from '../types';

interface BookFormProps {
  initialValues?: Partial<Book>;
  onSubmit: (values: Omit<Book, 'id'>) => void;
  loading?: boolean;
}

export const BookForm = ({ initialValues, onSubmit, loading }: BookFormProps) => {
  const form = useForm({
    initialValues: {
      title: initialValues?.title || '',
      author: initialValues?.author || '',
      year: initialValues?.year || new Date().getFullYear(),
      description: initialValues?.description || '',
    },

    validate: {
      title: (value) => (value.length < 2 ? 'Title too short' : null),
      author: (value) => (value.length < 2 ? 'Author too short' : null),
      year: (value) => (value < 0 ? 'Invalid year' : null),
      description: (value) => (value.length < 5 ? 'Description too short' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput label="Title" {...form.getInputProps('title')} required />
        <TextInput label="Author" {...form.getInputProps('author')} required />
        <NumberInput label="Year" {...form.getInputProps('year')} required />
        <Textarea label="Description" {...form.getInputProps('description')} required />

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
