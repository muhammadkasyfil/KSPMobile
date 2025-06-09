import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function PinjamanPage() {
  const [loanHistory] = useState([
    { id: 1, status: 'Menunggu persetujuan', statusColor: '#FFB74D', icon: 'clock', amount: 6000000, purpose: 'Pernikahan', date: '20 Januari 2025', tenor: '2 Bulan' },
    { id: 2, status: 'Pinjaman Berjalan', statusColor: '#42A5F5', icon: 'hourglass-half', amount: 6000000, purpose: 'Pernikahan', date: '20 Januari 2025', tenor: '3 Tahun' },
    { id: 3, status: 'Ditolak', statusColor: '#EF5350', icon: 'times', amount: 1000000, purpose: 'Pernikahan', date: '20 Januari 2025', tenor: '2 Bulan', rejectionReason: 'Terlalu sering meminjam' },
    { id: 4, status: 'Lunas', statusColor: '#66BB6A', icon: 'check', amount: 6000000, purpose: 'Pernikahan', date: '20 Januari 2025', tenor: '20 Hari' },
  ]);

  const loanLimit = 20000000;
  const usedLoan = loanHistory
    .filter(loan => loan.status === 'Pinjaman Berjalan')
    .reduce((total, loan) => total + loan.amount, 0);
  const availableLoan = loanLimit - usedLoan;
  const progressPercentage = (usedLoan / loanLimit) * 100;

  const [step, setStep] = useState(0);
  const [loanData, setLoanData] = useState({
    method: '',
    time: '',
    type: '',
    purpose: '',
    nominal: '',
    tenor: '',
    dueDate: '',
  });

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => Math.max(1, prev - 1));
  const handleCloseModal = () => {
    setStep(0);
    setLoanData({
      method: '',
      time: '',
      type: '',
      purpose: '',
      nominal: '',
      tenor: '',
      dueDate: '',
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Pinjaman</Text>

        <View style={styles.loanLimitCard}>
          <Text style={styles.loanLimitTitle}>Limit Pinjaman Kamu</Text>
          <Text style={styles.loanLimitAmount}>Rp{loanLimit.toLocaleString('id-ID')}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
          <View style={styles.progressLabelsContainer}>
            <View>
              <Text style={styles.progressLabelTitle}>Terpakai</Text>
              <Text style={styles.progressLabelAmount}>Rp{usedLoan.toLocaleString('id-ID')}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.progressLabelTitle}>Tersedia</Text>
              <Text style={styles.progressLabelAmount}>Rp{availableLoan.toLocaleString('id-ID')}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.applyLoanButton} onPress={() => setStep(1)}>
            <View style={styles.applyLoanButtonContent}>
              <FontAwesome5 name="hand-holding-usd" size={18} color="#3c9a4b" style={styles.applyLoanIcon} />
              <Text style={styles.applyLoanText}>Pengajuan Pinjaman</Text>
              <FontAwesome5 name="chevron-right" size={16} color="#3c9a4b" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Riwayat Pinjaman</Text>

        {loanHistory.map(loan => (
          <View key={loan.id} style={styles.loanItem}>
            <View style={[styles.statusIcon, { backgroundColor: loan.statusColor }]}>
              <FontAwesome5 name={loan.icon} size={18} color="white" />
            </View>
            <View style={styles.loanDetails}>
              <View style={styles.loanHeader}>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: loan.statusColor + '20' }]}>
                    <Text style={[styles.statusText, { color: loan.statusColor }]}>{loan.status}</Text>
                  </View>
                  <Text style={styles.loanAmount}>Rp{loan.amount.toLocaleString('id-ID')}</Text>
                </View>
                <Text style={styles.tenorText}>{loan.tenor}</Text>
              </View>
              <Text style={styles.loanPurpose}>{loan.purpose}</Text>
              <Text style={styles.loanDate}>{loan.date}</Text>
              {loan.rejectionReason && (
                <View style={styles.rejectionContainer}>
                  <Text style={styles.rejectionTitle}>Alasan Penolakan</Text>
                  <Text style={styles.rejectionReason}>{loan.rejectionReason}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={step > 0} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              {step > 1 && (
                <TouchableOpacity onPress={handlePrevStep}>
                  <FontAwesome5 name="arrow-left" size={18} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleCloseModal}>
                <FontAwesome5 name="times" size={18} />
              </TouchableOpacity>
            </View>

            {/* Step 1: Metode */}
            {step === 1 && (
              <>
                <Text style={styles.modalTitle}>Pilih metode pengajuan pinjaman</Text>
                <TouchableOpacity
                  style={styles.methodCard}
                  onPress={() => {
                    setLoanData({ ...loanData, method: 'Kantor' });
                    setStep(3);
                  }}>
                  <FontAwesome5 name="map-marker-alt" size={20} color="#fbc02d" style={styles.methodIcon} />
                  <View>
                    <Text style={styles.methodTitle}>Datang Ke Kantor</Text>
                    <Text style={styles.methodDesc}>Silakan datang ke kantor sesuai jam operasional koperasi.</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.methodCard}
                  onPress={() => {
                    setLoanData({ ...loanData, method: 'Rumah' });
                    handleNextStep();
                  }}>
                  <FontAwesome5 name="home" size={20} color="#fbc02d" style={styles.methodIcon} />
                  <View>
                    <Text style={styles.methodTitle}>Dari Rumah</Text>
                    <Text style={styles.methodDesc}>Pengurus koperasi akan datang ke rumah Anda.</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}

            {/* Step 2: Waktu */}
            {step === 2 && (
              <>
                <Text style={styles.modalTitle}>Pilih jam pengajuan pinjaman</Text>
                {['8.00 - 10.00', '10.00 - 12.00', '12.00 - 14.00', '14.00 - 16.00'].map(time => (
                  <TouchableOpacity
                    key={time}
                    style={styles.radioOption}
                    onPress={() => {
                      setLoanData({ ...loanData, time });
                      handleNextStep();
                    }}>
                    <Text style={styles.radioText}>{time}</Text>
                    <FontAwesome5 name={loanData.time === time ? 'dot-circle' : 'circle'} color="#3c9a4b" />
                  </TouchableOpacity>
                ))}
              </>
            )}

            {/* Step 3: Keperluan */}
            {step === 3 && (
              <>
                <Text style={styles.modalTitle}>Keperluan Pinjaman</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Jenis Pinjaman"
                  placeholderTextColor="#999"
                  onChangeText={text => setLoanData({ ...loanData, type: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Peruntukan Pinjaman"
                  placeholderTextColor="#999"
                  onChangeText={text => setLoanData({ ...loanData, purpose: text })}
                />
                <TouchableOpacity onPress={handleNextStep} style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Lanjut</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Step 4: Nominal */}
            {step === 4 && (
              <>
                <Text style={styles.modalTitle}>Nominal Pinjaman</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: 10000000"
                  keyboardType="numeric"
                  onChangeText={text => setLoanData({ ...loanData, nominal: text })}
                />
                <Text style={{ fontSize: 12 }}>
                  Limit tersedia: Rp{availableLoan.toLocaleString('id-ID')}
                </Text>
                <TouchableOpacity onPress={handleNextStep} style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Lanjut</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Step 5: Tenor */}
            {step === 5 && (
              <>
                <Text style={styles.modalTitle}>Tenor</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: 2 Bulan"
                  placeholderTextColor="#999"
                  onChangeText={text => setLoanData({ ...loanData, tenor: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Jatuh Tempo Tanggal (misal: 10)"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  onChangeText={text => setLoanData({ ...loanData, dueDate: text })}
                />
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={[styles.primaryButton, { backgroundColor: '#FFD700' }]}>
                  <Text style={[styles.primaryButtonText, { color: '#000' }]}>Ajukan Pinjaman</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#3c9a4b', marginBottom: 16 },
  loanLimitCard: { backgroundColor: '#3c9a4b', borderRadius: 16, padding: 20, marginBottom: 24 },
  loanLimitTitle: { fontSize: 16, color: 'white', marginBottom: 8 },
  loanLimitAmount: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 16 },
  progressBarContainer: { height: 8, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 4 },
  progressBar: { height: '100%', backgroundColor: '#FFD700', borderRadius: 4 },
  progressLabelsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  progressLabelTitle: { fontSize: 12, color: 'rgba(255, 255, 255, 0.8)' },
  progressLabelAmount: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  applyLoanButton: { backgroundColor: 'white', borderRadius: 8, padding: 14, marginTop: 8 },
  applyLoanButtonContent: { flexDirection: 'row', alignItems: 'center' },
  applyLoanIcon: { marginRight: 12 },
  applyLoanText: { flex: 1, fontSize: 16, fontWeight: '500', color: '#3c9a4b' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  loanItem: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16 },
  statusIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  loanDetails: { flex: 1 },
  loanHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statusContainer: { flex: 1 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 4 },
  statusText: { fontSize: 12, fontWeight: '500' },
  loanAmount: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  tenorText: { fontSize: 14, color: '#666' },
  loanPurpose: { fontSize: 14, color: '#555', marginBottom: 4 },
  loanDate: { fontSize: 12, color: '#777' },
  rejectionContainer: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#eee' },
  rejectionTitle: { fontSize: 14, fontWeight: '500', color: '#EF5350', marginBottom: 4 },
  rejectionReason: { fontSize: 12, color: '#777' },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 16, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  modalOption: { padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  nextButton: { backgroundColor: '#3c9a4b', padding: 14, borderRadius: 8, marginTop: 8, alignItems: 'center' },
  nextButtonText: { color: '#fff', fontWeight: 'bold' },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff8dc', padding: 14, borderRadius: 10, marginBottom: 12, elevation: 2, },
  methodIcon: { marginRight: 12,},
  methodTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, },
  methodDesc: { fontSize: 13, color: '#555',},
  radioOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: '#f5f5f5', marginBottom: 8,},
  radioText: { fontSize: 15, },
  primaryButton: { backgroundColor: '#3c9a4b', padding: 14, borderRadius: 8, marginTop: 8, alignItems: 'center', },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', },
});
