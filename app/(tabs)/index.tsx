import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [rekening, setRekening] = useState('');
  const [saldoPokok, setSaldoPokok] = useState(0);
  const [transaksi, setTransaksi] = useState<any[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      // Ambil profil user
      const profileRes = await fetch(
        'https://kspdigital-api.up.railway.app/api/users/me/',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (profileRes.ok) {
        const profile = await profileRes.json();
        setUserName(`${profile.first_name} ${profile.last_name || ''}`.trim());
        setRekening(profile.nomor_rekening || '');
        setSaldoPokok(parseFloat(profile.saldo_simpanan_pokok || '0'));
      }

      // Ambil transaksi simpanan pokok
      const simpananRes = await fetch(
        'https://kspdigital-api.up.railway.app/api/simpanan/transaksi-simpanan/?jenis_simpanan=pokok',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (simpananRes.ok) {
        const simpananData = await simpananRes.json();
        setTransaksi(simpananData.results || []);
      }
    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Selamat Datang,</Text>
          <Text style={styles.username}>{userName || 'Anggota Koperasi'}</Text>
        </View>
        <View style={styles.notificationIcon}>
          <FontAwesome5 name="bell" size={20} color="#555" />
        </View>
      </View>

      {/* Saldo dan Rekening */}
      <View style={styles.saldoCard}>
        <View>
          <Text style={styles.rekening}>{rekening || '123–3456–7890'}</Text>
          <Text style={styles.saldoLabel}>Saldo Simpanan Pokok</Text>
          <Text style={styles.saldo}>Rp {saldoPokok.toLocaleString('id-ID')}</Text>
          <Text style={styles.saldoSub}>Simpanan wajib Rp 50.000</Text>
        </View>
      </View>

      {/* Limit & Terpakai */}
      <View style={styles.limitRow}>
        <View style={styles.limitBox}>
          <Text style={styles.limitTitle}>Limit Pinjaman</Text>
          <Text style={styles.limitValue}>Rp 50.000.000</Text>
        </View>
        <View style={styles.limitBox}>
          <Text style={styles.limitTitle}>Pinjaman Terpakai</Text>
          <Text style={styles.limitValue}>Rp 5.000.000</Text>
        </View>
      </View>

      {/* Info Pinjaman */}
      <View style={styles.pinjamanRow}>
        <View style={[styles.pinjamanBox, { backgroundColor: '#e8f5e9' }]}>
          <Text style={styles.pinjamanLabel}>Pinjaman Aktif</Text>
          <Text style={styles.pinjamanValue}>3</Text>
        </View>
        <View style={[styles.pinjamanBox, { backgroundColor: '#c8e6c9' }]}>
          <Text style={styles.pinjamanLabel}>Pinjaman Lunas</Text>
          <Text style={styles.pinjamanValue}>5</Text>
        </View>
      </View>

      {/* Aktivitas Terakhir */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Aktifitas Terakhir</Text>
        <Text style={styles.seeAllLink}>Lihat Semua</Text>
      </View>

      {transaksi.map((item, idx) => {
        const isSetoran = item.jenis_transaksi === 'setoran';
        return (
          <View key={item.id || idx} style={styles.aktivitasItem}>
            <View style={[
              styles.iconCircle,
              { backgroundColor: isSetoran ? '#e8f5e9' : '#ffebee' }
            ]}>
              <FontAwesome5
                name={isSetoran ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={isSetoran ? '#3c9a4b' : '#e53935'}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aktivitasLabel}>
                {isSetoran ? 'Setoran' : 'Penarikan'} Simpanan
              </Text>
              <Text style={styles.aktivitasDate}>
                {new Date(item.tanggal_transaksi).toLocaleDateString('id-ID')}
              </Text>
            </View>
            <Text style={[styles.aktivitasAmount, { color: isSetoran ? '#3c9a4b' : '#e53935' }]}>
              {`${isSetoran ? '+ ' : '- '}Rp ${parseInt(item.nominal).toLocaleString('id-ID')}`}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f8f9fa',
  },
  container: { 
    padding: 20, 
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: { 
    fontSize: 16, 
    color: '#555',
    marginBottom: 4,
  },
  username: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#3c9a4b',
  },

  saldoCard: {
    backgroundColor: '#FFD700',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rekening: { 
    fontSize: 14, 
    fontWeight: '600', 
    textAlign: 'right',
    color: '#555',
  },
  saldoLabel: { 
    marginTop: 10, 
    color: '#555', 
    fontSize: 14,
    marginBottom: 4,
  },
  saldo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#000',
    marginBottom: 4,
  },
  saldoSub: { 
    fontSize: 12, 
    color: '#555',
  },

  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  limitBox: {
    flex: 1,
    borderColor: '#3c9a4b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  limitTitle: { 
    fontSize: 14, 
    color: '#555',
    marginBottom: 8,
  },
  limitValue: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333',
  },

  pinjamanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  pinjamanBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pinjamanLabel: { 
    fontSize: 14, 
    color: '#555',
    marginBottom: 8,
  },
  pinjamanValue: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#333',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#3c9a4b',
  },
  aktivitasItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aktivitasLabel: { 
    fontSize: 14, 
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  aktivitasDate: { 
    fontSize: 12, 
    color: '#777',
  },
  aktivitasAmount: {
    fontSize: 14,
    fontWeight: '600',
  }
});
