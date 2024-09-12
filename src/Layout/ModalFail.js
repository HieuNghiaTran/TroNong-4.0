import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Modal, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const ModalFail = ({ isShow, closeModal,mes }) => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setVisible(isShow);
    }, [isShow]);

    const hideModal = () => {
        setVisible(false);
        closeModal();
       
    };

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1722864120/products/cross_t6vxj5.png" }}
                    style={styles.image}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.titleText}>Lỗi</Text>
                <Text style={styles.messageText}>{mes}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={hideModal}>
                <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        width: '80%', 
        alignSelf: 'center',
        alignItems: 'center',
        elevation: 5, 
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    content: {
        alignItems: 'center',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
    button: {
        backgroundColor: '#009432',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default ModalFail;
