import type { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import '../AppModern.css';

interface ProfileScreenProps {
    session: Session | null;
}

export function ProfileScreen({ session }: ProfileScreenProps) {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="phone__inner">
            <header className="phone-header">
                <div><h2 className="phone-header__title">Profile</h2></div>
            </header>

            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '40px',
                    background: 'white',
                    padding: '30px',
                    borderRadius: '24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#f2f7fd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#176FF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{session?.user.email?.split('@')[0] || "User"}</h3>
                    <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>{session?.user.email}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button className="btn-modern" style={{ background: '#FFF0F0', color: '#E02020', boxShadow: 'none' }} onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </div>
            {/* Padding for BottomNav */}
            <div style={{ height: '80px' }} />
        </div>
    );
}
