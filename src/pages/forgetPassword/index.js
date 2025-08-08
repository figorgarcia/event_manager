import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles.js';

export default function ForgetPassword({ navigation }) {
    
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        Alert.alert(
            'Password Reset',
            'If an account with this email exists, you will receive a password reset link shortly.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >

            <View style={styles.header}>
                <MaterialIcons name="lock-reset" size={80} color="#007AFF" style={styles.icon} />
                <Text style={styles.appName}>Reset Password</Text>
                <Text style={styles.appSubtitle}>Enter your email to reset password</Text>
            </View>

            <View style={styles.form}>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword} activeOpacity={0.8} >
                    <Text style={styles.loginButtonText}>Send Reset Link</Text>
                </TouchableOpacity>

                <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.link}>Back to Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
        </SafeAreaView>
    );
}
