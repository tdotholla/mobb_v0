App.info({
  id: 'com.kibumap',
  name: 'MOBB',
  version: '0.0.1',
  description: 'The MOBB: Map of Black Businesses',
  author: 'Kiel H. Byrne',
  email: 'theHilmar@gmail.com',
  website: 'https://www.kibumap.com'
});

App.icons({
  'iphone_2x': 'public/img/icons/apple-touch-icon-120x120.png',
  'iphone_3x': 'public/img/icons/apple-touch-icon-180x180.png',
  'ipad': 'public/img/icons/apple-touch-icon-76x76.png',
  'ipad_2x': 'public/img/icons/apple-touch-icon-152x152.png',
  'ios_notification_3x': 'public/img/icons/apple-touch-icon-60x60.png',
  'iphone_legacy': 'public/img/icons/apple-touch-icon-57x57.png',
  'ipad_app_legacy': 'public/img/icons/apple-touch-icon-72x72.png',
  'android_hdpi': 'public/img/icons/apple-touch-icon-72x72.png',
  'android_xxhdpi': 'public/img/icons/mstile-144x144.png'
});
 
App.setPreference('BackgroundColor', '0xff404040');
// App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '235091633613282',
//   API_KEY: 'f5138f920f667c10c4838a6b074ee451'
// });
// Set up Access Rules
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');

App.configurePlugin('cordova-plugin-googleplus', {
    // 'REVERSED_CLIENT_ID': 'apps.googleusercontent.com.1039420537399-ve1hdn4k7bpdfir8be5v08que8ps72n1'
    'REVERSED_CLIENT_ID': ''
});