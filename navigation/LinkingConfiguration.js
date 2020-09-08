import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        Money: 'money',
        Analyze: 'analyze',
        Settings: 'settings',
        Account: 'settings/account',
        ChangePassword: 'settings/account/change-password',
        UpdateName: 'settings/account/update-name',
        Appearance: 'settings/preferences/app-appearance',
        Theme: 'settings/preferences/app-appearance/theme',
        SignIn: 'signin',
        SignUp: 'signup',
        ResetPassword:'reset-password'
      },
    },
  },
};
