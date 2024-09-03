import React, { useState } from 'react';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity,Alert , Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';


export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = () => {
    // Validação dos campos obrigatórios
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Nome Completo.');
      return;
    }
    if (!cpf.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo CPF.');
      return;
    }
    if (!dataNasc.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Data de Nascimento.');
      return;
    }
    if (!telefone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Telefone.');
      return;
    }

    // Se todos os campos estiverem preenchidos, navegue para a próxima tela
    navigation.navigate('Cadastro2', { nome, cpf, dataNasc, telefone });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.fullContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              alt="Sua Empresa"
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                keyboardType="default"
                autoCapitalize="none"
                value={nome}
                onChangeText={setNome}
                required
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="CPF"
                keyboardType="numeric"
                autoCapitalize="none"
                required
                value={cpf}
                onChangeText={setCpf}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="34/12/2000"
                keyboardType="default"
                autoCapitalize="none"
                required
                value={dataNasc}
                onChangeText={setDataNasc}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="+55 (11)98765-4321"
                keyboardType="phone-pad"
                autoComplete="tel"
                required
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>

            <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  
  );
}
