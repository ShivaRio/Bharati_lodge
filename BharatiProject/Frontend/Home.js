import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, DrawerLayoutAndroid, Image, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { DataTable, Modal, Portal, FlatList, Provider } from 'react-native-paper';
import axios from "axios";



  const Home = ({navigation}) => {
    const[data, setData] = useState([])
    

    useEffect(() => {
      
      fetchMemberData();
    }, []);

    const fetchMemberData = () => {
      axios.get('https://orphean-misleads.000webhostapp.com/Lodge/View.php')
        .then((response) => {
          // Assuming the backend response is an array of members
          const responseData = response.data;
          
          
          // Ensure responseData is an array before updating the state
          if (Array.isArray(responseData)) {
            setData(responseData);   
                
            
          } else {
            console.error("Invalid data format received from the backend");
          }
        })
        .catch((error) => {
          console.error("Error fetching member data:", error);
        });
    };

    

    const navigateToMember = () => {
      navigation.navigate('Member');
    }; 
        
  return (
    <SafeAreaView style={styles.scroll}>
      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.centeredTitle}>BHARTI LODGE</Text>
      <View style={styles.image1}>
    <Image source={require('./img/img3.jpg')} resizeMode="contain" style={styles.logo} />
</View>



<DataTable  style={styles.dataTable} >   
<DataTable.Header>
<DataTable.Title textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center'}}>Degree</DataTable.Title>
<DataTable.Title textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center'}}>Default Year</DataTable.Title>
<DataTable.Title textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center'}}>Amount</DataTable.Title>
<DataTable.Title textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center'}}>Status</DataTable.Title>
<DataTable.Title textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center'}}>Arrears</DataTable.Title>
</DataTable.Header>               
  <DataTable.Row  >
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Craft</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center' }} ellipsizeMode="tail">2023-24</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:6 }} ellipsizeMode="tail">Rs 4000</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">Paid</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">Nil</DataTable.Cell>
    </DataTable.Row> 
    <DataTable.Row  >
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Chapter</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center' }} ellipsizeMode="tail">2023-24</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:6 }} ellipsizeMode="tail">Rs 1000</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">unpaid</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">1000</DataTable.Cell>
    </DataTable.Row>  
    <DataTable.Row  >
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Mark</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center' }} ellipsizeMode="tail">2023-24</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:6 }} ellipsizeMode="tail">Rs 1000</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">Paid</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">Nil</DataTable.Cell>
    </DataTable.Row>  
    <DataTable.Row  >
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">RAM</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center' }} ellipsizeMode="tail">2023-24</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:6 }} ellipsizeMode="tail">Rs 1000</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">unpaid</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">1000</DataTable.Cell>
    </DataTable.Row>  
    <DataTable.Row  >
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Conclave</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center' }} ellipsizeMode="tail">2023-24</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:6 }} ellipsizeMode="tail">Rs 2000</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">unpaid</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10 }} ellipsizeMode="tail">2000</DataTable.Cell>
    </DataTable.Row>   
    </DataTable>
    
    
    <TouchableOpacity activeOpacity = { .4 }  onPress={navigateToMember} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20,marginTop:30  }}>Member List</Text>
      </TouchableOpacity>
      
                </View>
                </ScrollView>
                </SafeAreaView>
   
                
      
      
  )
}

const styles = StyleSheet.create({
  container: {    
     shadowColor: '#2E0755',
     shadowOpacity: 0.17,
     shadowRadius: 10.54,
     elevation: 10,
     shadowOffset: { width: 0, height: 4 },
     marginTop: 30,
     flex: 1.5,
     backgroundColor: '#ffffcc',
     width: '96%',
     borderRadius: 10,
     marginBottom: 10,
     marginLeft:8,
   },
   image1: {
    marginRight:207,
    marginTop: 20,
    marginBottom:30,   
},
   logo: {
    width: "230%", 
    height: 240,    
},

dataTable: {    
    width:"96%",
    marginHorizontal:10,
    backgroundColor:'#ffeb99',
    borderRadius:5,
    borderWidth:1.5,
  },
  scroll:{
    marginHorizontal: 6,
 

  },
  centeredTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#660066',
    marginTop:20,
  },
  scroll:{
    marginHorizontal: 6, 
  },

  
  
   
});

export default Home;
