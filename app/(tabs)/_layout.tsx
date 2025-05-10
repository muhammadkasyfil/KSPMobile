import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="simpanan"
        options={{
          title: 'Simpanan',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="piggy-bank" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pinjaman"
        options={{
          title: 'Pinjaman',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hand-holding-usd" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
