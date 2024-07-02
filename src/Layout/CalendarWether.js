import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CalendarWeather = () => {
    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866119/products/calendar_cmeqbu.png" }}
                    style={styles.icon}
                />
                <Text style={styles.text}>Hôm nay: {new Date().toLocaleDateString('vi-VN')}</Text>
            </View>
            <View style={styles.weatherContainer}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866455/products/cloudy_pvhp9d.png" }}
                    style={styles.icon}
                />
                <Text style={styles.text}>Thời tiết: Nắng</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#009432',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    calendarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CalendarWeather;
