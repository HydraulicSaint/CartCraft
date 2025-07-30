import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import usePantry from '../store/usePantry';

export default function PantryInput() {
  const [value, setValue] = useState('');
  const items = usePantry((state) => state.items);
  const addItem = usePantry((state) => state.addItem);
  const removeItem = usePantry((state) => state.removeItem);
  const loadItems = usePantry((state) => state.loadItems);

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed) {
      addItem(trimmed);
      setValue('');
    }
  };

  return (
    <View>
      <View className="flex-row mb-2">
        <TextInput
          className="flex-1 border border-gray-300 p-2 mr-2"
          value={value}
          placeholder="Add pantry item"
          onChangeText={setValue}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center mb-1">
            <Text className="flex-1">{item}</Text>
            <Button title="Remove" onPress={() => removeItem(index)} />
          </View>
        )}
      />
    </View>
  );
}
