import { db } from '../config/firebase';

export default new class User {

  public async addUser(data: any): Promise<any> {
    try {
      return (await db.collection('users').add(data))?.id;
    } catch (err) {
      return false;
    }
  }

  public async getUser(email: string): Promise<any> {
    try {
      return (await db.collection('users').where('email', '==', email).get()).docs.map((res) => res.data());
    } catch (err) {
      return err;
    }
  }
}