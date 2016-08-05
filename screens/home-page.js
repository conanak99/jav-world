import React, {Component} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Image,
    View
} from 'react-native';

import GridView from 'react-native-grid-view';
import NavigationBar from 'react-native-navbar';

class Girl extends Component {
    render() {
        var girl = this.props.girl;
        return <TouchableHighlight onPress={this.props.onClicked.bind(null, girl)}>
            <View style={styles.girlCell}>
                <View style={styles.card}>
                    <Image source={{
                        uri: girl.imageUrl.replace('http', 'https')
                    }} style={{
                        flex: 1
                    }}/>
                    <View style={styles.cardContent}>
                        <Text style={styles.girlName}>
                            {girl.name}</Text>
                          <Text style={styles.girlInfo}>
                            B:{girl.bust}   W:{girl.waist}   H:{girl.hip}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableHighlight>
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girls: []
        };
        this.navigate = this.navigate.bind(this);
        this.onGirlClicked = this.onGirlClicked.bind(this);
    }

    componentDidMount() {
        fetch('https://javrest-hoangph92.rhcloud.com/api/actress').then((response) => response.json()).then((responseData) => {
            this.setState({girls: responseData.result, loaded: true});
        }).done();
    }

    onGirlClicked(girl) {
        console.log(girl);
        this.props.navigator.push({name: 'Movie', girl: girl});

    }

    navigate() {
        this.props.navigator.push({
            name: 'Movie',
            girl: {
                name: 'Hana'
            }
        });
    }

    render() {
        var girls = this.state.girls;

        return (
            <View style={styles.container}>
                <NavigationBar title={{
                    title: "JAV World"
                }}/>
                <TextInput style={styles.textbox} placeholder="Search!"/>

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
    girlCell: {
        height: 160,
        width: 125,
        paddingBottom: 10,
        alignItems: 'center'
    },
    girlGrid: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        width: 105,
        borderRadius: 10
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
        height: 40,
        marginVertical: 10,
        alignSelf: 'center',
        width: 300,
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
