import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfilePage() {
  // User profile data
  const [userData, setUserData] = useState({
    memberNumber: '1234567890',
    phoneNumber: '08888888',
    fullName: 'Muhammad Abdullah',
    idNumber: '125678900077',
    birthDate: '19/05/1998',
    email: 'mabdullah@gmail.com',
    address: 'Jl. Contoh No. 123\nKecamatan Contoh\nKota Contoh\n12345',
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Akun</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <FontAwesome5 name="cog" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
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

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Nomor Telepon</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userData.phoneNumber}
                onChangeText={(text) => setUserData({...userData, phoneNumber: text})}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Nama Sesuai KTP</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userData.fullName}
                onChangeText={(text) => setUserData({...userData, fullName: text})}
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Nomor KTP</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userData.idNumber}
                onChangeText={(text) => setUserData({...userData, idNumber: text})}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Tanggal Lahir</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userData.birthDate}
                onChangeText={(text) => setUserData({...userData, birthDate: text})}
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userData.email}
                onChangeText={(text) => setUserData({...userData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Alamat</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={userData.address}
                onChangeText={(text) => setUserData({...userData, address: text})}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Space for bottom navigation
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3c9a4b',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffcdd2',
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  memberNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  changePhotoButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  formSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});