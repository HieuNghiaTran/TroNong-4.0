import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Modal, Button, StatusBar, SectionList, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; // Import moment

const TaskItem = ({ task, onDelete, onEdit }) => (
    <View style={styles.taskItem}>
        <Text style={styles.taskText}>{task.title}</Text>
        <View style={styles.taskActions}>
            <TouchableOpacity onPress={() => onEdit(task)}>
                <MaterialIcons name="edit" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(task.id)}>
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    </View>
);

const TaskList = ({ tasks, onDelete, onEdit }) => (
    <SectionList
        sections={tasks}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <TaskItem task={item} onDelete={onDelete} onEdit={onEdit} />}
        renderSectionHeader={({ section: { date, lunarDate } }) => (
            <View style={styles.sectionHeader}>
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.lunarDateText}>{lunarDate}</Text>
            </View>
        )}
        contentContainerStyle={styles.taskList}
    />
);

const TaskScheduler = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();

    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // Use moment for initial date

    const handleAddTask = () => {
        if (currentTask) {
            setTasks(tasks.map(task => task.id === currentTask.id ? { ...task, title: taskTitle } : task));
        } else {
            const newTask = { id: Date.now().toString(), title: taskTitle, date: selectedDate, lunarDate: getLunarDate(selectedDate) };
            setTasks([...tasks, newTask]);
        }
        setTaskTitle('');
        setCurrentTask(null);
        setModalVisible(false);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setTaskTitle(task.title);
        setModalVisible(true);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    const renderDateItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.dateItem, selectedDate === item.dateString && styles.selectedDateItem]}
            onPress={() => handleDateSelect(item)}
        >
            <Text style={[styles.dateText, selectedDate === item.dateString && styles.selectedDateText]}>
                {item.day}
            </Text>
            <Text style={styles.lunarDateText}>{item.lunarDay}</Text>
        </TouchableOpacity>
    );

    const generateDates = () => {
        const dates = [];
        for (let i = -15; i <= 15; i++) {
            const date = moment().add(i, 'days');
            dates.push({
                dateString: date.format('YYYY-MM-DD'),
                day: date.format('DD'),
                lunarDay: getLunarDate(date.format('YYYY-MM-DD')),
            });
        }
        return dates;
    };

    const getLunarDate = (dateString) => {
        // Your logic to convert Gregorian date to Lunar date here
        // For simplicity, let's assume it returns the same date string for now
        return dateString; // Replace with actual Lunar date conversion
    };

    const filteredTasks = tasks.filter(task => task.date === selectedDate);
    const sectionedTasks = [{ date: selectedDate, lunarDate: getLunarDate(selectedDate), data: filteredTasks }];

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <MaterialIcons name="keyboard-backspace" size={24} color="#fff" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Quản lý lịch trình công việc</Text>
                <TouchableOpacity style={styles.postButton}>

                </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
                <FlatList
                    data={generateDates()}
                    renderItem={renderDateItem}
                    keyExtractor={item => item.dateString}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dateList}
                />
            </View>
            <View style={styles.container}>
                <TaskList tasks={sectionedTasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <MaterialIcons name="add" size={30} color="#fff" />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        setCurrentTask(null);
                        setTaskTitle('');
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{currentTask ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nội dung công việc"
                                value={taskTitle}
                                onChangeText={setTaskTitle}
                            />
                            <Button title={currentTask ? 'Lưu' : 'Thêm'} onPress={handleAddTask} />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
    postButton: {

    },
    dateContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    dateList: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateItem: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedDateItem: {
        backgroundColor: '#009432',
    },
    dateText: {
        fontSize: 16,
    },
    lunarDateText: {
        fontSize: 12,
        color: '#666',
    },
    selectedDateText: {
        color: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    taskList: {
        padding: 16,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
    },
    taskText: {
        fontSize: 16,
    },
    taskActions: {
        flexDirection: 'row',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#009432',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginTop: 20,
    },
});

export default TaskScheduler;
