import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.applicationnexus.librarymanagement',
  appName: 'LibraryManagementApp',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '139580095997-6e26nc3hh0kdpav8u4n1b5tn5a168pvg.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;


