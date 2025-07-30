import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, Switch, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getSplashText } from './api/contentApi';
import usePlatformAuth from './auth/usePlatformAuth';
import useStore from './store/useStore';
import useMealPlans from './store/useMealPlans';
import { startSync, stopSync } from './storage/syncedStorage';

export default function App() {
  const [splash, setSplash] = useState('');
  const { signIn, user } = usePlatformAuth();
  const setUser = useStore(state => state.setUser);
  const cloudOptOut = useStore(state => state.cloudOptOut);
  const setCloudOptOut = useStore(state => state.setCloudOptOut);
  const loadPlans = useMealPlans(state => state.loadPlans);

  useEffect(() => {
    getSplashText().then(setSplash);
    loadPlans();
  }, []);

  useEffect(() => {
    if (user && !cloudOptOut) {
      setUser(user);
      startSync();
    } else {
      stopSync();
    }
  }, [user, cloudOptOut]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">{splash}</Text>
      <Button title="Sign In" onPress={signIn} />
      <View className="mt-4 flex-row items-center">
        <Text className="mr-2">Cloud Storage & Analytics</Text>
        <Switch
          value={!cloudOptOut}
          onValueChange={(val) => setCloudOptOut(!val)}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
