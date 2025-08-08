import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthService } from '../../services/authService';

import styles from './styles.js';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.loginUser(email, password);
            console.log(result)

            if (result.success) {
                navigation.navigate('TabNavigation');
            } else {
                Alert.alert('Login Failed', result.error);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <MaterialIcons name="event" size={80} color="#007AFF" style={styles.icon} />
                <Text style={styles.appName}>Event Manager</Text>
                <Text style={styles.appSubtitle}>Manage your events</Text>
            </View>

            <View style={styles.form}>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
                </View>

                <TouchableOpacity
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={styles.link}>Create account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                        <Text style={styles.link}>Forgot password</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
}
