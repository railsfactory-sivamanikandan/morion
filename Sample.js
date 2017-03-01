import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Login from './components/Login'
import Employees from './components/Employees'
import EmployeeDetail from './components/EmployeeDetail'

class Sample extends Component {
  render() {
    return(<Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login" initial={true}/>
        <Scene key="employees" component={Employees} title="Employees" initial={false} hideBackImage onBack={() => null}/>
        <Scene key="employee_detail" component={EmployeeDetail} title="EmployeeDetail"/>
      </Scene>
    </Router>)
  }
}
export default Sample;
