import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SimpananPage() {
  // Sample savings data
  const savingsAccounts = [
    {
      id: 1,
      title: 'Simpanan Pokok',
      amount: 20000000,
      icon: 'money-bill-wave',
    },
    {
      id: 2,
      title: 'Simpanan Hari Tua',
      amount: 20000000,
      icon: 'money-bill-wave',
    },
    {
      id: 3,
      title: 'Simpanan Pendidikan',
      amount: 20000000,
      icon: 'money-bill-wave',
    },
    {
      id: 4,
      title: 'Simpanan Sukarela',
      amount: 20000000,
      icon: 'money-bill-wave',
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.pageTitle}>Simpanan</Text>

        {/* Savings Cards Grid */}
        <View style={styles.cardsGrid}>
          {/* Render savings account cards */}
          {savingsAccounts.map((account) => (
            <TouchableOpacity key={account.id} style={styles.card}>
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
});