import { FontAwesome5 } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const iconSource = require('../assets/images/payment-coin.png');

const navItems: {
  name: string;
  label: string;
  href: '/(tabs)' | '/(tabs)/simpanan' | '/(tabs)/pinjaman' | '/(tabs)/profile';
}[] = [
  { name: 'home', label: 'Beranda', href: '/(tabs)' },
  { name: 'money-bill-alt', label: 'Simpanan', href: '/(tabs)/simpanan' },
  { name: 'hand-holding-usd', label: 'Pinjaman', href: '/(tabs)/pinjaman' },
  { name: 'user', label: 'Akun', href: '/(tabs)/profile' },
];

export default function Notifikasi() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const data = [
    {
      title: 'Pengajuan Pinjaman Disetujui',
      desc: 'Pengajuan pinjaman sebesar Rp6.000.000 dengan tenor 20 hari telah disetujui. Dana akan segera dicairkan ke akun Anda.',
      time: '23 Mei 2025, 13:05',
    },
    {
      title: 'Setoran Simpanan Berhasil',
      desc: 'Anda telah menyetor Rp200.000 ke Simpanan Pokok pada 23 Mei 2025.',
      time: '23 Mei 2025, 12:40',
    },
    {
      title: 'Angsuran Jatuh Tempo Besok',
      desc: 'Angsuran pinjaman Anda sebesar Rp100.000 jatuh tempo pada 24 Mei 2025.',
      time: '23 Mei 2025, 10:00',
    },
    {
      title: 'Penarikan Simpanan Diproses',
      desc: 'Permintaan penarikan Rp150.000 dari Simpanan Pokok sedang diproses oleh admin.',
      time: '23 Mei 2025, 10:00',
    },
    {
      title: 'Sistem Dalam Pemeliharaan',
      desc: 'Sistem koperasi akan mengalami pemeliharaan pada 25 Mei pukul 10.00–12.00 WIB.',
      time: '23 Mei 2025, 08:00',
    },
    {
      title: 'Angsuran Telah Diterima',
      desc: 'Pembayaran angsuran sebesar Rp100.000 telah diterima dan dicatat dalam sistem.',
      time: '22 Mei 2025, 16:32',
    },
    {
      title: 'Pengajuan Pinjaman Diterima',
      desc: 'Pengajuan pinjaman Anda sebesar Rp6.000.000 telah diterima dan sedang menunggu verifikasi dari admin.',
      time: '23 Mei 2025, 14:10',
    },
    {
      title: 'Penyesuaian Jam Operasional',
      desc: 'Mulai 1 Juni 2025, layanan koperasi hanya buka pukul 08.00–16.00 WIB.',
      time: '23 Mei 2025, 14:00',
    },
    {
      title: 'Verifikasi Identitas Berhasil',
      desc: 'Data KTP Anda telah berhasil diverifikasi. Akun Anda sekarang aktif sepenuhnya.',
      time: '23 Mei 2025, 14:00',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <Text style={styles.title}>Notifikasi</Text>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.itemContainer}>
            <View style={styles.iconNotif}>
              <Image source={iconSource} style={{ width: 32, height: 32 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Custom Bottom Navbar */}
      <View style={[styles.navbar, { paddingBottom: insets.bottom }]}>
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => router.push(item.href)}
              style={styles.navItem}
            >
              <View
                style={[
                  styles.iconContainer,
                  isActive && styles.activeIconContainer,
                ]}
              >
                <FontAwesome5 name={item.name as any} size={20} color="#000" />
              </View>
              <Text style={styles.navLabel}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f7d3b',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconNotif: {
    backgroundColor: '#fff9c4',
    borderRadius: 999,
    padding: 8,
    marginTop: 4,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemDesc: {
    fontSize: 14,
    color: '#333333',
    marginTop: 2,
  },
  itemTime: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    paddingHorizontal: 12,
    elevation: 4,
  },
  navItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  activeIconContainer: {
    backgroundColor: '#fff9c4',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    color: '#000',
  },
});
