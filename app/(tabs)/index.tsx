import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.welcome}>Selamat Datang,</Text>
      <Text style={styles.username}>Muhammad Abdullah!</Text>

      {/* Saldo dan Rekening */}
      <View style={styles.saldoCard}>
        <View>
          <Text style={styles.rekening}>123–3456–7890</Text>
          <Text style={styles.saldoLabel}>Saldo Simpanan Pokok</Text>
          <Text style={styles.saldo}>Rp 11.477.000</Text>
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
        <View style={[styles.pinjamanBox, { backgroundColor: '#d1f0d1' }]}>
          <Text style={styles.pinjamanLabel}>Pinjaman Aktif</Text>
          <Text style={styles.pinjamanValue}>3</Text>
        </View>
        <View style={[styles.pinjamanBox, { backgroundColor: '#c8e6c9' }]}>
          <Text style={styles.pinjamanLabel}>Pinjaman Lunas</Text>
          <Text style={styles.pinjamanValue}>5</Text>
        </View>
      </View>

      {/* Aktivitas Terakhir */}
      <Text style={styles.sectionTitle}>Aktifitas Terakhir</Text>
      {[
        { type: 'Setoran', nominal: '+ Rp 200.000', color: 'green' },
        { type: 'Penarikan', nominal: '- Rp 150.000', color: 'red' },
        { type: 'Setoran', nominal: '+ Rp 200.000', color: 'green' },
      ].map((item, idx) => (
        <View key={idx} style={styles.aktivitasItem}>
          <View style={styles.iconCircle}>
            <Text style={{ fontSize: 16 }}>💰</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aktivitasLabel}>
              {item.type} Simpanan
            </Text>
            <Text style={styles.aktivitasDate}>8 Mei 2025</Text>
          </View>
          <Text style={{ color: item.color }}>{item.nominal}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 16, color: '#333' },
  username: { fontSize: 20, fontWeight: 'bold', color: 'green', marginBottom: 20 },

  saldoCard: {
    backgroundColor: '#FFCC33',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  rekening: { fontSize: 14, fontWeight: '600', textAlign: 'right' },
  saldoLabel: { marginTop: 10, color: '#333', fontSize: 14 },
  saldo: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  saldoSub: { fontSize: 12, color: '#333' },

  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  limitBox: {
    flex: 1,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  limitTitle: { fontSize: 14, color: '#333' },
  limitValue: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },

  pinjamanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  pinjamanBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  pinjamanLabel: { fontSize: 14, color: '#333' },
  pinjamanValue: { fontSize: 18, fontWeight: 'bold' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  aktivitasItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  iconCircle: {
    backgroundColor: '#C5E1A5',
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
  },
  aktivitasLabel: { fontSize: 14, fontWeight: '500' },
  aktivitasDate: { fontSize: 12, color: '#777' },
});
