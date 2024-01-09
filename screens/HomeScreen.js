import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import bg from "../assets/images/bg.png"
import partlyCloudy from "../assets/images/partlycloudy.png"
import heavyRain from "../assets/images/heavyrain.png"
import wind from "../assets/icons/wind.png"
import drop from "../assets/icons/drop.png"
import sun from "../assets/icons/sun.png"
import { theme } from "../theme";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline"
import {CalendarDaysIcon, MapPinIcon} from "react-native-heroicons/solid"
import { useState } from "react";


export default function HomeScreen() {

    const [showSearch, toggleSearch] = useState(false)
    const [locations, setLocations] = useState([1,2,3,4])
    const handleLocation = (loc)=>{
        console.log('location: ', loc)
    }
    return(
        <View className="flex-1 relative">
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
                                                <Text className="text-black text-lg ml-2">Córdoba, Argentina</Text>
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
                        Córdoba,
                        <Text className="text-lg font-semibold text-gray-300">
                            Argentina
                        </Text>
                    </Text>
                    {/* Imagen del tiempo */}
                    <View className="flex-row justify-center">
                        <Image source={partlyCloudy} className="w-52 h-52"/>
                    </View>
                    {/* Grados Celcius */}
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            19&#176;
                        </Text>
                        <Text className="text-center text-white text-xl tracking-widest">
                            Partly Cloudy
                        </Text>
                    </View>
                    {/*Otros Datos */}
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <Image source={wind} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                3km/h
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={drop} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                100%
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={sun} className="h-6 w-6"/>
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
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                            <View 
                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                            style={{backgroundColor: theme.bgWhite(0.2)}}>
                                <Image source={heavyRain} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">19&#176;</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}