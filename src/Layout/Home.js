import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import CalendarWeather from "./CalendarWether";

const Home = () => {
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        category: {
            backgroundColor: "#009432",
            borderRadius: 20,
            marginTop: 20,
            marginHorizontal: 10,
        },
        listItem: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 10,
            marginBottom: 0,
        },
        item: {
            alignItems: "center",
            width: "25%",
            marginVertical: 10,
        },
        imageItem: {
            width: 50,
            height: 50,
            marginBottom: 10,
            resizeMode: "cover",
        },
        categoryName: {
            fontSize: 20,
            color: "#fff",
            marginBottom: 10,
            margin: 20,
            fontWeight: "bold",
           
        },
        itemName: {
            color: "#1C0A0A",
            textAlign: "center",
           
            height: 60,
        },
    });

    return (
        <>
            <Header />
            <ScrollView style={{paddingBottom:20}}>
                <CalendarWeather/>
                <View style={styles.category}>
                    <Text style={styles.categoryName}>Quản lý sản xuất</Text>
                    <View style={styles.listItem}>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('RiceManager')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718865804/products/give-money_kqj3nj.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Quản lý chi tiêu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866018/products/report_isd5f3.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Báo cáo chi tiêu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866119/products/calendar_cmeqbu.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Lịch trình công việc</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Camera')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866412/products/take-a-picture_rz0jzx.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Chuẩn đoán sâu bệnh qua ảnh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}  onPress={() => navigation.navigate('Wheather')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718866455/products/cloudy_pvhp9d.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Dự báo thời tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.category}>
                    <Text style={styles.categoryName}>Kết nối cộng đồng</Text>
                    <View style={styles.listItem}>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Forum')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718867364/products/group-chat_t7lwwb.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Diễn đàn nông dân</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Chat')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718867482/products/chatbot_pu8lt7.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Chat AI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Tintuc')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718867559/products/newspaper_oevgyz.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Tin tức</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.category}>
                    <Text style={styles.categoryName}>Thị trường</Text>
                    <View style={styles.listItem}>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('RicePrice')}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718867686/products/price-up_zsc0ap.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Xem giá lúa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718760633/Tr%E1%BB%A3%20N%C3%B4ng%204.0/448386520_491883306832482_2003684293317959570_n_wzh4yp.jpg" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Báo cáo giá</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Image
                                source={{ uri: "https://res.cloudinary.com/dofj1px4t/image/upload/v1718867731/products/commodity_exh15p.png" }}
                                style={styles.imageItem}
                            />
                            <Text style={styles.itemName}>Thị trường nông sản</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default Home;
