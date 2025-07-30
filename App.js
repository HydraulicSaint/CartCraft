import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getSplashText } from './api/contentApi';

export default function App() {
  const [splash, setSplash] = useState('');

  useEffect(() => {
    getSplashText().then(setSplash);
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">{splash}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
