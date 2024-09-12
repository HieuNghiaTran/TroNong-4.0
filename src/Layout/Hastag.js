import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAllHastag } from '../Services/HastagServies';

const Hastag = ({ onHashtagPress }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetchData()

    }, [])
    const fetchData = async () => {
        let res = await getAllHastag()
        setList(res.data)
    }
    const styles = StyleSheet.create({
        scrollViewContainer: {
            backgroundColor: "#fff",
            marginTop: 5,
            padding: 10,
            height: 80,
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
        <ScrollView
            horizontal={true}
            style={styles.scrollViewContainer}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.hastagContainer}>
                {list.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.itemhastag}
                        onPress={() => onHashtagPress(item._id)}
                    >
                        <AntDesign name="tags" size={24} color="gray" style={styles.icon} />
                        <Text style={{ fontSize: 16 }}>{item.hastag}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

export default Hastag;
