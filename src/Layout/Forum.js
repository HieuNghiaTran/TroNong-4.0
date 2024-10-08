import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
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
import { UserContext } from '../Context/authContext';
import { ScrollView } from 'react-native-gesture-handler';
import { fillterArticle, getAllArticle, search } from '../Services/ArticleServices';
import Loading from './Loading';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';
const Forum = () => {
    const { isLogin } = useContext(UserContext)
    const navigation = useNavigation();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [list, setList] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const route = useRoute();
    let { isReload } = route.params || false;
    useEffect(() => { if (isLogin) setIsShowModal(false) }, [isLogin])
    useEffect(() => {
        setIsLoading(true)
        handleGetAllArticle().finally(() => {
            setIsLoading(false);
        });
    }, [])
    const handleGetAllArticle = async () => {
        try {
            let response = await getAllArticle();
            if (response && response.data) {
                setList(response.data);
            }

        } catch (error) {

            console.error("Failed to fetch articles:", error);
        }
    }

    const closeModal = () => {
        setIsShowModal(false);
    };


    const notLogin = () => {
        if (!isLogin) setIsShowModal(true)

    }

    useEffect(() => {
        if (isReload) {

            setIsLoading(true)
            handleGetAllArticle().finally(() => {
                setIsLoading(false);
            });
            isReload = false
        }


    }, [isReload])



    const onHashtagPress = async (id) => {
        setIsLoading(true)
        let res = await fillterArticle(id);
        res.data && setList(res.data)
        setIsLoading(false)


    }

    const handleSearchArticle = async () => {
        setIsLoading(true)
        let res = await search(searchQuery)
        console.log(res.data);
        setList(res.data)
        setIsLoading(false)
        setSearchQuery('')


    }
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
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        returnKeyType="search"
                        onSubmitEditing={handleSearchArticle}
                    />
                    {isFocus && (
                        <Feather onPress={() => setSearchQuery('')} name="x" size={24} color="gray" style={{ position: "absolute", right: 10 }} />
                    )}
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.questionContainer} onPress={() => isLogin ? navigation.navigate('PostForm') : setIsShowModal(true)}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png" }}
                        style={styles.userAvatar}
                    />
                    <Text style={styles.questionInput}>Bạn hãy đặt câu hỏi tại đây...</Text>
                    <MaterialCommunityIcons name="image-plus" size={24} color="#009432" />
                </TouchableOpacity>

                {isloading ? (
                    <Loading />
                ) : (
                    <>

                        <Hastag onHashtagPress={onHashtagPress} />
                        <ScrollView>
                            {Array.isArray(list) && list.map((item) => (
                                <Post key={item._id} item={item} notLogin={notLogin} />
                            ))}
                        </ScrollView></>)}
            </View>
            <ModalInformLogin isShow={isShowModal} closeModal={closeModal} />
        </>
    )
}



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
        zIndex: 999
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
