import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { chatWithGPT } from '../Services/ChatServices';
import * as ImagePicker from 'expo-image-picker';

const RiceManager = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [images, setImages] = useState([]);
    const flatListRef = useRef(null);

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (inputMessage.trim()) {
            const newMessages = [...messages, { id: messages.length, text: inputMessage, isUser: true }];
            setMessages(newMessages);
            setInputMessage('');

            try {
                const response = await chatWithGPT(inputMessage);
                const aiMessage = response;
                setMessages(prevMessages => [...prevMessages, { id: prevMessages.length, text: aiMessage, isUser: false }]);
            } catch (error) {
                console.error('Error fetching data from OpenAI:', error);
            }
        }
    };

    const pickMedia = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => asset.uri);
            setImages(selectedImages);
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
            {item.isUser ? (
                <View style={styles.userContent}>
                    <Text style={{ backgroundColor: "#DCF8C6", padding: 15, borderRadius: 12, borderBottomRightRadius: 0 ,color:"#1C0A0A"}}>{item.text}</Text>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png' }}
                            style={styles.avatar}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.aiContent}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dofj1px4t/image/upload/v1719908520/Tr%E1%BB%A3%20N%C3%B4ng%204.0/android_vafx8e.png' }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={{ backgroundColor: "#ECECEC", padding: 15, borderRadius: 12, borderBottomLeftRadius: 0 , color:"#1C0A0A"}}>{item.text}</Text>
                </View>
            )}
        </View>
    );

    return (
        <>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Chat AI</Text>
                <MaterialCommunityIcons name="note-edit-outline" size={24} color="#fff" />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.chatContainer}
                />
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={pickMedia}>
                        <MaterialCommunityIcons name="image-plus" size={40} color="green" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        placeholder="Nhập tin nhắn..."
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <MaterialIcons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
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
    chatContainer: {
        padding: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 8,
        marginBottom: 10,
        maxWidth: '90%',
    },
    userMessage: {

        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },

    userContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    aiContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginHorizontal: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
    },
    sendButton: {
        backgroundColor: '#009432',
        padding: 10,
        borderRadius: 9,
    },
});

export default RiceManager;
