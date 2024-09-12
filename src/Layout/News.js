import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, useWindowDimensions, Image, FlatList, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalSuccess from "./ModalSucces";
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import VideoItem from './VideoItem';
import axios from 'axios';
const News = () => {
    let data = [
        { id: 1, title: "Nông dân sáng chế ra máy gặt đập liên hợp thông minh", view: "12", img: "https://picsum.photos/200/300", time: "12/02/2024" },
        { id: 2, title: "Phương pháp mới trong canh tác nông nghiệp", view: "8", img: "https://picsum.photos/200/300", time: "10/02/2024" },
        { id: 3, title: "Ứng dụng công nghệ cao vào sản xuất nông nghiệp", view: "15", img: "https://picsum.photos/200/300", time: "09/02/2024" },
        { id: 4, title: "Giải pháp tưới tiêu hiệu quả", view: "20", img: "https://picsum.photos/200/300", time: "08/02/2024" },
        { id: 5, title: "Cách phòng tránh sâu bệnh cho cây trồng", view: "10", img: "https://picsum.photos/200/300", time: "07/02/2024" },
        { id: 6, title: "Chia sẻ kinh nghiệm làm nông từ các chuyên gia", view: "18", img: "https://picsum.photos/200/300", time: "06/02/2024" }
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.articleContainer}>
            <Image source={{ uri: item.img }} style={styles.articleImage} />
            <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <View style={styles.articleMeta}>
                    <View style={styles.metaItem}>
                        <MaterialIcons name="date-range" size={20} color="#584F49" />
                        <Text style={styles.metaText}>{item.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <FontAwesome name="eye" size={15} color="#584F49" />
                        <Text style={styles.metaText}>{item.view}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <TouchableOpacity style={styles.Toparticle}>
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.ToparticleImage} />
                <View style={styles.ToparticleContent}>
                    <Text style={styles.ToparticleTitle}>{data[0].title}</Text>
                    <View style={styles.ToparticleMeta}>
                        <View style={styles.metaItem}>
                            <MaterialIcons name="date-range" size={20} color="#584F49" />
                            <Text style={styles.metaText}>{data[0].time}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <FontAwesome name="eye" size={15} color="#584F49" />
                            <Text style={styles.metaText}>{data[0].view}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </ScrollView>
    );
};

const Video = () => {
    const [videos, setVideos] = useState([]);

    const { height } = Dimensions.get('window');
    const API_KEY = 'ozHtw2fnDv8PrFJmkK07qoBIqHj0kbl5Sq7gpDe9n7UclN4O94VcKwAE';

    useEffect(() => {
        axios
            .get('https://api.pexels.com/videos/popular', {
                headers: {
                    Authorization: API_KEY,
                },
            })
            .then(response => {
                setVideos(response.data.videos);
                console.log(videos)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (

        <View style={{flex:1}}>
            <FlatList
                data={videos}
                renderItem={({ item }) => <VideoItem video={{ uri: item.video_files[0].link, title: item.user.name }} />}
                keyExtractor={(item, index) => index.toString()}
                snapToInterval={height}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};



const Tintuc = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    const [routes] = useState([
        { key: 'first', title: 'Tin tức' },
        { key: 'second', title: 'Video ngắn' },
    ]);

    const renderScene = SceneMap({
        first: News,
        second: Video,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={{ backgroundColor: '#fff', borderTopRightRadius: 18, borderTopLeftRadius: 20 }}
            labelStyle={styles.labelTab}
            tabStyle={styles.tab}
            renderLabel={({ route, focused }) => (
                <Text style={[
                    styles.label,
                    { color: focused ? '#1C0A0A' : '#584F49' },
                    focused && { fontWeight: 'bold' }
                ]}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Tin tức nông nghiệp</Text>
                <TouchableOpacity style={styles.postButton}>
                </TouchableOpacity>
            </View>
            <View style={styles.tabContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        position:"relative"
    },
    Toparticle: {
        padding: 15,
        borderRadius: 10,
        width: "100%",
        height: 400,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: "gray",
        position: 'relative',
    },
    ToparticleImage: {
        width: "100%",
        height: "70%",
        borderRadius: 10,
    },
    ToparticleContent: {
        padding: 10,
    },
    ToparticleTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 10
    },
    ToparticleMeta: {
        flexDirection: "row",
        justifyContent: "space-between"
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
    label: {
        fontWeight: 'bold',
        marginVertical: 10,
    },
    labelTab: {
        color: "#fff",
        marginVertical: 10
    },
    articleContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
        marginHorizontal: 10
    },
    articleImage: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    articleContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center"
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    articleMeta: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    metaText: {
        marginLeft: 5
    },
    listContainer: {
        paddingBottom: 20
    }
});

export default Tintuc;
