import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    router.replace('/(tabs)');
  };

  const goToLogin = () => {
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.leftIllustration}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>[ Gambar Placeholder ]</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/80x50' }} style={styles.logo} />

        <Text style={styles.label}>Nomor Telepon</Text>
        <TextInput
          style={styles.input}
          placeholder="0888888888"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Kata Sandi</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Selanjutnya</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.link}>Masuk ke Akun</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  leftIllustration: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 200,
    height: 140,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  imageText: {
    color: '#777',
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 24,
    elevation: 3,
  },
  logo: {
    height: 50,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  loginButton: {
    marginTop: 24,
    backgroundColor: '#3c9a4b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 12,
    color: '#3c68a4',
    textAlign: 'center',
  },
});
