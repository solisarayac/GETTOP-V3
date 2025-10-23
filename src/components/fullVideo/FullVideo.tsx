import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { VideoData } from '../../context/VideoContext';
import VideoItem from '../videoItems/VideoItem';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette } from '../../constants/Colors'; // para colores si quieres usarlo

type FullVideoRouteParams = {
    video: VideoData;
};

const FullVideo: React.FC = () => {
    const route = useRoute<RouteProp<{ params: FullVideoRouteParams }, 'params'>>();
    const { video } = route.params;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Botón de regresar */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

            <VideoItem perso={0} video={video} isActive={true} />
        </SafeAreaView>
    );
};

export default FullVideo;

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom:100, backgroundColor: 'rgba(0,0,0,0.5)' },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
        zIndex: 10,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
    },
    backText: {
        color: Palette.white,
        fontSize: 16,
        fontWeight: '600',
    },
});