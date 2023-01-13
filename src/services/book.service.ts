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
      return (await db.collection('books').get()).docs.map(res => {
        let result = res.data();
        return result = {...result, docId:res.id}
      });
    } catch (err) {
      return err;
    }
  }

  public async removeBook(id:any): Promise<any>{
    try {
     return await db.collection('books').doc(id).delete();
    } catch (error) {
      return error;
    }
  }

  public async editBook(data:any): Promise<any>{
    try {
     return await db.collection("books").doc(data.id).update(data);
    } catch (error) {
      return error;
    }
  }

  public async getBorrowList(): Promise<any> {
    try {
      return (await db.collection('borrowBooks').get()).docs.map(res => {
        let result = res.data();
        return result = {...result, docId:res.id}
      });
    } catch (err) {
      return err;
    }
  }

  public async borrowBook(data: Book): Promise<any> {
    try {
      return (await db.collection('borrowBooks').add(data))?.id;
    } catch (err) {
      return false;
    }
  }

  public async borrowBookEdit(data: any): Promise<any> {
    try {
      return await db.collection("borrowBooks").doc(data.docId).update(data);
    } catch (err) {
      return false;
    }
  }
}

export default new BookService();
