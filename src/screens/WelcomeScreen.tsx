import React from 'react';
import { assets } from '../assets';
import '../AppModern.css';

interface WelcomeScreenProps {
    onExplore: () => void;
}

export function WelcomeScreen({ onExplore }: WelcomeScreenProps) {
    return (
        <section className="phone phone--welcome" aria-label="Welcome to Aspen">
            <div className="phone__inner phone__inner--welcome">
                <div className="welcome-hero">
                    <img src={assets.heroWelcome} alt="Snowy mountains near Aspen" className="welcome-hero__image" />
                    <div className="welcome-hero__overlay" />
                    <div className="welcome-hero__content">
                        <h1 className="welcome-title">Aspen</h1>
                        <p className="welcome-subtitle">
                            <span>Plan your</span><br /><span>Luxurious Vacation</span>
                        </p>
                    </div>
                </div>
                <button className="primary-button primary-button--full" onClick={onExplore}>Explore</button>
            </div>
        </section>
    )
}
