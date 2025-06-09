import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    phoneNumber: '',
    fullName: '',
    birthDate: '',
    email: '',
    address: '',
    memberNumber: '',
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (!savedToken) return Alert.alert('Error', 'Token tidak ditemukan');

        setToken(savedToken);

        const res = await fetch('https://kspdigital-api.up.railway.app/api/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${savedToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUserData({
            phoneNumber: data.phone || '',
            fullName: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            birthDate: data.tanggal_lahir || '',
            email: data.email || '',
            address: data.alamat || '',
            memberNumber: data.nomor_rekening || '',
          });
        } else {
          Alert.alert('Gagal', JSON.stringify(data));
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal memuat data profil');
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const [firstName, lastName] = userData.fullName.trim().split(' ', 2);

    try {
      const res = await fetch('https://kspdigital-api.up.railway.app/api/users/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: userData.phoneNumber,
          first_name: firstName || '',
          last_name: lastName || '',
          tanggal_lahir: userData.birthDate,
          email: userData.email,
          alamat: userData.address,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Berhasil', 'Data berhasil diperbarui');
      } else {
        Alert.alert('Gagal', JSON.stringify(data));
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan perubahan');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Akun</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/account-settings')}>
            <FontAwesome5 name="cog" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://placeholder.svg?height=120&width=120&text=User' }}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.memberNumber}>
            Nomor Anggota: {userData.memberNumber}
          </Text>

          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Ubah Foto Profil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Field label="Nomor Telepon" value={userData.phoneNumber} onChange={(v) => setUserData({ ...userData, phoneNumber: v })} keyboardType="phone-pad" />
          <Field label="Nama Sesuai KTP" value={userData.fullName} onChange={(v) => setUserData({ ...userData, fullName: v })} />
          <Field label="Tanggal Lahir (YYYY-MM-DD)" value={userData.birthDate} onChange={(v) => setUserData({ ...userData, birthDate: v })} />
          <Field label="Email" value={userData.email} onChange={(v) => setUserData({ ...userData, email: v })} keyboardType="email-address" />
          <Field label="Alamat" value={userData.address} onChange={(v) => setUserData({ ...userData, address: v })} multiline />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Field({ label, value, onChange, keyboardType = 'default', multiline = false }) {
  return (
    <View style={styles.formField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#f8f9fa' 
},
  scrollView: { 
  flex: 1 
},
  scrollContent: { 
  paddingBottom: 80 
},
  header: { 
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 10 
},
  headerTitle: {
  fontSize: 28,
  fontWeight: 'bold', 
  color: '#3c9a4b' 
},
  settingsButton: { 
  padding: 8 
},
  profileSection: {
  alignItems: 'center',
  paddingVertical: 20 
},
  avatarContainer: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#ffcdd2',
  overflow: 'hidden',
  marginBottom: 12 
},
  avatar: {
  width: '100%',
  height: '100%' 
},
  memberNumber: {
  fontSize: 14,
  color: '#666',
  marginBottom: 12 
},
  changePhotoButton: {
  backgroundColor: '#FFD700',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20 
},
  changePhotoText: {
  fontSize: 14, 
  fontWeight: '500', 
  color: '#333' 
},
  formSection: { 
  paddingHorizontal: 20,
  marginTop: 10 
},
  formField: {
  marginBottom: 16 
},
  fieldLabel: {
  fontSize: 16,
  fontWeight: '500',
  color: '#333',
  marginBottom: 8 
},
  inputContainer: {
  backgroundColor: 'white',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ddd' 
},
  input: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontSize: 16,
  color: '#333' 
},
  multilineInput: {
  height: 100,
  textAlignVertical: 'top' 
},
  saveButton: {
  backgroundColor: '#FFD700',
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 30,
  paddingVertical: 15,
  borderRadius: 8, 
  alignItems: 'center' 
},
  saveButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333' 
},
});
