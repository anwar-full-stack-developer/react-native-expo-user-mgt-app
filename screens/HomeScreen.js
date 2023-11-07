import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import Mybutton from '../components/Mybutton';
import { SafeAreaView } from 'react-native-web';

export default function HomeScreen({ navigation, route }) {
    React.useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.post]);
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15 }}>
        <Text style={{fontSize: 25, marginBottom: 10}}>Welcome to React Native (android) (ios) app.</Text>
        <Button
          title="Create post"
          onPress={() => navigation.navigate('CreatePost')}
        />
        <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
        <Mybutton style={{fontSize:25}}
            title="User List"
            customClick={() => navigation.navigate('UserList')}
          />
          
      </View>
      </SafeAreaView>
    );
  }