import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { assets } from '../assets';
import '../AppModern.css';

interface DetailScreenProps {
    onBack: () => void;
    session: Session | null;
}

export function DetailScreen({ onBack, session }: DetailScreenProps) {
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleBook = async () => {
        if (!session) {
            alert("Please sign in to book.");
            return;
        }

        setBookingStatus('loading');
        try {
            // POST request to backend
            const response = await fetch('http://127.0.0.1:8000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guest_name: session.user.email || "Guest User",
                    booking_date: new Date().toISOString(),
                    notes: "Booking via Mobile App",
                    user_id: session.user.id
                })
            });

            if (response.ok) {
                setBookingStatus('success');
                alert("Booking Successful! Check your Bookings tab.");
            } else {
                const errorData = await response.json();
                setBookingStatus('error');
                alert(`Booking Failed: ${errorData.detail || 'Unknown error'}`);
            }
        } catch (error) {
            setBookingStatus('error');
            console.error(error);
            alert("Error connecting to backend. Is uvicorn running?");
        } finally {
            // Reset status after a delay if success, or keep error
            if (bookingStatus !== 'error') {
                setTimeout(() => setBookingStatus('idle'), 2000);
            } else {
                setBookingStatus('idle');
            }
        }
    };

    return (
        <div className="phone__inner" style={{ padding: 0 }}>
            {/* Hero Section */}
            <div className="detail-hero" style={{ borderRadius: '0 0 32px 32px', height: '350px' }}>
                <img src={assets.heroDetailPhoto} alt="Coeurdes Alpes hotel" className="detail-hero__image" />
                <button
                    className="icon-badge"
                    style={{ position: 'absolute', top: '40px', left: '20px', width: '40px', height: '40px' }}
                    onClick={onBack}
                    aria-label="Back"
                >
                    <span className="chevron" style={{ transform: 'rotate(135deg)', marginLeft: '4px' }} />
                </button>
                <button className="icon-badge icon-badge--heart detail-hero__heart" aria-label="Save Coeurdes Alpes">
                    <img src={assets.iconHeart} alt="" />
                </button>
            </div>

            <div style={{ padding: '24px', paddingBottom: '100px' }}>
                <header className="detail-header">
                    <h2 className="detail-header__title">Coeurdes Alpes</h2>
                    <button className="link-button" onClick={() => alert("Map feature coming soon!")}>Show map</button>
                </header>
                <div className="detail-rating">
                    <img src={assets.iconStar} alt="" />
                    <span className="detail-rating__score">4.5</span>
                    <span className="detail-rating__meta">(355 reviews)</span>
                </div>
                <p className="detail-description">
                    Aspen is as close as one can get to a storybook alpine town in America. The choose-your-own-adventure possibilities—skiing, hiking, dining, shopping and more—are endless.
                </p>

                <section className="section section--facilities">
                    <h3 className="section__title">Facilities</h3>
                    <div className="facilities-row">
                        <div className="facility-card"><img src={assets.iconWifi} alt="" /><span>1 Heater</span></div>
                        <div className="facility-card"><img src={assets.iconFood} alt="" /><span>Dinner</span></div>
                        <div className="facility-card"><img src={assets.iconBath} alt="" /><span>1 Tub</span></div>
                        <div className="facility-card"><img src={assets.iconPool} alt="" /><span>Pool</span></div>
                    </div>
                </section>

                <footer className="detail-footer" style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: 'white', padding: '20px 32px', borderRadius: '32px 32px 0 0', boxShadow: '0 -5px 20px rgba(0,0,0,0.05)' }}>
                    <div className="detail-price">
                        <span className="detail-price__label">Price</span>
                        <span className="detail-price__value">$199</span>
                    </div>
                    <button
                        className="primary-button detail-footer__cta"
                        onClick={handleBook}
                        disabled={bookingStatus === 'loading' || bookingStatus === 'success'}
                        style={{
                            opacity: bookingStatus === 'loading' ? 0.7 : 1,
                            backgroundColor: bookingStatus === 'success' ? '#2dd7a4' : undefined,
                            backgroundImage: bookingStatus === 'success' ? 'none' : undefined
                        }}
                    >
                        {bookingStatus === 'loading' ? 'Booking...' : (bookingStatus === 'success' ? 'Booked!' : 'Book now')}
                    </button>
                </footer>
            </div>
        </div>
    )
}
