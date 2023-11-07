import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


const apiUrl = "http://localhost:8000/api";

class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            username: "",
            password: "",
            loading: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        // state value is updated by selected user data
        console.log(this.props);
        const { firstName, username, password } = this.props.selectedUser;
        this.setState({
            ...this.state,
            firstName: firstName,
            username: username,
            password: password
        })
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }

    updateUser = () => {
        // destructure state
        const { firstName, username, password } = this.state;
        this.setState({ errorMessage: "", loading: true });

        if (firstName && username && password) {
            // selected user is updated with user id
            const idd = this.props.selectedUser.id || this.props.selectedUser._id;
            fetch(`${apiUrl}/users/${idd}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    username: this.state.username,
                    password: this.state.password
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.closeModal();
                    this.props.updateUser({
                        firstName: this.state.firstName,
                        username: this.state.username,
                        password: this.state.password,
                        id: this.props.selectedUser.id || this.props.selectedUser._id
                    });
                })
                .catch(() => {
                    this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
                })
        } else {
            this.setState({ errorMessage: "Fields are empty.", loading: false })
        }
    }

    render() {
        const { isOpen, closeModal } = this.props;
        const { firstName, username, password, loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Update User</Text>


                    <TextInput
                        style={styles.textBox}
                        defaultValue={firstName}
                        onChangeText={(text) => this.handleChange(text, "firstName")}
                        placeholder="First Name" />

                    <TextInput
                        inputMode="username"
                        defaultValue={username}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "username")}
                        placeholder="username" />

                    <TextInput
                        inputMode="text"
                        defaultValue={password}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "password")}
                        placeholder="password" />



                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.updateUser}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}



export default EditUserModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})