import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import bg from "../assets/images/bg.png"
import { theme } from "../theme";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline"
import { useState } from "react";


export default function HomeScreen() {

    const [showSearch, toggleSearch] = useState(false)

    // console.log(showSearch)
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
                </View>
            </SafeAreaView>
        </View>
    )
}