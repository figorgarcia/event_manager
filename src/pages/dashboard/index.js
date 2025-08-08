import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import EventCard from '../../components/EventCard';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';
import { EventService } from '../../services/eventService';
import { AuthService } from '../../services/authService';

import styles from './styles.js';

export default function Dashboard({ navigation }) {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            checkAuthAndLoadEvents();
        }, [])
    );

    const checkAuthAndLoadEvents = async () => {
        try {
            setLoading(true);
            
            if (!AuthService.isUserAuthenticated()) {
                navigation.navigate('Login');
                return;
            }

            await loadEvents();
        } catch (error) {
            console.log('Auth check error:', error);
            navigation.navigate('Login');
        } finally {
            setLoading(false);
        }
    };

    const loadEvents = async () => {
        try {
            const currentUser = AuthService.getCurrentUser();
            const result = await EventService.getAllEventsWithFavoriteStatus(currentUser.uid);

            if (result.success) {
                setEvents(result.events);
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            console.log('Load events error:', error);
            Alert.alert('Error', 'Failed to load events');
        }
    };

    const toggleFavorite = async (eventId) => {
        try {
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const event = events.find(e => e.id === eventId);
            if (!event) return;

            const result = await EventService.toggleFavorite(eventId, !event.isFavorite, currentUser.uid);

            if (result.success) {
                setEvents(events.map(event =>
                    event.id === eventId
                        ? { ...event, isFavorite: !event.isFavorite }
                        : event
                ));
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update favorite status');
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const result = await EventService.deleteEvent(eventId);

            if (result.success) {
                setEvents(events.filter(event => event.id !== eventId));
                Alert.alert('Success', 'Event deleted successfully');
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            console.log('Delete event error:', error);
            Alert.alert('Error', 'Failed to delete event');
        }
    };

    const editEvent = (event) => {
        navigation.navigate('EditEvent', { event });
    };

    const handleAddEvent = () => {
        navigation.navigate('AddEvent');
    };

    if (loading) {
        return <LoadingState message="Loading events..." />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <EventCard 
                        event={item} 
                        onToggleFavorite={toggleFavorite}
                        onDeleteEvent={deleteEvent}
                        onEditEvent={editEvent}
                        currentUserId={AuthService.getCurrentUser()?.uid}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.eventsContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={(
                    <EmptyState
                        icon="event"
                        title="No Events Found"
                        subtitle="There are no events available at the moment.\nCreate your first event!"
                    />
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={handleAddEvent}
                activeOpacity={0.8}
            >
                <MaterialIcons name="add" size={30} color="#ffffff" />
            </TouchableOpacity>

        </View>
    );
}
