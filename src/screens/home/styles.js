import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: hp('4%'), // Espaço adicional para descolar a logo e a engrenagem do topo
    backgroundColor: '#050521', // Azul de fundo
  },
  logo: {
    width: 125,
    height: 75,
    resizeMode: 'contain',
  },
  iconButton: {
    marginLeft: 200,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#050521',
  },
  searchBar: {
    flex: 1,
    height: 35,
    backgroundColor: '#404652',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
    color: '#d9d9d9',
  },
  listContainer: {
    backgroundColor: '#050521', // Cor de fundo azul
    padding: 10,
  },
  card: {
    backgroundColor: '#404652',
    borderRadius: 10,
    margin: 5,
    width: '48%', // Para dois cards por linha, aproximadamente metade da largura
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'regular',
    color: '#FFFFFF',
    marginVertical: 5,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
  },
  storeImageLoja: {
    width: 20,
    height: 20,
    borderRadius: 20, // Isso torna a imagem circular
    marginRight: 10,
  },
});

export default styles;
