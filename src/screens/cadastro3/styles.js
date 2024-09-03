import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050521',
    paddingVertical: hp('2%'),
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('-5%'),
  },
  logo: {
    height: hp('25%'),
    width: hp('25%'),
  },
  formContainer: {
    flex: 2,
    paddingHorizontal: wp('12%'),
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  inputContainer: {
    marginBottom: hp('1.5%'),
  },
  label: {
    fontSize: hp('2%'),
    color: '#FFFFFF',
    marginBottom: hp('0.75%'),
    marginTop: hp('1%'),
  },
  input: {
    height: hp('5%'),
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: wp('2.5%'),
  },
  button: {
    marginTop: hp('3%'),
    backgroundColor: '#FF5800',
    paddingVertical: hp('1.5%'),
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
});

export default styles;
