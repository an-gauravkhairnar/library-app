import React, { useState } from "react";
import  BookList from '../../components/BookList/BookList'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import "../Dashboard/dashboard.scss";
import BorrowBookList from "../../components/BorrowList/BorrowBookList";
import { useHistory } from "react-router";

const Dashboard: React.FC = () => {
  const [selectedTab, setSegmentValue] = useState('bookList');
  const history = useHistory();
  return (
    <div className="dashboard">
      <IonHeader>
      <IonButton color='secondary' onClick={(e: any) =>{ history.push('admin')}}>Admin</IonButton>
        <IonSegment value="default"  onIonChange={(e:any) => setSegmentValue(e.target.value)}> 
          <IonSegmentButton value="bookList">
            <IonLabel>All Book</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="segment">
            <IonLabel>Pending Book</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent className="body">
      { 
        (selectedTab === 'bookList')
          ? <BookList/> 
          : <BorrowBookList/>
      }
      </IonContent>
    </div>
  );
};

export default Dashboard;
