import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [coopCode, setCoopCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  const goToRegister = () => {
    router.push('/register');
  };

  // const goToResetPassword = () => {
  //   router.push('/reset-password');
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image 
            source={require('../assets/images/LOGOMU.png')} 
            style={styles.illustration} 
          />
        </View>

        <View style={styles.formContainer}>
          {/* Logo */}
          <Image 
            source={require('../assets/images/LOGOMU.png')} 
            style={styles.logo} 
          />

          <Text style={styles.label}>Nomor Telepon</Text>
          <TextInput
            style={styles.input}
            placeholder="088888888888"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Kata Sandi</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Kode Koperasi</Text>
          <TextInput
            style={styles.input}
            placeholder="example123"
            value={coopCode}
            onChangeText={setCoopCode}
          />

          {/* <TouchableOpacity onPress={goToResetPassword}>
            <Text style={styles.forgotPassword}>Atur Ulang Kata Sandi?</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToRegister}>
            <Text style={styles.registerLink}>Daftar Akun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  leftSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 60,
    width: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eyeIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: 18,
    color: '#777',
  },
  forgotPassword: {
    color: '#4169E1',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#3c9a4b', // Green color from the image
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    color: '#4169E1',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});