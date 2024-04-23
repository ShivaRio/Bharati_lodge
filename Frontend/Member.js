import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ActivityIndicator, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('window');

const Member = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    


    
    

    useEffect(() => {
        
        fetchMemberData();
    }, []);


    const fetchMemberData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get('https://orphean-misleads.000webhostapp.com/Lodge/View.php');
          setData(response.data);                
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoading(false);
      }
  };

    useEffect(() => {
  
      if (searchTerm == ""){
        fetchMemberData();
      }
      const search = new RegExp(searchTerm, 'i');
      const filtered = data.filter((item) => {
        return search.test(item.member_name);
      });
      setData(filtered);
    }, [searchTerm]);



    const renderRow = ({ item, index }) => (
        <DataTable.Row>
            <DataTable.Cell style={styles.cell}>{item.id}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{item.register_no}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{item.rglsi_id}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{item.title}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.member_name}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.dob}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.degree}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.sts_dt}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.sts_type}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.master}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.r_g_rank}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.g_rank}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.mobile}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.email}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.address}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.username}</DataTable.Cell>
        <DataTable.Cell style={styles.cell}>{item.password}</DataTable.Cell>        
        </DataTable.Row>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="chevron-left" size={25} style={{ color: '#ffffff' }} onPress={navigation.goBack} />
                <Text style={styles.headerText}>MEMBER DETAILS</Text>
                <Icon name="sort-variant" size={28} style={{ color: '#ffffff' }} />
            </View>
            <Image source={require('./img/img4.jpg')} resizeMode="contain" style={styles.image} />
            <View style={styles.searchInputContainer}>
                <Icon name="magnify" style={styles.searchIcon} size={25} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#000"
                    onChangeText={(text) => {
                      setSearchTerm(text);  
                          
                    }} 
                />
            </View>
            <ScrollView horizontal showsVerticalScrollIndicator>
                <DataTable style={styles.dataTable}>
                <DataTable.Header style={{backgroundColor:'#660066'}}>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff'}} >ID</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Register_no</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Rglsi_id</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Title</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Member name</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>DOB</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Degree</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Sts_dt</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Sts_type</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Master</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>R_g_rank</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>G_rank</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Mobile</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Email</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Address</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Username</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:15, color:'#ffffff', marginLeft:20}}>Password</DataTable.Title>
        </DataTable.Header>
                    <FlatList
                        data={data}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => item.register_no.toString() + index}
                    />
                </DataTable>
            </ScrollView>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#660066" />
                    <Text style={styles.loadingText}>Please wait, loading...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffcc',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 18,
        backgroundColor: '#660066',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ffffff',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    dataTable: {
        backgroundColor: '#ffeb99',
        borderWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 20,
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: 20,
        borderWidth: 1,
    },
    searchIcon: {
        color: '#000',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        color: '#000',
        marginLeft: 15,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
    },
});

export default Member;
