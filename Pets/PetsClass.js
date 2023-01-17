import React from "react";
import { getPet } from "./api";
import initialState from "./initialState";
import Pet from "./Pet";
import { SelectList } from 'react-native-dropdown-select-list'
import { Text, View } from "react-native";



class Pets extends React.Component {
    state = initialState;

    componentDidUpdate(_, prevState) {
        debugger;
        const { selectedPet } = this.state;
        if (prevState.selectedPet !== selectedPet) {
            if (selectedPet) {
                this.setState({
                    ...this.state,
                    loading: true,
                    petData: null
                });
                getPet(selectedPet).then(data => {
                    this.setState({
                        ...this.state,
                        loading: false,
                        petData: data
                    });
                });
            } else {
                this.setState(initialState);
            }
        }
    }

    onChange = ({ target }) => {
        this.setState({
            ...this.state,
            selectedPet: target.value
        });
    };

    render() {
        const { selectedPet, loading, petData } = this.state;
        const [selected, setSelected] = React.useState("");
        const data = [{ key: '1', value: "" }, { key: '2', value: 'cats' }, { key: '3', value: 'dogs' },]
        return (
            <View>
                <SelectList onSelect={this.onChange} data={data} setSelected={setSelected} />
                {/* <select value={selectedPet} onChange={this.onChange}>
                    <option value="">Select a pet</option>
                    <option value="cats">Cats</option>
                    <option value="dogs">Dogs</option>
                </select> */}
                {loading && <View>Loading...</View>}
                {petData && <Pet {...petData} />}
            </View>
        );
    }
}

export default Pets;