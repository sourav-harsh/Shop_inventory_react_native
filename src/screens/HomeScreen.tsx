import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AllItems from './components/AllItems.tsx';
import LowStock from './components/LowStock.tsx';
import Create from './components/Create.tsx';

const HomeScreen = () => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([
    { id: 1, name: 'Wheat', stock: 10 },
    { id: 2, name: 'Rice', stock: 15 },
    { id: 3, name: 'Basmati Rice', stock: 25 },
    { id: 4, name: 'Pulse', stock: 50 },
    { id: 5, name: 'Corn', stock: 19 },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            // eslint-disable-next-line react-native/no-inline-styles
            view === 0 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setView(0)}
        >
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text
            style={[styles.buttonText, view === 0 ? { color: 'white' } : null]}
          >
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setView(1)}
        >
          <Text
            style={[styles.buttonText, view === 1 ? { color: 'white' } : null]}
          >
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setView(2)}
        >
          <Text
            style={[styles.buttonText, view === 2 ? { color: 'white' } : null]}
          >
            Create
          </Text>
        </Pressable>
      </View>
      {view === 0 && <AllItems data={data} />}
      {view === 1 && <LowStock data={data.filter(item => item.stock < 20)} />}
      {view === 2 && <Create data={data} setdata={setData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '4%',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: '#72C37AFF',
  },
  buttonText: {
    fontSize: 12,
    color: 'green',
  },
});

export default HomeScreen;
