import { StyleSheet, View,Image,Text, TouchableOpacity } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
const Post =({ item })=>{
   
    const navigation = useNavigation();

    const styles= StyleSheet.create({
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
        marginVertical:5
    
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
            fontSize:17
        },
        postTimeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        postTime: {
            marginLeft: 5,
            color: 'gray',
            fontSize:12
        },
        postViews: {
            color: '#584F49',
            fontWeight:"bold",
            fontSize:13
        },
        postContent: {
            marginTop: 10,
           
        },
        postText: {
            marginBottom: 10,
            fontSize:16
        },
        postImage: {
            width: '100%',
            height: 200,
            borderRadius: 5,
            resizeMode:"contain"
        },
        postAction: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop:15,
           
    
        }
    
    
    
    })



return(
<>
<View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png" }}
                        style={styles.userAvatar}
                    />
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>User</Text>
                        <View style={styles.postTimeContainer}>
                            <Entypo name="back-in-time" size={15} color="gray" />
                            <Text style={styles.postTime}>15 giây trước</Text>
                        </View>
                        <Text style={styles.postViews}>2000 lượt xem</Text>
                    </View>
                </View>
                <Entypo name="dots-three-vertical" size={24} color="gray" />
            </View>
            <View style={styles.postContent}>
                <Text style={styles.postText}>Ông cũng đề nghị hai nước sớm ký Nghị định thư, hoàn tất thủ tục mở cửa thị trường với sầu riêng đông lạnh và dừa tươi Việt Nam. Hai bên cũng cần trao đổi các biện pháp tăng hiệu suất thông quan, nâng cấp hạ tầng cửa khẩu và xây dựng cửa khẩu thông minh.</Text>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1715047951/products/n9fxzba3oxulgpgb7nsm.png" }}
                    style={styles.postImage}
                />
            </View>


            <View style={styles.postAction}>
                <TouchableOpacity style={{ flexDirection: "row" }}><AntDesign name="like2" size={20} color="gray" /><Text style={{marginHorizontal:5}}>Thích</Text></TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}  onPress={() => navigation.navigate('Comment')}><FontAwesome5 name="comment-alt" size={20} color="gray" /><Text style={{marginHorizontal:5}}>Bình luận</Text></TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}><FontAwesome5 name="share" size={20} color="gray" /><Text style={{marginHorizontal:5}}>Chia sẻ</Text></TouchableOpacity>

            </View>
        </View>


</>
)




}

 export default Post