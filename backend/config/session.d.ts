import 'express-session';

declare module 'express-session' {
    interface SessionData {
        logged_in: boolean;
        user: {
            iduser: number;
            prenom_user: string;
            nom_user: string;
            email_user: string;
            password_user: string;
            admin_role: boolean;
            readonly_role: boolean;
            edit_role: boolean;
            delete_role: boolean;
        };
    }
}