import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFD700',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          borderRadius: 30,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <FontAwesome5 name="home" size={20} color="#000" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="simpanan"
        options={{
          title: 'Simpanan',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <FontAwesome5 name="money-bill-alt" size={20} color="#000" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="pinjaman"
        options={{
          title: 'Pinjaman',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <FontAwesome5 name="hand-holding-usd" size={20} color="#000" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Akun',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <FontAwesome5 name="user" size={20} color="#000" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
});