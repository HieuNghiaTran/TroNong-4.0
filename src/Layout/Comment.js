import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Post from "./Post";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CommentArticle } from '../Services/ArticleServices';
import { UserContext } from '../Context/authContext';
import { getUserById } from '../Services/UserServies';
import ModalInformLogin from './ModalInformLogin';
import moment from 'moment';
import 'moment/locale/vi'; 
moment.locale('vi');

const Comment = ({ id }) => {
    const navigation = useNavigation();
    const [isShowReply, setIsShowReply] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [commentUsers, setCommentUsers] = useState({});
    const { user } = useContext(UserContext);
    const route = useRoute();
    let { article } = route.params || false;
    const [isShowModal, setIsShowModal] = useState(false);
    const closeModal = () => {
        setIsShowModal(false);
    };

    useEffect(() => {
        const fetchUserNames = async () => {
            const users = {};
            for (const comment of article.comment) {
                const userId = comment.user_id;
                if (!users[userId]) {
                    try {
                        const response = await getUserById(userId);
                        users[userId] = {
                            fullname: response.data.fullname,
                            avatar: response.data.avatar
                        };
                    } catch (error) {
                        console.error( error);
                        users[userId] = {
                            fullname: 'Unknown User',
                            avatar: null
                        };
                    }
                }
            }
            setCommentUsers(users);
        };
        fetchUserNames();
    }, [article]);

    useEffect(()=>{if(user)setIsShowModal(false)},[user])
    const formatTimestamp = (timestamp) => {
        return moment(timestamp).fromNow();
    };
    
    const handleAddComment = async () => {
      if(user){
        if (newComment.trim()) {
            const data = {
                _id: article._id,
                user_id: user._id,
                comment: newComment,
                timestamp: new Date(),
            };
            let res = await CommentArticle(data)
            console.log(res.data)
            setNewComment('');
        }


      }else{
        setIsShowModal(true)
      }
    };

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
        },
        newCommentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#ddd',
        },
        newCommentInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            paddingHorizontal: 10,
            height: 40,
        },
        newCommentButton: {
            marginLeft: 10,
        },
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
                <ScrollView>
                    <Post item={article} isComment={true} />

                    {article.comment.map(comment => (
                        <View key={comment.id} style={styles.commentItem}>
                            <Image
                                source={{ uri: commentUsers[comment.user_id]?.avatar || 'https://res.cloudinary.com/dofj1px4t/image/upload/v1723726475/products/user_m4yk84.png' }} // Use a default avatar if none is available
                                style={styles.avatar}
                            />
                            <View style={styles.commentContent}>
                                <Text style={styles.author}>{commentUsers[comment.user_id]?.fullname || 'Loading...'}</Text>
                                <Text style={styles.commentText}>{comment.comment}</Text>
                                <View style={styles.commentFooter}>
                                    <Entypo name="back-in-time" size={13} color="#130f40" />
                                    <Text style={styles.timestamp}>{formatTimestamp(comment.timestamp)}</Text>

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
                                        <View>
                                            <Feather
                                                onPress={() => { setIsShowReply(false) }}
                                                name="x"
                                                size={24}
                                                color="gray"
                                                style={styles.closeIcon}
                                            />
                                        </View>
                                        <View style={styles.replyInputContainer}>
                                            <Image source={{ uri: commentUsers[comment.user_id]?.avatar || 'default_avatar_url' }} style={styles.avatar} />
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
                </ScrollView>
            </View>

            <View style={styles.newCommentContainer}>
                <TextInput
                    placeholder="Viết bình luận..."
                    style={styles.newCommentInput}
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity onPress={handleAddComment} style={styles.newCommentButton}>
                    <Ionicons name="send" size={24} color="#009432" />
                </TouchableOpacity>
            </View>
            <ModalInformLogin isShow={isShowModal} closeModal={closeModal} />
        </>
    );
}

export default Comment;
