import { IonButton, IonContent, IonHeader, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import AdminBookList from "../../components/AdminBookList/AdminBookList";
import AdminPendingList from "../../components/AdminPendingList/AdminPendingList";
import '../Admin/Admin.scss'

const AdminPage: React.FC = () => {
  const [selectedTab, setSegmentValue] = useState('adminBookList');
  const history = useHistory();

  return (
    <div className="dashboard">
      <IonHeader>
      <IonButton color='secondary' onClick={(e: any) => {history.push("dashboard");}}>
          Dashboard
        </IonButton>
        <IonSegment value="default"  onIonChange={(e:any) => setSegmentValue(e.target.value)}> 
          <IonSegmentButton value="adminBookList">
            <IonLabel>Book Managment</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="segment">
            <IonLabel>Pending List</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent className="admin-body">
      { 
        (selectedTab === 'adminBookList')
          ? <AdminBookList />
          : <AdminPendingList/>
      }
      </IonContent>
    </div>
  );
};

export default AdminPage;
