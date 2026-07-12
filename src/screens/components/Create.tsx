import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// @ts-ignore
const Create = ({ data, setdata }) => {
  const [stock, setStock] = useState('');
  const [itemName, setitemName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  function handlerAddItem() {
    const newItems = {
      id: Date.now(),
      name: itemName,
      stock: stock,
    };
    setdata([...data, newItems]);
    setitemName('');
    setStock('');
    setIsEdit(false);
  }

  function handlerEditItem(item: any) {
    setitemName(item.name);
    setStock(item.stock);

    setEditItemId(item.id);
    setIsEdit(true);
  }

  function handlerDeleteItem(item: any) {
    // @ts-ignore
    const filterData = data.filter(i => i.id !== item.id);
    setdata(filterData);
  }

  function handlerUpdateItem() {
    setdata(
      // @ts-ignore
      data.map(i =>
        i.id === editItemId ? { ...i, name: itemName, stock: stock } : i,
      ),
    );
    setitemName('');
    setStock('');
    setIsEdit(false);
    setEditItemId(null);
  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter an item name...."
          placeholderTextColor="#999"
          style={styles.input}
          value={itemName}
          onChangeText={setitemName}
        />
        <TextInput
          placeholder="Enter an stock amount...."
          placeholderTextColor="#999"
          style={styles.input}
          value={stock}
          onChangeText={setStock}
        />
        <Pressable
          style={styles.button}
          onPress={() => (isEdit ? handlerUpdateItem() : handlerAddItem())}
        >
          <Text style={styles.buttonText}>
            {isEdit ? 'Update Item in Stock' : 'Add Item in Stock'}
          </Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Item Name</Text>
          <Text style={styles.headingText}>Stock</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={styles.itemText}>{item.stock}</Text>
                <Pressable onPress={() => handlerEditItem(item)}>
                  <Text style={{ fontWeight: 'bold' }}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handlerDeleteItem(item)}>
                  <Text style={{ fontWeight: 'bold' }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D7F6BFFF',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#CABFEEFF',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Create;
