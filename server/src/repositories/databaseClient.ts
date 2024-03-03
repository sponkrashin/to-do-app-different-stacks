import { Db, MongoClient } from 'mongodb';

let CONNECTION_STRING = '';
let DATABASE_NAME = '';

export class DatabaseClient {
  constructor(
    private client: MongoClient,
    public database: Db,
  ) {}

  async execute<T>(handler: (database: Db) => Promise<T>): Promise<T> {
    try {
      const result = await handler(this.database);
      return result;
    } finally {
      this.client.close();
    }
  }

  close(): Promise<void> {
    return this.client.close();
  }
}

export function init(connectionString: string, databaseName: string): void {
  CONNECTION_STRING = connectionString;
  DATABASE_NAME = databaseName;
}

export function connect(): DatabaseClient {
  if (!CONNECTION_STRING || !DATABASE_NAME) {
    throw new Error('Connection string and database name should be set.');
  }

  const client = new MongoClient(CONNECTION_STRING);

  try {
    const database = client.db(DATABASE_NAME);
    return new DatabaseClient(client, database);
  } catch {
    throw new Error('An error occurred while connecting to the database.');
  } finally {
    client.close();
  }
}
