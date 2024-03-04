import { Db, MongoClient } from 'mongodb';

let CONNECTION_STRING = '';
let DATABASE_NAME = '';

export function init(connectionString: string, databaseName: string): void {
  CONNECTION_STRING = connectionString;
  DATABASE_NAME = databaseName;
}

export class DatabaseClient {
  async execute<T>(handler: (database: Db) => Promise<T>): Promise<T> {
    if (!CONNECTION_STRING || !DATABASE_NAME) {
      throw new Error('Connection string and database name should be set.');
    }

    const client = new MongoClient(CONNECTION_STRING);

    try {
      const database = client.db(DATABASE_NAME);
      const result = await handler(database);
      return result;
    } catch {
      throw new Error('An error occurred while connecting to the database.');
    } finally {
      client.close();
    }
  }
}
