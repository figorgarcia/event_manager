import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventService } from '../../services/eventService';
import { AuthService } from '../../services/authService';

import styles from './styles.js';

export default function AddEvent({ navigation }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSaveEvent = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setLoading(true);

        try {
            const currentUser = AuthService.getCurrentUser();

            if (!currentUser) {
                Alert.alert('Error', 'You must be logged in to create an event');
                return;
            }

            const eventData = {
                title: title,
                description: description,
                date: date.toISOString().split('T')[0],
            };

            const result = await EventService.createEvent(eventData, currentUser.uid);
            console.log(result);

            if (result.success) {
                Alert.alert(
                    'Success',
                    'Event created successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ]
                );
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to create event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="event" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Event Title"
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={setTitle}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="description" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Event Description"
                            placeholderTextColor="#999"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)} activeOpacity={0.7} >
                        <MaterialIcons name="calendar-today" size={20} color="#666" style={styles.inputIcon} />
                        <Text style={styles.dateText}>
                            {formatDate(date)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                        onPress={handleSaveEvent}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" size="small" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Event</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
}
