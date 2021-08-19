import StorageService from 'services/storage';
import NetworkService from 'services/network';

export const confirmPassword = async (payload) => {
  let passwordAccepted;

  const password = await StorageService.Common.get('password');
  if (password) {
    if (password === payload.password) {
      return true;
    } else {
      return false;
    }
  } else {
    await NetworkService.User()
      .code200(async ({ data }) => {
        passwordAccepted = true;
        await StorageService.User.put({
          authenticationToken: data.user.authenticationToken,
        });
        await StorageService.Common.set('password', payload.password);
      })     
      .invalidCredentials401(() => {
        passwordAccepted = false;
      })
      .logIn(payload);
  }  

  return passwordAccepted;
};