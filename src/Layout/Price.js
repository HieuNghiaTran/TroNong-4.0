import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const RicePrice = () => {
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isIncrease, setIsIncrease] = useState(true)
    const [isFocus, setIsForus] = useState(false);

    const data = [
        { id: 1, type: 'Jasmine', location: 'Can Tho', time: '12/03/2002', price: '1000' },
        { id: 2, type: 'Basmati', location: 'Hanoi', time: '12/03/2002', price: '1200' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },
        { id: 3, type: 'Sushi', location: 'Ho Chi Minh', time: '12/03/2002', price: '1100' },

    ];
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Giá lúa hôm nay</Text>
                <TouchableOpacity style={styles.postButton}  onPress={() => navigation.navigate('ContributePrice')}>
                    {/* <Text style={styles.postButtonText}>Đăng</Text> */}

                    <AntDesign name="pluscircleo" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            placeholder="Tìm kiếm"
                            placeholderTextColor="#666"
                            onFocus={() => setIsForus(true)}
                            onBlur={() => setIsForus(false)}
                        />
                         {isFocus && (
                        <Feather onPress={() => setSearchQuery('')} name="x" size={24} color="gray" style={{ position: "absolute", right: 10 }} />
                    )}
                    </View>
                </View>

                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton}>
                        <MaterialCommunityIcons name="seed" size={18} color="gray" />
                        <Text style={styles.filterButtonText}>Giống lúa</Text>
                        <AntDesign name="caretdown" size={15} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Entypo name="location-pin" size={18} color="gray" />
                        <Text style={styles.filterButtonText}>Địa điểm</Text>
                        <AntDesign name="caretdown" size={15} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Entypo name="back-in-time" size={18} color="gray" />
                        <Text style={styles.filterButtonText}>Thời gian</Text>
                        <AntDesign name="caretdown" size={15} color="gray" />
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 5 }}>
                    {data.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.itemText, { fontWeight: "bold" }]}> {item.type}</Text>
                                <Text style={styles.itemText}>{item.location}</Text>

                                <Text style={{ color: "red", fontWeight: "bold" }}>{formatPrice(item.price)} đ</Text>


                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                <Text style={styles.timeText}>{item.time}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {isIncrease ? <AntDesign name="caretup" size={10} color="green"   style={{marginVertical:"auto"}}/> : <AntDesign name="caretdown" size={10} color="#ffa500"  style={{marginVertical:"auto"}}/>}
                                    {isIncrease ?          <Text style={{marginHorizontal:4, color:"green"}}>{formatPrice(2300)} đ</Text>:  <Text  style={{marginHorizontal:4, color:"#ffa500"}}>{formatPrice(2300)} đ</Text>}
                                </View>

                            </View>
                        </View>

                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
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
        flexDirection: "row",
        borderRadius: 5,
        //backgroundColor: '#007AFF',
        //paddingHorizontal: 10,
        paddingVertical: 5,
    },
    postButtonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
    },
    scrollView: {
        flex: 1,

    },
    searchWrapper: {
        backgroundColor: "#009432",
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        width: '100%',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
    filterButton: {
        flexDirection: "row",
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    filterButtonText: {
        fontSize: 15,
        color: '#584F49',
        marginHorizontal: 4,
        alignItems: "center",
    },
    itemContainer: {
        backgroundColor: '#ffff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 2,
        borderRadius: 5,

    },
    itemText: {
        fontSize: 16,
        color: '#333',
        textAlign: "center",
        alignItems: "center",


    },


    timeText: {
        fontSize: 12,
        color: "#584F49",


    }
});

export default RicePrice;
