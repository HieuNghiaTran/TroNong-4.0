import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import ModalInformLogin from './ModalInformLogin';
import * as ImagePicker from 'expo-image-picker';
import Detection from '../Services/DiseaseDetectionServices';
const CameraAi = () => {
    const navigation = useNavigation();
    const [isLogin, setIsLogin] = useState(false)

    const [isShowModal, setIsShowModal] = useState(false);

    const closeModal = () => {
        setIsShowModal(false);
    };



    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        };

        let result = await ImagePicker.launchCameraAsync(options);
        let res = await Detection(result.assets[0].uri);
        console.log(res)
        if (!result.cancelled) {
            setImage(result.uri);

        }
    };

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#009432',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingTop: StatusBar.currentHeight || 0,
        },
        headerText: {
            flex: 1,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
            padding: 20,
        },
        frame: {
            width: 300,
            height: 300,
            flexDirection: 'row',
            flexWrap: 'wrap',
            overflow: 'hidden',
            marginBottom: 20,
            backgroundColor: "#E0F8D8",
            position: 'relative',
        },
        topLeft: {
            width: '25%',
            height: '25%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderColor: '#009432',
            borderTopWidth: 2,
            borderLeftWidth: 2,
        },
        topRight: {
            width: '25%',
            height: '25%',
            position: 'absolute',
            top: 0,
            right: 0,
            borderColor: '#009432',
            borderTopWidth: 2,
            borderRightWidth: 2,
        },
        bottomRight: {
            width: '25%',
            height: '25%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderColor: '#009432',
            borderBottomWidth: 2,
            borderRightWidth: 2,
        },
        bottomLeft: {
            width: '25%',
            height: '25%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderColor: '#009432',
            borderBottomWidth: 2,
            borderLeftWidth: 2,
        },
        icon: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        textContainer: {
            alignItems: 'center',
        },
        mainText: {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
        },
        subText: {
            fontSize: 14,
            textAlign: 'center',
            color: '#555',
            marginHorizontal: 20,
        },
        buttonContainer: {
            marginTop: 20,
        },
        button: {
            backgroundColor: '#009432',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            marginLeft: 8,
        },
        btnContainer2: {
            position: "absolute",
            flexDirection: "row",
            bottom: 20,
            justifyContent: "space-between",
            width: "90%",
        },
        secondaryButton: {
            backgroundColor: '#fff',
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#009432',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: "48%"
        },
        secondaryButtonText: {
            color: '#009432',
            fontSize: 16,
            marginLeft: 8,

        },
    });

    return (
        <>
            <View style={styles.header}>
                <MaterialIcons
                    name="keyboard-backspace"
                    size={24}
                    color="#fff"
                    onPress={() => { navigation.goBack() }}
                />
                <Text style={styles.headerText}>Chuẩn đoán sâu bệnh</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.frame}>
                    <View style={styles.topLeft}></View>
                    <View style={styles.topRight}></View>
                    <View style={styles.bottomRight}></View>
                    <View style={styles.bottomLeft}></View>

                    <Image
                        source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718950535/products/image-processing_uvgipm.png" }}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Chụp hình để nhận dạng và chuẩn đoán tự động</Text>
                    <Text style={styles.subText}>Cần hình ảnh cận cảnh và tăng độ sắc nét chuẩn xác. Cách điểm nhận dạng 20 - 30 cm.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={openCamera}>
                        <FontAwesome name="camera" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Chụp ảnh</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.btnContainer2}>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => { !isLogin ? setIsShowModal(true) : setIsShowModal(false) }}>
                        <FontAwesome name="history" size={24} color="#009432" />
                        <Text style={styles.secondaryButtonText}>Lịch sử</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => { /* Chức năng đóng góp dữ liệu */ }}>
                        <Feather name="file-plus" size={24} color="#009432" />
                        <Text style={styles.secondaryButtonText}>Đóng góp dữ liệu</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <ModalInformLogin
                isShow={isShowModal} closeModal={closeModal}


            />
        </>
    );
};

export default CameraAi;
