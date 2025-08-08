import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const EventCard = ({ event, onToggleFavorite, onDeleteEvent, onEditEvent, currentUserId }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOwnEvent = currentUserId && event.userId === currentUserId;

    const handleDelete = () => {
        Alert.alert(
            'Delete Event',
            'Are you sure you want to delete this event?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => onDeleteEvent(event.id)
                }
            ]
        );
    };

    return (
        <View style={styles.eventCard}>
            <View style={styles.eventHeader}>

                <View style={styles.dateContainer}>
                    <MaterialIcons name="event" size={16} color="#007AFF" />
                    <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={() => onToggleFavorite(event.id)}
                        style={styles.favoriteButton} >
                        <MaterialIcons
                            name={event.isFavorite ? "favorite" : "favorite-border"}
                            size={24}
                            color={event.isFavorite ? "#FF3B30" : "#666"}
                        />
                    </TouchableOpacity>
                    {isOwnEvent && (
                        <>
                            <TouchableOpacity
                                onPress={() => onEditEvent(event)}
                                style={styles.editButton}
                            >
                                <MaterialIcons
                                    name="edit"
                                    size={20}
                                    color="#007AFF"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDelete}
                                style={styles.deleteButton}
                            >
                                <MaterialIcons
                                    name="delete"
                                    size={20}
                                    color="#FF3B30"
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>

            <View style={styles.authorContainer}>
                <MaterialIcons name="person" size={14} color="#666" />
                <Text style={styles.authorText}>Created by {event.authorName || 'Unknown User'}</Text>
            </View>
        </View>
    );
};

export default EventCard;
