import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthService } from '../../services/authService';

import styles from './styles';

const LogoutButton = ({ onLogout, color = "#FF3B30", size = 24 }) => {
    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await AuthService.logoutUser();
                            
                            if (result.success) {
                                if (onLogout) {
                                    onLogout();
                                }
                            } else {
                                Alert.alert('Error', result.error);
                            }
                        } catch (error) {
                            console.log('Logout error:', error);
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <MaterialIcons name="logout" size={size} color={color} />
        </TouchableOpacity>
    );
};

export default LogoutButton;
