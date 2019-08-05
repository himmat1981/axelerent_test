/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, ActivityIndicator, Image, Text, FlatList } from "react-native";
import * as data from './states.json';
import  WeatherC  from './WeatherC';
const word = data.states;
import {  Row, Col, Button, } from 'native-base';
const MyWeather = () => (
  <WeatherC />
);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: true,
      dataSource: "",
      states: "",
      district: "",
      commodity: "",
      dataSourceMandi: "",
      showCommodity: false,
      districtData: [],
      dataSourceCommodity: []
    };
  }
  getCommodityData = async () => {
    try {
      // We have data!!
      let query = 'filters[state]=' + this.state.states + '&filters[district]=' + this.state.district;
      if (this.state.commodity != "")
        query = query + '&filters[commodity]=' + this.state.commodity;
      fetch('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001e0d0cfbd6a0641cb67fc07b5bef82c78&format=json&offset=0&' + query, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseData) => {
         
          this.setState(
            {
              dataSourceMandi: responseData,
              showCommodity: true,
            });
        })
        .done();
    }
    catch (error) {
      console.log(error);
    }
  };

  getCommodity = async (value) => {
    try {
      // We have data!!
      this.setState({ district: value })
      this.setState({ dataSourceCommodity: [] })
      let query = 'filters[state]=' + this.state.states + '&filters[district]=' + this.state.district + '&fields=commodity';

      fetch('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001e0d0cfbd6a0641cb67fc07b5bef82c78&format=json&offset=0&' + query, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSourceCommodity: []
          })
          for (let j = 0; j < responseData.records.length; j++) {
            this.setState({
              dataSourceCommodity: [...this.state.dataSourceCommodity, { value: responseData.records[j].commodity }]
            })
          }
        })
        .done();
    }
    catch (error) {
      console.log(error);
    }
  };
  getDistrict = async (value, index) => {
    var myloop = [];
    try {
      this.setState({ states: value })
      this.setState({
        districtData: []
      })
      for (let j = 0; j < word[index].districts.length; j++) {
        myloop.push(
          { value:word[index].districts[j] }
        );
      }
      this.setState({
        districtData: myloop
      })
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    var statesData = [];
    for (let i = 0; i < word.length; i++) {
      statesData.push({ key:i, value: word[i].state }
      )
    }
    const Result = (props) => {
      return (
        <FlatList
          data={props.mandiD.records}
          renderItem={({ item }) => {
            return (
              <View style={{ backgroundColor: 'white', flex: 1, marginLeft:15, marginRight:15,margingBottom:15, marginTop:15,   }}>
                <Row style={{ borderBottomWidth: 1,padding:15,color:'orange', height:50 }}>
                  <Col><Text style={{color:'orange' }}> {item.commodity}</Text>
                  </Col>
                </Row>
                <Row style={{ borderBottomWidth: 1, height:60 }}>
                  <Col size={50} style={{ borderRightWidth: 1, padding:5, }}>
                    <Text> राज्य </Text>
                    <Text> {item.state}</Text>
                  </Col>
                  <Col size={50} style={{ marginLeft: 10, padding:5, }}>
                    <Text> अधिकतम मूल्य / क्विन्टल</Text>
                    <Text> ₹{item.max_price}</Text>
                  </Col>
                </Row>
                <Row style={{ borderBottomWidth: 1 , height:60}}>
                  <Col size={50} style={{ borderRightWidth: 1, padding:5, }}>
                    <Text> जिला</Text>
                    <Text> {item.district}</Text>
                  </Col>
                  <Col size={50} style={{ marginLeft: 10, padding:5, }}>
                    <Text> न्यूनतम मूल्य / क्विन्टल</Text>
                    <Text> ₹{item.min_price}</Text>
                  </Col>
                </Row>
                <Row style={{ borderBottomWidth: 1,  height:60 }}>
                  <Col size={50} style={{ borderRightWidth: 1, padding:5, }}>
                    <Text> बाजार</Text>
                    <Text> {item.market}</Text>
                  </Col>
                  <Col size={50} style={{ marginLeft: 10 , padding:5,}}>
                    <Text>औसत / क्विन्टल </Text>
                    <Text> ₹{item.modal_price}</Text>
                  </Col>
                </Row>
              </View>
            )
          }
        }
        />
      )
    }
    if (this.state.showProgress == false) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else {
      return (
        <View style={{ flex: 1, backgroundColor:'#efefef' }}>
          <MyWeather  />
          <View style={{ height:180, backgroundColor: 'white' }}>
            <Row style={{  backgroundColor: 'white', borderWidth: 1, margin: 10 }}>
              <Col size={30}>
                <Dropdown style={{ justifyContent: 'center', alignItems: 'center' }}
                  label='राज्य'
                  data={statesData}
                  textColor='red'
                  fontSize={14}
                  baseColor='black'
                  itemColor='black'
                  itemTextStyle={{ justifyContent: 'center',alignItems: 'center'}}
                  dropdownOffset={{ top: 32, left: 20 }}
                  containerStyle={{ margin: 5,  }}
                  onChangeText={(value, index) => this.getDistrict(value, index)}
                />
              </Col>
              <Col size={30}>
                <Dropdown style={{ justifyContent: 'center', alignItems: 'center' }}
                  label='जिला'
                  data={this.state.districtData}
                  fontSize={14}
                  baseColor='black'
                  itemColor='black'
                  containerStyle={{ margin: 5, flex:1  }}
                  onChangeText={(value) => this.getCommodity(value) }
                />
              </Col>
              <Col size={30}>
                <Dropdown style={{ justifyContent: 'center', alignItems: 'center' }}
                  label='फसल'
                  data={this.state.dataSourceCommodity}
                  fontSize={14}
                  baseColor='black'
                  itemColor='black'
                  containerStyle={{  margin: 5 }}
                  onChangeText={(value) => this.setState({ commodity: value })}
                />
              </Col>
            </Row>
            <Row  style={{ height:'30%',margin:10 }}>
              <Col style={{height:'10%',  alignItems: 'center' }}  >
                <Button style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }} primary
                  onPress={() => this.getCommodityData()}>
                  <Text style={{color:'white'}}>खोज करें</Text>
                </Button>
              </Col>
            </Row>
          </View>
          <Result mandiD={this.state.dataSourceMandi} />
        </View>
      );
    }
  }
}