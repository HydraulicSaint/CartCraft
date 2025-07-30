import React from 'react';
import { View, Text } from 'react-native';

// Helper to get a week key like "2025-W27"
function getWeekKey(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((dayOfYear + firstDay.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${week}`;
}

function groupPlans(plans, period) {
  const groups = {};
  plans.forEach((plan) => {
    const date = new Date(plan.date);
    let key;
    switch (period) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        key = getWeekKey(date);
        break;
      case 'year':
        key = date.getFullYear().toString();
        break;
      case 'meal':
      default:
        key = plan.id.toString();
    }
    if (!groups[key]) groups[key] = [];
    groups[key].push(plan);
  });
  return groups;
}

export default function MealPlanViewer({ plans = [], period = 'meal' }) {
  const groups = groupPlans(plans, period);
  return (
    <View>
      {Object.entries(groups).map(([key, items]) => (
        <View key={key} className="mb-4">
          {period !== 'meal' && (
            <Text className="text-lg font-bold mb-2">{key}</Text>
          )}
          {items.map((plan) => (
            <Text
              key={plan.id}
              className="p-2 border-b border-gray-300"
            >
              {plan.title} - {new Date(plan.date).toLocaleString()}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
