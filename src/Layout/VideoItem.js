import { Video } from 'expo-av';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback } from 'react-native';

const VideoItem = ({ video }) => {
    const { height } = Dimensions.get('window');
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const handlePress = () => {
        if (isPlaying) {
            videoRef.current.pauseAsync();
        } else {
            videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const styles = StyleSheet.create({
        container: {
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        video: {
            width: '100%',
            height: '100%',
        },
        overlay: {
            position: 'absolute',
            bottom: 20,
            left: 10,
            zIndex: 10,
        },
        title: {
            color: '#fff',
            fontSize: 20,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <Video
                    ref={videoRef}
                    source={{ uri: video.uri }}
                    style={styles.video}
                    resizeMode="cover"
                    shouldPlay={isPlaying}
                    isLooping
                />
            </TouchableWithoutFeedback>
            <View style={styles.overlay}>
                <Text style={styles.title}>{video.title}</Text>
            </View>
        </View>
    );
};

export default VideoItem;
