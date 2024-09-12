import { Image, StyleSheet, View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context/authContext";
import { useContext } from "react";

const Header = () => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "10.2%",
            width: "100%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: "#fff",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            borderBottomColor: '#ccc',
            paddingTop: StatusBar.currentHeight,
        },
        logoContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
        },
        actionContainer: {
            flex: 2,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: 20
        },
        imageLogo: {
            width: "150%",
            height: "150%",
            marginLeft: 10,
            margin: "auto",
            resizeMode: "contain"
        },
        accountContainer: {
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 10,
        },
        text: {
            textAlign: "right",
            color: "#009432"
        },
        textName: {
            textAlign: "right",
            fontWeight: "bold",
            color: "#009432"
        },
        imageAvatar: {
            width: 50,
            height: 50,
            borderRadius: 20,
            marginLeft: 10
        }
    });

    const avatar = user && user.avatar ? user.avatar : "https://res.cloudinary.com/dofj1px4t/image/upload/v1718769506/Tr%E1%BB%A3%20N%C3%B4ng%204.0/logo-1_k0r80f.png";
    const fullname = user && user.fullname ? user.fullname : "Đăng nhập";

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: avatar }}
                    style={styles.imageLogo}
                />
            </View>

            <TouchableOpacity style={styles.actionContainer} onPress={() => fullname !== "Đăng nhập" ? navigation.navigate('Profile') : navigation.navigate('Login')}>
                <View style={styles.accountContainer}>
                    {fullname !== "Đăng nhập" ? <Text style={styles.text}>Xin chào,</Text> : null}
                    <Text style={styles.textName}>{fullname}</Text>
                </View>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png" }}
                    style={styles.imageAvatar}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
