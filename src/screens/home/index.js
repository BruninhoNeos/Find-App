import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useSelector } from 'react-redux';
import DATA from '../../Data/Data'; 
import styles from './styles';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = useSelector((state) => state.user.userData);

  console.log('Dados do usuário:', userData);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => alert(`${item.nomeLoja} selecionado`)}
    >
      <View style={styles.storeInfo}>
        <Image
          style={styles.storeImageLoja}
          source={{ uri: item.imgLoja }}
        />
        <Text style={styles.cardTitle}>{item.nomeLoja}</Text>
      </View>
      <Image
        style={styles.cardImage}
        source={{ uri: item.imgProduto }}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          alt="Sua Empresa"
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            if (userData && userData.length > 0 && userData[0].id && userData[0].email) {
              // Passando id e email para a tela PerfilCliente
              navigation.navigate('PerfilCliente', {
                id: userData[0].id,
                email: userData[0].email,
              });
            } else {
              alert('Usuário não encontrado.');
            }
          }}
        >
          <Icon name="cog" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barra de pesquisa e ícone */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar..."
          placeholderTextColor="#d9d9d9"
        />
        <TouchableOpacity>
          <Icon name="heart" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Define o número de colunas
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
}