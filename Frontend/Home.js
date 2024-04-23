import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, DrawerLayoutAndroid, Image, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { DataTable, Modal, Portal, FlatList, Provider } from 'react-native-paper';
import axios from "axios";



  const Home = ({navigation}) => {
    const[data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const navigateToMember = () => {
      navigation.navigate('Member');
    }; 

    useEffect(()=>{


const fetchSubscriptionData = async ()=>{
  setIsLoading(true);
try{

  const response = await axios.get('https://orphean-misleads.000webhostapp.com/Lodge/subscription.php');

  setData(response.data);

}

catch(error){
console.log('Error:error occurs', error)
}

finally{
  setIsLoading(false);

}


};

fetchSubscriptionData ();


    },[]);
        
  return (
    
       <View style={styles.container}>
      <Text style={styles.centeredTitle}>BHARTI LODGE</Text>
      <View>
    <Image source={require('./img/img3.jpg')} resizeMode="contain" style={styles.logo} />
</View>


<ScrollView horizontal showsVerticalScrollIndicator>
        <DataTable style={styles.dataTable}>
         <DataTable.Header style={{backgroundColor:'#660066'}}>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff'}} >Degree</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Default_Year</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Amount</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Status</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Arrears</DataTable.Title>
        </DataTable.Header>
<ScrollView>

{data.map((value, index)=>(
  
       
      <DataTable.Row textStyle={{borderBottomWidth:2, borderColor: 'black', marginBottom:20}} key={index}>
        <DataTable.Cell  style={styles.cell}>{value.degree}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{value.year}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{value.amount}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{value.c_status}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{value.arrear}</DataTable.Cell>
        
        </DataTable.Row>
        
))}
</ScrollView>
        </DataTable>
</ScrollView>

{isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#660066" />
          <Text style={[styles.loadingText, { color: 'white' }]}>Please wait, loading...</Text>
        </View>
      )}

 <TouchableOpacity activeOpacity = { .4 }  onPress={navigateToMember} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20,marginTop:30  }}>Member List</Text>
      </TouchableOpacity>

      </View>
    
  )
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
         
   },

   imageContainer: {
    width: '100%', // Adjust this according to your layout
    alignItems: 'center',
},
logo: {
    width: 380, // Adjust width and height as needed
    height: 300,
},

dataTable: {
  backgroundColor: '#ffeb99',
  borderWidth: 3,
  borderLeftWidth: 3,
  borderRightWidth: 3,
  marginLeft: 10,
  marginRight: 20,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
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
  cell: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 21,
    borderColor: 'black',
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    
  },
 loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Home;
