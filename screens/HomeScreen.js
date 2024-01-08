import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import bg from "../assets/images/bg.png"
import { theme } from "../theme";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline"
import {MapPinIcon} from "react-native-heroicons/solid"
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
            </SafeAreaView>
        </View>
    )
}