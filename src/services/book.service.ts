import { db } from '../config/firebase'
import { Book } from '../interfaces/book';

class BookService {

  public async addBook(data: Book): Promise<any> {
    try {
      return (await db.collection('books').add(data))?.id;
    } catch (err) {
      return false;
    }
  }

  public async getBooks(): Promise<any> {
    try {
      return (await db.collection('books').get()).docs.map(res => res.data());
    } catch (err) {
      return err;
    }
  }
}

export default new BookService();
