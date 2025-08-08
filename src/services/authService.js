import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../configs/firebase';

export class AuthService {

    static async registerUser(email, password, fullName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                fullName: fullName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    fullName: fullName
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.code
            };
        }
    }

    static async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    fullName: userData?.fullName || ''
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.code
            };
        }
    }

    static async logoutUser() {
        try {
            await signOut(auth);
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to logout'
            };
        }
    }

    static async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return {
                success: true,
                message: 'Password reset email sent successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.code
            };
        }
    }

    static getCurrentUser() {
        return auth.currentUser;
    }

    static isUserAuthenticated() {
        return auth.currentUser !== null;
    }

    static async getUserProfile(uid) {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                return {
                    success: true,
                    user: userDoc.data()
                };
            } else {
                return {
                    success: false,
                    error: 'User profile not found'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get user profile'
            };
        }
    }

}
