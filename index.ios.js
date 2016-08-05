/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native';
import HomePage from './screens/home-page';
import MoviePage from './screens/movie-page';

class FirstProject extends Component {
    render() {
        return (<Navigator style={{
            flex: 1
        }} initialRoute={{
            name: 'Main'
        }} renderScene={this.renderScene}/>);
    }

    renderScene(route, navigator) {
      console.log(route.name);
        switch (route.name) {

            case 'Main':
                return <HomePage navigator={navigator} {...route.passProps} ></HomePage>
                break;
            case 'Movie':
                return <MoviePage navigator={navigator} girl={route.girl} ></MoviePage>
                break;
            default:

        }
    }
}

AppRegistry.registerComponent('FirstProject', () => FirstProject);
