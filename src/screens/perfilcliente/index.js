import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import styles from './styles';
import api from '../../services/api';

export default function PerfilCliente() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params || {};

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/usuarios/?email=${email}`);
        console.log('Resposta da API:', response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setUsuario(response.data[0]);
        } else {
          setError('Usuário não encontrado.');
        }
      } catch (error) {
        setError('Erro ao buscar cliente.');
        console.error('Erro ao buscar cliente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [email]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    senha: '',
    nome: '',
    cpf: '',
    nascimento: '',
    telefone: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: ''
  });

  useEffect(() => {
    if (usuario) {
      console.log('Dados do usuario no useEffect:', usuario);
      setFormData({
        id: usuario.id,
        email: usuario.email,
        senha: usuario.senha,
        nome: usuario.nome,
        cpf: usuario.cpf,
        nascimento: usuario.dataNasc,
        telefone: usuario.telefone,
        cep: usuario.cep,
        logradouro: usuario.logradouro,
        bairro: usuario.bairro,
        cidade: usuario.cidade,
      });
    }
  }, [usuario]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    console.log(`Atualizando ${field} com valor ${value}`); // Verifique a atualização do estado
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    const { id, ...data } = formData; // Desestrutura o id do formData
    try {
      await api.put(`/usuarios/${id}`, data);
      Alert.alert('Confirmar', 'As alterações foram salvas.');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar as informações.');
      console.error('Erro ao atualizar dados:', error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => {
            // Lógica para excluir conta
            Alert.alert("Conta excluída com sucesso");
            navigation.navigate('Login'); // Redireciona para a tela de login
          }
        }
      ]
    );
  };


 const handleLogoutPress = async () => {
    navigation.navigate('Login');
  };

  if (loading) return <View style={styles.containerPerfil}><Text style={styles.titleText}>Carregando...</Text></View>;
  if (error) return <View style={styles.containerPerfil}><Text style={styles.titleText}>{error}</Text></View>;
  if (!usuario) {
    return (
      <View style={styles.containerPerfil}>
        <Text style={styles.titleText}>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            alt="Sua Empresa"
          />
        </TouchableOpacity>
		<View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerPerfil}>
        <Text style={styles.titleText}>Seu Perfil</Text>
        <Image source={require('../../assets/base.png')} style={styles.foto} alt="Sua foto" />
        <Text style={styles.nameText}>{usuario.nome}</Text>
        <Text style={styles.bioText}>{usuario.cidade}</Text>
      </View>

      {/* Conta Section */}
      <View style={styles.containerInfo}>
        <View style={styles.infoPessoal}>
          <Text style={styles.textInfoCont}>Conta</Text>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.textInfoCont}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>Email:</Text>
            {isEditing ? (
              <TextInput
              style={styles.textInput}
              value={formData.email} // Verifique se formData.email está correto
              onChangeText={(text) => handleInputChange('email', text)}
            />
            ) : (
              <Text style={styles.textInfo2}>{formData.email}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Senha:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.senha}
                onChangeText={(text) => handleInputChange('senha', text)}
                secureTextEntry={true}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.senha}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Perfil Section */}
      <View style={styles.containerInfo}>
        <View style={styles.infoPessoal}>
          <Text style={styles.textInfoCont}>Perfil</Text>
        </View>

        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>Nome:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.nome}
                onChangeText={(text) => handleInputChange('nome', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.nome}</Text>
            )}
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.textInfo}>CPF:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.cpf}
                onChangeText={(text) => handleInputChange('cpf', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.cpf}</Text>
            )}
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.textInfo}>Data de Nascimento:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.nascimento}
                onChangeText={(text) => handleInputChange('nascimento', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.nascimento}</Text>
            )}
          </View>
          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Telefone:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.telefone}
                onChangeText={(text) => handleInputChange('telefone', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.telefone}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Localização Section */}
      <View style={styles.containerInfo}>
        <View style={styles.infoPessoal}>
          <Text style={styles.textInfoCont}>Localização</Text>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.textInfoCont}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerCard}>
          <View style={[styles.cardInfo, styles.firstCard]}>
            <Text style={styles.textInfo}>CEP:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.cep}
                onChangeText={(text) => handleInputChange('cep', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.cep}</Text>
            )}
          </View>

          <View style={[styles.cardInfo]}>
            <Text style={styles.textInfo}>Logradouro:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.logradouro}
                onChangeText={(text) => handleInputChange('logradouro', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.logradouro}</Text>
            )}
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.textInfo}>Bairro:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.bairro}
                onChangeText={(text) => handleInputChange('bairro', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.bairro}</Text>
            )}
          </View>

          <View style={[styles.cardInfo, styles.lastCard]}>
            <Text style={styles.textInfo}>Cidade:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={formData.cidade}
                onChangeText={(text) => handleInputChange('cidade', text)}
              />
            ) : (
              <Text style={styles.textInfo2}>{formData.cidade}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        {isEditing && (
          <>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}