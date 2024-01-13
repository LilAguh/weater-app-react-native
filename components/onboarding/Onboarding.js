import React, { Component, useRef } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
 
import Swiper from 'react-native-swiper'

export default function Onboarding() {

  const swiperRef = useRef(null)
  const handleNextPage = () => {
    if (swiperRef.current) {
      const nextPage = swiperRef.current.state.index + 1;
      swiperRef.current.scrollBy(nextPage, true);
    }
  };

    return (
      <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={false} loop={false} ref={swiperRef} scrollEnabled={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
        <Button
        title="Siguiente"
        onPress={handleNextPage}
      />
      </View>
    )
  }

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
  },
  buttonText:{
    color: '#fff',
  }
})