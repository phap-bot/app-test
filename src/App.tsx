import { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import { BottomNav } from './components/BottomNav'
import { HomeScreen } from './screens/HomeScreen'
import { DetailScreen } from './screens/DetailScreen'
import { BookingsScreen } from './screens/BookingsScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { FavoritesScreen } from './screens/FavoritesScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'
import './App.css'
import './AppModern.css'

import { MapScreen } from './screens/MapScreen'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loadingSession, setLoadingSession] = useState(true)

  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'favorites' | 'profile'>('home')
  const [showWelcome, setShowWelcome] = useState(true)
  const [selectedHotel, setSelectedHotel] = useState<any>(null)
  const [mapLocation, setMapLocation] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoadingSession(false)
      if (session) setShowWelcome(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) setShowWelcome(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loadingSession) return null;

  if (!session) {
    return <Auth />
  }

  if (showWelcome) {
    return <WelcomeScreen onExplore={() => setShowWelcome(false)} />
  }

  // Map Screen Overlay
  if (mapLocation) {
    return <MapScreen onBack={() => setMapLocation(null)} location={mapLocation} />
  }

  // Detail Screen Overlay
  if (selectedHotel) {
    return <DetailScreen onBack={() => setSelectedHotel(null)} session={session} />
  }

  return (
    <div className="app-background" style={{ padding: 0, alignItems: 'flex-start', background: '#f8f9fa' }}>
      <div className="phone" style={{ height: '100vh', width: '100%', maxWidth: '600px', borderRadius: 0, boxShadow: 'none' }}>
        <div className="app-content" style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {activeTab === 'home' && <HomeScreen onSelectHotel={setSelectedHotel} onOpenMap={setMapLocation} />}
          {activeTab === 'bookings' && <BookingsScreen session={session} />}
          {activeTab === 'favorites' && <FavoritesScreen />}
          {activeTab === 'profile' && <ProfileScreen session={session} />}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default App
