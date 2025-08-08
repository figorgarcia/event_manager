import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    eventCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventDate: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
        marginLeft: 6,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteButton: {
        padding: 4,
        marginRight: 8,
    },
    editButton: {
        padding: 4,
        marginRight: 8,
    },
    deleteButton: {
        padding: 4,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },
    eventDescription: {
        fontSize: 14,
        color: '#7f8c8d',
        lineHeight: 20,
        marginBottom: 8,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    authorText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontStyle: 'italic',
    },
});
