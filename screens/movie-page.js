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

import NavigationBar from 'react-native-navbar';


class MovieItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var mv = this.props.movie;
    if (!mv) {
      return <View></View>;
    }

    return <View style={{paddingVertical: 10, paddingHorizontal: 15, flexDirection:'row'}}>
        <Image source={{
            uri: mv.imageUrl
        }} style={{height: 200, width:120}}></Image>
      <View style={{paddingLeft:20}}>
        <Text style={{width:200, fontSize:14, fontWeight:'bold', marginBottom:5}}>{mv.name}</Text>

        <Text>{mv.maker[0].name}</Text>
          <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(mv.siteUrl)}>
            Link
          </Text>
      </View>
    </View>;
  }
}

class MoviePage extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      movies: ds.cloneWithRows([]),
      isLoading: true
    }
  }

  async componentDidMount() {
    var girl = this.props.girl;

    var responseData = await fetch('https://javrest-hoangph92.rhcloud.com/api/videos/' + girl.id)
                            .then((response) => response.json());

    var mv = responseData.result;
    console.log(mv);
    this.setState({movies: this.state.movies.cloneWithRows(mv), isLoading: false});

  }

  render() {
    var girl = this.props.girl;

    const leftButtonConfig = {
          title: 'Back',
          handler: () => this.props.navigator.pop(),
    };

    return <View>
      <NavigationBar
          title={{ title: girl.name, }}
          leftButton={leftButtonConfig} />

        <View style={{flexDirection:'row', padding: 15}}>
          <Image source={{
              uri: girl.imageUrl
          }} style={{width: 120, height:120, borderRadius: 60}}></Image>
        <View style={{marginLeft: 20}}>
            <Text style={{fontSize:16, fontWeight:'bold', marginBottom:5}}>{girl.name}</Text>
              <Text>
                  B:{girl.bust} W:{girl.waist} H:{girl.hip}
              </Text>
              <Text>
                  Birthday: {girl.birthday}
              </Text>
          </View>

        </View>
        <View>
          <View>
            {/* Fix Text View padding bugs */}
            <Text style={{marginLeft: 20, fontSize:18, fontWeight:'600'}}>Movies</Text>
          </View>

          <ActivityIndicator size="large" animating={this.state.isLoading}></ActivityIndicator>
            <ListView style={{height:420, marginTop: -30}}

    dataSource={this.state.movies}
    renderRow={(rowData) => <MovieItem movie={rowData}/>}
renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    />
        </View>

    </View>
  }
}

const styles = StyleSheet.create({
  /*
   * Removed for brevity
   */
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default MoviePage;
