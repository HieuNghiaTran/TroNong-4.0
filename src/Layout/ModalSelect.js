import { Modal, Text, Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { useFonts } from 'expo-font';

const ModalSelect = ({ title, data, select, visible, hideModal }) => {
    const [fontsLoaded] = useFonts({
        'rbt': require('../fonts/RobotoMono-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {data && data.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        style={styles.item}
                        onPress={() => { select(item); }}
                    >
                    {item.name ? (
                            <Text style={styles.itemText}>{item.name}</Text>
                        ) : item.full_name ? (
                            <Text style={styles.itemText}>{item.full_name}</Text>
                        ) : (
                            <Text style={styles.itemText}>{item}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Button mode="contained" onPress={hideModal} style={styles.closeButton}>
                Đóng
            </Button>
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        marginBottom: 15,
        textAlign: "center",
        marginHorizontal: "auto",
        fontFamily: 'rbt',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'rbt',
    },
    scrollView: {
        maxHeight: 300,
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'rbt',
        textAlign: "center"
    },
    closeButton: {
        marginTop: 20,
    },
});

export default ModalSelect;
