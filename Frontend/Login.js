import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Image, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('screen');




const Login = ( {navigation}) =>  {

  const [membername, setMembername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState('');
  

  

  const handleLogin = () => {
    
    if (!membername || !password) {
        alert('Please enter both membername and password');
        return; 
    }
    
    fetch('https://orphean-misleads.000webhostapp.com/Lodge/Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        membername: membername,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson === 'Data Matched') {
        navigation.navigate('Home');
        // Clear input fields after successful login
        setMembername(null);
        setPassword(null);
      } else {
        Alert.alert(responseJson);
      }
    })
    .catch((error) => {
      alert('Invalid username or password');
    });
};


  

  return (
    
    <SafeAreaView style={styles.container}>
     
    <Text style={styles.title}>Member Login</Text>
  
    <View style={styles.imgage1}>
    <Image source={require('./img/img3.jpg')} resizeMode="contain" style={styles.logo} />
    </View>
    <View style={styles.inputContainer}>
    <TextInput
        style={styles.input1}
        placeholder="Enter Your Member Name"
        value={membername}
        placeholderTextColor="black"        
        onChangeText={(text) => {
          setMembername(text.toUpperCase());          
        }}        
      />
      </View>
    <View style={styles.inputContainer}>
     <TextInput    
       style={styles.input1}    
       placeholder={showPassword ? "Enter Your Password" : "Enter Your Password 🔒"}
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
      
      <Text style={{fontSize:18, marginTop:15, marginBottom:10,marginRight:140, color:'#660066',fontWeight:'bold' }}>Don't have a your Account</Text>

      <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('Register')}>
      <Text style={{ color:'#660066', fontWeight:'bold', textAlign:'center', fontSize:20, marginTop:-35, marginLeft:210, marginBottom:23 }}>New Register</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 }  onPress={() => navigation.navigate('Member')} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20,marginTop:-20, marginLeft:210, marginBottom:23  }}>Member page</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 }  onPress={() => navigation.navigate('Home')} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20,marginTop:-20, marginLeft:210, marginBottom:23  }}>Home page</Text>
      </TouchableOpacity>
      

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
    marginTop:22,
    marginBottom:-28,
  },

  imgage1:{
    alignItems:'center',
    justifyContent:"center",
    marginBottom:-20,
    marginTop:-25,
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
