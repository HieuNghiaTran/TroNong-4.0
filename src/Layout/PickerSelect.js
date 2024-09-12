import { Modal, Text, Button, } from 'react-native-paper';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from "@react-navigation/native";


const AddressModal = ({ list, header, isShow, closeModal }) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({})
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);

    useEffect(() => {
        setVisible(isShow);
    }, [isShow]);

    const hideModal = () => {
        setVisible(false);
        closeModal();
    };

    const renderItem = item => (
        <View style={styles.item}>
            <Text style={[isFocus && { color: 'blue' }]}>
                {item.label}
            </Text>
            {item.value === value && (
                <FontAwesome name="check-circle" size={24} color="green" />
            )}
        </View>
    );

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <View style={styles.container}>
              
                <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={styles.header}>Tỉnh/ Thành Phố</View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn loại sản phẩm"
                        searchPlaceholder="Search..."
                        value={value1}
                        onChange={item => setValue(item.value)}
                        renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
                        renderItem={renderItem}
                    />




                    <View style={styles.header}>Quận/ Huyện</View>
       
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Chọn loại sản phẩm"
                            searchPlaceholder="Search..."
                            value={value1}
                            onChange={item => setValue(item.value)}
                            renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
                            renderItem={renderItem}
                        />

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

export default AddressModal;
