import { collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../configs/firebase';

export class EventService {

    static async createEvent(eventData, userId) {
        try {

            let authorName = 'Unknown User';
            let authorId = userId;
            
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    authorName = userDoc.data().fullName || 'Unknown User';
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }

            const eventRef = await addDoc(collection(db, 'events'), {
                ...eventData,
                userId: userId,
                authorId: authorId,
                authorName: authorName,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isFavorite: false
            });

            return {
                success: true,
                eventId: eventRef.id,
                message: 'Event created successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to create event'
            };
        }
    }

    static async getAllEvents() {
        try {
            const eventsQuery = query(
                collection(db, 'events'),
                orderBy('date', 'asc')
            );

            const querySnapshot = await getDocs(eventsQuery);
            const events = [];

            querySnapshot.forEach((doc) => {
                events.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return {
                success: true,
                events: events
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to fetch events'
            };
        }
    }

    static async getUserEvents(userId) {
        try {
            const eventsQuery = query(
                collection(db, 'events'),
                where('userId', '==', userId),
                orderBy('date', 'asc')
            );

            const querySnapshot = await getDocs(eventsQuery);
            const events = [];

            querySnapshot.forEach((doc) => {
                events.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return {
                success: true,
                events: events
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to fetch user events'
            };
        }
    }

    static async getFavoriteEvents(userId) {
        try {
            const favoritesQuery = query(
                collection(db, 'favorites'),
                where('userId', '==', userId)
            );

            const favoritesSnapshot = await getDocs(favoritesQuery);
            const favoriteEventIds = [];
            
            favoritesSnapshot.forEach((doc) => {
                favoriteEventIds.push(doc.data().eventId);
            });

            if (favoriteEventIds.length === 0) {
                return {
                    success: true,
                    events: []
                };
            }

            const events = [];
            for (const eventId of favoriteEventIds) {
                const eventDoc = await getDoc(doc(db, 'events', eventId));
                if (eventDoc.exists()) {
                    const eventData = eventDoc.data();
                    
                    events.push({
                        id: eventDoc.id,
                        ...eventData,
                        isFavorite: true
                    });
                }
            }

            events.sort((a, b) => new Date(a.date) - new Date(b.date));

            return {
                success: true,
                events: events
            };
        } catch (error) {
            console.log('getFavoriteEvents error:', error);
            return {
                success: false,
                error: 'Failed to fetch favorite events'
            };
        }
    }

    static async getEventById(eventId) {
        try {
            const eventDoc = await getDoc(doc(db, 'events', eventId));

            if (eventDoc.exists()) {
                return {
                    success: true,
                    event: {
                        id: eventDoc.id,
                        ...eventDoc.data()
                    }
                };
            } else {
                return {
                    success: false,
                    error: 'Event not found'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Failed to fetch event'
            };
        }
    }

    static async updateEvent(eventId, eventData) {
        try {
            await updateDoc(doc(db, 'events', eventId), {
                ...eventData,
                updatedAt: serverTimestamp()
            });

            return {
                success: true,
                message: 'Event updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to update event'
            };
        }
    }

    static async deleteEvent(eventId) {
        try {
            await deleteDoc(doc(db, 'events', eventId));

            return {
                success: true,
                message: 'Event deleted successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to delete event'
            };
        }
    }

    static async toggleFavorite(eventId, isFavorite, userId) {
        try {
            if (isFavorite) {
                await addDoc(collection(db, 'favorites'), {
                    userId: userId,
                    eventId: eventId,
                    createdAt: serverTimestamp()
                });
            } else {
                const favoritesQuery = query(
                    collection(db, 'favorites'),
                    where('userId', '==', userId),
                    where('eventId', '==', eventId)
                );
                
                const favoritesSnapshot = await getDocs(favoritesQuery);
                favoritesSnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
            }

            return {
                success: true,
                message: isFavorite ? 'Event added to favorites' : 'Event removed from favorites'
            };
        } catch (error) {
            console.log('toggleFavorite error:', error);
            return {
                success: false,
                error: 'Failed to update favorite status'
            };
        }
    }

    static async checkIfEventIsFavorite(eventId, userId) {
        try {
            const favoritesQuery = query(
                collection(db, 'favorites'),
                where('userId', '==', userId),
                where('eventId', '==', eventId)
            );
            
            const favoritesSnapshot = await getDocs(favoritesQuery);
            return !favoritesSnapshot.empty;
        } catch (error) {
            console.log('checkIfEventIsFavorite error:', error);
            return false;
        }
    }

    static async getAllEventsWithFavoriteStatus(userId) {
        try {
            const eventsQuery = query(
                collection(db, 'events'),
                orderBy('date', 'asc')
            );

            const querySnapshot = await getDocs(eventsQuery);
            const events = [];

            for (const doc of querySnapshot.docs) {
                const eventData = doc.data();
                const isFavorite = await this.checkIfEventIsFavorite(doc.id, userId);
                
                events.push({
                    id: doc.id,
                    ...eventData,
                    isFavorite: isFavorite
                });
            }

            return {
                success: true,
                events: events
            };
        } catch (error) {
            console.log('getAllEventsWithFavoriteStatus error:', error);
            return {
                success: false,
                error: 'Failed to fetch events'
            };
        }
    }

}
