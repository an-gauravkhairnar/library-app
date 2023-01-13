import { IonButton, IonCol, IonContent, IonRow, IonText } from '@ionic/react';
import { auth, firebase } from '../../config/firebase';
import userService from '../../services/user.service';
import { useHistory } from 'react-router';
import { useLoadingAndToast } from '../../hooks/useLoadingAndToast';
import { RESGISTRATION,NOTACEESS} from '../../constants/constants'
import { setValue } from '../../services/storage.service'
import '../Login/Login.scss';

const LoginPage: React.FC = () => {

  const history = useHistory();
  const { showToast, presentLoader, dismissLoader } = useLoadingAndToast();
  const googleLogin = (async () => {
    try {
      presentLoader();
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      const user: any = result.additionalUserInfo?.profile;
      if (user?.email.includes('application')) {
        const isPresent = await userService.getUser(user?.email);
        isPresent.length === 0 ? afterGoogleLoginSuccess(result, user) : rediractAdmin(user);
      } else {
        dismissLoader();
        showToast(NOTACEESS);
      }
    } catch (error) {
      dismissLoader();
      showToast(NOTACEESS);
    }
  })

  const afterGoogleLoginSuccess = async (result: any, user: any) => {
    try {
      const credentials = firebase.auth.GoogleAuthProvider.credential(result.credential.idToken);
      const googleSignInResult = await auth.signInWithCredential(credentials);
      if (googleSignInResult) {
        user.role = 1;
        await userService.addUser(user);
        showToast(RESGISTRATION);
        rediractAdmin(user);
      }
    } catch (error) {
      showToast(NOTACEESS);
    }
  };

  const rediractAdmin = (data:any) =>{
    const user = {
      name: data.name,
      email:data.email
    }
    setValue("User",JSON.stringify(user));
    dismissLoader();
    history.push('admin');
  }

  return (
    <IonContent>
      <IonRow>
        <IonCol size='12' className='ion-text-center'>
          <IonText>Nexus Library</IonText>
        </IonCol>
      </IonRow>
      <IonButton expand="block" onClick={() => googleLogin()}>Google SignUp</IonButton>
    </IonContent>
  );
};

export default LoginPage;
