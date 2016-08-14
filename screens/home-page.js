import React, {Component} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
    Image,
    View
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Button from 'react-native-button';

class Girl extends Component {
    render() {
        var girl = this.props.girl;
        return <TouchableHighlight style={styles.girlCell} onPress={this.props.onClicked.bind(null, girl)}>
                <View style={styles.card}>
                    <Image source={{
                        uri: girl.imageUrl
                    }} style={{
                        flex: 1
                    }}/>
                    <View style={styles.cardContent}>
                        <Text style={styles.girlName}>
                            {girl.name}</Text>
                        <Text style={styles.girlInfo}>
                            B:{girl.bust} W:{girl.waist} H:{girl.hip}
                        </Text>
                    </View>

                </View>
        </TouchableHighlight>
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girls: [],
            isLoading: true
        };

        this.onGirlClicked = this.onGirlClicked.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount() {
        var responseData = await fetch('https://javrest-hoangph92.rhcloud.com/api/actress')
                                .then((response) => response.json());
        this.setState({girls: responseData.result, isLoading: false});
    }

    onGirlClicked(girl) {
        console.log(girl);
        this.props.navigator.push({name: 'Movie', girl: girl});
    }

    async onSearch() {
      var search = this.state.search;
      this.setState({girls: [], isLoading: true});

      var responseData = await fetch('https://javrest-hoangph92.rhcloud.com/api/actress?name=' + search)
                              .then((response) => response.json());
      this.setState({girls: responseData.result, isLoading: false});
    }

    render() {
        var girls = this.state.girls;
        var loadingElement = <View style={{
            alignItems: 'center'
        }}>
            <Text style={{fontSize:16, fontWeight: '600'}}>Loading. Please wait...</Text>
            <ActivityIndicator size="large" animating={this.state.isLoading}></ActivityIndicator>
        </View>;

        if (!this.state.isLoading) {
            loadingElement = <View></View>;
        }

        return (
            <View style={styles.container}>
                <NavigationBar title={{
                    title: "JAV World"
                }}/>
              <View style={{alignSelf:'stretch', flexDirection:'row', padding: 15}}>
                <TextInput style={styles.textbox}
                  onChangeText={(text) => this.setState({search: text})}
                  />
                  <Button
                    containerStyle={{marginLeft: 5, paddingTop: 5, height:30, borderRadius:4, backgroundColor: 'white'}}
          style={{fontSize: 15, color: 'blue', fontWeight:'normal', width: 70}}
          styleDisabled={{color: 'red'}}
          onPress={() => this.onSearch()}>
          Search
        </Button>
              </View>

                {loadingElement}
                <ScrollView>
                    <View style={styles.girlGrid}>
                        {girls.map(girl => <Girl onClicked={this.onGirlClicked} key={girl.id} girl={girl}></Girl>)}
                    </View>
                </ScrollView>

            </View>
        );
    }

}

const styles = StyleSheet.create({
  girlGrid: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: 20
  },
    girlCell: {
        height: 160,
        width: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        marginBottom: 15
    },
    card: {
        flex: 1,
        alignSelf: 'stretch'
    },
    cardContent: {
        padding: 5
    },
    girlName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 11
    },
    girlInfo: {
        textAlign: 'center',
        fontSize: 9
    },
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7'
    },
    textbox: {
        height: 30,
        padding: 4,
        fontSize: 13,
        flex: 1,
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center'
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default HomePage;
