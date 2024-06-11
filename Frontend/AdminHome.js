import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import axios from 'axios';
import { Table, Row } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminHome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [detailsData, setDetailsData] = useState(null);
  


  const tableHead = ['ID', 'Rglsi_id', 'Member_Name', 'Degree', 'Default_Year', 'Amount', 'Status', 'Arrears', 'Arrear_status', 'History', 'Action', 'Arrear_History'];
  const widthArr = Array(tableHead.length).fill(150);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://orphean-misleads.000webhostapp.com/Lodge/subscription.php');
      setData(response.data);
      console.log('Subscription data:', response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetailsData = async (member_name) => {
    console.log('Fetching details for member:', member_name);
    setIsLoading(true);
    try {
      const response = await axios.get(`https://orphean-misleads.000webhostapp.com/Lodge/Payment_View.php?member_name=${member_name}`);
      setDetailsData(response.data);

      console.log('Details fetched:', response.data);
    
    } catch (error) {
      console.log('Error fetching details:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderElement = (rowData) => (
    <TouchableOpacity onPress={() => handlePress(rowData)}>
      <View style={styles.btn}>
        <Icon name="eye" size={22} style={styles.btnText} />
      </View>
    </TouchableOpacity>
  );

  const handlePress = async (rowData) => {
    setSelectedRowData(rowData);
    console.log('Selected row data:', rowData);

    await fetchDetailsData(rowData.member_name); // Ensure 'Member_Name' matches the key from your data
    setModalVisible(true);
    
  };

  const rowProps = {
    data: tableHead,
    widthArr: widthArr,
    style: styles.headerRow,
    textStyle: styles.headerText1,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={28} style={styles.icon} />
        <Text style={styles.headerText}>ADMIN DETAILS</Text>
        <Icon name="logout" size={28} style={styles.icon} onPress={navigation.goBack} />
      </View>
      
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <Table borderStyle={styles.tableBorder}>
            <Row {...rowProps} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={styles.tableBorder}>
              {data.map((rowData, index) => (
                <Row
                  key={index}
                  data={Object.values(rowData).concat([renderElement(rowData)])}
                  widthArr={widthArr}
                  style={[styles.row, index % 2 && styles.alternateRow]}
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
          <Text style={styles.loadingText}>Please wait, loading...</Text>
        </View>
      )}

      

{detailsData &&  detailsData.map((item) => (
  <Modal
    key={item.member_name} // Set key based on data.id
    animationType="slide"
    transparent
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle1}>Details</Text>
        {item  ? (
          <>
            <Text style={styles.modalTitle}>ID: {item.id}</Text>
            <Text style={styles.modalTitle}>Name: {item.member_name}</Text>
            <Text style={styles.modalTitle}>Amount: {item.Amount}</Text>
            <Text style={styles.modalTitle}>Date: {item.Date}</Text>
            <Text style={styles.modalTitle}>Transaction_Method: {item.Transaction_Method}</Text>
            <Text style={styles.modalTitle}>Transaction_ID: {item.Transaction_ID}</Text>
          </>
        ) : (
          <Text style={styles.modalTitle}>No details available</Text>
        )}
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <View style={styles.btnClose}>
            <Text style={styles.btnText}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
))}




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#660066',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#ffffff',
    marginLeft: 40,
    marginTop: 10,
  },
  headerText1: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ffffff',
    marginLeft: 35,
  },
  icon: {
    color: '#ffffff',
    marginTop: 8,
  },
  tableContainer: {
    paddingTop: 50,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  headerRow: {
    height: 60,
    backgroundColor: '#660066',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#E7E6E1',
  },
  alternateRow: {
    backgroundColor: '#ffffff',
  },
  btn: {
    width: 60,
    height: 30,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  btnText: {
    color: '#fff',
  },
  btnClose: {
    width: 100,
    height: 40,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft:70,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 12,
    color: 'black',
    alignItems:'center',
  },
  modalTitle1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:80,
    color: '#660066',
    alignItems:'center',
  },
});

export default AdminHome;
