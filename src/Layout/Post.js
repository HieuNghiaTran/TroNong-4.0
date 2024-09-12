import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/authContext";
import { getUserById } from "../Services/UserServies";
import { CheckLike, Like, UnLike, getArticleById } from "../Services/ArticleServices";
import ModalInformLogin from "./ModalInformLogin";
import { Share } from 'react-native';


const Post = ({ item, isComment, activeComment, notLogin }) => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [isLiked, setIsLiked] = useState(false)
    const { user } = useContext(UserContext);
    const [isShowModal, setIsShowModal] = useState(false);

    const closeModal = () => {
        setIsShowModal(false);
    };

    useEffect(() => {

        fetchUserName();
        CheckUserIsLike()
    }, [item]);

    const fetchUserName = async () => {
        if (item?.user_id) {
            try {
                const response = await getUserById(item.user_id);
                setUserName(response?.data?.fullname || 'Người dùng');
            } catch (error) {
                console.error("Failed to fetch user name:", error);
                setUserName('Unknown User');
            }
        }
    };
    const getarticlebyId = async (id) => {

        let res = await getArticleById(id)
        return res.data

    }
    const handleCommentPress = async () => {
        if (!isComment) {

            try {
                const articleData = await getarticlebyId(item._id);
                if (articleData) {
                    navigation.navigate('Comment', { article: articleData });
                }
            } catch (error) {
                console.error("Failed to fetch article data:", error);
            }

        } else {
            activeComment()


        }
    };
    if (!item) {
        return null;
    }




   

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: item.content ? `${item.content}\n\nXem thêm tại: https://link-to-article.com/${item._id}` : 'Check out this post!',
                url: item.images && item.images.length > 0 ? item.images[0].url : undefined,
            });
           
        } catch (error) {
            console.error('Error sharing post: ', error);
        }
    };
    const CheckUserIsLike = async () => {

        let data = {
            user_id: user._id
        }
        let res = await CheckLike(item._id, data);
        if (res.data === "like") {

            setIsLiked(true)

        } else {
            setIsLiked(false)

        }


    }

    const handleLike = async () => {

        if (user) {
            setIsLiked(!isLiked)
            if (isLiked) {
                let data = {
                    user_id: user._id
                }
                let res = await UnLike(item._id, data)
                setIsLiked(false);

            } else {
                let data = {
                    user_id: user._id
                }
                let res = await Like(item._id, data)
                setIsLiked(true);

            }


        } else {

            notLogin()
        }
    }
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png" }}
                        style={styles.userAvatar}
                    />
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{userName}</Text>
                        <View style={styles.postTimeContainer}>
                            <Entypo name="back-in-time" size={15} color="gray" />
                            <Text style={styles.postTime}>15 giây trước</Text>
                        </View>
                        <Text style={styles.postViews}>{item.View ?? 0} lượt xem</Text>
                    </View>
                </View>
                <Entypo name="dots-three-vertical" size={24} color="gray" />
            </View>
            <View style={styles.postContent}>
                <Text style={styles.postText}>{item.content ?? ''}</Text>

                {item.images && item.images.map((element, index) => (
                    <Image
                        key={index}
                        source={{ uri: element.url }}
                        style={styles.postImage}
                    />
                ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="like1" size={14} color="#1B9CFC" />
                    {isLiked ? <Text style={{ marginHorizontal: 4 }}>{item.like.length + 1} lượt thích</Text> : <Text style={{ marginHorizontal: 4 }}>{item.like ? item.like.length : 0} lượt thích</Text>}
                </View>
                <Text >{item.comment ? item.comment.length : 0} bình luận</Text>
            </View>


            <View style={styles.postAction}>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }} onPress={handleLike}>
                    {isLiked ? <AntDesign name="like2" size={20} color="blue" /> : <AntDesign name="like2" size={20} color="gray" />}
                    {isLiked ? <Text style={{ marginHorizontal: 5, color: "blue" }}>Thích</Text> : <Text style={{ marginHorizontal: 5 }}>Thích</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }} onPress={handleCommentPress}>
                    <FontAwesome5 name="comment-alt" size={20} color="gray" />
                    <Text style={{ marginHorizontal: 5 }}>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }} onPress={handleShare}>
                    <FontAwesome5 name="share" size={20} color="gray" />
                    <Text style={{ marginHorizontal: 5 }}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
            <ModalInformLogin isShow={isShowModal} closeModal={closeModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginRight: 10,
    },
    questionInput: {
        flex: 1,
        height: 40,
        fontWeight: "500",
        paddingHorizontal: 10,
    },
    postContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 5
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userDetails: {
        marginLeft: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 17
    },
    postTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postTime: {
        marginLeft: 5,
        color: 'gray',
        fontSize: 12
    },
    postViews: {
        color: '#584F49',
        fontWeight: "bold",
        fontSize: 13
    },
    postContent: {
        marginTop: 10,
    },
    postText: {
        marginBottom: 10,
        fontSize: 16
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        resizeMode: "contain"
    },
    postAction: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        marginTop: 15,
    }
});

export default Post;
