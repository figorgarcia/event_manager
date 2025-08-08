import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { EventService } from '../../services/eventService';
import { AuthService } from '../../services/authService';

import styles from './styles.js';

export default function EditEvent({ navigation, route }) {

    const { event } = route.params;
    const [title, setTitle] = useState(event.title || '');
    const [description, setDescription] = useState(event.description || '');
    const [date, setDate] = useState(new Date(event.date) || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const handleSaveEvent = async () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const currentUser = AuthService.getCurrentUser();

            if (!currentUser) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const eventData = {
                title: title.trim(),
                description: description.trim(),
                date: date.toISOString()
            };

            const result = await EventService.updateEvent(event.id, eventData);

            if (result.success) {
                Alert.alert('Success', 'Event updated successfully', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            console.log('Update event error:', error);
            Alert.alert('Error', 'Failed to update event');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.form}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter event title"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Enter event description"
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={showDatePickerModal}
                        >
                            <MaterialIcons name="event" size={20} color="#007AFF" />
                            <Text style={styles.dateText}>
                                {date.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSaveEvent}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Updating...' : 'Update Event'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancel}
                            disabled={loading}
                        >
                            <Text style={[styles.buttonText, styles.cancelButtonText]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
}
