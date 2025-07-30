import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useStore from '../store/useStore';

const STORAGE_PREFIX = 'cc:';
let intervalId = null;

export async function saveLocal(key, value) {
  try {
    await AsyncStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.log('Error saving data', e);
  }
}

export async function loadLocal(key) {
  try {
    const value = await AsyncStorage.getItem(STORAGE_PREFIX + key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log('Error loading data', e);
    return null;
  }
}

export async function syncToRemote() {
  try {
    const { user, cloudOptOut } = useStore.getState();
    if (cloudOptOut) {
      console.log('Cloud sync disabled by user');
      return;
    }
    const keys = (await AsyncStorage.getAllKeys()).filter(k => k.startsWith(STORAGE_PREFIX));
    const entries = {};
    for (const k of keys) {
      const value = await AsyncStorage.getItem(k);
      if (value !== null) {
        entries[k.replace(STORAGE_PREFIX, '')] = JSON.parse(value);
      }
    }
    if (!user) {
      console.log('No user credentials found, skipping sync');
      return;
    }
    await axios.post('https://example.com/api/sync', {
      user,
      data: entries,
    });
  } catch (err) {
    console.log('Error syncing data', err);
  }
}

export function startSync(intervalMs = 60000) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(syncToRemote, intervalMs);
}

export function stopSync() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
