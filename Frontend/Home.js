import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Alert, ActivityIndicator, Modal, TextInput, Image } from 'react-native';
import axios from 'axios';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import FlashMessage from 'react-native-flash-message';
const SERVER_URL = 'https://orphean-misleads.000webhostapp.com/Lodge';

const Home = ({ navigation, route }) => {

  const {username}= route.params

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [Visiblepayment, setVisiblepayment] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [member_name, setMemberName] = useState('');
  const [Amount, setAmount] = useState('');
  const [Date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Transaction_Method, setTransaction] = useState('');
  const [Transaction_ID, setTransactionid] = useState('');
  const [Photo, setPhoto] = useState(null);
  

  const placeholderImage = require('./img/placeholder.png');  

  
  const ChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'Photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        setPhoto(response.assets[0]); // Assuming setPhoto is a function that sets the selected photo
      }
    });
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };
 

  const tableHead = ['ID', 'Rglsi_id', 'Member_Name', 'Degree', 'Default_Year', 'Amount', 'Status', 'Arrears', 'Arrear_status', 'Actions'];
  const widthArr = Array(tableHead.length).fill(140);
  const rowProps = {data: tableHead, widthArr: widthArr, style: styles.headerRow, textStyle: styles.headerText1};

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching data for username:', username);
      const response = await axios.get('https://orphean-misleads.000webhostapp.com/Lodge/subscription.php');
      const filteredData = response.data.filter(item => item.member_name === username);
      console.log('Filtered data:', filteredData);
      setData(filteredData);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToMember = () => {
    navigation.navigate('Member');
  };

  const handlePress = (rowData) => {
    setSelectedRowData(rowData);
    setModalVisible(true);
  };

  const renderElement = (rowData) => (
    <TouchableOpacity onPress={() => handlePress(rowData)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>View</Text>
      </View>
    </TouchableOpacity>
  );

  const handleClick = ()=> {
    setVisible (true);
    setModalVisible(false);
    
  };

  const handleclose = () => {
    setVisiblepayment(false);
    setModalVisible(false);
    setVisible (false);
  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const originalDate = date.toISOString().split('T')[0];
    const [year, month, day] = originalDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    setDate(formattedDate);
    hideDatePicker();
  };

  const dropdown = [
    {label: 'By Cash', value: 'By Cash'},
    {label: 'UPI', value: 'UPI'},
    {label: 'Card', value: 'Card'}, ];



const handlePayModel = async () => {
  const formData = new FormData();
  formData.append('member_name', member_name);
  formData.append('Amount', Amount);
  formData.append('Date', Date);
  formData.append('Transaction_Method', Transaction_Method);
  formData.append('Transaction_ID', Transaction_ID);
  formData.append('Photo', {
    uri: Photo.uri,
    type: Photo.type,
    name: Photo.fileName,
  });

  try {
    const response = await axios.post(`${SERVER_URL}/photo_upload.php`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const data = response.data;
    if (data.success) {
      console.log(data.message);
      Alert.alert('Payment details succesfully')
      setMemberName(null);
      setAmount(null);
      setDate(null);
      setTransaction(null);
      setTransactionid(null);
        setPhoto(null);
          } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Payment details unsuccesfully', error)
      }};


  
 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={28} style={styles.icon} />
        <Text style={styles.headerText}>SUBSCRIPTION DETAILS</Text>
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

      <TouchableOpacity activeOpacity={0.4} onPress={navigateToMember}>
        <Text style={styles.memberListText}>Member List</Text>
      </TouchableOpacity>

      {selectedRowData && (
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle1}>Details</Text>
              <Text style={styles.modalTitle}>Name: {selectedRowData.member_name}</Text>
              <Text style={styles.modalTitle}>Degree: {selectedRowData.degree}</Text>
              <Text style={styles.modalTitle}>Default Year: {selectedRowData.year}</Text>
              <Text style={styles.modalTitle}>Amount: {selectedRowData.amount}</Text>
              <Text style={styles.modalTitle}>Status: {selectedRowData.c_status}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>

              {selectedRowData.c_status == 'pending' && (
  <TouchableOpacity style={[styles.btnAction, styles.btnPayNow, { marginRight: 10 }]} onPress={() => handleClick()}>
    <Text style={styles.btnText}>Pay now</Text>
  </TouchableOpacity>
)}

{selectedRowData.c_status == 'paid' && (
  <TouchableOpacity style={[styles.btnAction, styles.btnPayNow, { marginRight: 10 }]}>
    <Text style={styles.btnText}>Download</Text>
  </TouchableOpacity>
)}


  <TouchableOpacity onPress={() => setModalVisible(false)}>
    <View style={styles.btnClose}>
      <Text style={styles.btnText}>Close</Text>
    </View>
  </TouchableOpacity>

</View>

            </View>
          </View>
        </Modal>
      )}




{Visible && (
        <Modal
          animationType="slide"
          transparent ={false}
          visible={Visible}
          onRequestClose={() => setVisible(false)}>
           <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Icon name="close" size={28} style={styles.icon1} onPress={()=>setVisible(false)} />
              <Text style={styles.modalTitle1}>Add Payment Details</Text>
              
        <View style={styles.inputView}>
            <TextInput
              placeholder="Member Name"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setMemberName(text);
                }}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Amount Paid"
              keyboardType='phone-pad'
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setAmount(text);
                }}
            />
          </View>
          <View style={styles.inputView1}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.datePickerText}>
                {Date ? Date : 'Select Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>          
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={dropdown}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Transaction Type"
        searchPlaceholder="Search..."
        value={Transaction_Method}
        onChange={item => {
          setTransaction(item.value);
        }}
      />

<View style={styles.inputView}>
            <TextInput
              placeholder="Transaction ID"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setTransactionid(text);
                }}
            />
          </View>
       
          

          <View style={styles.imageContainer}>
        {Photo ? (
          <Image source={{ uri: Photo.uri }} style={styles.image} />
        ) : (
          <Image source={placeholderImage} style={styles.placeholderImage} />
        )}
      </View>

  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>

    <TouchableOpacity onPress={() => ChoosePhoto()}>
    <View style={[styles.btnClose, styles.btnPayNow, { marginRight: 20 }]}>
      <Text style={styles.btnText}>Select Photo</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleRemovePhoto()}>
    <View style={[styles.btnAction, styles.btnPayNow1, { marginRight: 20 }]}>
      <Text style={styles.btnText}>Remove Photo</Text>
    </View>
  </TouchableOpacity>

  
  </View>

  <FlashMessage position="center" />

  <TouchableOpacity onPress={() => handlePayModel()}>
    <View style={styles.btnClose}>
      <Text style={styles.btnText}>Submit</Text>
    </View>
  </TouchableOpacity>
  
  
