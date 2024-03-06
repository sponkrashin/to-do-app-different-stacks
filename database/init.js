const todoDb = db.getSiblingDB('ToDo');

todoDb.todos.insertMany([
  { title: 'To Do 1' },
  { title: 'To Do 2', tags: ['Tag 1', 'Tag 2'] },
]);
