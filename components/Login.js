import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableHighlight, Alert, AsyncStorage} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Tcomb from "tcomb-form-native";
import {login} from "../services/base.js"

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

const Form = Tcomb.form.Form;

// here we are: define your domain model
var Person = Tcomb.struct({
  username: Tcomb.String,
  password: Tcomb.String,
  rememberMe: Tcomb.Boolean
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

class Login extends Component {
  constructor(){
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')}/>
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
      </View>
    );
  }

  onSubmit(){
    let value = this.refs.form.getValue();
    if(value){
      login(value).then((res) => {
        if(res.msg == "success"){
          AsyncStorage.setItem('userToken', res.access_token);
          AsyncStorage.setItem('currentuser', JSON.stringify({username: res.username, email: res.email}));
          Actions.employees()
        }else{
          Alert.alert(
            'Warning',
            "Username or Password invalid")
        }
      })
    }
  }
}
export default Login;
