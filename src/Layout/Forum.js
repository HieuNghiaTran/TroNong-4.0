import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ModalInformLogin from './ModalInformLogin';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Hastag from './Hastag';
import Post from './Post';

const Forum = () => {
    const navigation = useNavigation();
    const [isLogin, setIsLogin] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isFocus, setIsForus] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([
        { id: 1, title: 'Bài viết 1', content: 'Nội dung bài viết 1' },
        { id: 2, title: 'Bài viết 2', content: 'Nội dung bài viết 2' },
        { id: 3, title: 'Bài viết 3', content: 'Nội dung bài viết 3' },
        { id: 4, title: 'Bài viết 4', content: 'Nội dung bài viết 4' },
        { id: 5, title: 'Bài viết 5', content: 'Nội dung bài viết 5' },
    ]);

    const closeModal = () => {
        setIsShowModal(false);
    };

    const renderItem = ({ item }) => (
        <Post title={item.title} content={item.content} />
    );

    return (
        <>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <MaterialIcons name="keyboard-backspace" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718769506/Tr%E1%BB%A3%20N%C3%B4ng%204.0/logo-1_k0r80f.png" }}
                            style={styles.imageLogo}
                        />
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="info" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={24} color="gray" />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        placeholder="Tìm kiếm"
                        onFocus={() => setIsForus(true)}
                        onBlur={() => setIsForus(false)}
                    />
                    {isFocus && (
                        <Feather onPress={() => setSearchQuery('')} name="x" size={24} color="gray" style={{ position: "absolute", right: 10 }} />
                    )}
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.questionContainer} onPress={() => navigation.navigate('PostForm')}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png" }}
                        style={styles.userAvatar}
                    />
                    <Text style={styles.questionInput}>Bạn hãy đặt câu hỏi tại đây...</Text>
                    <MaterialCommunityIcons name="image-plus" size={24} color="#009432" />
                </TouchableOpacity>
                <Hastag />
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <ModalInformLogin isShow={isShowModal} closeModal={closeModal} />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#009432',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: StatusBar.currentHeight || 0,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:999
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    imageLogo: {
        width: 500,
        height: 60,
        resizeMode: 'contain',
 
    },
    searchContainer: {
        alignItems: 'center',
        marginVertical: 5,
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '89%',
        margin: "auto",
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    cardButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardButtonText: {
        marginLeft: 5,
        color: '#009432',
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 5,
        elevation: 2,
        height: 70,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    questionInput: {
        flex: 1,
        height: 40,
        fontWeight: "500",
        paddingHorizontal: 10,
    },
});

export default Forum;
