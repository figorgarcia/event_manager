import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
    },
    saveButton: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    inputIcon: {
        marginRight: 12,
        marginTop: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 16,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 16,
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FF3B30',
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
});