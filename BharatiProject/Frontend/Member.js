import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, DrawerLayoutAndroid, Image, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from "axios";
import ModalDropdown from 'react-native-modal-dropdown';

  const Member = ({navigation}) => {

    const [data, setData] = useState([]);
    const[selectedValue, setSelectedValue] = useState('')
    const [filterdata,setFilterdata]=useState([]);

    const [expandedItems, setExpandedItems] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

    const uniqueRegisterNumbers = [...new Set(data.map((s) => s.Reg_No))];

    const handleLogout = () => {
      navigation.navigate('Login');
    };

    const handleValueChange = (value) => {
      setSelectedValue(value);
      filtered(value);
           
    };

    const filtered =(value)=>{
      const unidata= data.filter((item)=>item.Reg_No===value)
     setFilterdata(unidata); 
     
     setExpandedItems([]); 
    };

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
    

    const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filterdata.slice(startIndex, endIndex);
 

  const totalPages = Math.ceil(filterdata.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPage = (page) => {
    setCurrentPage(page);
    
  };
     
        
  return (
    <SafeAreaView style={styles.scroll}>
      <ScrollView>
    <View style={styles.container}>
    

      <Text style={styles.centeredTitle}>Profile Details</Text>
      <View style={styles.image1}>
    <Image source={require('./img/img4.jpg')} resizeMode="contain" style={styles.logo} />
    </View>

    <ModalDropdown
        style={{ borderColor: '#9c9a9a', color:"#ebb134", width:'80%',  borderWidth: 4, padding: 13, marginTop:20, marginLeft:40, marginBottom:20, }}
        dropdownStyle={{ width: '75%' , color:"#ebb134", fontSize:'50', fontWeight:"bold" }}
        options={uniqueRegisterNumbers}
        defaultValue="Select Register Number"
        onSelect={(index, value) => handleValueChange(value)}
      />

    {selectedValue === "" ? null : displayedData.map((it, index) => (

<View key={index} >

<DataTable style={styles.dataTable} >                  
  <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Reg. No.</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Reg_No}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">RGLSI Id</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.RGLSI_Id}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">	Title</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Title}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Member Name</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Name}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">DOB</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.DOB}</DataTable.Cell>
    </DataTable.Row>
    {expandedItems.includes(index) && (
  <>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Sts. Dt.</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Sts_Dt}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Sts. Type</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Sts_Type}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Master</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Master}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">R.G. Rank</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.RG_Rank}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">G.Rank</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.G_Rank}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Mobile</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Mobile}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Email</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Email}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row  textStyle={{ borderWidth:1.5,  }}>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',  }} ellipsizeMode="tail">Address</DataTable.Cell>
    <DataTable.Cell   textStyle={{ color: '#000000', fontSize: 14 ,fontWeight:'bold', alignItems:'center', justifyContent:'center', marginLeft:10, }} ellipsizeMode="tail">{it?.Address}</DataTable.Cell>
    </DataTable.Row>
    <TouchableHighlight
                  style={{ backgroundColor: '#ebb134', borderRadius: 10,  padding: 3, marginLeft:120, marginBottom:10,width: '25%' }}
                  onPress={() => setExpandedItems((prevExpanded) => prevExpanded.filter((item) => item !== index))} underlayColor="transparent"
                >
                  <Text style={{ color: '#660066', fontSize: 16, marginLeft: 2 }}>View Less</Text>
                </TouchableHighlight>
              </>
            )}
            {!expandedItems.includes(index) && (
              <TouchableHighlight
                style={{ backgroundColor: '#ebb134', borderRadius: 10, marginLeft:120, marginBottom:10, marginTop:50, padding: 3, width: '25%' }} underlayColor="transparent"
                onPress={() => setExpandedItems((prevExpanded) => [...prevExpanded, index])}
              >
                <Text style={{ color: '#660066', fontSize: 16, marginLeft: 5 }}>View More</Text>
              </TouchableHighlight>
            )}

    </DataTable>
    </View>

))}


<View >

<ScrollView style={{width:700, height:90, marginBottom:40, marginTop:-20,  }} horizontal={true} underlayColor="transparent"  initialScrollIndex={-1}>

{selectedValue && (
        <View style={styles.paginationContainer}>
          {pageNumbers.map((page) => (
            <TouchableOpacity
              key={page}
              style={[
                styles.paginationItem,
                currentPage === page ? styles.paginationItemSelected : null,
              ]}
              onPress={() => goToPage(page)}
            >
              <Text style={styles.paginationText}>{page}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}


</ScrollView>
</View>

    <TouchableOpacity style={{marginBottom:25, marginTop:-60,}} onPress={handleLogout} >
      <Text style={{ color:'#660066',fontWeight:'bold', textAlign:'center',fontSize:20, marginLeft:5}}>LogOut</Text>
      </TouchableOpacity>
</View></ScrollView>
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
    marginRight:212,
    marginTop: 20,
    marginBottom:30,   
},
   logo: {
    width: "230%", 
    height: 240, 
    marginLeft:6,   
},

dataTable: {    
  width:"95%",
  marginHorizontal:10,
  backgroundColor:'#ffeb99',
  borderWidth:2,
  borderRadius:5,
  marginBottom:40,
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
  
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },

  paginationItem: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#9c9a9a',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  paginationItemSelected: {
    backgroundColor: '#ebb134',
  },

  paginationText: {
    color: 'white',
  },
  
  
   
});

export default Member;
