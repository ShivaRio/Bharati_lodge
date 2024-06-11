import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions,
  Image,
  Alert,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  
  ScrollView,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CheckBox} from 'react-native-elements';
const {width} = Dimensions.get('screen');

const Register = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [slno, setSlno] = useState('');
  const [slnoError, setSlnoError] = useState('');
  const [regno, setRegno] = useState('');
  const [regnoError, setRegnoError] = useState('');
  const [rglsino, setRglsino] = useState('');
  const [rglsinoError, setRglsinoError] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dob, setDOB] = useState(null);
  const [stsDt, setStsDt] = useState(null);
  const [stsType, setStsType] = useState('');
  const [master, setMaster] = useState('');
  const [masterError, setMasterError] = useState('');
  const [rgRank, setRgRank] = useState('');
  const [rgRankError, setRgRankError] = useState('');
  const [gRank, setGRank] = useState('');
  const [gRankError, setGRankError] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [Address, setAddress] = useState('');
  const [AddressError, setAddressError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [memberDegrees, setMemberDegrees] = useState('');


  const validateForm = () => {
    let isValid = true;

    if (!slno) {
      setSlnoError('Serial number is required');

      isValid = false;
    } else {
      setSlnoError('');
    }

    if (!regno) {
      setRegnoError('Register number is required');

      isValid = false;
    } else {
      setRegnoError('');
    }

    if (!rglsino) {
      setRglsinoError('Registration ID is required');

      isValid = false;
    } else {
      setRglsinoError('');
    }

    if (!name) {
      setNameError('Name is required');

      isValid = false;
    } else {
      setNameError('');
    }

    if (!userName) {
      setUserNameError('Password is required');

      isValid = false;
    } else {
      setUserNameError('');
    }

    if (!password) {
      setPasswordError('Password is required');

      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!master) {
      setMasterError('Master is required');

      isValid = false;
    } else {
      setMasterError('');
    }
    if (!rgRank) {
      setRgRankError('Rg Rank is required');

      isValid = false;
    } else {
      setRgRankError('');
    }
    if (!gRank) {
      setGRankError('gRank is required');

      isValid = false;
    } else {
      setGRankError('');
    }
    if (!mobile) {
      setMobileError('Mobile number is required');

      isValid = false;
    } else {
      setMobileError('');
    }
    if (!email) {
      setEmailError('Email is required & at end of @anycom');

      isValid = false;
    } else {
      setEmailError('');
    }
    if (!Address) {
      setAddressError('Address is required');

      isValid = false;
    } else {
      setAddressError('');
    }

    return isValid;
  };

  

const saveDetails = () => {
  if (validateForm()) {
    
    fetch('https://orphean-misleads.000webhostapp.com/Lodge/Register.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slno: slno,
        regno: regno,
        rglsino: rglsino,
        title: title,
        name: name,
        password: password,
        userName: userName,
        dob: dob,
        stsDt: stsDt,
        stsType: stsType,
        master: master,
        rgRank: rgRank,
        gRank: gRank,
        mobile: mobile,
        email: email,
        Address: Address,
        memberDegrees: JSON.stringify(memberDegrees),
      })       
    })

    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseJson => {
      console.log('Response:', responseJson);
      
      if (responseJson) {
        
        
      } else {
        throw new Error('Invalid response from server');
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.error('Error registering user:', error);
      Alert.alert('Error: Register unsucessfully');
    })
  }
};



  const dropdown1 = [
    {label: 'Comp.', value: 'Comp.', color:'#000000'},
    {label: 'E.Comp.', value: 'E.Comp.'},
  ];

  const dropdown2 = [
    {label: 'EX', value: 'EX'},
    {label: 'FM', value: 'FM'},
  ];

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

    setDOB(formattedDate);
    hideDatePicker();
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date1 => {
    const originalDate1 = date1.toISOString().split('T')[0];

    const [year, month, day] = originalDate1.split('-');
    const formattedDate1 = `${day}-${month}-${year}`;

    setStsDt(formattedDate1);
    hideDatePicker1();
  };

  const degreeOptions = ['Craft', 'Chapter', 'Mark', 'RAM', 'Conclave'];

  const handleDegreeChange = degree => {
    const updatedDegrees = [...memberDegrees];
    const index = updatedDegrees.indexOf(degree);

    if (index === -1) {
      updatedDegrees.push(degree);
    } else {
      updatedDegrees.splice(index, 1);
    }

    setMemberDegrees(updatedDegrees);
  };

  const renderCheckbox = degree => {
    return (
      <View key={degree} style={styles.degree}>
        <CheckBox
          title={degree}
          checked={memberDegrees.includes(degree)}
          onPress={() => handleDegreeChange(degree)}
          checkedIcon={<View style={styles.circleChecked} />}
          uncheckedIcon={<View style={styles.circleUnchecked} />}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Icon
          name="chevron-left"
          size={25}
          style={{color: '#ffff'}}
          onPress={navigation.goBack}
        />
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#ffff'}}>
          REGISTER FORM
        </Text>
        <Icon name="sort-variant" size={28} style={{color: '#ffff'}} />
      </View>

      <ScrollView>
        <View style={styles.container}>

        <View style={styles.inputView}>
            <TextInput
              placeholder="Serial Number"
              style={styles.inputText}
              placeholderTextColor="#000000"
              keyboardType='phone-pad'
              onChangeText={text => {
                setSlno(text);
                setSlnoError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{slnoError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Register Number"
              style={styles.inputText}
              placeholderTextColor="#000000"
              keyboardType='phone-pad'
              onChangeText={text => {
                setRegno(text);
                setRegnoError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{regnoError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="RGLSI Id"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setRglsino(text);
                setRglsinoError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{rglsinoError}</Text>
         
          <Dropdown
            style={styles.dropdown1}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={dropdown1}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Title"
            searchPlaceholder="Search..."
            value={title}
            onChange={item => {
              setTitle(item.value);
            }}
          />

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Member Name"
              style={styles.inputText}
              placeholderTextColor="#000000"

              onChangeText={text => {
                setName(text);
                setNameError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{nameError}</Text>

          <View style={styles.inputView1}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.datePickerText}>
                {dob ? dob : 'Select DOB'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <View style={styles.container1}>
            <Text style={styles.heading}>Member Degree:</Text>
            <View style={styles.degreeOptionsContainer}>
              {degreeOptions.map(degree => renderCheckbox(degree))}
            </View>
          </View>

          <View style={styles.inputView1}>
            <TouchableOpacity onPress={showDatePicker1}>
              <Text style={styles.datePickerText}>
                {stsDt ? stsDt : 'Select STS Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="date"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
          </View>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={dropdown2}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="STS Type"
            searchPlaceholder="Search..."
            value={stsType}
            onChange={item => {
              setStsType(item.value);
            }}
          />

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Master"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setMaster(text);
                setMasterError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{masterError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="R.G. Rank"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setRgRank(text);
                setRgRankError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{rgRankError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="G. Rank"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setGRank(text);
                setGRankError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{gRankError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Mobile Number"
              style={styles.inputText}
              placeholderTextColor="#000000"
              keyboardType='phone-pad'
              onChangeText={text => {
                setMobile(text);
                setMobileError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{mobileError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Email Address"
              style={styles.inputText}
              placeholderTextColor="#000000"
              keyboardType='email-address'
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{emailError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Address Details"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setAddress(text);
                setAddressError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{AddressError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="UserName"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setUserName(text);
                setUserNameError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{userNameError}</Text>

          <View style={styles.inputView1}>
            <TextInput
              placeholder="Member Password"
              style={styles.inputText}
              placeholderTextColor="#000000"
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 15}}>{passwordError}</Text>
          </View>
        </ScrollView>
          <>      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ebb134" />
          <Text style={styles.loadingText}>Please wait, loading...</Text>
        </View>
      )}</>
<View style={{backgroundColor:'#660066',height:90,}}>
<TouchableHighlight
            style={styles.button}
            underlayColor="lightblue"
            onPress={saveDetails}>
            <Text style={styles.buttonText}>Submit Application</Text>
          </TouchableHighlight>
          </View>
        
        </View>   
          
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#660066',
  },
  
  
  inputText: {
    color: 'black',
  },

  container: {
    flex: 1,
    marginBottom: -30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color:'red',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    margin: 16,
    height: 30,
    width: 300,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRadius: 5,
    color: 'red',
    marginBottom: 30,
  },
  dropdown1: {
    margin: 16,
    height: 30,
    width: 300,
    borderBottomWidth: 0.5,
    borderRadius: 5,
    color: '#000000',
    marginBottom: 30,
    marginTop: -29,
    
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
    
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor:'#FFFFFF',
    color: '#000000',
    
  },
  button: {    
    backgroundColor: '#ffff',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',    
    width: '50%',
    height:50,
    marginTop:20,
    marginLeft:110,
  },

  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    margin: 5,
  },

  container1: {
    marginTop: -90,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 15,
    marginLeft: -30,
    color: '#000000',
  },
  degreeOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    marginLeft: 50,
  },

  degree: {
    marginRight: 50,
  },
  circleChecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#660066', // Color when checked
  },

  circleUnchecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#660066', // Border color when unchecked
    borderWidth: 1,
  },
});

export default Register;
