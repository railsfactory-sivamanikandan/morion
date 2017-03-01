import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage} from "react-native";
import {getEmployees} from "../services/base.js"
import Communications from 'react-native-communications';

const styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 16,
    flexDirection: 'row'
  },
  photo: {
    marginTop: 70
  },
});

class EmployeeDetail extends Component {
  constructor(){
    super()
    this.state =  {
      employee: ''
    }
  }

  render(){
    return(
      <View>
        <View style={{marginLeft: 10,alignItems: 'center',marginBottom: 10}}>
          <Image source={require('../images/logo.png')} style={styles.photo} />
        </View>
        <View>
          <Text style={styles.text}>
            Emp Code: {this.state.employee.emp_code}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Name: {this.state.employee.firstname}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Designation:{this.state.employee.designation_name}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            DOJ:{this.state.employee.date_of_joining}
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => Communications.phonecall(this.state.employee.phone_number, true)}>
            <Text style={styles.text}>
              Mobile:{this.state.employee.phone_number}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  componentDidMount(){
    AsyncStorage.getItem("userToken").then((token) => {
      getEmployees("/employees/"+this.props.id, token).then((resp) => {
        this.setState({employee: resp.user})
      })
    }).done();
  }

}

export default EmployeeDetail;
