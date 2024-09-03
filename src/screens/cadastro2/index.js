import React, { useState } from 'react';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity,Alert, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

export default function Cadastro2() {
  const navigation = useNavigation();
  const route = useRoute();
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const handleSubmit = () => {
    // Validação dos campos obrigatórios
    if (!cep.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo CEP.');
      return;
    }
    if (!logradouro.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Logradouro.');
      return;
    }
    if (!bairro.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Bairro.');
      return;
    }
    if (!cidade.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo Cidade.');
      return;
    }

    navigation.navigate('Cadastro3', {
      ...route.params,
      cep,
      logradouro,
      bairro,
      cidade
    })

  }

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
              <Text style={styles.label}>CEP</Text>
              <TextInput
                style={styles.input}
                placeholder="12345-678"
                keyboardType="numeric"
                autoCapitalize="none"
                required
                value={cep}
                onChangeText={setCep}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Logradouro</Text>
              <TextInput
                style={styles.input}
                placeholder="Logradouro"
                keyboardType="default"
                autoCapitalize="none"
                required
                value={logradouro}
                onChangeText={setLogradouro}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bairro</Text>
              <TextInput
                style={styles.input}
                placeholder="Bairro"
                keyboardType="default"
                autoCapitalize="none"
                required
                value={bairro}
                onChangeText={setBairro}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                autoComplete="name"
                required
                value={cidade}
                onChangeText={setCidade}
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
