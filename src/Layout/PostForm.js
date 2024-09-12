import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { postArticle } from '../Services/ArticleServices';
import { UserContext } from '../Context/authContext';
import Loading from './Loading';
import { getAllHastag } from '../Services/HastagServies';

const PostForm = () => {
    const { user } = useContext(UserContext)
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [isloading, setIsLoading] = useState(false)
    const [selectedHastag, setSelectedHastag] = useState([])

    const [list, setList] = useState([]);
    useEffect(() => {
        fetchData()

    }, [])
    const fetchData = async () => {
        let res = await getAllHastag()
        setList(res.data)
    }

    const avatar = user && user.avatar ? user.avatar : "https://res.cloudinary.com/dofj1px4t/image/upload/v1718769506/Tr%E1%BB%A3%20N%C3%B4ng%204.0/logo-1_k0r80f.png";

    const pickMedia = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => asset.uri);
            setImages(selectedImages);
        }
    };

    const handlePost = async () => {
        try {
        setIsLoading(true)

        let imageFiles = await Promise.all(images.map(async (uri) => {

            const fileContent = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64
            });
            return "data:image/jpeg;base64," + fileContent;
        }));

        imageFiles = imageFiles.filter(file => file !== null);
        let data = {
            id_hastag: selectedHastag,
            user_id: user._id,
            content: content,
            images: imageFiles,
            view: 0
        };   
            let res = await postArticle(data);
            navigation.navigate('Forum', { isReload: true })
        } catch (err) {
            console.log(err);
        }



        setIsLoading(false)
    };

    const selectHastag = (item) => {

        setContent(content + "\n" + "#" + item.hastag + " ")
        if (!selectedHastag.includes(item._id)) {
        selectedHastag.push(item._id)
        }
    }

    return (
        <>
            {isloading ? (
                <Loading />
            ) : (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                        <Text style={styles.headerText}>Tạo tin đăng</Text>
                        <TouchableOpacity style={{ flexDirection: "row", borderRadius: 5 }} onPress={handlePost}>
                            <Text style={{ fontWeight: content ? "bold" : "400", fontSize: 15, color: "#fff", marginLeft: 4 }}>Đăng</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: "row", marginTop: 20, paddingHorizontal: 20, alignItems: "center" }}>
                            <Image
                                source={{ uri: avatar }}
                                style={styles.userAvatar}
                            />
                            <Text style={{ fontWeight: "bold", alignItems: "center", fontSize: 17 }}>{user.fullname}</Text>
                        </View>

                        <ScrollView horizontal={true} style={styles.scrollViewContainer} showsHorizontalScrollIndicator={false}>
                            <View style={styles.hastagContainer}>
                                {list.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.itemhastag} onPress={() => { selectHastag(item) }}>
                                        <AntDesign name="tags" size={24} color="gray" style={styles.icon} />
                                        <Text style={{ fontSize: 16 }}>{item.hastag}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <TextInput
                            placeholder='Bạn đang nghĩ gì ?'
                            multiline
                            style={{ paddingHorizontal: 10, marginVertical: 20, width: "100%", fontSize: 16, color: 'black' }} 
                            onChangeText={setContent}
                            value={content}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20, paddingHorizontal: 10 }}>
                            {images.map((uri, index) => (
                                <Image
                                    key={index}
                                    source={{ uri }}
                                    style={{
                                        width: images.length > 1 ? "50%" : "80%",
                                        height: 300,
                                        margin: 5,
                                        flexDirection: images.length > 1 ? "row" : "column",
                                    }}
                                />
                            ))}
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={styles.imageButton} onPress={pickMedia}>
                        <Entypo name="images" size={24} color="red" />
                        <Text style={{ marginLeft: 10, fontWeight: "bold", color: "green" }}>Chọn ảnh từ thư viện của bạn</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
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
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    scrollViewContainer: {
        backgroundColor: "#fff",
        marginTop: 5,
        padding: 10,
    },
    hastagContainer: {
        flexDirection: "row",
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
    imageButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 10,
        backgroundColor: "#f0f0f0",
    },
});

export default PostForm;
