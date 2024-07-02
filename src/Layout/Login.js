import React, { useState } from "react";
import { Image, StyleSheet, View, useWindowDimensions, Text, TextInput, TouchableOpacity } from "react-native";
import CheckBox from 'react-native-check-box';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalSuccess from "./ModalSucces";

const Login1 = () => {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isFocusedPhone, setIsFocusedPhone] = useState(false);
    const [isFocusedPass, setIsFocusedPass] = useState(false);

    const handleFocusPhone = () => setIsFocusedPhone(true);
    const handleBlurPhone = () => setIsFocusedPhone(false);
    const handleFocusPass = () => setIsFocusedPass(true);
    const handleBlurPass = () => setIsFocusedPass(false);

    return (
        <View style={styles.container}>
            <View style={styles.scene}>
                <Text style={styles.label}>Số điện thoại</Text>
                <View style={[
                    styles.inputContainer,
                    { borderBottomColor: isFocusedPhone ? '#009432' : '#ccc' }
                ]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                        maxLength={10}
                        onFocus={handleFocusPhone}
                        onBlur={handleBlurPhone}
                    />
                </View>

                <Text style={styles.label}>Mật khẩu</Text>
                <View style={[
                    styles.passwordContainer,
                    { borderBottomColor: isFocusedPass ? '#009432' : '#ccc' }
                ]}>
                    <TextInput
                        style={styles.passwordInput}
                        onChangeText={setPass}
                        value={pass}
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={!isPasswordVisible}
                        onFocus={handleFocusPass}
                        onBlur={handleBlurPass}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={{ flex: 1 }}
                        onClick={() => setSelection(!isSelected)}
                        isChecked={isSelected}
                        rightText={"Ghi nhớ"}
                        rightTextStyle={{ color: "#009432", fontWeight: "bold" }}
                        checkedCheckBoxColor="#009432"
                    />
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </View>

                <TouchableOpacity style={styles.btnlogin} onPress={() => { }}>
                    <Text style={styles.btnloginText}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.labelNotAncount}>Bạn chưa có tài khoản?</Text>
                    <Text style={styles.signUp}>Đăng ký</Text>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footer}>Powered by Tro Nong 4.0</Text>
            </View>
        </View>
    );
};

const SignIn = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedPhone, setIsFocusedPhone] = useState(false);
    const [isFocusedPass, setIsFocusedPass] = useState(false);
    const [isFocusedConfirmPass, setIsFocusedConfirmPass] = useState(false);

    const handleFocusName = () => setIsFocusedName(true);
    const handleBlurName = () => setIsFocusedName(false);
    const handleFocusPhone = () => setIsFocusedPhone(true);
    const handleBlurPhone = () => setIsFocusedPhone(false);
    const handleFocusPass = () => setIsFocusedPass(true);
    const handleBlurPass = () => setIsFocusedPass(false);
    const handleFocusConfirmPass = () => setIsFocusedConfirmPass(true);
    const handleBlurConfirmPass = () => setIsFocusedConfirmPass(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const closeModal = () => {
        setIsShowModal(false);
    };
    return (
        <>
        <View style={styles.container}>
            <View style={styles.scene}>
                <Text style={styles.label}>Họ tên</Text>
                <View style={[
                    styles.inputContainer,
                    { borderBottomColor: isFocusedName ? '#009432' : '#ccc' }
                ]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Họ tên*"
                        onFocus={handleFocusName}
                        onBlur={handleBlurName}
                    />
                </View>
                <Text style={styles.label}>Số điện thoại</Text>
                <View style={[
                    styles.inputContainer,
                    { borderBottomColor: isFocusedPhone ? '#009432' : '#ccc' }
                ]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder="Nhập số điện thoại*"
                        keyboardType="numeric"
                        maxLength={10}
                        onFocus={handleFocusPhone}
                        onBlur={handleBlurPhone}
                    />
                </View>

                <Text style={styles.label}>Mật khẩu</Text>
                <View style={[
                    styles.passwordContainer,
                    { borderBottomColor: isFocusedPass ? '#009432' : '#ccc' }
                ]}>
                    <TextInput
                        style={styles.passwordInput}
                        onChangeText={setPass}
                        value={pass}
                        placeholder="Nhập mật khẩu*"
                        secureTextEntry={!isPasswordVisible}
                        onFocus={handleFocusPass}
                        onBlur={handleBlurPass}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <View style={[
                    styles.passwordContainer,
                    { borderBottomColor: isFocusedConfirmPass ? '#009432' : '#ccc' }
                ]}>
                    <TextInput
                        style={styles.passwordInput}
                        onChangeText={setConfirmPass}
                        value={confirmPass}
                        placeholder="Nhập lại mật khẩu*"
                        secureTextEntry={!isPasswordVisible}
                        onFocus={handleFocusConfirmPass}
                        onBlur={handleBlurConfirmPass}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={{ flex: 1 }}
                        onClick={() => setSelection(!isSelected)}
                        isChecked={isSelected}
                        rightText={"Tôi xác nhận đã đồng ý các điều khoản sử dụng."}
                        rightTextStyle={{ color: "#009432", fontWeight: "bold" }}
                        checkedCheckBoxColor="#009432"
                    />
                </View>

                <TouchableOpacity style={styles.btnlogin} onPress={() => {setIsShowModal(true) }}>
                    <Text style={styles.btnloginText}>Đăng ký</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.labelNotAncount}>Bạn đã có tài khoản?</Text>
                    <Text style={styles.signUp}>Đăng nhập</Text>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footer}>Powered by Tro Nong 4.0</Text>
            </View>
           
        </View>
         <ModalSuccess
         isShow={isShowModal}
         closeModal={closeModal}
         mes={"Tài khoản của bạn đã được tạo thành công"}
     />
     </>
    );
};

export const Login = () => {
    const imageUrl = "https://res.cloudinary.com/dofj1px4t/image/upload/v1718769506/Tr%E1%BB%A3%20N%C3%B4ng%204.0/logo-1_k0r80f.png";
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Đăng nhập' },
        { key: 'second', title: 'Đăng ký' },
    ]);

    const renderScene = SceneMap({
        first: Login1,
        second: SignIn,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={{ backgroundColor: '#009432', borderTopRightRadius: 18, borderTopLeftRadius: 20 }}
            labelStyle={styles.labelTab}
            tabStyle={styles.tab}
            renderLabel={({ route, focused }) => (
                <Text style={[
                    styles.label,
                    { color: focused ? '#fff' : '#eeeeee' },
                    focused && { fontWeight: 'bold' }
                ]}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <>
            <View style={styles.top}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>

            <View style={styles.tabContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        height: "15%",
    },
    image: {
        width: 300,
        height: 200,
        margin: "auto",
        resizeMode: 'contain',
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 10,
        color: "#009432"
    },
    labelTab: {
        color: "#fff",
        marginVertical: 10
    },
    scene: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 12,
        width: '100%',
    },
    input: {
        height: 40,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    forgotPassword: {
        marginLeft: 10,
        color: '#009432',
        textDecorationLine: 'underline',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUp: {
        marginLeft: 5,
        color: '#009432',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 12,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    btnlogin: {
        marginTop: 20,
        backgroundColor: "#009432",
        borderRadius: 20,
        paddingVertical: 13,
        alignItems: 'center',
        width: "90%",
        alignSelf: 'center',
    },
    btnloginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    footer: {
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
    },
    labelNotAncount: {
        marginRight: 5,
    }
});

export default Login;
