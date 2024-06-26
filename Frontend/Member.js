import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ActivityIndicator, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { Table, TableWrapper, Row } from 'react-native-table-component';

const { width } = Dimensions.get('window');

const Member = ({ navigation, route }) => {
    const {username}= route.params
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const tableHead = ['ID', 'Register_no', 'Rglsi_id', 'Title', 'Member_Name', 'DOB', 'Degree', 'Sts_dt', 'Sts_type', 'Master', 'R_g_rank', 'G_rank', 'Mobile', 'Email', 'Address', 'Username', 'Password'];
    const widthArr = Array(tableHead.length).fill(140); 

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
        const search = new RegExp(searchTerm, 'i');
        const filtered = data.filter(item => search.test(item.member_name));
        setData(filtered);
    }, [searchTerm]);

    const navigateToSubscription = () => {
        navigation.navigate('Home');
    };


    return (
        <View style={styles.container}>
          
            <View style={styles.header}>
            <Icon name="chevron-left" size={28} style={{ color: '#ffffff', marginTop:10, marginLeft:20 }} onPress={navigateToSubscription} />
            <Text style={styles.headerText}>MEMBER DETAILS</Text>
            <Icon name="logout" size={28} style={{ color: '#ffffff', marginTop:-25, marginLeft:350 }} onPress={navigation.goBack}/>
            </View>
            <View style={styles.searchInputContainer}>
                <Icon name="magnify" style={styles.searchIcon} size={25} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#000"
                    onChangeText={setSearchTerm}
                />
            </View>

            
                <ScrollView horizontal={true}>
                    <View >
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9', padding:10, paddingTop:10 }}>
                            <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text1} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {data.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={Object.values(rowData)}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}
                                        textStyle={styles.text}
                                    />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
                {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#660066" />
          <Text style={[styles.loadingText, { color: 'white' }]}>Please wait, loading...</Text>
        </View>
      )}

            </View>
        
    );
};

const styles = StyleSheet.create({
   
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#660066',
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ffffff',
        marginLeft:120,
        marginTop:-25
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        marginTop:20,
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
    container: { flex: 1, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#660066' },
   
    text: { textAlign: 'center', fontWeight: 'bold', color: '#000', fontStyle:'normal'},
    text1: { textAlign: 'center', color: '#fff', fontWeight:'bold', fontStyle:'normal'},
    dataWrapper: { marginTop: -1 },
    row: { flexDirection: 'row',height: 90, backgroundColor: '#E7E6E1' },
    column: {flex: 2},
});

export default Member;
