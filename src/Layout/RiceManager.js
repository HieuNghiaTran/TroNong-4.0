import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import ModalAddNew from './ModalAddNew';

const RiceManager = () => {
    const navigation = useNavigation();
    const [isShowModal, setIsShowModal] = useState(false);

    const closeModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Quản lý thu chi</Text>
                <MaterialCommunityIcons name="note-edit-outline" size={24} color="#fff" onPress={() => setIsShowModal(true)} />
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.historyText}>Lịch sử chi tiêu</Text>
                <View style={styles.itemContainer}>
                    <View style={styles.itemDetails}>
                        <View style={{ padding: 0 }}>
                            <View style={styles.dateRow}>
                                <Text style={styles.itemLabel}>Ngày: 14/06/2024</Text>
                         
                            </View>
                        </View>
                      <View style={{padding:15}}>

                      <View style={styles.itemRow}>
                            <Text style={styles.itemLabel}>Đất:</Text>
                            <Text style={[styles.itemValue, styles.boldText]}>Tám Tâm</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.itemLabel}>Chi:</Text>
                            <Text style={[styles.itemValue, styles.expenseValue]}>12.000đ</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.itemLabel}>Thu:</Text>
                            <Text style={[styles.itemValue, styles.incomeValue]}>12.000đ</Text>
                        </View>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.detailLink}>Xem chi tiết</Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                </View>
            </ScrollView>
            <ModalAddNew isShow={isShowModal} closeModal={closeModal} />
        </>
    );
};

const styles = StyleSheet.create({
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
    scrollView: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    historyText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#009432',
    },
    itemContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    itemDetails: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E0F8D8',
        padding: 15,
       
    },
    itemLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    itemValue: {
        fontSize: 16,
        color: '#666',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#3742fa',
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    expenseValue: {
        backgroundColor: '#e62929',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        color: '#fff',
    },
    incomeValue: {
        backgroundColor: '#6ddd25',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        color: '#fff',
    },
    detailLink: {
        color: '#009432',
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default RiceManager;
