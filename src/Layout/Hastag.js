import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';

const Hastag = () => {
    let list = ["caphe", "giaitri", "lua", "benhcualua", "gialua", "meovat"];

    let styles = StyleSheet.create({
        scrollViewContainer: {
            backgroundColor: "#fff",
            marginTop: 5,
            padding: 10,
            height:"12%"
        },
        hastagContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        itemhastag: {
            borderWidth: 0.5,
            borderColor: "#f0932b",
            marginRight: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",

        },
        icon: {
            marginRight: 5,
        },
    });

    return (
        <ScrollView horizontal={true} style={styles.scrollViewContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.hastagContainer}>
                {list.map((item, index) => (
                    <View key={index} style={styles.itemhastag}>
                        <AntDesign name="tags" size={24} color="gray" style={styles.icon} />
                        <Text style={{fontSize:16}}>{item}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default Hastag;
