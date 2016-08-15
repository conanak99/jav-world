import React, {Component} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Linking,
    ListView,
    ActivityIndicator,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class Rating extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      var score = parseFloat(this.props.score) || 0;
      var size = this.props.size;
      var color = this.props.color || '#000';
      var roundScore = this.roundToHalf(score);

      // Count the number of star
      var totalStar = 5;
      var blackStar = Math.floor(roundScore);
      var halfStar = score > blackStar ? 1 : 0;

      // Render the stars
      var stars = [];
      for (var i = 0; i < totalStar; i++) {
        var iconName = '';
        if (i < blackStar) {
          iconName = 'star';
        } else if (i < blackStar + halfStar) {
          iconName = 'star-half-o';
        } else {
          iconName = 'star-o';
        }
        stars.push(<Icon key={i} name={iconName}
          color={color} size={size}/>);
      }
      stars.push(<Text key="count" style={{marginLeft: 3, marginTop: -2, fontSize:size}}>({this.props.count})</Text>);

        return (
            <View style={{flexDirection:'row', marginTop: 4}}>
              {stars}
            </View>
        );
    }

    // 2.1 to 2, 2.6 to 2.5, 2.9 to 3
    roundToHalf(input) {
        return Math.round(input * 2) / 2.0;
    }
}

export default Rating;
