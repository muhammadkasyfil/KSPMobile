import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
}

interface SavingsAccount {
  id: number;
  title: string;
  amount: number;
  icon: string;
  transactions: Transaction[];
}

export default function SimpananPage() {
  const [selectedSavings, setSelectedSavings] = useState<SavingsAccount | null>(null);
  const [step, setStep] = useState(0);
  const [withdrawalData, setWithdrawalData] = useState({
    method: '',
    time: '',
    amount: '',
    savingsType: ''
  });

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => Math.max(1, prev - 1));
  const handleCloseModal = () => {
    setStep(0);
    setWithdrawalData({
      method: '',
      time: '',
      amount: '',
      savingsType: ''
    });
  };

  // Sample savings data
  const savingsAccounts: SavingsAccount[] = [
    {
      id: 1,
      title: 'Simpanan Pokok',
      amount: 11477000,
      icon: 'money-bill-wave',
      transactions: [
        { id: 1, type: 'deposit' as const, amount: 200000, date: '8 Mei 2025' },
        { id: 2, type: 'deposit' as const, amount: 200000, date: '8 Mei 2025' },
        { id: 3, type: 'withdrawal' as const, amount: 150000, date: '8 Mei 2025' },
        { id: 4, type: 'withdrawal' as const, amount: 150000, date: '8 Mei 2025' },
      ]
    },
    {
      id: 2,
      title: 'Simpanan Hari Tua',
      amount: 20000000,
      icon: 'money-bill-wave',
      transactions: [
        { id: 1, type: 'deposit', amount: 500000, date: '5 Mei 2025' },
        { id: 2, type: 'deposit', amount: 500000, date: '1 Mei 2025' },
      ]
    },
    {
      id: 3,
      title: 'Simpanan Pendidikan',
      amount: 20000000,
      icon: 'money-bill-wave',
      transactions: [
        { id: 1, type: 'deposit', amount: 300000, date: '3 Mei 2025' },
      ]
    },
    {
      id: 4,
      title: 'Simpanan Sukarela',
      amount: 20000000,
      icon: 'money-bill-wave',
      transactions: []
    },
  ];

  const handleSavingsPress = (account: SavingsAccount) => {
    setSelectedSavings(account);
  };

  const handleBackPress = () => {
    setSelectedSavings(null);
  };

  // If a savings account is selected, show the detail view
  if (selectedSavings) {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header with back button */}
          <View style={styles.headerWithBack}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <FontAwesome5 name="arrow-left" size={18} color="#3c9a4b" />
              <Text style={styles.backButtonText}>Rincian Simpanan</Text>
            </TouchableOpacity>
          </View>

          {/* Savings Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View style={styles.balanceIconContainer}>
                <FontAwesome5 name="money-bill-wave" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.balanceTitle}>Saldo {selectedSavings.title}</Text>
                <Text style={styles.balanceAmount}>Rp {selectedSavings.amount.toLocaleString('id-ID')}</Text>
              </View>
            </View>

            {/* Withdrawal Button */}
            <TouchableOpacity style={styles.withdrawButton} onPress={() => setStep(1)}>
              <View style={styles.withdrawButtonContent}>
                <FontAwesome5 name="money-bill-wave" size={18} color="#3c9a4b" style={styles.withdrawIcon} />
                <Text style={styles.withdrawText}>Penarikan Simpanan</Text>
                <FontAwesome5 name="chevron-right" size={16} color="#3c9a4b" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Withdrawal Modal */}
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

                {/* Step 1: Metode Penarikan */}
                {step === 1 && (
                  <View>
                    <Text style={styles.modalTitle}>Pilih metode penarikan simpanan</Text>
                    <TouchableOpacity
                      style={styles.methodCard}
                      onPress={() => {
                        setWithdrawalData({ ...withdrawalData, method: 'Kantor' });
                        handleNextStep();
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
                        setWithdrawalData({ ...withdrawalData, method: 'Rumah' });
                        handleNextStep();
                      }}>
                      <FontAwesome5 name="home" size={20} color="#fbc02d" style={styles.methodIcon} />
                      <View>
                        <Text style={styles.methodTitle}>Dari Rumah</Text>
                        <Text style={styles.methodDesc}>Pengurus koperasi akan datang ke rumah Anda.</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Step 2: Waktu Penarikan */}
                {step === 2 && (
                  <View>
                    <Text style={styles.modalTitle}>Pilih jam penarikan simpanan</Text>
                    {['8.00 - 10.00', '10.00 - 12.00', '12.00 - 14.00', '14.00 - 16.00'].map(time => (
                      <TouchableOpacity
                        key={time}
                        style={styles.radioOption}
                        onPress={() => {
                          setWithdrawalData({ ...withdrawalData, time });
                          handleNextStep();
                        }}>
                        <Text style={styles.radioText}>{time}</Text>
                        <FontAwesome5 name={withdrawalData.time === time ? 'dot-circle' : 'circle'} color="#3c9a4b" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Step 3: Nominal dan Jenis Simpanan */}
                {step === 3 && (
                  <View>
                    <Text style={styles.modalTitle}>Nominal dan Jenis Simpanan</Text>
                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Jenis Simpanan</Text>
                      <View style={[styles.input, styles.select]}>
                        <Text style={styles.selectText}>{selectedSavings.title}</Text>
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Nominal Penarikan</Text>
                      <TextInput
                        style={[styles.input, styles.currencyInput]}
                        placeholder="Contoh: 1000000"
                        keyboardType="numeric"
                        value={withdrawalData.amount}
                        onChangeText={text => setWithdrawalData({ ...withdrawalData, amount: text })}
                      />
                      <View style={styles.infoContainer}>
                        <FontAwesome5 name="info-circle" size={12} color="#666" />
                        <Text style={styles.limitText}>
                          Saldo tersedia: Rp {selectedSavings?.amount.toLocaleString('id-ID')}
                        </Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      onPress={handleCloseModal}
                      style={[styles.primaryButton, { backgroundColor: '#FFD700', marginTop: 24 }]}
                    >
                      <Text style={[styles.primaryButtonText, { color: '#000' }]}>Ajukan Penarikan</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>

          {/* Transaction History */}
          <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
          
          {selectedSavings.transactions.length > 0 ? (
            selectedSavings.transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={[
                  styles.transactionIconContainer, 
                  { backgroundColor: transaction.type === 'deposit' ? '#3c9a4b' : '#FFD700' }
                ]}>
                  <FontAwesome5 
                    name={transaction.type === 'deposit' ? 'money-bill-wave' : 'money-bill'} 
                    size={18} 
                    color="white" 
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>
                    {transaction.type === 'deposit' ? 'Setoran Simpanan' : 'Penarikan Simpanan'}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount, 
                  { color: transaction.type === 'deposit' ? '#3c9a4b' : '#e53935' }
                ]}>
                  {transaction.type === 'deposit' ? '+ ' : '- '}
                  Rp {transaction.amount.toLocaleString('id-ID')}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noTransactionsText}>Belum ada riwayat transaksi.</Text>
          )}

          {/* Ongoing Transactions */}
          <Text style={styles.sectionTitle}>Transaksi Berlangsung</Text>
          <Text style={styles.noTransactionsText}>Belum ada transaksi yang berlangsung.</Text>
        </View>
      </ScrollView>
    );
  }

  // Otherwise, show the main savings page
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.pageTitle}>Simpanan</Text>

        {/* Savings Cards Grid */}
        <View style={styles.cardsGrid}>
          {/* Render savings account cards */}
          {savingsAccounts.map((account) => (
            <TouchableOpacity 
              key={account.id} 
              style={styles.card}
              onPress={() => handleSavingsPress(account)}
            >
              <View style={styles.iconContainer}>
                <FontAwesome5 name={account.icon} size={24} color="white" />
              </View>
              <Text style={styles.cardTitle}>{account.title}</Text>
              <Text style={styles.cardAmount}>
                Rp {account.amount.toLocaleString('id-ID')}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Add New Savings Card */}
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.addIconContainer]}>
              <FontAwesome5 name="plus" size={24} color="#666" />
            </View>
            <Text style={styles.addCardTitle}>Tambah Simpanan</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 24,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3c9a4b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addIconContainer: {
    backgroundColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  addCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardAmount: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  
  // Detail view styles
  headerWithBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c9a4b',
    marginLeft: 8,
  },
  balanceCard: {
    backgroundColor: '#FFD700',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3c9a4b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  balanceTitle: {
    fontSize: 14,
    color: '#555',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  withdrawButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 14,
  },
  withdrawButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawIcon: {
    marginRight: 12,
  },
  withdrawText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#3c9a4b',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#777',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noTransactionsText: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8dc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  methodIcon: {
    marginRight: 12,
  },
  methodTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  methodDesc: {
    fontSize: 13,
    color: '#555',
  },
  radioOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  radioText: {
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12
  },
  limitText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16
  },
  primaryButton: {
    backgroundColor: '#3c9a4b',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  currencyInput: {
    fontSize: 16,
  },
  selectContainer: {
    position: 'relative',
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});