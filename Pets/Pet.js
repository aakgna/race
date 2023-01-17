import React from "react";
import { Text, View } from "react-native";

function Pet({ name, voice, avatar }) {
    return (
        <View>
            <Text>{name}</Text>
            <View>{`Voice - ${voice}`}</View>
            <View>{avatar}</View>
        </View>
    );
}

export default Pet;