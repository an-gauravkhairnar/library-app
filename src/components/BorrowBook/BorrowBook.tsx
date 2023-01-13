import {
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLoadingAndToast } from "../../hooks/useLoadingAndToast";
import bookService from "../../services/book.service";
import { getValue } from '../../services/storage.service'
import { BORROWADDED, ERROR} from '../../constants/constants'

function BorrowBook(props:any) {
  const { docId, book_name, autour_name,status} = props.data;
  const dismiss = props.dismiss;
  const days =  [1,2,3,4,5,6,7,8,9,10];
  const [day,setDayes] = useState('');
  const [userName,setUserName] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const { showToast, presentLoader, dismissLoader } = useLoadingAndToast();


  useEffect(() => {
    user();
  }, []);

  const borrowBook = async ()=>{
    await presentLoader();
    const Data:any = {
      id:docId,
      bookName : book_name,
      autourName:autour_name,
      days:day,
      userName: userName,
      userEmail:userEmail,
      borrowDate: new Date(),
      status: "Pending"
    }
    const response = await bookService.borrowBook(Data);
    if(response){
      updateStatus();
      commanCall(BORROWADDED);
    }else{
      commanCall(ERROR)
    }
  }

  const user = async() =>{
    const data:any = await getValue("User");
    setUserName(data.name);
    setUserEmail(data.email)
  }

  const commanCall = async (message:string) =>{
    dismiss();
    await dismissLoader();
    await showToast(message);
  }

  const updateStatus = () =>{
    try {
      props.data.status = "Pending";
      props.data.id = props.data.docId;
      bookService.editBook(props.data);
    } catch (error) {
      showToast(ERROR);
    }
  }

  return (
    <div>
      <IonRow> 
        <IonButton className="close-btn" onClick={dismiss}> Close</IonButton>
        <IonCol size="12" className="ion-text-center">
          <IonItem fill="outline">
            <IonLabel position="floating">BookName</IonLabel>
            <IonInput placeholder="Enter book name" type="text" value={book_name}></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Autour Name</IonLabel>
            <IonInput placeholder="Enter autour name" type="text" value={autour_name}></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Days</IonLabel>
            <IonList className="ion-no-padding">
              <IonSelect interface="popover" placeholder="Select day"  onIonChange={(e) => setDayes(e.target.value)}>
                {
                  days.map((res, index) => {
                    return (
                      <IonSelectOption key={index} value={res}>{ res }</IonSelectOption>
                    )
                  })
                }
              </IonSelect>
            </IonList>
          </IonItem>
          <button className="ion-margin-top" onClick={borrowBook}>Borrow Book</button>
        </IonCol>
      </IonRow>
    </div>
  );
}

export default BorrowBook;
