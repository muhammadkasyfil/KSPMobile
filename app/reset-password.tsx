import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ResetPasswordPage() {
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Phone verification, 2: New password

  const handleVerifyPhone = () => {
    // In a real app, you would verify the phone number here
    setStep(2);
  };

  const handleResetPassword = () => {
    // In a real app, you would submit the new password here
    router.replace('/login');
  };

  const goToLogin = () => {
    router.replace('/login');
  };

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

          <Text style={styles.title}>Atur Ulang Kata Sandi</Text>
          <Text style={styles.subtitle}>
            {step === 1 
              ? "Masukkan nomor telepon Anda untuk memverifikasi akun" 
              : "Buat kata sandi baru untuk akun Anda"}
          </Text>

          {step === 1 ? (
            <>
              <Text style={styles.label}>Nomor Telepon</Text>
              <TextInput
                style={styles.input}
                placeholder="088888888888"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <TouchableOpacity onPress={handleVerifyPhone} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Verifikasi</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.label}>Kata Sandi Baru</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Text style={styles.eyeIconText}>{showNewPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={styles.eyeIconText}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleResetPassword} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Simpan Kata Sandi Baru</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginLink}>Kembali ke Halaman Masuk</Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
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
  actionButton: {
    backgroundColor: '#3c9a4b', // Green color from the image
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#4169E1',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});