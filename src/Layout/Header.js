import { Image, StyleSheet, View, Text,StatusBar } from "react-native";
import { Feather } from '@expo/vector-icons';
const Header = () => {
    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "10%",
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
            margin:"auto",
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

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718769506/Tr%E1%BB%A3%20N%C3%B4ng%204.0/logo-1_k0r80f.png" }}
                    style={styles.imageLogo}
                />
            </View>

            <View style={styles.actionContainer}>
                <View style={styles.accountContainer}>
                    <Text style={styles.text}>Xin chào,</Text>
                    <Text style={styles.textName}>Trần Hiếu Nghĩa</Text>
                </View>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718762351/Tr%E1%BB%A3%20N%C3%B4ng%204.0/pngwing.com_vnwxtx.png" }}
                    style={styles.imageAvatar}
                />

                <View>


                </View>
            </View>
        </View>
    );
};

export default Header;
