import { IonCol, IonRow, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';
import bookService from '../../services/book.service';
import { useLoadingAndToast } from '../../hooks/useLoadingAndToast.tsx';
import '../AddBook/AddBook.scss';

function AddBook() {
  const [bookName, setBookName] = useState('');
  const [autourName, setAutourName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const { showToast, presentLoader, dismissLoader } = useLoadingAndToast();

  const addBook = async () => {
    try {
      presentLoader();
      const book = {
        id: new Date().getTime(),
        book_name: bookName,
        autour_name: autourName,
        book_category: category,
        book_price: price,
        created_date: new Date(),
        updated_date: new Date(),
      };
      const response = await bookService.addBook(book);
      if (response) {
        dismissLoader();
        showToast('Book is added');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div>
      <IonRow>
        <IonCol size="12" className="ion-text-center">
          <IonItem fill="outline">
            <IonLabel position="floating">BookName</IonLabel>
            <IonInput placeholder="Enter book name" type="text" onIonChange={(e) => setBookName(e.target.value)}></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Autour Name</IonLabel>
            <IonInput placeholder="Enter autour name" type="text" onIonChange={(e) => setAutourName(e.target.value)}>
              {' '}
            </IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Book Category</IonLabel>
            <IonList className="ion-no-padding">
              <IonSelect interface="popover" placeholder="Select Category" onIonChange={(e) => setCategory(e.target.value)}>
                <IonSelectOption value="Comic Book">Comic Book</IonSelectOption>
                <IonSelectOption value="Historical Fiction">Historical Fiction</IonSelectOption>
                <IonSelectOption value="Horror">Horror</IonSelectOption>
                <IonSelectOption value="Romance">Romance</IonSelectOption>
                <IonSelectOption value="Science Fiction">Science Fiction</IonSelectOption>
                <IonSelectOption value="Cookbooks">Cookbooks</IonSelectOption>
                <IonSelectOption value="Self-Help">Self-Help</IonSelectOption>
                <IonSelectOption value="History">History</IonSelectOption>
                <IonSelectOption value="True Crime">True Crime</IonSelectOption>
                <IonSelectOption value="Time">Time Management</IonSelectOption>
              </IonSelect>
            </IonList>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Book Price</IonLabel>
            <IonInput placeholder="Enter book price" type="text" onIonChange={(e) => setPrice(e.target.value)}></IonInput>
          </IonItem>
          <button className="ion-margin-top" onClick={addBook} type="submit">
            Add Book
          </button>
        </IonCol>
      </IonRow>
    </div>
  );
}

export default AddBook;
