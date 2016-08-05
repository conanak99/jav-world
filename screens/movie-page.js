import React, {Component} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View
} from 'react-native';

import NavigationBar from 'react-native-navbar';

class MoviePage extends Component {
  render() {
    var girl = this.props.girl;

    const leftButtonConfig = {
          title: 'Back',
          handler: () => this.props.navigator.pop(),
    };

    return <View>
      <NavigationBar
          title={{ title: 'Custom screen', }}
          leftButton={leftButtonConfig} />
      <Text>{girl.name}</Text>
    </View>
  }
}

export default MoviePage;
