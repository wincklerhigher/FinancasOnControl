import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../src/styles/FinancasStyle';
import { useTransactionContext } from '../src/TransacaoComponent';

const RelatorioGastos = () => {
  const { transactions, setTransactions } = useTransactionContext();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');  
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdicionarGasto = () => {
    if (descricao && valor) {
      const newTransaction = { id: Date.now(), description: descricao, amount: parseFloat(valor) };
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      setDescricao('');
      setValor('');
    }
  };

  const handleExcluirGasto = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const handleEditarGasto = (id) => {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    setDescricao(transactionToEdit.description);
    setValor(transactionToEdit.amount.toString());
    setEditingId(id);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.id === editingId) {
        return { ...transaction, description: descricao, amount: parseFloat(valor) };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
    setDescricao('');
    setValor('');
    setEditingId(null);
    setIsEditing(false); 
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.dashboardTitle}>Relatório de Gastos</Text>
      <View style={styles.transactionContainer}>
        <TextInput
          style={[styles.dashboardButton, { flex: 1, marginRight: 10 }]}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}          
        />
        <TextInput
          style={[styles.dashboardButton, { flex: 1 }]}
          placeholder="Valor"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"          
        />
        {!isEditing ? (
          <Button title="Adicionar Gasto" onPress={handleAdicionarGasto} />
        ) : (
          <Button title="Salvar Edição" onPress={handleSaveEdit} />
        )}
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.transactionContainer}>
            <View style={styles.transactionInfo}>
              <Text style={styles.descriptionText}>Descrição: {item.description}</Text>
              <Text style={styles.amountText}>Valor: {item.amount}</Text>
            </View>
            <TouchableOpacity onPress={() => handleExcluirGasto(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditarGasto(item.id)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RelatorioGastos;