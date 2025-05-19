import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanKtpPage() {
  const handleScan = () => {
    router.push('/ktp-form');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/images/LOGOMU.png')} style={styles.logo} />

        <Text style={styles.title}>Verifikasi KTP</Text>
        <View style={styles.ktpBox}></View>

        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Pastikan foto jelas, tidak blur, foto diri dan tanda tangan jelas.</Text>
          <Text style={styles.bullet}>• Pastikan foto tidak terpotong atau tertutupi.</Text>
          <Text style={styles.bullet}>• Pastikan Kartu Identitas masih berlaku.</Text>
          <Text style={styles.bullet}>• Pastikan foto Kartu Identitas asli bukan hasil scan atau fotocopy.</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleScan}>
          <Text style={styles.buttonText}>Pindai Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40, // disamakan dengan register.tsx
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A3B',
    textAlign: 'center',
    marginBottom: 24,
  },
  ktpBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 24,
  },
  bullets: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  bullet: {
    fontSize: 14,
    color: '#1A1A3B',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3c9a4b',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
