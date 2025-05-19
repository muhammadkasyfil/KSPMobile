import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function KtpFormPage() {
  const [name, setName] = useState('');
  const [ktp, setKtp] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleVerification = () => {
    setShowModal(true);
  };

  const handleStart = () => {
    setShowModal(false);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LOGOMU.png')} style={styles.logo} />

      <Text style={styles.label}>Nama Sesuai KTP</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Muhammad Abdullah"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Nomor KTP</Text>
      <TextInput
        style={styles.input}
        value={ktp}
        onChangeText={setKtp}
        placeholder="125678900077"
        keyboardType="numeric"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Tanggal Lahir</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={formatDate(dob)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
          maximumDate={new Date()}
          textColor={Platform.OS === 'ios' ? '#000000' : undefined}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verifikasi</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={require('../assets/images/confetti.jpg')}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Akun berhasil didaftarkan!</Text>
            <Text style={styles.modalDesc}>
              Kunjungi kantor koperasi untuk mendaftarkan sidik jari
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleStart}>
              <Text style={styles.modalButtonText}>Mulai Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A3B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
  },
  button: {
    backgroundColor: '#3c9a4b',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    width: '85%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#000000',
  },
  modalDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  modalButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
});
