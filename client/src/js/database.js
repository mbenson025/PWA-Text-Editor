import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//method that accepts some content and adds it to the db
export const putDb = async (content) => {
  console.log('PUT to the database');

  //create a connection to the db and specify version
  const jateDb = await openDB('jate', 1);

  //create a new transaction, specify the db and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  //open up the desired object store
  const store = tx.objectStore('jate');

  //pass in content to store
  const request = store.put({ content: content });

  //confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
};

//add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //create a connection to the db and specify version
  const contactDb = await openDB('contact', 1);

  //create a new transaction, specify the db and data privileges
  const tx = contactDb.transaction('contact', 'readonly');

  //open up the desired object store
  const store = tx.objectStore('contact');

  //use the .getAll() method to get all data in the database
  const request = store.getAll();

  //confirmation of the request
  const result = await request;
  console.log('result.value', result);

  return result;
};

initdb();
