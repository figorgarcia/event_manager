import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e1e8ed',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#2c3e50',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dateButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e1e8ed',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#2c3e50',
        marginLeft: 8,
        flex: 1,
    },
    buttonContainer: {
        marginTop: 30,
        gap: 12,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    cancelButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e1e8ed',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    cancelButtonText: {
        color: '#2c3e50',
    },
});
