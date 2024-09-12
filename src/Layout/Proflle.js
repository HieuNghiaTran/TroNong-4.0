import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground, Image, useWindowDimensions } from 'react-native';
import { MaterialIcons, Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { UserContext } from '../Context/authContext';


const Article = () => {


    return (<>


    </>)

}
const Sell = () => {


    return (<>


    </>)

}



const Profile = () => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation();
    const [routes] = useState([
        { key: 'first', title: 'Bài đăng' },
        { key: 'second', title: 'Sản phẩm' },
    ]);
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const renderScene = SceneMap({
        first: Article,
        second: Sell,
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
                <Text style={styles.headerText}>{user.fullname&&user.fullname}</Text>
                <TouchableOpacity style={styles.postButton} />
            </View>
            <View style={styles.profile}>
                <ImageBackground
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={styles.backgroundImage}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Feather name="camera" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Feather name="edit-2" size={24} color="#fff" />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <FontAwesome name="user" size={24} color="gray" style={styles.detailIcon} />
                        <Text style={styles.detailText}>{user.fullname&&user.fullname}</Text>
                        <Feather name="edit-2" size={20} color="gray" style={[styles.detailIcon, { marginLeft: 5 }]} />
                    </View>

                    <View style={styles.detailRow}>
                        <FontAwesome name="mobile-phone" size={24} color="gray" style={styles.detailIcon} />
                        <Text style={styles.detailText}>{user.phone&&user.phone}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Entypo name="location" size={24} color="gray" style={styles.detailIcon} />
                        <Text style={styles.detailText}>Huyện Châu Thành - An Giang</Text>
                    </View>
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
            </View>


           
        </>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        marginTop:15,
        paddingHorizontal: 16,
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
    profile: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    backgroundImage: {
        height: 250,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'absolute',
        left: 20,
        bottom: -50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#fff',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#27ae60',
        borderRadius: 20,
        padding: 8,
    },
    editButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#27ae60',
        borderRadius: 20,
        padding: 8,
    },
    detailsContainer: {
        marginTop: 60,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    detailIcon: {
        marginRight: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 10,
    },
    labelTab: {
        color: "#fff",
        marginVertical: 10
    },
});

export default Profile;
