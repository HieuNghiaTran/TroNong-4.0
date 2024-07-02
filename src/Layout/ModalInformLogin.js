import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Modal, Text, Button } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
const ModalInformLogin = ({ isShow, closeModal }) => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setVisible(isShow);
    }, [isShow]);

    const hideModal = () => {
        setVisible(false);
        closeModal();
    };

    const handleSave = () => {
        navigation.navigate('Login')
    };

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <View style={styles.header}>
                <FontAwesome name="warning" size={24} color="#ffc107" />
                <Text style={styles.headerText}>Lưu ý</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>Hãy đăng nhập hoặc tạo tài khoản mới</Text>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Đồng ý</Text>
                </TouchableOpacity>
            </View>
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
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#ffc107',
    },
    content: {
        alignItems: 'center',
    },
    contentText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
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

export default ModalInformLogin;
