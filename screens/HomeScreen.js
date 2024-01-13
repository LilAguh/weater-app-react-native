import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView  } from "react-native";
import bg from "../assets/images/bg.png"
import { theme } from "../theme";
import { debounce } from "lodash";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline"
import {CalendarDaysIcon, MapPinIcon} from "react-native-heroicons/solid"
import { useCallback, useState, useEffect } from "react";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants/weatherImages";
import { weatherIcons } from "../constants/weatherIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Location from "expo-location"



export default function HomeScreen() {

    const [showSearch, toggleSearch] = useState(false)
    const [locations, setLocations] = useState([])
    const [weather, setWeather] = useState([])
    // const [myLocation, setMyLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);
    // const [myAddress, setMyAddress] = useState(null);
//   useEffect(() => {
//     (async () => {
//       // Solicitar permisos de ubicación
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permiso denegado para acceder a la ubicación');
//         return;
//       }
//       console.log(location)
//       // Obtener la ubicación actual
//       let location = await Location.getCurrentPositionAsync({});
//       setMyLocation(location);
//       console.log(location)

//       // Obtener la ubicación inversa
//       let reverseLocation = await Location.reverseGeocodeAsync({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });
//       console.log(reverseLocation[0].city)


//       fetchWeatherForecast({
//         cityName: reverseLocation[0].city,
//         days: "7"
//     }).then(data=>{
//         setWeather(data)
//     })

      
//     })();
//   }, []);

const [myLocation, setMyLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myAddress, setMyAddress] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
        try {
          // Solicitar permisos de ubicación
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permiso denegado para acceder a la ubicación');
            return;
          }
  
          // Intentar obtener la ubicación actual
          try {
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(location);
  
            // Obtener la ubicación inversa
            let reverseLocation = await Location.reverseGeocodeAsync({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
  
            // Actualizar la dirección en el estado
            setMyAddress(reverseLocation[0] || null);
            console.log(reverseLocation)
            fetchWeatherForecast({
                        cityName: reverseLocation[0].city,
                        days: "7"
                    }).then(data=>{
                        setWeather(data)
                    })
          } catch (error) {
            // Manejar el caso en que se cancela manualmente la solicitud
            if (error.message.includes('Location request failed due to unsatisfied device settings')) {
              console.log('Solicitud de ubicación cancelada manualmente');
              // Establecer manualmente la ubicación en Barcelona
              fetchWeatherForecast({
                cityName: "Barcelona",
                days: "7"
            }).then(data=>{
                setWeather(data)
            })
            //   setMyLocation({ coords: { latitude: 41.3851, longitude: 2.1734 } });
            } else {
              throw error; // Re-lanzar el error si no es una cancelación manual
            }
          }
        } catch (error) {
          console.error('Error general:', error.message);
          setErrorMsg('Error al obtener la ubicación');
        }
        
      };
  
      getLocation();
  
      return () => {
        // Puedes realizar limpieza o cancelar la solicitud de ubicación aquí si es necesario
      };
    }, []);




    const handleLocation = (loc)=>{
        setLocations({})
        toggleSearch(false)
        fetchWeatherForecast({
            cityName: loc.name,
            days: "7",
        }).then(data=>{
            setWeather(data)
            console.log("got forecast: ",data)
        })
    }
    const handleSearch = value =>{
        if(value.length>2){
            fetchLocations({cityName: value}).then(data=>{
                setLocations(data)
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1000), [])
    const {current, location} = weather


    return(
        <KeyboardAvoidingView  className="flex-1 relative">
            <StatusBar style="light"/>
            <Image source={bg} className="absolute w-full h-full" blurRadius={90} />
            <View className="absolute w-full h-full bg-black opacity-40"/>
            <SafeAreaView className="flex flex-1">
                {/* Aca es donde va la barra de busqueda */}
                <View className="mx-4 relative z-50" style={{height: "7%"}}>
                    <View className="flex-row justify-end items-center rounded-full top-11"
                        style={{backgroundColor: showSearch? theme.bgWhite(0.2): "transparent"}}>
                        {
                            showSearch?(
                                <TextInput
                                onChangeText={handleTextDebounce}
                                placeholder="Search City"
                                placeholderTextColor={'lightgray'}
                                className="pl-6 h-10 flex-1 text-base text-white "/>
                            ):null
                        }
                        <TouchableOpacity
                        onPress={()=> toggleSearch(!showSearch)}
                        className="p-3 m-1 rounded-full"
                        style={{backgroundColor: !showSearch? theme.bgWhite(0.2): "transparent"}}>
                            <MagnifyingGlassIcon
                            size="25"
                            color="white"/>
                        </TouchableOpacity>
                    </View>
                    {/* Aca es donde van las listas de locaciones*/
                        locations.length > 0 && showSearch? (
                            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl mt-11">
                                {
                                    locations.map((loc, index)=>{
                                        const showBorder = index + 1 != locations.length
                                        const borderClass = showBorder? " border-b-2 border-b-gray-400" : ""
                                        return(
                                            <TouchableOpacity
                                            onPress={()=> handleLocation(loc)}
                                            key={index}
                                            className={"flex-row items-center border-0 p-4 px-4 mt-1" + borderClass}>
                                                <MapPinIcon size="20" color="gray"/>
                                                <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ):null
                    }
                </View>
                {/* En esta seccion va el pronostico, obvimente separar proximamente en componentes*/}
                <View className="mx-4 flex justify-around flex-1 mb-2">
                    {/* Locacion */}
                    <Text className="text-white text-center text-2xl font-bold">
                        {location?.name},
                        <Text className="text-lg font-semibold text-gray-300">
                            {location?.country}
                        </Text>
                    </Text>
                    {/* Imagen del tiempo */}
                    <View className="flex-row justify-center">
                        <Image source={weatherImages[current?.condition?.text]} className="w-52 h-52"/>
                    </View>
                    {/* Grados Celcius */}
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            {current?.temp_c}&#176;
                        </Text>
                        <Text className="text-center text-white text-xl tracking-widest">
                            {current?.condition?.text}
                        </Text>
                    </View>
                    {/*Otros Datos */}
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <Image source={weatherIcons.Wind} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                {current?.wind_kph}km/h
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={weatherIcons.Drop} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                {current?.humidity}%
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={weatherIcons.Sun} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                6:51 AM
                            </Text>
                        </View>
                    </View>

                    {/* Tiempo para los proximos dias */}
                    <View className="mb-2 space-y-3">
                        <View className="flex-row items-center mx-5 space-x-2">
                            <CalendarDaysIcon size="22" color="white"/>
                            <Text className="text-white text-base"> Daily Forecast</Text>
                        </View>
                        <ScrollView
                        horizontal
                        contentContainerStyle={{paddingHorizontal: 15}}
                        showsHorizontalScrollIndicator={false}
                        overScrollMode="never"
                        >
                            {
                                weather?.forecast?.forecastday?.map((item, index)=>{
                                    const date = new Date(item.date)
                                    const options = {weekday: "long"}
                                    let dayName = date.toLocaleDateString("en-US", options)
                                    dayName = dayName.split(",")[0]
                                    return(
                                        <View
                                        key={index}
                                        className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                        style={{backgroundColor: theme.bgWhite(0.2)}}>
                                            <Image source={weatherImages[item?.day?.condition?.text]} className="h-11 w-11"/>
                                            <Text className="text-white">{dayName}</Text>
                                            <Text className="text-white text-xl font-semibold">{item?.day?.avgtemp_c}&#176;</Text>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
    )
}