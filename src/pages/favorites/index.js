import React, { useState, useCallback } from 'react';
import { FlatList, Alert, View } from 'react-native';
import EventCard from '../../components/EventCard';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';
import { EventService } from '../../services/eventService';
import { AuthService } from '../../services/authService';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles.js';

export default function Favorites({ navigation }) {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            checkAuthAndLoadFavorites();
        }, [])
    );

    const checkAuthAndLoadFavorites = async () => {
        try {
            setLoading(true);
            if (!AuthService.isUserAuthenticated()) {
                navigation.navigate('Login');
                return;
            }

            await loadFavoriteEvents();
        } catch (error) {
            navigation.navigate('Login');
        } finally {
            setLoading(false);
        }
    };

    const loadFavoriteEvents = async () => {
        try {
            const currentUser = AuthService.getCurrentUser();
            const result = await EventService.getFavoriteEvents(currentUser.uid);

            if (result.success) {
                setFavoriteEvents(result.events);
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load favorite events');
        }
    };

    const toggleFavorite = async (eventId) => {
        try {
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const event = favoriteEvents.find(e => e.id === eventId);
            if (!event) return;

            const result = await EventService.toggleFavorite(eventId, !event.isFavorite, currentUser.uid);

            if (result.success) {
                setFavoriteEvents(prevEvents =>
                    prevEvents.filter(event => event.id !== eventId)
                );
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            console.log('Toggle favorite error:', error);
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
                setFavoriteEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                Alert.alert('Success', 'Event deleted successfully');
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to delete event');
        }
    };

    const editEvent = (event) => {
        navigation.navigate('EditEvent', { event });
    };

    if (loading) {
        return <LoadingState message="Loading favorites..." />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteEvents}
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
                        icon="favorite-border"
                        title="No Favorite Events"
                        subtitle="You haven't favorited any events yet.\nExplore events and add them to your favorites!"
                        buttonText="Explore Events"
                        onButtonPress={() => navigation.navigate('Dashboard')}
                    />
                )}
            />
        </View>
    );
}
