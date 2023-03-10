import {  IonContent } from '@ionic/react';
import AdminPage from '../Admin/Admin';
import LoginPage from '../Login/Login';


const HomePage: React.FC = () => {
  return (
    <IonContent>
      <AdminPage />
    </IonContent>
  );
};

export default HomePage;
