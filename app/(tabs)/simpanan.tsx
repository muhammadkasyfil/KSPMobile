import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Transaksi {
  id: string;
  jenis_transaksi: 'setoran' | 'penarikan';
  nominal: string;
  tanggal_transaksi: string;
}

interface SavingsAccount {
  id: 'pokok' | 'hari_tua' | 'pendidikan' | 'sukarela';
  title: string;
  amount: number;
  icon: string;
}

export default function SimpananPage() {
  const [accounts, setAccounts] = useState<SavingsAccount[]>([]);
  const [selected, setSelected] = useState<SavingsAccount | null>(null);
  const [step, setStep] = useState(0);
  const [withdrawalData, setWithdrawalData] = useState({ method: '', time: '', amount: '', savingsType: '' });
  const [pending, setPending] = useState<Transaksi[]>([]);
  const [completed, setCompleted] = useState<Transaksi[]>([]);
  const [cancelled, setCancelled] = useState<Transaksi[]>([]);

  // Fetch accounts on focus
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) return;
          const res = await fetch('https://kspdigital-api.up.railway.app/api/users/me/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const profile = await res.json();
          const types: { id: SavingsAccount['id']; title: string; icon: string; }[] = [
            { id: 'pokok', title: 'Simpanan Pokok', icon: 'money-bill-wave' },
            { id: 'hari_tua', title: 'Simpanan Hari Tua', icon: 'money-bill-wave' },
            { id: 'pendidikan', title: 'Simpanan Pendidikan', icon: 'money-bill-wave' },
            { id: 'sukarela', title: 'Simpanan Sukarela', icon: 'money-bill-wave' },
          ];
          const accts = types.map(t => ({
            id: t.id,
            title: t.title,
            icon: t.icon,
            amount: parseFloat((profile[`saldo_simpanan_${t.id}`] || 0).toString()),
          }));
          setAccounts(accts);
        } catch (e) {
          console.error('Load accounts error', e);
        }
      })();
    }, [])
  );

  // Fetch transactions on account selection
  useEffect(() => {
    if (!selected) return;
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;
        const load = async (status: string) => {
          const res = await fetch(
            `https://kspdigital-api.up.railway.app/api/simpanan/transaksi-simpanan/${status}/?jenis_simpanan=${selected.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const json = await res.json();
          return (json.results || []).map((it: any) => ({
            id: it.id.toString(),
            jenis_transaksi: it.jenis_transaksi,
            nominal: it.nominal,
            tanggal_transaksi: new Date(it.tanggal_transaksi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          }));
        };
        setPending(await load('pending'));
        setCompleted(await load('completed'));
        setCancelled(await load('cancelled'));
      } catch (e) {
        console.error('Load transactions error', e);
      }
    })();
  }, [selected]);

  // Submit withdrawal
  const submitWithdrawal = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const res = await fetch('https://kspdigital-api.up.railway.app/api/simpanan/transaksi-simpanan/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          user: '', // will be inferred by backend from token
          jenis_simpanan: selected?.id,
          jenis_transaksi: 'penarikan',
          nominal: parseFloat(withdrawalData.amount),
          metode_penarikan_setoran: withdrawalData.method.toLowerCase(),
          waktu_jemput_antar: withdrawalData.time,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        Alert.alert('Berhasil', 'Pengajuan penarikan terkirim');
        resetModal();
        // reload pending
        setPending(prev => [
          { id: json.id.toString(), jenis_transaksi: 'penarikan', nominal: json.nominal, tanggal_transaksi: new Date(json.tanggal_transaksi).toLocaleDateString('id-ID') },
          ...prev
        ]);
      } else {
        Alert.alert('Gagal', JSON.stringify(json));
      }
    } catch (e) {
      console.error('Submit error', e);
      Alert.alert('Error', 'Terjadi kesalahan');
    }
  };

  const resetModal = () => { setStep(0); setWithdrawalData({ method: '', time: '', amount: '', savingsType: '' }); };
  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(1, s - 1));

  // Detail View
  if (selected) {
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <View style={styles.headerWithBack}>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={18} color="#3c9a4b" />
            <Text style={styles.backButtonText}>Rincian Simpanan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIconContainer}>
              <FontAwesome5 name="money-bill-wave" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.balanceTitle}>Saldo {selected.title}</Text>
              <Text style={styles.balanceAmount}>Rp {selected.amount.toLocaleString('id-ID')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.withdrawButton} onPress={() => { setWithdrawalData({ ...withdrawalData, savingsType: selected.title }); next(); }}>
            <View style={styles.withdrawButtonContent}>
              <FontAwesome5 name="money-bill-wave" size={18} color="#3c9a4b" style={styles.withdrawIcon} />
              <Text style={styles.withdrawText}>Penarikan Simpanan</Text>
              <FontAwesome5 name="chevron-right" size={16} color="#3c9a4b" />
            </View>
          </TouchableOpacity>
        </View>
        <Modal visible={step > 0} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                {step > 1 && <TouchableOpacity onPress={prev}><FontAwesome5 name="arrow-left" size={18} /></TouchableOpacity>}
                <TouchableOpacity onPress={resetModal}><FontAwesome5 name="times" size={18} /></TouchableOpacity>
              </View>
              {step === 1 && (
                <View>
                  <Text style={styles.modalTitle}>Pilih metode penarikan simpanan</Text>
                  <TouchableOpacity style={styles.methodCard} onPress={() => { setWithdrawalData({ ...withdrawalData, method: 'Kantor' }); next(); }}>
                    <FontAwesome5 name="map-marker-alt" size={20} color="#fbc02d" style={styles.methodIcon} />
                    <View><Text style={styles.methodTitle}>Datang Ke Kantor</Text><Text style={styles.methodDesc}>Silakan datang ke kantor sesuai jam operasional koperasi.</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.methodCard} onPress={() => { setWithdrawalData({ ...withdrawalData, method: 'Rumah' }); next(); }}>
                    <FontAwesome5 name="home" size={20} color="#fbc02d" style={styles.methodIcon} />
                    <View><Text style={styles.methodTitle}>Dari Rumah</Text><Text style={styles.methodDesc}>Pengurus koperasi akan datang ke rumah Anda.</Text></View>
                  </TouchableOpacity>
                </View>
              )}
              {step === 2 && (
                <View>
                  <Text style={styles.modalTitle}>Pilih jam penarikan simpanan</Text>
                  {['8.00 - 10.00','10.00 - 12.00','12.00 - 14.00','14.00 - 16.00'].map(t => (
                    <TouchableOpacity key={t} style={styles.radioOption} onPress={() => { setWithdrawalData({ ...withdrawalData, time: t }); next(); }}>
                      <Text style={styles.radioText}>{t}</Text><FontAwesome5 name={withdrawalData.time===t?'dot-circle':'circle'} color="#3c9a4b" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {step === 3 && (
                <View>
                  <Text style={styles.modalTitle}>Nominal dan Jenis Simpanan</Text>
                  <View style={styles.formGroup}><Text style={styles.formLabel}>Jenis Simpanan</Text><View style={[styles.input,styles.select]}><Text style={styles.selectText}>{withdrawalData.savingsType}</Text></View></View>
                  <View style={styles.formGroup}><Text style={styles.formLabel}>Nominal Penarikan</Text><TextInput style={[styles.input,styles.currencyInput]} keyboardType="numeric" value={withdrawalData.amount} onChangeText={v=>setWithdrawalData({...withdrawalData,amount:v})}/><View style={styles.infoContainer}><FontAwesome5 name="info-circle" size={12} color="#666"/><Text style={styles.limitText}>Saldo tersedia: Rp {selected.amount.toLocaleString('id-ID')}</Text></View></View>
                  <TouchableOpacity style={[styles.primaryButton,{backgroundColor:'#FFD700'}]} onPress={submitWithdrawal}><Text style={[styles.primaryButtonText,{color:'#000'}]}>Ajukan Penarikan</Text></TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <Text style={styles.sectionTitle}>Pending</Text>{pending.map(tx=> <TransactionItem key={tx.id} tx={tx}/>)}
        <Text style={styles.sectionTitle}>Completed</Text>{completed.map(tx=> <TransactionItem key={tx.id} tx={tx}/>)}
        <Text style={styles.sectionTitle}>Cancelled</Text>{cancelled.map(tx=> <TransactionItem key={tx.id} tx={tx}/>)}
      </ScrollView>
    );
  }

  // Main Grid
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Simpanan</Text>
      <View style={styles.cardsGrid}>{accounts.map(acc=><TouchableOpacity key={acc.id} style={styles.card} onPress={()=>setSelected(acc)}><View style={styles.iconContainer}><FontAwesome5 name={acc.icon} size={24} color="white"/></View><Text style={styles.cardTitle}>{acc.title}</Text><Text style={styles.cardAmount}>Rp {acc.amount.toLocaleString('id-ID')}</Text></TouchableOpacity>)}<TouchableOpacity style={styles.card}><View style={[styles.iconContainer,styles.addIconContainer]}><FontAwesome5 name="plus" size={24} color="#666"/></View><Text style={styles.addCardTitle}>Tambah Simpanan</Text></TouchableOpacity></View>
    </ScrollView>
  );
}

const TransactionItem = ({ tx }: { tx: Transaksi }) => (
  <View style={styles.transactionItem}>
    <View style={[styles.transactionIconContainer, { backgroundColor: tx.jenis_transaksi === 'setoran' ? '#e6f4ea' : '#fce8e8' }]}>
      <FontAwesome5 name={tx.jenis_transaksi === 'setoran' ? 'arrow-down' : 'arrow-up'} size={16} color={tx.jenis_transaksi === 'setoran' ? '#3c9a4b' : '#d32f2f'} />
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionTitle}>{tx.jenis_transaksi === 'setoran' ? 'Setoran' : 'Penarikan'}</Text>
      <Text style={styles.transactionDate}>{tx.tanggal_transaksi}</Text>
    </View>
    <Text style={[styles.transactionAmount, { color: tx.jenis_transaksi === 'setoran' ? '#3c9a4b' : '#d32f2f' }]}>
      Rp {parseFloat(tx.nominal).toLocaleString('id-ID')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  scrollView: { backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#3c9a4b', marginBottom: 24 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  iconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#3c9a4b', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  addIconContainer: { backgroundColor: '#f0f0f0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8, textAlign: 'center' },
  addCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  cardAmount: { fontSize: 14, color: '#666', textAlign: 'center' },
  headerWithBack: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonText: { fontSize: 18, fontWeight: 'bold', color: '#3c9a4b', marginLeft: 8 },
  balanceCard: { backgroundColor: '#FFD700', borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  balanceHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  balanceIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#3c9a4b', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  balanceTitle: { fontSize: 14, color: '#555' },
  balanceAmount: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  withdrawButton: { backgroundColor: 'white', borderRadius: 8, padding: 14 },
  withdrawButtonContent: { flexDirection: 'row', alignItems: 'center' },
  withdrawIcon: { marginRight: 12 },
  withdrawText: { flex: 1, fontSize: 16, fontWeight: '500', color: '#3c9a4b' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginVertical: 16 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  transactionIconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  transactionDetails: { flex: 1 },
  transactionTitle: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 4 },
  transactionDate: { fontSize: 12, color: '#777' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  noTransactionsText: { fontSize: 14, color: '#777', fontStyle: 'italic', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16 },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 16, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff8dc', padding: 14, borderRadius: 10, marginBottom: 12, elevation: 2 },
  methodIcon: { marginRight: 12 },
  methodTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  methodDesc: { fontSize: 13, color: '#555' },
  radioOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: '#f5f5f5', marginBottom: 8 },
  radioText: { fontSize: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  formGroup: { marginBottom: 16 },
  formLabel: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8 },
  currencyInput: { fontSize: 16 },
  select: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectText: { fontSize: 16 },
  infoContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  limitText: { fontSize: 12, color: '#666', marginTop: 2 },
  primaryButton: { backgroundColor: '#3c9a4b', padding: 14, borderRadius: 8, marginTop: 8, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' }
} );