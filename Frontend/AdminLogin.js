import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Image, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('screen');




const Login = ( {navigation}) =>  {

  const [Admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState(false);
  

  

  const handleLogin = () => {
    navigation.navigate('AdminHome');
  //   }

  //   if(Admin =="Admin" && password =="Admin123")
  //   {
  //     navigation.navigate('AdminHome');
  //   }
  //   else
  //   {

  //     seterror(true)
  //         }
   
  };
  return (
    
    <SafeAreaView style={styles.container}>
     
    <Text style={styles.title}>Admin Here!</Text>
  
    <View style={styles.imgage1}>
    <Image source={require('./img/2150709830.jpg')} resizeMode="contain" style={styles.logo} />
    </View>
    <View style={styles.inputContainer}>
    <TextInput
        style={styles.input1}
        placeholder="Admin Name"
        value={Admin}
        placeholderTextColor="black"        
        onChangeText={(text) => {
          setAdmin(text);          
        }}        
      />
      </View>
    <View style={styles.inputContainer}>
     <TextInput    
       style={styles.input1}    
       placeholder={showPassword ? "Enter Your Password" : "Admin Password 🔒"}
        secureTextEntry={!showPassword}
        value={password}
        placeholderTextColor="black"
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={true}
        underlineColorAndroid="transparent"
        required
      />
      
      <Icon name={showPassword ? 'eye-off' : 'eye'} style={styles.icon} size={20} color={showPassword ? '#660066' : '#A9A9A9'} styles={styles.icon} onPress={() => setShowPassword(!showPassword)}/>
            
      
      </View>
      
            
      <TouchableHighlight style={styles.button} underlayColor="lightblue" onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
      
         {error &&  <Text style={{ color: 'red', marginBottom:-30,}}>Invalid Credentials</Text>}
          
      
      </SafeAreaView>



  )
};
const styles = StyleSheet.create({
  container: {    
   justifyContent: 'center',
    alignItems: 'center',    
    shadowColor: '#2E0755',
    shadowOpacity: 0.17,
    shadowRadius: 10.54,
    elevation: 12,
    shadowOffset: { width: 0, height: 4 },
    paddingHorizontal:20,
    paddingVertical:4,
    flex: 1,    
    borderRadius:10,
    borderBottomEndRadius:5,
    marginBottom:20,
     },
 
  title: {
    color: '#660066',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    paddingVertical:22,
    marginTop:-20,
    marginBottom:18,
  },

  imgage1:{
    alignItems:'center',
    justifyContent:"center",
    marginTop:-20,
    },
 
  logo: {
    width: 350, // Adjust width and height as needed
    height: 350,
    
},

 button: {
    backgroundColor: '#660066',
    borderRadius: 10,
    padding: 10,
    width:"80%",
    marginTop:20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    margin:5,
  },
   
  sortBtn: {
    backgroundColor: '#660066',
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15,
      },
 
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 12,
      },
      icon: {
        padding: 10,
      },
      input1: {
        flex:0.9,
        paddingVertical: 12,
        color:'#000'        
      },

 
});

export default Login;
