import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Post from "./Post";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const Comment = ({ id }) => {
    const navigation = useNavigation();
    const [isShowReply, setIsShowReply] = useState(false);

    // Sample user data
    const comments = [
        {
            id: 1,
            user: {
                name: 'Author Name',
                avatar: 'https://via.placeholder.com/40'
            },
            text: 'This is a sample comment text.',
            timestamp: '1 tiếng trước'
        },
        {
            id: 2,
            user: {
                name: 'Another Author',
                avatar: 'https://via.placeholder.com/40'
            },
            text: 'Another sample comment.',
            timestamp: '2 tiếng trước'
        }
    ];

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#009432',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingTop: StatusBar.currentHeight || 0,
        },
        headerText: {
            flex: 1,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
        },
        container: {
            flex: 1,
            backgroundColor: '#f4f4f4',
        },
        commentItem: {
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 16,
            marginTop: 5,
            borderWidth: 1,
            borderColor: '#ddd',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 12,
        },
        commentContent: {
            flex: 1,
        },
        author: {
            fontSize: 14,
            color: '#1C0A0A',
            fontWeight: "bold",
            marginBottom: 4,
        },
        commentText: {
            fontSize: 16,
            color: '#333',
            marginBottom: 8,
        },
        commentFooter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        timestamp: {
            fontSize: 13,
            color: '#130f40',
            marginRight: 10,
            marginLeft: 3
        },
        replyText: {
            fontSize: 13,
            color: '#130f40',
            marginLeft: 5,
        },
        // Reply section styles
        replyContainer: {
            marginTop: 10,
            padding: 10,
            backgroundColor: '#f9f9f9',
            borderRadius: 8,

        },
        replyInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        replyInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            paddingHorizontal: 10,
            height: 40,
            marginLeft: 10,
        },
        closeIcon: {
            position: "absolute",
            right: 10,
            top: 10,
        },
        sendIcon: {
            marginLeft: 10,
        }
    });

    return (
        <>
            <View style={styles.header}>
                <MaterialIcons
                    name="keyboard-backspace"
                    size={24}
                    color="#fff"
                    onPress={() => { navigation.goBack() }}
                />
                <Text style={styles.headerText}>Bình luận bài viết</Text>
            </View>

            <View style={styles.container}>
                <Post />

                {comments.map(comment => (
                    <View key={comment.id} style={styles.commentItem}>
                        <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
                        <View style={styles.commentContent}>
                            <Text style={styles.author}>{comment.user.name}</Text>
                            <Text style={styles.commentText}>{comment.text}</Text>
                            <View style={styles.commentFooter}>
                                <Entypo name="back-in-time" size={13} color="#130f40" />
                                <Text style={styles.timestamp}>{comment.timestamp}</Text>

                                <AntDesign name="like2" size={15} color="#130f40" />
                                <TouchableOpacity style={{ marginLeft: 1, marginRight: 10 }}>
                                    <Text style={styles.replyText}>Thích</Text>
                                </TouchableOpacity>
                                <Entypo name="reply" size={15} color="#130f40" />
                                <TouchableOpacity style={{ marginLeft: 1 }} onPress={() => setIsShowReply(!isShowReply)}>
                                    <Text style={styles.replyText}>Phản hồi</Text>
                                </TouchableOpacity>
                            </View>

                            {isShowReply && (
                                <View style={styles.replyContainer}>
                                  {/* <View>
                                  <Feather
                                        onPress={() => { setIsShowReply(false) }}
                                        name="x"
                                        size={24}
                                        color="gray"
                                        style={styles.closeIcon}
                                    />
                                  </View>   */}
                                    <View style={styles.replyInputContainer}>
                                        <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
                                        <TextInput
                                            placeholder='Viết trả lời'
                                            style={styles.replyInput}
                                        />
                                        <Ionicons
                                            name="send"
                                            size={24}
                                            color="black"
                                            style={styles.sendIcon}
                                        />
                                    </View>
                                </View>
                            )}

                        </View>
                    </View>
                ))}
            </View>
        </>
    );
}

export default Comment;
