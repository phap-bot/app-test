import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import '../AppModern.css';

interface BookingsScreenProps {
    session: Session | null;
}

export function BookingsScreen({ session }: BookingsScreenProps) {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user.id) {
            fetchBookings();
        }
    }, [session]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            // Fetch from backend matching user_id
            const response = await fetch(`http://127.0.0.1:8000/bookings?user_id=${session?.user.id}`);
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                console.error("Failed to fetch bookings");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!session) return <div style={{ padding: 20 }}>Please sign in to view bookings.</div>;

    return (
        <div className="phone__inner">
            <header className="phone-header">
                <div><h2 className="phone-header__title">My Bookings</h2></div>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
                {loading ? (
                    <p>Loading bookings...</p>
                ) : bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
                        <p>No bookings yet.</p>
                        <p style={{ fontSize: '12px' }}>Explore hotels and make your first booking!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {bookings.map((booking) => (
                            <div key={booking.id} style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                border: '1px solid #f0f0f0'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 600, fontSize: '16px' }}>Coeurdes Alpes</span>
                                    <span style={{
                                        fontSize: '12px',
                                        padding: '4px 8px',
                                        borderRadius: '8px',
                                        background: booking.status === 'confirmed' ? '#e6fffa' : '#fffaf0',
                                        color: booking.status === 'confirmed' ? '#2c7a7b' : '#dd6b20',
                                        fontWeight: 600
                                    }}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                                    {new Date(booking.booking_date).toLocaleDateString()}
                                </div>
                                <div style={{ fontSize: '12px', color: '#888' }}>
                                    Notes: {booking.notes || "No notes"}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Padding for BottomNav */}
            <div style={{ height: '80px' }} />
        </div>
    );
}
