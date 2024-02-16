import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, DrawerLayoutAndroid, Image, Alert, Text, StyleSheet, Button, TextInput, ActivityIndicator , TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CheckBox } from 'react-native-elements';

  const Register = () => {

    const [slno, setSlno] = useState('');
    const [slnoError, setSlnoError] = useState('');
    const [regno, setRegno] = useState('');
    const [regnoError, setRegnoError] = useState('');
    const [rglsino, setRglsino] = useState('');
    const [rglsinoError, setRglsinoError] = useState('');
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [dob, setDOB] = useState(null);
    const [stsDt, setStsDt] = useState(null);
    const [stsDtError, setStsDtError] = useState('');
    const [stsType, setStsType] = useState('');
    const [stsTypeError, setStsTypeError] = useState('');
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
      if (!title) {
        setTitleError('Title is required');
        
        isValid = false;
      } else {
        setTitleError('');
      } 
      if (!name) {
        setNameError('Name is required');
        
        isValid = false;
      } else {
        setNameError('');
      } 
      if (!password) {
        setPasswordError('Password is required');
        
        isValid = false;
      } else {
        setPasswordError('');
      } 
      
      if (!stsDt) {
        setStsDtError('Sts Date is required');
        
        isValid = false;
      } else {
        setStsDtError('');
      } 
      if (!stsType) {
        setStsTypeError('Sts Type is required');
        
        isValid = false;
      } else {
        setStsTypeError('');
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
        setEmailError('Email is required');
        
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
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slno : slno,
          regno: regno,
          rglsino: rglsino,
          title: title,
          name: name,
          password: password,
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
      .then((response) => response.json())
      
      .then((responseJson) => {
        Alert.alert(responseJson); 
        
        setSlno(null);
        setRegno(null);
        setRglsino(null);
        setTitle(null);
        setName(null);
        setPassword(null);
        setStsType(null);
        setMaster(null);
        setRgRank(null);
        setGRank(null);
        setMobile(null);
        setEmail(null);
        setAddress(null);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('error: Something went wrong. Please try again.');
        
      });
    }
    };

 const dropdown1 = [
      { label: 'Comp.', value: 'Comp.' },
      { label: 'E.Comp.', value: 'E.Comp.' },
                
      ];

 const dropdown2 = [
          { label: 'EX', value: 'EX' },
          { label: 'FM', value: 'FM' },
                    
          ];

   const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
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
    
      const handleConfirm1 = (date1) => {
        const originalDate1 = date1.toISOString().split('T')[0];
  
      const [year, month, day] = originalDate1.split('-');
      const formattedDate1 = `${day}-${month}-${year}`;
  
         setStsDt(formattedDate1);
        hideDatePicker1();
      };
       




      const handleDegreeChange = (degree) => {
        const updatedDegrees = [...memberDegrees];
        const index = updatedDegrees.indexOf(degree);
    
        if (index === -1) {
          updatedDegrees.push(degree);
        } else {
          updatedDegrees.splice(index, 1);
        }
    
        setMemberDegrees(updatedDegrees);
        
      };
    
      const renderCheckbox = (degree) => {
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
    
      const degreeOptions = ['Craft', 'Chapter', 'Mark', 'RAM', 'Conclave'];
    

      
        
  return (
    
    <SafeAreaView style={styles.scroll}>
      <ScrollView>        
      
      <View style={styles.container}>
      <Text style={{ color:"#660066", fontWeight:'bold', textAlign:'center',fontSize:25, marginTop:20, marginBottom:20}}>REGISTER FORM</Text>

      

      <View style={styles.inputView}>
    <TextInput  
      placeholder="Serial Number"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setSlno(text); setSlnoError(""); }}
      
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{slnoError}</Text>

  <View style={styles.inputView}>
    <TextInput  
      placeholder="Register Number"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setRegno(text); setRegnoError(""); }}      
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{regnoError}</Text>
      
  <View style={styles.inputView}>
    <TextInput  
      placeholder="Full Name"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setName(text); setNameError(""); }}  
         />
  </View>

  <Text style={{color:'red', marginBottom:15,}}>{nameError}</Text>

  <View style={styles.inputView}>
    <TextInput  
      placeholder="Member Password"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setPassword(text); setPasswordError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{passwordError}</Text>
  <View style={styles.inputView}>
    <TextInput  
      placeholder="Mobile Number"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setMobile(text); setMobileError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{mobileError}</Text>
  <View style={styles.inputView}>
    <TextInput  
      placeholder="Email Address"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setEmail(text); setEmailError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{emailError}</Text>
  <View style={styles.inputView}>
    <TextInput  
      placeholder="Address Details"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setAddress(text); setAddressError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{AddressError}</Text>

 
  <View style={styles.inputView}>
    <TextInput  
      placeholder="RGLSI Id"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setRglsino(text); setRglsinoError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{rglsinoError}</Text>
  <Dropdown
      style={styles.dropdown}
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
 
 <TouchableOpacity onPress={showDatePicker}>
   <Text style={styles.datePickerText}>{dob ? dob : 'Select DOB'}</Text>
 </TouchableOpacity>
 <DateTimePickerModal
   isVisible={isDatePickerVisible}
   mode="date"
   onConfirm={handleConfirm}
   onCancel={hideDatePicker}
 />
