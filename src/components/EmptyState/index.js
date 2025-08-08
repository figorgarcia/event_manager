import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const EmptyState = ({ 
    icon = "info", 
    title = "No Data Found", 
    subtitle = "There's nothing to display at the moment.",
    buttonText,
    onButtonPress,
    iconSize = 80,
    iconColor = "#ccc"
}) => {
    return (
        <View style={styles.emptyState}>
            <MaterialIcons name={icon} size={iconSize} color={iconColor} />
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptySubtitle}>{subtitle}</Text>
            
            {buttonText && onButtonPress && (
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={onButtonPress} >
                    <Text style={styles.actionButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EmptyState;
