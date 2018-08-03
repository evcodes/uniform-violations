import React from 'react';
import { StyleSheet, Text, View, Button,Alert,TextInput } from 'react-native';
import { LinearGradient } from 'expo';
import data from './students.json';
import call from 'react-native-phone-call'
// import { watchFile } from 'fs';


// import firebase from 'firebase';

export default class App extends React.Component {
  
 
  constructor(){
    super();
    this.state={
      studentId: '',
      lastName: '',
      firstName: '',
      grade: '',
      phoneNumber: '',
      uniformViolations:'',
      found: false,
    }
  } 
  
  clear(){
    this.setState({studentId: ''})
        this.setState({firstName: ''})
        this.setState({lastName: ''})
        this.setState({phoneNumber: ''})
        this.setState({parentName: ''})
        this.setState({uniformViolations: ''})
        this.setState({found:false})
  }

  searchStudent(idNum){

    if(idNum == ''){
      this.clear()
    }
    var student = null;
    

    for (var i = 0; i<data.length; i++){
      if(data[i].studentID == idNum){
        student = data[i]
        this.setState({studentId: student.studentID})
        this.setState({firstName: student.firstName})
        this.setState({lastName: student.lastName})
        this.setState({phoneNumber: student.phoneNumber})
        this.setState({parentName: student.parentName})
        this.setState({uniformViolations: student.uniformViolations})
        this.setState({found:true})
        
        return
      }
    }
    this.setState({found:false})

  }

  incrementViolation(){
    var uniCountV = this.state.uniformViolations;
    uniCountV++;
    this.setState({uniformViolations:uniCountV})
  }

  decrementViolation(){
    var uniCountV = this.state.uniformViolations;
    if (uniCountV == 0){
      alert('Error: cannot decrement below 0');
    }else{
      uniCountV--;
    }
    this.setState({uniformViolations:uniCountV})
  }
  callNumber(){
    
  
    const args = {
      number: this.state.phoneNumber, // String value with the number to call
      prompt: false
    }
   call(args).catch(console.error)
  }

  reset(){

  }
  render() {
    
    return (
      
      <View style={styles.container}>
      <LinearGradient
          colors={['#56ab2f', '#a8e063']}
          style={styles.gradient}>

        <Text style = {styles.header}>Mater Uniform Violations</Text>
        <TextInput
            style={{
              height: 40, 
              borderColor: 'gold', 
              width:150,
              backgroundColor:'white',
              marginBottom:10,
              color:'black',
              borderRadius:5,
              borderWidth: 1,
              textAlign:'center'}}
              keyboardType = "phone-pad"
              placeholder="Student ID"
              returnKeyType='done'
              onChangeText = {(text) =>
                
                {
                  this.clear()
                  this.searchStudent(text)
                  this.setState(
                    (previousState) => {
                      return {
                        studentID:text
                      }
                    }
                  );
                }
              }
              value={this.state.studentID}
              
        />
        
        <Text style = {styles.label}>Student name: {this.state.firstName} {this.state.lastName} </Text>
        <Text style = {styles.label}> ID: Number: {this.state.studentId}</Text>
        <Text style = {styles.label}>Uniform Violations: {this.state.uniformViolations}</Text>
        <Text style = {styles.label}>Parent name: {this.state.parentName}</Text>
        <Text style = {styles.label}>Contact information: {this.state.phoneNumber}</Text>
        
        <View style={{flex: -2, flexDirection: 'row'}} >
        <Button disabled = {!this.state.found} onPress = {()=>{this.incrementViolation()}}title ="Increment Violation"/>
        <Button disabled = {!this.state.found} onPress = {()=>{this.decrementViolation()}}title ="Undo"/>
        </View>
        <Button disabled = {!this.state.found} onPress = {()=> {this.callNumber()}} title = "Call Parent"/>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  gradient:{
  justifyContent:'center',
  alignItems: 'center',
    height: '100%',
    width:'100%',
  },
  label:{
    color:'white',
    fontSize:15,
  },
  header:{
    fontSize:32,
    marginBottom:20,
    color:'white'
  },
});
