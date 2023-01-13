import {
  IonCol,
  IonRow,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import bookService from "../../services/book.service";
import { useLoadingAndToast } from "../../hooks/useLoadingAndToast";
import "../AddBook/AddBook.scss";
import { ERROR, ADDRECORD,EDITRECORD} from '../../constants/constants';

function AddBook(props:any) {
  const {
    docId,
    book_name,
    autour_name,
    book_category,
    book_price,
    isEdit,
    updated_date,
    status,
  } = props.data;
  const dismissModel = props.dismiss;
  const loadData = props.loadData;
  const [bookName, setBookName] = useState(book_name);
  const [autourName, setAutourName] = useState(autour_name);
  const [category, setCategory] = useState(book_category);
  const [price, setPrice] = useState(book_price);
  const [bookStatus,setStatus] = useState(status);
  const [updatedDate] = useState(updated_date);
  const { showToast, presentLoader, dismissLoader } = useLoadingAndToast();

  const addBook = async () => {
    presentLoader();
    try {
      const book:any = {
        id :isEdit ? docId : '', 
        book_name: bookName,
        autour_name: autourName,
        book_category: category,
        book_price: price,
        created_date: new Date(),
        updated_date: isEdit ? updatedDate : new Date(),
        status : bookStatus
      };
      if (!isEdit) {
        const response = await bookService.addBook(book);
        if (response) {
          commanCall(ADDRECORD);
        }
      } else {
        bookService.editBook(book).then(() => {
          commanCall(EDITRECORD);
        });
      }
    } catch (error) {
      showToast(ERROR);
    }
  };

  const commanCall = async (message:any) => {
    dismissModel();
    await dismissLoader();
    await showToast(message);
    await loadData();
  };

  return (
    <div>
      <IonRow>
        <IonButton className="close-btn" onClick={dismissModel}>
          Close
        </IonButton>
        <IonCol size="12" className="ion-text-center">
          <IonItem fill="outline">
            <IonLabel position="floating">BookName</IonLabel>
            <IonInput
              placeholder="Enter book name"
              type="text"
              onIonChange={(e) => setBookName(e.target.value)}
              value={bookName}
            ></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Autour Name</IonLabel>
            <IonInput
              placeholder="Enter autour name"
              type="text"
              onIonChange={(e) => setAutourName(e.target.value)}
              value={autourName}
            ></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Book Status</IonLabel>
            <IonList className="ion-no-padding">
              <IonSelect
                interface="popover"
                placeholder="Select Status"
                onIonChange={(e) => setStatus(e.target.value)}
                value={bookStatus}
              >
                <IonSelectOption value="Available">Available</IonSelectOption>
                <IonSelectOption value="Unavailable">Unavailable</IonSelectOption>
                <IonSelectOption value="Pending">Pending</IonSelectOption>
              </IonSelect>
            </IonList>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Book Category</IonLabel>
            <IonList className="ion-no-padding">
              <IonSelect
                interface="popover"
                placeholder="Select Category"
                onIonChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <IonSelectOption value="Comic Book">Comic Book</IonSelectOption>
                <IonSelectOption value="Historical Fiction">
                  Historical Fiction
                </IonSelectOption>
                <IonSelectOption value="Horror">Horror</IonSelectOption>
                <IonSelectOption value="Romance">Romance</IonSelectOption>
                <IonSelectOption value="Science Fiction">
                  Science Fiction
                </IonSelectOption>
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
            <IonInput
              placeholder="Enter book price"
              type="text"
              onIonChange={(e) => setPrice(e.target.value)}
              value={price}
            ></IonInput>
          </IonItem>
          <button className="ion-margin-top" onClick={addBook} type="submit">
            {isEdit ? "Update" : "Add Book"}
          </button>
        </IonCol>
      </IonRow>
    </div>
  );
}

export default AddBook;
