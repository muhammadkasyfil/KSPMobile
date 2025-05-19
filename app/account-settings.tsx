import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AccountSettings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.header}>
        <FontAwesome5 name="arrow-left" size={18} color="#3c9a4b" />
        <Text style={styles.headerTitle}>Pengaturan Akun</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Ubah Kata Sandi</Text>

    {/* Form Ubah Kata Sandi */}
    <Text style={styles.label}>Kata Sandi Lama</Text>
    <View style={styles.passwordContainer}>
    <TextInput
        secureTextEntry={!showOldPassword}
        value={oldPassword}
        onChangeText={setOldPassword}
        style={styles.passwordInput}
    />
    <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.eyeIcon}>
        <Text style={styles.eyeIconText}>{showOldPassword ? '👁️' : '👁️‍🗨️'}</Text>
    </TouchableOpacity>
    </View>

    <Text style={styles.label}>Kata Sandi Baru</Text>
    <View style={styles.passwordContainer}>
    <TextInput
        secureTextEntry={!showNewPassword}
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.passwordInput}
    />
    <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
        <Text style={styles.eyeIconText}>{showNewPassword ? '👁️' : '👁️‍🗨️'}</Text>
    </TouchableOpacity>
    </View>

    <Text style={styles.label}>Konfirmasi Kata Sandi Baru</Text>
    <View style={styles.passwordContainer}>
    <TextInput
        secureTextEntry={!showConfirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.passwordInput}
    />
    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
        <Text style={styles.eyeIconText}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
    </TouchableOpacity>
    </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
      </TouchableOpacity>

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
        <FontAwesome5 name="sign-out-alt" size={16} style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Keluar dari Akun</Text>
      </TouchableOpacity>

      {/* Modal Konfirmasi Logout */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Apakah Anda yakin mau keluar dari akun?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => router.replace('/login')}>
              <Text style={styles.modalButtonText}>Keluar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowLogoutModal(false)}>
              <Text style={[styles.modalButtonText, { color: '#000' }]}>Batal</Text>
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
        backgroundColor: '#fff', 
        padding: 20 },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20, 
        gap: 10 },
    headerTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#3c9a4b' },
    label: { 
        marginTop: 12, 
        marginBottom: 4, 
        fontWeight: '500' },
    input: { 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 8, 
        padding: 10, 
        backgroundColor: '#f9f9f9' },
    saveButton: { 
        backgroundColor: '#FFD700', 
        marginTop: 20, 
        padding: 14, 
        borderRadius: 8, 
        alignItems: 'center' },
    saveButtonText: { 
        fontWeight: 'bold', 
        color: '#333' },
    logoutButton: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#FFD700', 
        borderRadius: 8, 
        padding: 14, 
        marginTop: 12 },
    logoutText: { 
        color: '#3c3c3c', 
        fontWeight: 'bold' },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    modalBackground: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { 
        backgroundColor: '#fff', 
        padding: 24, 
        borderRadius: 16, 
        width: '80%', 
        alignItems: 'center' },
    modalTitle: { 
        fontSize: 16, 
        fontWeight: '500', 
        marginBottom: 20, 
        textAlign: 'center' },
    modalButton: { 
        backgroundColor: '#FFD700', 
        paddingVertical: 12, 
        paddingHorizontal: 30, 
        borderRadius: 8, 
        marginBottom: 10, 
        width: '100%', 
        alignItems: 'center' },
    modalButtonText: { 
        fontWeight: 'bold', 
        color: '#000' },
    cancelButton: { 
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderColor: '#FFD700' },
});