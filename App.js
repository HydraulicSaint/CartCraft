import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Welcome to CartCraft!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
