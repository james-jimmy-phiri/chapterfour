export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface Permission {
    id: number;
    name: string;
    label?: string;
    guard_name?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    display_name?: string;
    purpose?: string;
    access_level?: string;
    badge?: string;
    is_protected?: boolean;
    users_count?: number;
    permissions?: Permission[];
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    name?: string;
    full_name?: string;
    email: string;
    phone?: string;
    avatar?: string;
    avatar_url?: string;
    job_title?: string;
    department?: string;
    employee_id?: string;
    status: UserStatus;
    email_verified_at?: string;
    password_changed_at?: string;
    last_login_at?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    roles?: Role[];
    permissions?: Permission[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        roles?: string[];
        permissions?: string[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    site?: Record<string, any>;
    unread_inquiries_count?: number;
};
