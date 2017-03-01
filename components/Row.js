import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    flexDirection: 'row'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const LoadingIndicator = ({ loading }) => (
  loading ? (
    <View style={ styles.loading }>
      <ActivityIndicator
        animating={ true }
        style={[ styles.loading ]}
        size="large"
      />
    </View>
  ) : null
)

class Row extends Component {
  render(){
    return (
      <TouchableOpacity onPress={()=>Actions.employee_detail({id: this.props.user.id, title: this.props.user.firstname })}>
        <View style={styles.container}>
          <Image source={require('../images/logo.png')} style={styles.photo} />
          <Text style={styles.text}>
            {this.props.user.firstname}
          </Text>
       </View>
     </TouchableOpacity>
    );
  }
}
export default Row;
