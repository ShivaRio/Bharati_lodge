import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';


const Splash = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Login'); 
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [navigation]);

  return (
    <View style={styles.container}>
           
        <Image source={require('./img/bharti.jpg')} style={styles.splashImage} />
       
      </View>
  );

  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#660066',
    },

   
    splashImage: {
      
       borderRadius:15,
    },
        
  });

export default Splash; 
