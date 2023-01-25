import React, { useEffect, useReducer, useState } from "react";
import { getPet } from "./api";
import initialState from "./initialState";
import Pet from "./Pet";
import { Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'


function petsReducer(state, action) {
    switch (action.type) {
        case "PET_SELECTED": {
            return {
                ...state,
                selectedPet: action.payload
            };
        }
        case "FETCH_PET": {
            return {
                ...state,
                loading: true,
                petData: null
            };
        }
        case "FETCH_PET_SUCCESS": {
            return {
                ...state,
                loading: false,
                petData: action.payload
            };
        }

        case "RESET": {
            return initialState;
        }

        default:
            throw new Error(`Not supported action ${action.type}`);
    }
}

function Pets() {
    const [pets, dispatch] = useReducer(petsReducer, initialState);
    const onChange = ({ target }) => {
        dispatch({ type: "PET_SELECTED", payload: target.value });
    };

    useEffect(() => {
        if (pets.selectedPet) {
            dispatch({ type: "FETCH_PET" });
            getPet(pets.selectedPet).then(data => {
                dispatch({ type: "FETCH_PET_SUCCESS", payload: data });
            });
        } else {
            dispatch({ type: "RESET" });
        }
    }, [pets.selectedPet]);

    const data = ["cats", "dogs"]

    return (
        <View>
            <SelectDropdown
                data={data}
                onSelect={selection => {
                    dispatch({ type: "PET_SELECTED", payload: selection })
                }}
            />

            {pets.loading && <View><Text>Loading...</Text></View>}
            {pets.petData && <View><Pet {...pets.petData} /></View>}
        </View>
    );
}

export default Pets;
