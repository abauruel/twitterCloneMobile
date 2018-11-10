import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation'
import { View, 
    Text,
     StyleSheet, 
     TextInput,
     TouchableOpacity,
     KeyboardAvoidingView,
     AsyncStorage } from 'react-native'

     
import Icon from 'react-native-vector-icons/FontAwesome5'
// import styles from './styles';

export default class Login extends Component {
    static navigationOptions ={
        header: null
    }
    state = {
        username: '',
    }
    navigateToTimeline = () =>{
        const resetAction = StackActions.reset({
            index: 0,
            actions:[
                NavigationActions.navigate({ routeName: 'Timeline' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    
    async componentDidMount(){
        const username = await AsyncStorage.getItem("@GoTwitter:username")
        if(username){
            this.navigateToTimeline()
        }
    }

    handleLogin = async() =>{
        const {username} = this.state

        if(!username.length) return

        await AsyncStorage.setItem('@GoTwitter:username', username)

        this.props.navigation.navigate('Timeline')
        
        this.navigateToTimeline()
    }

    handleInputChange = username =>{
        this.setState({ username})
    }
    render() {
    return (
    <KeyboardAvoidingView style={styles.container} behavior="">
        <View style={styles.content}>
        <View>
        <Icon name="twitter" size={64} color="#4BB0EE" />
        </View>
            <TextInput 
                style={styles.input}
                placeholder="Nome de usuario"
                value={this.state.username}
                onChangeText={this.handleInputChange}
                returnKeyType="send"
                onSubmitEditing={this.handleLogin}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>);
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });
  
 