import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PinjamanPage() {
  const [loanHistory, setLoanHistory] = useState([
    {
      id: 1,
      status: 'Menunggu persetujuan',
      statusColor: '#FFB74D',
      icon: 'clock',
      amount: 6000000,
      purpose: 'Pinjaman berjangka untuk pernikahan',
      date: '20 Januari 2025',
      tenor: '2 Bulan',
    },
    {
      id: 2,
      status: 'Pinjaman Berjalan',
      statusColor: '#42A5F5',
      icon: 'hourglass-half',
      amount: 6000000,
      purpose: 'Pinjaman berjangka untuk pernikahan',
      date: '20 Januari 2025',
      tenor: '3 Tahun',
    },
    {
      id: 3,
      status: 'Ditolak',
      statusColor: '#EF5350',
      icon: 'times',
      amount: 1000000,
      purpose: 'Pinjaman berjangka untuk pernikahan',
      date: '20 Januari 2025',
      tenor: '2 Bulan',
      rejectionReason: 'Terlalu sering meminjam tidak dikembalikan',
    },
    {
      id: 4,
      status: 'Lunas',
      statusColor: '#66BB6A',
      icon: 'check',
      amount: 6000000,
      purpose: 'Pinjaman berjangka untuk pernikahan',
      date: '20 Januari 2025',
      tenor: '20 Hari',
    },
    {
      id: 5,
      status: 'Lunas',
      statusColor: '#66BB6A',
      icon: 'check',
      amount: 6000000,
      purpose: 'Pinjaman berjangka untuk pernikahan',
      date: '20 Januari 2025',
      tenor: '20 Hari',
    },
  ]);

  // Calculate used and available loan amount
  const loanLimit = 20000000;
  const usedLoan = loanHistory
    .filter(loan => loan.status === 'Pinjaman Berjalan')
    .reduce((total, loan) => total + loan.amount, 0);
  const availableLoan = loanLimit - usedLoan;
  const progressPercentage = (usedLoan / loanLimit) * 100;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.pageTitle}>Pinjaman</Text>

        {/* Loan Limit Card */}
        <View style={styles.loanLimitCard}>
          <Text style={styles.loanLimitTitle}>Limit Pinjaman Kamu</Text>
          <Text style={styles.loanLimitAmount}>Rp{loanLimit.toLocaleString('id-ID')}</Text>
          
          {/* Progress Bar */}
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

          {/* Apply for Loan Button */}
          <TouchableOpacity style={styles.applyLoanButton}>
            <View style={styles.applyLoanButtonContent}>
              <FontAwesome5 name="hand-holding-usd" size={18} color="#3c9a4b" style={styles.applyLoanIcon} />
              <Text style={styles.applyLoanText}>Pengajuan Pinjaman</Text>
              <FontAwesome5 name="chevron-right" size={16} color="#3c9a4b" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Loan History Section */}
        <Text style={styles.sectionTitle}>Riwayat Pinjaman</Text>
        
        {loanHistory.map((loan) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3c9a4b',
    marginBottom: 16,
  },
  loanLimitCard: {
    backgroundColor: '#3c9a4b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  loanLimitTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  loanLimitAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  progressLabelTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressLabelAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  applyLoanButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  applyLoanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyLoanIcon: {
    marginRight: 12,
  },
  applyLoanText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#3c9a4b',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  loanItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  loanDetails: {
    flex: 1,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statusContainer: {
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  loanAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tenorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  loanPurpose: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  loanDate: {
    fontSize: 12,
    color: '#777',
  },
  rejectionContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  rejectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF5350',
    marginBottom: 4,
  },
  rejectionReason: {
    fontSize: 12,
    color: '#777',
  },
});