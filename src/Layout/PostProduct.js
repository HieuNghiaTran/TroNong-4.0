import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons, AntDesign, Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import ModalSuccess from './ModalSucces';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import AddressModal from './PickerSelect';
const PostProduct = () => {
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusAddress, setIsFocusAdress] = useState(false);
    const [isFocusPrice, setIsFocusPrice] = useState(false);
    const [isFocusDes, setIsFocusDes] = useState(false);
    const [value, setValue] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const[nameProduct, setNameProduct]=useState('')
    const[desProduct, setDesProduct]=useState('')
    const [address, setAdress]=useState('')
    const [price, setPrice]=useState('')

    const[isShowModalAdress, setIsShowMoadalAdress]=useState(false)
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const formatCurrency = (value) => {
        const number = parseInt(value.replace(/,/g, ''));
        if (isNaN(number)) return '';
        return number.toLocaleString() + ' ₫';
    };

    const handlePriceChange = (text) => {
        setPrice(formatCurrency(text));
    };

    const closeModal = () => {
        setIsShowModal(false);
        setIsShowMoadalAdress(false)
    };

    const handlePost = () => {
        setIsLoading(true);
        setIsShowModal(true);
        setIsLoading(false);
    };



    const pickMedia = async () => {
      
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => asset.uri);
            setImages(selectedImages);
        }
        console.log(images.length)
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
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Đăng tin</Text>
                <TouchableOpacity style={styles.postButton}></TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.uploadContainer} onPress={pickMedia}>
                    <View style={styles.uploadBox}>
                        <Entypo name="camera" size={44} color="#009432" />
                        <Text style={styles.uploadText}>Đăng từ 1 đến 3 hình</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Loại sản phẩm</Text>
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
                    value={value}
                    onChange={item => setValue(item.value)}
                    renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
                    renderItem={renderItem}
                />

                <Text style={styles.label}>Tên sản phẩm</Text>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNameProduct}
                            value={nameProduct}
                            placeholder="Tiêu đề tin đăng"
                            placeholderTextColor="#666"
                            onFocus={() => setIsFocusName(true)}
                            onBlur={() => setIsFocusName(false)}
                        />
                        {isFocusName && (
                            <Feather onPress={() => setNameProduct('')} name="x" size={24} color="gray" style={styles.clearIcon} />
                        )}
                    </View>
                </View>

                <Text style={styles.label}>Mô tả</Text>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setDesProduct}
                            value={desProduct}
                            placeholder="Nhập mô tả sản phẩm"
                            placeholderTextColor="#666"
                            onFocus={() => setIsFocusDes(true)}
                            onBlur={() => setIsFocusDes(false)}
                            multiline={true} 
                            numberOfLines={4} 
                            textAlignVertical="top"
                        />
                        {isFocusDes && (
                            <Feather onPress={() => setDesProduct('')} name="x" size={24} color="gray" style={styles.clearIcon} />
                        )}
                    </View>
                </View>

                <Text style={styles.label}>Giá muốn bán</Text>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={[styles.input,{color:"red", fontWeight:
                        "bold"}]}
                            onChangeText={setPrice}
                            value={price}
                            placeholder="Nhập giá"
                            placeholderTextColor="#666"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => {
                                setIsFocus(false);
                                handlePriceChange(price);
                            }}
                            keyboardType="numeric"
                        />
                        {isFocus && (
                            <Feather onPress={() => setPrice('')} name="x" size={24} color="gray" style={styles.clearIcon} />
                        )}
                    </View>
                </View>

                
                <Text style={styles.label}>Địa chỉ</Text>
                <View style={styles.searchWrapper} onPress={()=>{setIsShowMoadalAdress(true) }}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAdress}
                            value={address}
            
                            placeholder="Địa chỉ sản phẩm"
                            placeholderTextColor="#666"
                            //onFocus={() => setIsFocusAdress(true)}
                            //onBlur={() => setIsFocusAdresss(false)}
                        />
                        {isFocusAddress && (
                            <Feather onPress={() => setAdress('')} name="x" size={24} color="gray" style={styles.clearIcon} />
                        )}
                    </View>
                </View>


                <TouchableOpacity style={styles.submitButton} onPress={handlePost}>
                    <Text style={styles.submitButtonText}>Đăng tin</Text>
                </TouchableOpacity>
            </ScrollView>

            <ModalSuccess isShow={isShowModal} closeModal={closeModal} mes={"Cảm ơn bạn đã chia sẻ"} />
            <AddressModal isShow={isShowModalAdress } closeModal={closeModal}/>
        </View>
    );
};

const styles = StyleSheet.create({
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
    postButton: {},
    label: {
        marginHorizontal: 16,
        marginTop: 16,
        fontWeight: 'bold',
        color: "#584F49",
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
        position: "relative",
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
       
        
    },
    searchWrapper: {
        paddingHorizontal: 17,
        marginVertical: 8,
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
    clearIcon: {
        position: "absolute",
        right: 10,
    },
    submitButton: {
        backgroundColor: '#009432',
        marginHorizontal: 16,
        marginVertical: 26,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    uploadContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
    },
    uploadBox: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 35,
        width: "80%",
        borderWidth: 1,
        borderColor: "#009432",
        borderStyle: "dashed",
        borderRadius: 4,
    },
    uploadText: {
        marginTop: "3%",
        color: "gray",
        fontWeight: "bold",
    },
});

export default PostProduct;
