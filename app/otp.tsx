import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OtpPage() {
  const [otp, setOtp] = useState('');

  const handleNext = () => {
    router.push('/scan-ktp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/LOGOMU.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Masukkan 4 digit OTP yang dikirim ke SMS Anda
      </Text>

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Selanjutnya</Text>
      </TouchableOpacity>

      <Text style={styles.resend}>Kirim Ulang Kode OTP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    color: '#1A1A3B',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    width: '80%',
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#3c9a4b',
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resend: {
    color: '#4169E1',
    marginTop: 16,
    fontSize: 14,
  },
});