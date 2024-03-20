import React, { useState } from 'react';
import { TransactionProvider } from './android/app/src/TransacaoComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './android/app/src/styles/FinancasStyle';
import RelatorioContas from './android/app/screens/RelatorioContas';
import Orçamentos from './android/app/screens/Orçamentos';
import Metas from './android/app/screens/Metas';

const Stack = createStackNavigator();

const App = () => {
  const [transactions, setTransactions] = useState([]);

  function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('RelatorioContas')}>
          <Text style={styles.dashboardButtonText}>Relatório de Gastos</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('Orçamentos')}>
          <Text style={styles.dashboardButtonText}>Orçamentos</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('Metas')}>
          <Text style={styles.dashboardButtonText}>Metas</Text>
        </TouchableOpacity> 
      </View>
    );
  }

  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RelatorioContas" component={RelatorioContas} />
          <Stack.Screen name="Orçamentos" component={Orçamentos} />
          <Stack.Screen name="Metas" component={Metas} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}

export default App;