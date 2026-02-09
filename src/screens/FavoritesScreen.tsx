import '../AppModern.css';

export function FavoritesScreen() {
    return (
        <div className="phone__inner">
            <header className="phone-header">
                <div><h2 className="phone-header__title">Saved</h2></div>
            </header>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
                <p>No saved hotels yet.</p>
                <p style={{ fontSize: '12px' }}>Tap the heart icon on any hotel to save it.</p>
            </div>
            {/* Padding for BottomNav */}
            <div style={{ height: '80px' }} />
        </div>
    );
}
