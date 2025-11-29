import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!adminEmail || !adminPassword) {
                    console.error('Admin credentials not configured');
                    return null;
                }

                // Check if email matches
                if (credentials.email !== adminEmail) {
                    return null;
                }

                // Check if password matches (support both plain and hashed)
                let isValid = false;

                // If admin password starts with $2, it's already hashed
                if (adminPassword.startsWith('$2')) {
                    isValid = await bcrypt.compare(credentials.password as string, adminPassword);
                } else {
                    // Plain text comparison (for development)
                    isValid = credentials.password === adminPassword;
                }

                if (!isValid) {
                    return null;
                }

                return {
                    id: '1',
                    email: adminEmail,
                    name: 'Admin',
                };
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdminDashboard = nextUrl.pathname.startsWith('/admin/dashboard');

            if (isOnAdminDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }

            return true;
        },
    },
});
