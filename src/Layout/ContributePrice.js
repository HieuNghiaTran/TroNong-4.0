import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ModalSuccess from './ModalSucces';
import { GetProvinceData } from '../Services/Location';
import { UpdateRicePrice, getRiceName } from '../Services/RiceServies';

const ContributePrice = () => {
    const navigation = useNavigation();
    const [price, setPrice] = useState('');
    const [isFocus, setIsForus] = useState(false);
    const [value, setValue] = useState(null);
    const [valueTinh, setValueTinh] = useState(null)
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataProvince, setDataProvince] = useState([])
    const [dataRiceName, setDataRiceName] = useState([])
    const [temp, setTemp] = useState('');

    useEffect(() => {


        fetchdataprovice();
        fetchdataricename()


    }, [])

    const fetchdataprovice = async () => {
        try {
            let res = await GetProvinceData();
            let temp = [];
            res.data.data.forEach(element => {
                temp.push({
                    full_name: element.full_name,
                    id: element.id,
                });
            });
            setDataProvince(temp);

        } catch (err) {
            console.log(err);
        }
    };


    const fetchdataricename = async () => {
        try {
            let res = await getRiceName();
            let temp = [];
            res.data.forEach(element => {
                temp.push({
                    name: element.rice_name,
                    id: element._id,
                });
            });
            setDataRiceName(temp);
        } catch (err) {
            console.log(err);
        }
    };

    const renderItem = item => (
        <View style={styles.item}>
            <Text style={[isFocus && { color: 'blue' }]}>
                {item.full_name || item.name}
            </Text>
            {item.id === value && (
                <FontAwesome name="check-circle" size={24} color="green" />
            )}
        </View>
    );


    const formatCurrency = (value) => {
        const number = parseInt(value.replace(/,/g, ''));
        if (isNaN(number)) return '';
        return number.toLocaleString() + ' ₫';
    };

    const handlePriceChange = (text) => {
        setTemp(text)
        setPrice(formatCurrency(text));
    };

    const closeModal = () => {
        setIsShowModal(false);
    };

    useEffect(() => {

        if (!isShowModal) {

            //navigation.goBack()


        }

    }, [isShowModal])
    const handleShare = async () => {
        setIsLoading(true)

        let data = {
            id_rice: value.id,
            position: valueTinh,
            price: price,
            old_price: 0,
            date: new Date(),
        }
        let res = await UpdateRicePrice(data);
        setIsShowModal(true)
        setIsLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Chia sẻ giá lúa</Text>
                <TouchableOpacity style={styles.postButton}>

                </TouchableOpacity>
            </View>


            <ScrollView style={styles.scrollView}>
                <View style={styles.calendarContainer}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866119/products/calendar_cmeqbu.png" }}
                        style={styles.calen}
                    />
                    <Text style={styles.text}>Hôm nay: {new Date().toLocaleDateString('vi-VN')}</Text>
                </View>



                <Text style={styles.label}>Loại</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataRiceName}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Chọn giống lúa"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => setValue(item)}
                    renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
                    renderItem={renderItem}
                />



                <Text style={styles.label}>Khu vực</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataProvince}
                    search
                    maxHeight={300}
                    labelField="full_name"
                    valueField="id"
                    placeholder="Chọn tỉnh thành"
                    searchPlaceholder="Search..."
                    value={valueTinh}
                    onChange={item => setValueTinh(item.name)}
                    renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
                    renderItem={renderItem}
                />

                <Text style={styles.label}>Giá hiện tại</Text>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPrice}
                            value={price}
                            placeholder="Nhập giá"
                            placeholderTextColor="#666"
                            onFocus={() => {

                                setPrice(temp);

                                setIsForus(true)
                            }}
                            onBlur={() => {
                                setIsForus(false);
                                handlePriceChange(price);
                            }}
                            keyboardType="numeric"
                        />
                        {isFocus && (
                            <Feather onPress={() => price('')} name="x" size={24} color="gray" style={{ position: "absolute", right: 10 }} />
                        )}
                    </View>
                </View>




            </ScrollView>
            <TouchableOpacity style={styles.submitButton} onPress={handleShare}>
                <Text style={styles.submitButtonText}>Chia sẻ</Text>
            </TouchableOpacity>
            <ModalSuccess

                isShow={isShowModal}
                closeModal={closeModal}
                mes={"Cảm ơn bạn đã chia sẻ"}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        marginHorizontal: 16,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calen: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    text: {
        color: '#444444',
        fontSize: 16,
        fontWeight: 'bold',
    },



    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
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
    postButton: {

    },
    postButtonText: {
        color: '#009432',
        fontWeight: 'bold',
    },
    label: {
        marginHorizontal: 16,
        marginTop: 16,
        fontWeight: 'bold',
        color: "#584F49"
    },
    dropdown: {
        marginHorizontal: 16,
        marginVertical: 8,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: "green",
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
        position: "relative"
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: 'red',
        fontWeight: "bold"
    },
    searchWrapper: {
        paddingHorizontal: 17,
        marginVertical: 8
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        width: '100%',
        elevation: 2,
    },
    submitButton: {
        backgroundColor: '#009432',
        marginHorizontal: 16,
        marginVertical: 26,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        //position: "absolute",
        //bottom: 20

    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContributePrice;
