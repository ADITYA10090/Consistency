import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert,Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlatButton from './FlatButton';
const StreakTracker = ({taskName}) => {
  const [streak, setStreak] = useState(0);

  const STREAK_KEY = `@streak_${taskName}`;
  const LAST_PRESS_KEY = `@lastPress_${taskName}`;

  useEffect(()=>{
    const checkStreak= async ()=>{
      let now=new Date();
      let lastday = await AsyncStorage.getItem(LAST_PRESS_KEY);
      const s=await AsyncStorage.getItem(STREAK_KEY);
      if (s!=null ){
        lastday=JSON.parse(lastday)
        let lastDate=lastday[8]+lastday[9];
        if (now.getDay()-Number(lastDate)<=1){
          await AsyncStorage.getItem(STREAK_KEY).then((value)=>{
            setStreak(Number(value));
          })
        }
        else{
          setStreak(0);
          await AsyncStorage.setItem(STREAK_KEY,(0).toString());
        }
      }
    }
    checkStreak()
  },[]);
    const handlePress = async() =>{
      let now=new Date();
      let lastday = await AsyncStorage.getItem(LAST_PRESS_KEY);
      const s=await AsyncStorage.getItem(STREAK_KEY);
      if (s===null){
        setStreak(streak+1);
        await AsyncStorage.setItem(STREAK_KEY,(streak+1).toString());
        await AsyncStorage.setItem(LAST_PRESS_KEY,JSON.stringify(now));
        return;
      }
      lastday=JSON.parse(lastday)
      let lastDate=lastday[8]+lastday[9];
      if (now.getDay()-Number(lastDate)===1){
        setStreak(streak+1);
        await AsyncStorage.setItem(STREAK_KEY,(streak+1).toString());
        await AsyncStorage.setItem(LAST_PRESS_KEY,JSON.stringify(now));
        alert('Congrats')
      }
      else if (now.getDay()-Number(lastDate)>=2){
          setStreak(1);
          await AsyncStorage.setItem(STREAK_KEY,(1).toString());
          await AsyncStorage.setItem(LAST_PRESS_KEY,JSON.stringify(now));
          alert('Welcome Back');
      }
      else{
        alert('Chill, Already Completed');
      }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${taskName}`}: {streak}</Text>
      {/* <Button title="Register Complete" onPress={handlePress} /> */}
      <FlatButton text="Register Complete" c="#00ABE7" onPress={handlePress} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight:'bold',
    fontSize:25,
    elevation:3,
    shadowOffset:{
      width:1,
      height:1,
    }
  },
});

export default StreakTracker;
