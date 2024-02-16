import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Image, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const Login = ( {navigation}) =>  {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const navigateToMember = () => {
    navigation.navigate('Register');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };


  
  const handleLogin = () => {
    fetch('https://orphean-misleads.000webhostapp.com/Lodge/Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson === 'Data Matched') {
        navigation.navigate('Home');
     
        setEmail(null),
        setPassword(null)
      } else {
        Alert.alert(responseJson);
      }
    })
    .catch((error) => {

      alert('Invalid username or password');

    });
  };

   

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      // fadeIn();
    });
  };

  

  return (
    
    <SafeAreaView style={styles.scroll}>
      <ScrollView>
    <View style={styles.container}>
            <Text style={styles.title}>BHARTI LODGE</Text>
      <TouchableHighlight style={styles.button1} underlayColor="lightblue" onPress={fadeIn}>
      <Image source={require('./img/left-arrow.png')}  style={{width:"50%"}} resizeMode="contain"  /></TouchableHighlight>        
    <TouchableHighlight style={styles.button2} underlayColor="lightblue" onPress={fadeOut}>
      <Image source={require('./img/right-arrow.png')}  style={{width:"50%"}} resizeMode="contain"  /></TouchableHighlight>     
      
      <Animated.View
        style={[styles.fadingContainer,     {
            opacity: fadeAnim,
          },
        ]}>
      <Image source={require('./img/img1.jpg')} resizeMode="contain" style={styles.logo} />
      
      </Animated.View>

      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <Image
          source={require('./img/img2.jpg')} // Change this to the path of your second image
          resizeMode="contain"
          style={styles.logo1}
        />
      </Animated.View>     


     <Text style={styles.title1}>Member Login</Text> 
     
     

      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        placeholderTextColor="black"
        
        onChangeText={(text) => {
          setEmail(text);
          
        }}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        secureTextEntry={true}
        value={password}
        placeholderTextColor="black"
        onChangeText={(text) => {
          setPassword(text);
          
        }}
      />
     
      <TouchableHighlight style={styles.button} underlayColor="lightblue" onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
      
      <Text style={{fontSize:18, marginTop:15, marginBottom:10,marginRight:140, color:'#660066',fontWeight:'bold' }}>Don't have a your Account</Text>
      <TouchableOpacity activeOpacity = { .4 }  onPress={navigateToMember} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20,marginTop:-35, marginLeft:210, marginBottom:23  }}>New Register</Text>
      </TouchableOpacity>   

      {/* <TouchableOpacity activeOpacity = { .4 }  onPress={navigateToHome} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20,marginTop:-35, marginLeft:210, marginBottom:23  }}>Home</Text>
      </TouchableOpacity>  */}
      

      {error &&  <Text style={{ color: 'red', marginBottom:-30,}}>Invalid Credentials</Text>}
       
        
      </View>
      </ScrollView>
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
    elevation: 10,
    shadowOffset: { width: 0, height: 4 },
    color: '#ebb134',
    fontWeight: 'bold',
    marginTop: 40,
    flex: 0.5,
    backgroundColor: '#ffffcc',
    width: '96%',
  height:'100%',
    borderRadius: 10,
    marginBottom: 10,
    marginLeft:8,
  },

  backgroundAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  fadingContainer: {
    width:"37%",
    
    marginRight:210,
    marginLeft:-10,
  },


  button: {
    backgroundColor: '#660066',
    borderRadius: 10,
    padding: 10,
    width:"80%",
    marginTop:20,
  },
  button1: {
    underlayColor:'#ffffcc',    
    marginLeft:-240,    
    width:"20%",      
    marginTop:-255,
    },
  button2: {
    underlayColor:'#ffffcc',
    padding: 10,
    marginTop: -380,
    marginBottom:-80,
    marginRight:-300,
    width:"26%"
  },
  input: {
    width: '90%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    marginTop:20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    margin:5,
  },
 

  title: {
    color: '#660066',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 40,
    marginBottom: 60,
  },
  title1: {
    color: '#660066',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 130,
    marginBottom: 20,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },

  logo: {    
   marginTop:-70,
   marginBottom:-100,
   width:"250%",
   height:220,
   marginLeft:15,
   
    
  },
  logo1: {    
    marginTop:-100,
    marginBottom:-100,
    width:"268%",
    height:220,
    marginRight:55,
     
   },
 
  scroll:{
    marginHorizontal: 6,
 backgroundColor:'white'

  },

});

export default Login;
