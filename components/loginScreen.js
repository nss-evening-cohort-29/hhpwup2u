import { signIn } from '../utils/auth';

// LOGIN SCREEN WITH GOOGLE LOGIN BUTTON
const loginScreen = () => {
  const domString = '<div class="login-screen"><button id="google-auth" class="btn btn-danger login-btn">LOGIN TO GET STARTED</button></div>';
  document.querySelector('#app').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginScreen;
