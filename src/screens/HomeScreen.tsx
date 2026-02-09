import { useState } from 'react';
import { assets } from '../assets';
import '../AppModern.css';

interface HomeScreenProps {
    onSelectHotel: (hotel: any) => void;
    onOpenMap: (location: any) => void;
}

export function HomeScreen({ onSelectHotel, onOpenMap }: HomeScreenProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Location');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error("Search failed");
            }
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="phone__inner">
            <header className="phone-header">
                <div><p className="phone-header__eyebrow">Explore</p><h2 className="phone-header__title">Aspen</h2></div>
                <div className="phone-header__location" onClick={() => onOpenMap({ lat: 39.1911, lng: -106.8175, title: 'Aspen, USA' })} style={{ cursor: 'pointer' }}>
                    <span className="dot" /><span className="phone-header__location-label">Aspen, USA</span><span className="chevron chevron--down" aria-hidden="true" />
                </div>
            </header>

            <form onSubmit={handleSearch} className="search-bar">
                <span className="search-bar__icon" aria-hidden="true" />
                <input
                    type="text"
                    className="search-bar__input"
                    placeholder="Find places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
                />
            </form>

            <nav className="tabs" aria-label="Categories">
                {['Location', 'Hotels', 'Food', 'Adventure'].map(tab => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'tab--active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Searching...</div>}

            {searchResults.length > 0 ? (
                <section className="section">
                    <div className="section__header"><h3 className="section__title">Results</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {searchResults.map((result, index) => (
                            <div key={index} className="popular-card" onClick={() => onSelectHotel(result)} style={{ cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                    <img src={result.thumbnail || assets.popularCardPhoto} alt={result.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{result.title}</h4>
                                    <div style={{ fontSize: '12px', color: '#666' }}>{result.address}</div>
                                    <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                        <img src={assets.iconStar} alt="" style={{ width: '12px' }} /> {result.rating} ({result.reviews})
                                    </div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); onOpenMap({ lat: result.gps_coordinates?.latitude, lng: result.gps_coordinates?.longitude, title: result.title }); }} style={{ border: 'none', background: '#f0f0f0', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                                    Map
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    <section className="section">
                        <div className="section__header"><h3 className="section__title">Popular</h3><button className="link-button">See all</button></div>
                        <div className="popular-row">
                            <article className="popular-card" onClick={() => onSelectHotel({ title: 'Alley Palace' })} style={{ cursor: 'pointer' }}>
                                <div className="popular-card__image-wrapper">
                                    <img src={assets.popularCardPhoto} alt="Charming buildings in Aspen" className="popular-card__image" />
                                    <button className="icon-badge icon-badge--heart" aria-label="Save Coeurdes Alpes" onClick={(e) => e.stopPropagation()}>
                                        <img src={assets.iconHeart} alt="" />
                                    </button>
                                    <div className="popular-card__label"><span>Alley Palace</span></div>
                                    <div className="popular-card__rating"><img src={assets.iconStar} alt="" /><span>4.1</span></div>
                                </div>
                            </article>
                            <article className="popular-card popular-card--secondary">
                                <div className="popular-card__image-wrapper">
                                    <img src={assets.popularCard} alt="Snowy town in Aspen" className="popular-card__image" />
                                </div>
                            </article>
                        </div>
                    </section>

                    <section className="section section--recommended">
                        <h3 className="section__title">Recommended</h3>
                        <div className="recommended-row">
                            <article className="recommended-card">
                                <div className="recommended-card__image-wrapper">
                                    <img src={assets.recommendedCard1} alt="Ski resort in Aspen" className="recommended-card__image" />
                                    <span className="badge badge--duration">4N/5D</span>
                                </div>
                                <div className="recommended-card__body">
                                    <h4 className="recommended-card__title">Explore Aspen</h4>
                                    <div className="recommended-card__pill"><span className="trend-dot" /><span>Hot deal</span></div>
                                </div>
                            </article>
                            <article className="recommended-card">
                                <div className="recommended-card__image-wrapper">
                                    <img src={assets.recommendedCard2} alt="Luxury train in snow" className="recommended-card__image" />
                                    <span className="badge badge--duration">2N/3D</span>
                                </div>
                                <div className="recommended-card__body">
                                    <h4 className="recommended-card__title">Luxurious Aspen</h4>
                                    <div className="recommended-card__pill"><span className="trend-dot" /><span>Hot deal</span></div>
                                </div>
                            </article>
                        </div>
                    </section>
                </>
            )}

            {/* Padding for BottomNav */}
            <div style={{ height: '80px' }} />
        </div>
    )
}
