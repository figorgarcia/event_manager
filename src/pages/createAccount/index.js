import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthService } from '../../services/authService';

import styles from './styles.js';

export default function CreateAccount({ navigation }) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateAccount = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.registerUser(email, password, name);

            if (result.success) {
                Alert.alert(
                    'Success',
                    'Account created successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('TabNavigation')
                        }
                    ]
                );
            } else {
                Alert.alert('Registration Failed', result.error);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >

            <View style={styles.header}>
                <MaterialIcons name="person-add" size={80} color="#007AFF" style={styles.icon} />
                <Text style={styles.appName}>Create Account</Text>
                <Text style={styles.appSubtitle}>Join our community</Text>
            </View>

            <View style={styles.form}>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
                </View>

                <TouchableOpacity 
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                    onPress={handleCreateAccount} 
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                        <Text style={styles.loginButtonText}>Create Account</Text>
                    )}
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
