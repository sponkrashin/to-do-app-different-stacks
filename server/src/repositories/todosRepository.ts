import { Document, ObjectId } from 'mongodb';
import { DatabaseClient } from './databaseClient';

export interface TodoDocument extends Document {
  id: string;
  title: string;
  tags?: string[] | null;
}

export async function getAll(): Promise<TodoDocument[]> {
  const client = new DatabaseClient();

  const result = await client.execute(async (database) => {
    const todosCollection = database.collection('todos');

    const todos = (await todosCollection.find().toArray()).map(
      (x) =>
        ({
          ...x,
          id: x._id.toJSON(),
        }) as unknown as TodoDocument,
    );

    return todos;
  });

  return result;
}

export async function existsById(id: string): Promise<boolean> {
  const client = new DatabaseClient();

  const result = await client.execute(async (database) => {
    try {
      const todosCollection = database.collection('todos');
      const count = await todosCollection.countDocuments({ _id: new ObjectId(id) });
      return count;
    } catch {
      return 0;
    }
  });

  return result > 0;
}

export async function getById(id: string): Promise<TodoDocument | null> {
  const client = new DatabaseClient();

  const result = await client.execute(async (database) => {
    try {
      const todosCollection = database.collection('todos');
      const todo = await todosCollection.findOne({ _id: new ObjectId(id) });

      return {
        ...todo,
        id: todo?._id.toJSON(),
      } as TodoDocument;
    } catch {
      return null;
    }
  });

  return result;
}

export async function add(document: TodoDocument): Promise<string> {
  const client = new DatabaseClient();

  const result = await client.execute(async (database) => {
    const todosCollection = database.collection('todos');
    const newTodoId = await todosCollection.insertOne({ title: document.title, tags: document.tags });
    return newTodoId.insertedId;
  });

  return result.toJSON();
}

export async function update(document: TodoDocument): Promise<TodoDocument | null> {
  const client = new DatabaseClient();

  await client.execute(async (database) => {
    const todosCollection = database.collection('todos');
    await todosCollection.replaceOne(
      { _id: new ObjectId(document.id) },
      { title: document.title, tags: document.tags },
    );
  });

  return document;
}

export async function remove(id: string): Promise<void> {
  const client = new DatabaseClient();

  await client.execute(async (database) => {
    const todosCollection = database.collection('todos');
    await todosCollection.deleteOne({ _id: new ObjectId(id) });
  });
}
