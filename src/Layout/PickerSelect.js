import { Modal, Text, Button } from 'react-native-paper';

import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';

import { useNavigation } from "@react-navigation/native";


const RicePrice = (list,header) => {
    const navigation = useNavigation();
    const [content, setContent] = useState('');


    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        <View style={styles.container}>
            <View style={styles.header}>Tỉnh/ Thành Phố</View>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                <Text>An Giang</Text>
            </ScrollView>


        </View >
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#009432',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: StatusBar.currentHeight,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },

});

export default RicePrice;
