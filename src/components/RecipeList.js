import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function RecipeList({ recipes = [] }) {
  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="p-2 border-b border-gray-300">{item.title}</Text>
        )}
      />
    </View>
  );
}
