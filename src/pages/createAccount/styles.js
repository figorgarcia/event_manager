import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    appSubtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 16,
    },
    eyeIcon: {
        padding: 8,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },
});