import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Text, TextInput, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ModalAddNew = ({ isShow, closeModal }) => {
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleDateString('vi-VN'));
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isThu, setIsThu] = useState(false);
    const [isChi, setIsChi] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [tenDat, setTenDat] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setVisible(isShow);
    }, [isShow]);

    const hideModal = () => {
        setVisible(false);
        closeModal();
    };

    const handleSave = () => {
    setLoading(true)
        console.log('Date:', date);
        console.log('Amount:', amount);
        console.log('Description:', description);
        console.log('Type:', isThu ? 'Thu' : 'Chi');
        console.log('Selected Item:', selectedItem);
        hideModal();
        setLoading(false)
    };

    const handleConfirmDate = (selectedDate) => {
        setDate(selectedDate.toLocaleDateString('vi-VN'));
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const formatCurrencyWithSymbol = (value) => {
        if (!value) return '';
        return `${value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`;
    };

    const incrementDate = () => {
        const parts = date.split('/');
        const currentDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        if (!isNaN(currentDate)) {
            currentDate.setDate(currentDate.getDate() + 1);
            setDate(currentDate.toLocaleDateString('vi-VN'));
        } else {
            console.error('Invalid date format');
        }
    };

    const decrementDate = () => {
        const parts = date.split('/');
        const currentDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        if (!isNaN(currentDate)) {
            currentDate.setDate(currentDate.getDate() - 1);
            setDate(currentDate.toLocaleDateString('vi-VN'));
        } else {
            console.error('Invalid date format');
        }
    };

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <ScrollView>
                <View style={styles.header}>
                    <Ionicons name="chevron-back" size={24} color="black" onPress={decrementDate} />
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.dateText}>{date}</Text>
                    </TouchableOpacity>
                    <MaterialIcons name="navigate-next" size={24} color="black" onPress={incrementDate} />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />
                <View style={styles.content}>
                    <TextInput
                        label="Tên đất"
                        value={tenDat}
                        onChangeText={text => setTenDat(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Số tiền"
                        textColor={"red"}
                        value={formatCurrencyWithSymbol(amount)}
                        onChangeText={text => setAmount(text)}
                        keyboardType="numeric"
                        style={[styles.input, {fontWeight:"bold"}]}
                    />
                    <TextInput
                        label="Ghi chú"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={styles.input}
                    />
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Loại:</Text>
                        <View style={styles.option}>
                            <Text
                                style={[
                                    styles.optionText,
                                    isThu ? styles.selectedOption : styles.unselectedOption
                                ]}
                                onPress={() => {
                                    setIsThu(true);
                                    setIsChi(false);
                                }}
                            >
                                Thu
                            </Text>
                            <Text
                                style={[
                                    styles.optionText,
                                    isChi ? styles.selectedOption : styles.unselectedOption
                                ]}
                                onPress={() => {
                                    setIsChi(true);
                                    setIsThu(false);
                                }}
                            >
                                Chi
                            </Text>
                        </View>
                    </View>

                    {isChi &&
                        <View style={styles.itemsContainer}>
                            {itemsChi.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.item,
                                        selectedItem === index && styles.selectedItem
                                    ]}
                                    onPress={() => setSelectedItem(index)}
                                >
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    }

                    {isThu &&
                        <View style={styles.itemsContainer}>
                            {itemsThu.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.item,
                                        selectedItem === index && styles.selectedItem
                                    ]}
                                    onPress={() => setSelectedItem(index)}
                                >
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    }

                    <Button mode="contained" onPress={handleSave} style={styles.button}>
                        Lưu
                    </Button>
                </View>
            </ScrollView>
        </Modal>
    );
};

const itemsChi = [
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718805201/products/fertilizer_rhe3hr.png", label: "Phân bón" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718805201/products/chemical_qrnwe8.png", label: "Thuốc" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718805338/products/shove_k4zuyt.png", label: "Làm đê" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718805337/products/cultivator_kz2fpf.png", label: "Cày, xới" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718855054/products/seed-bag_d2axmp.png", label: "Lúa giống" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718805201/products/fertilizer_rhe3hr.png", label: "Xạ lúa" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718806132/products/irrigation_wavxev.png", label: "Phun thuốc" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718806132/products/grass_vfnjwq.png", label: "Trừ cỏ" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718806014/products/rice_pjuygh.png", label: "Cắt lúa lai" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718854463/products/planting_m9m9eu.png", label: "Dặm lúa" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718854670/products/pump_fnk3p2.png", label: "Bơm nước" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718854670/products/sickle_n8xjj7.png", label: "Gặt lúa" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718854845/products/land_l79gc7.png", label: "Thuê đất" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718854844/products/budget_tki7ls.png", label: "Chi tiêu khác" },
];

const itemsThu = [
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718865263/products/rice_1_gacwvv.png", label: "Bán lúa" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718865354/products/hay-bale_g2vcvl.png", label: "Bán rơm" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718865353/products/duck_yox8sf.png", label: "Bán vịt đồng" },
    { image: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718854844/products/budget_tki7ls.png", label: "Thu nhập khác" },
];

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
    fieldContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        margin: 10,
        fontWeight: "bold"
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionText: {
        fontSize: 16,
        padding: 10,
        width: '40%',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#584F49',
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: '#009432',
        color: '#fff',
    },
    unselectedOption: {
        backgroundColor: '#fff',
        color: '#584F49',
    },
    itemsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        marginVertical: "auto"
    },
    item: {
        alignItems: 'center',
        width: '30%',
        marginHorizontal: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedItem: {
        borderColor: '#009432',
        borderWidth: 2,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    itemText: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ModalAddNew;