</View>

<View style={styles.inputView1}> 
 
 <TouchableOpacity onPress={showDatePicker1}>
   <Text style={styles.datePickerText}>{stsDt ? stsDt : 'Select STS Date'}</Text>
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

  
  <View style={styles.inputView}>
    <TextInput  
      placeholder="Master"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setMaster(text); setMasterError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{masterError}</Text>
  <View style={styles.inputView}>
    <TextInput  
      placeholder="R.G. Rank"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setRgRank(text); setRgRankError(""); }}  
    />
  </View>
  <Text style={{color:'red', marginBottom:15,}}>{rgRankError}</Text>
  <View style={styles.inputView}>
    <TextInput  
      placeholder="G. Rank"
      style={styles.inputText}
      placeholderTextColor="#000000"
      onChangeText={(text) => {setGRank(text); setGRankError(""); }}  
    />
    </View>
    <Text style={{color:'red', marginBottom:15,}}>{gRankError}</Text>


<View style={styles.container1}>
      <Text style={styles.heading}>Member Degree:</Text>
      <View style={styles.degreeOptionsContainer}>
        {degreeOptions.map((degree) => renderCheckbox(degree))}
      </View>
    </View>  
   

   <TouchableHighlight style={styles.button} underlayColor="lightblue" onPress={saveDetails}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableHighlight>
  </View>
        </ScrollView>
        </SafeAreaView>    
    
                
      
      
  )
}

const styles = StyleSheet.create({
  
  scroll:{
    marginHorizontal: 6,
   },
   inputText: {
    color: 'black',
  },

   container: {
    flex: 1,
    marginBottom:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffcc',
  },
  inputView: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    
  },

  inputView1: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black', // Set text color to black
    marginBottom: 50,
    paddingHorizontal: 10,
    
  },
  datePickerText: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color:"black",
    borderColor: '#ccc',    
  },

  dropdown: {
    margin: 16,
    height: 30,
    width:300,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRadius: 5, color: "red",
    marginTop:-20,
    marginBottom:40,

  },
  
  placeholderStyle: {
    fontSize: 16,
    color: "#000000",

  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000000",
  },
  
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: '#660066',
    borderRadius: 10,
    padding: 10,
    width:"80%",
    marginTop:30,
    marginBottom:20,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    margin:5,
  },

 
  container1: {
    marginTop: -90,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:70,
    marginBottom: 10,
    marginLeft:-30,
    
  },
  degreeOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',       
    justifyContent: 'space-around',  
    marginLeft:50,
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
