import { useIonLoading, useIonToast } from '@ionic/react';

export const useLoadingAndToast = () => {
  const [presentToast] = useIonToast();
  const [showLoader, stopLoader] = useIonLoading();

  const showToast = (toastMessage = 'something went wrong...!') => {
    presentToast({
      message: toastMessage,
      duration: 3000,
    });
  };

  const presentLoader = (loadingMessage = 'Please wait...') => {
    showLoader({
      message: loadingMessage,
      cssClass: 'loader',
    });
  };

  const dismissLoader = async () => {
    await stopLoader();
  };

  return { showToast, presentLoader, dismissLoader };
};
