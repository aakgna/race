import React from "react";
import { Text, View } from "react-native";

function Pet({ name, voice, avatar }) {
    return (
        <View>
            <Text>{name}</Text>
            <View><Text>{`Voice - ${voice}`}</Text></View>
            <View><Text>{avatar}</Text></View>
        </View>
    );
}

export default Pet;
