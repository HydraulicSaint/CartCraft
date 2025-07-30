import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getSplashText } from './api/contentApi';
import usePlatformAuth from './auth/usePlatformAuth';
import useStore from './store/useStore';
import { startSync, stopSync } from './storage/syncedStorage';

export default function App() {
  const [splash, setSplash] = useState('');
  const { signIn, user } = usePlatformAuth();
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    getSplashText().then(setSplash);
  }, []);

  useEffect(() => {
    if (user) {
      setUser(user);
      startSync();
    } else {
      stopSync();
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">{splash}</Text>
      <Button title="Sign In" onPress={signIn} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