</View>
 </View>
 </ScrollView>
  </Modal>
      )}


{Visiblepayment && (
        <Modal
          animationType="slide"
          
          visible={Visiblepayment}
          onRequestClose={() => setVisiblepayment(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle1}>Payment Request Successfully Sent</Text>

  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>  
  
  <TouchableOpacity onPress={() => handleclose()}>
    <View style={styles.btnClose}>
      <Text style={styles.btnText}>Close</Text>
    </View>
  </TouchableOpacity>
  </View>

</View>
 </View>

  </Modal>
      )}






      
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
    marginTop:10,
     
  },
  headerText1: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#0000',
    marginLeft: 40, 
    marginTop:10,
     
  },
  icon: {
    color: '#ffffff',
    marginTop: 8,
  },

  icon1: {
    color: '#000',
    marginLeft:210,
    marginTop:-20,
  },
  tableContainer: {
    paddingTop: 50,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
    padding: 10,
    paddingTop: 10,
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
  headerText1: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ffffff',
    marginLeft:35 
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

  btnAction: {
    width: 100,
    height: 40,
    backgroundColor: '#78B7BB',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnPayNow: {
    backgroundColor: '#28a745', // Green color for Pay Now button
  },
  btnPayNow1: {
    backgroundColor: '#ff0000', 
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
  memberListText: {
    color: '#660066',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
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
    alignItems: 'center',
    marginBottom:80,
    marginTop:40,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10, 
    color: 'black'
  },  
modalTitle1: {
  fontSize: 25,
  fontWeight:'bold',
  marginBottom: 10,
  textAlign: 'center',
  color: '#660066'
}
,
  
  btnClose: {
    width: 100,
    height: 40,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,    
  },
  inputText: {
    color: 'black',
  },
  inputView: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    marginBottom: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  inputView1: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black', // Set text color to black
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
    borderColor: '#ccc',
  },

  container1: {
    
    padding: 10,
  },
  dropdown: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  imageContainer: {
    width: 250,
    height: 200,
    marginTop:20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  scrollViewContent: {
    paddingBottom: 30, // Add some padding to the bottom for better spacing
  },
});

export default Home;
