import React from 'react';
import './BottomNav.css';

interface BottomNavProps {
    activeTab: 'home' | 'bookings' | 'favorites' | 'profile';
    onTabChange: (tab: 'home' | 'bookings' | 'favorites' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    const tabs = [
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'bookings', icon: 'ticket', label: 'Bookings' },
        { id: 'favorites', icon: 'heart', label: 'Saved' },
        { id: 'profile', icon: 'profile', label: 'Profile' },
    ] as const;

    return (
        <nav className="bottom-nav">
            <button
                className={`bottom-nav__item ${activeTab === 'home' ? 'bottom-nav__item--active' : ''}`}
                onClick={() => onTabChange('home')}
            >
                {/* Home Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span className="bottom-nav__label">Home</span>
            </button>

            <button
                className={`bottom-nav__item ${activeTab === 'bookings' ? 'bottom-nav__item--active' : ''}`}
                onClick={() => onTabChange('bookings')}
            >
                {/* Ticket/Bookings Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                <span className="bottom-nav__label">Bookings</span>
            </button>

            <button
                className={`bottom-nav__item ${activeTab === 'favorites' ? 'bottom-nav__item--active' : ''}`}
                onClick={() => onTabChange('favorites')}
            >
                {/* Heart/Favorites Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span className="bottom-nav__label">Saved</span>
            </button>

            <button
                className={`bottom-nav__item ${activeTab === 'profile' ? 'bottom-nav__item--active' : ''}`}
                onClick={() => onTabChange('profile')}
            >
                {/* User/Profile Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="bottom-nav__label">Profile</span>
            </button>
        </nav>
    );
}
