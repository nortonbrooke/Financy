import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        Money: 'money',
        Summary: 'summary',
        Account: 'account',
        SignIn: 'signin',
        SignUp: 'signup',
        ResetPassword:'reset-password'
      },
    },
  },
};
