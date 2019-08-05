/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, ActivityIndicator, Image, Text } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, Content, Title, Button, Left, Right, Body, Footer } from 'native-base';
export default class WeatherC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: true,
      dataSource: "",
    };
  }
  componentDidMount() {
    this.getWeather();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }
  getWeather = async () => {
    try {
      // We have data!!
      fetch('https://api.darksky.net/forecast/64a72561d28ea132eee93ada33390c8f/19.1243,73.0053?lang=hi&units=si', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState(
            {
              dataSource: responseData,
              showProgress: true,
            });
        })
        .done();
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.showProgress == false) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ height: 150, width: '100%', backgroundColor: '#bfee90' }}>
            <Row size={100} style={{ height: 25, backgroundColor: 'white', borderWidth: 1, margin: 10 }}>
              <Col style={{ justifyContent: 'center', alignItems: 'center', }} size={20}>
                <Image
                  style={{ height: 60, width: 60 }}
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT3DGZhN7_F3Zi9owidgBY5PWP60uQqJjV4l_XiOCCKT5jE4M0' }}
                />
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }} size={20}>
                <Text> {this.state.dataSource == '' ? '' : this.state.dataSource.currently.temperature} °C </Text>
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }} size={40}>
                <Row size={100} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Col>
                    <Text>
                      {this.state.dataSource == '' ? '' : this.state.dataSource.currently.summary}
                    </Text>
                    <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>{this.state.date}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </View>
        </View>
      );
    }
  }
}