import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

// Hook that handles platform sign in and stores user info
export default function usePlatformAuth() {
  const [user, setUser] = useState(null);

  // Configure Google auth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_GOOGLE_CLIENT_ID,
    iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
    androidClientId: process.env.ANDROID_GOOGLE_CLIENT_ID,
  });

  // Handle Google auth response
  useEffect(() => {
    if (response?.type === 'success') {
      setUser({
        provider: 'google',
        accessToken: response.authentication.accessToken,
        idToken: response.authentication.idToken,
      });
    }
  }, [response]);

  // Apple sign in handler
  const appleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      setUser({
        provider: 'apple',
        userId: credential.user,
        email: credential.email,
      });
    } catch (e) {
      console.log('Apple sign in error:', e);
    }
  };

  // Trigger platform appropriate sign in
  const signIn = () => {
    if (Platform.OS === 'ios') {
      appleSignIn();
    } else {
      promptAsync();
    }
  };

  return {
    user,
    signIn,
  };
}
