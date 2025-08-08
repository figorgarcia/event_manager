import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingState = ({ message = 'Loading...', size = 'large', color = '#007AFF' }) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={size} color={color} />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
};

export default LoadingState;
