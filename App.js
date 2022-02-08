import React,{useEffect,useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import { View, Text, Button,Icon,StyleSheet,ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';
const Loading=()=>{
  return(
      <View>
      <ActivityIndicator size='large' />
      </View>
      );
};

const App = () => {
  const[loading,setLoading]=useState(true);
  const[viewedOnboarding,setViewedOnboarding]=useState(false);

  const checkOnboarding = async () => {
    try{
       const value = await AsyncStorage.getItem('@viewedOnboarding');
       if(value !== null){
         setViewedOnboarding(true)
       }
    }catch(err){
         alert('Error @checkOnboarding:',err)
    }finally{
         setLoading(false);
    }
  }
  useEffect(()=>{
    checkOnboarding();

  },[]);
  return (
      <View style={styles.container}>
           {loading?<Loading />:viewedOnboarding?<HomeScreen />:<Onboarding />}
      <StatusBar style='auto' />
      </View>

  );
}
export default App
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    justifyContent:'center'
  }
})
