import { Preferences } from '@capacitor/preferences';

export const setValue = async (Key: string, Value: any) => {
  await Preferences.set({
    key: Key,
    value: Value,
  });
};

export const getValue = async (Key: string) =>  {
  const { value } :any = await Preferences.get({ key: Key });
  return JSON.parse( value ) ;
};