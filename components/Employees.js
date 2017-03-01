import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ListView, TextInput, AsyncStorage, RefreshControl} from "react-native";
import {getEmployees, searchEmployees} from "../services/base.js"
import Row from './Row';

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'grey'
  }

});

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Employees extends Component {
  constructor(){
    super()
    this.state =  {
      employees: [],
      ds: ds,
      searchText: '',
      token: '',
      pageNo: 1,
      hasMoreItem: true
    }
  }
  render(){
    return (
      <View>
        <TextInput placeholder='Search'
          style={styles.searchBar}
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}/>
        <ListView
          enableEmptySections={true}
          automaticallyAdjustContentInsets={ false }
          dataSource={this.state.ds}
          renderRow={(data) => <Row user={data} />}
          refreshControl={
          <RefreshControl
            refreshing={ false }
            onRefresh={ () => this.onRefresh() }
          />
        }
          onEndReached={ () => this.onEndReached() }
        />
      </View>
    );
  }

  componentDidMount(){
    AsyncStorage.getItem("userToken").then((token) => {
      this.setState({token: token}, () => this.loadMore());
    }).done();
  }

  onRefresh(){
    this.setState({pageNo: 1}, () => this.loadMore())
  }

  loadMore(){
    getEmployees("/employees", this.state.token, this.state.pageNo).then((resp) => {
      const employees = this.state.pageNo === 1 ? resp.users : [ ...this.state.employees, ...resp.users ]
      this.setState({employees: employees,
        ds: this.state.ds.cloneWithRows(employees), pageNo: this.state.pageNo + 1,
        hasMoreItem: resp.users ? resp.users.length == 10 : false})
    })
  }

  onEndReached(){
    if(this.state.hasMoreItem){
      this.loadMore()
    }
  }

  setSearchText(event){
    let searchText = event.nativeEvent.text;
    this.setState({searchText: searchText})
    if(searchText.length >= 3){
      searchEmployees(searchText, this.state.token).then((resp) => {
        this.setState({ds: ds.cloneWithRows(resp.result),hasMoreItem: false})
      })
    }else{
      this.setState({pageNo: 1, hasMoreItem: true}, () => this.loadMore())
    }
  }
}
export default Employees;
