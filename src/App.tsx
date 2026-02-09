import './App.css'

// Image assets exported from the Aspen Figma design
// https://www.figma.com/design/vR1h2OhtxAmtxKSENBCKE0/Aspen-Travel-App-Exploration--Mobile-App-Design--Community-?node-id=0-11

const heroWelcome =
  'https://www.figma.com/api/mcp/asset/dbb2db40-5207-4a11-a5dc-6deb464ab292'
const heroDetail =
  'https://www.figma.com/api/mcp/asset/29e6ca60-91f4-4aaa-b7a2-96c7c129061a'
const heroDetailPhoto =
  'https://www.figma.com/api/mcp/asset/ac0ca00f-e3d9-4668-a6ea-795aa25430f9'
const popularCard =
  'https://www.figma.com/api/mcp/asset/d01ed99a-1dec-4f91-8e00-88f116728309'
const popularCardPhoto =
  'https://www.figma.com/api/mcp/asset/fc191eda-1183-47bc-bace-445e7afd3cd8'
const recommendedCard1 =
  'https://www.figma.com/api/mcp/asset/1ed55075-aec6-4e56-8b60-5db266622cc6'
const recommendedCard2 =
  'https://www.figma.com/api/mcp/asset/8e06ed80-f5aa-461b-a2ca-8b77268c6812'

const iconHeart =
  'https://www.figma.com/api/mcp/asset/2d4eb2d2-ee0c-4602-a01b-2b9703ede97b'
const iconStar =
  'https://www.figma.com/api/mcp/asset/6dbee944-6ea7-4aed-af87-64612565e8bb'
const iconWifi =
  'https://www.figma.com/api/mcp/asset/91988e68-98dc-4cc1-9584-d53556a97681'
const iconFood =
  'https://www.figma.com/api/mcp/asset/a96661b6-4304-4287-8101-628ba9501fc9'
const iconBath =
  'https://www.figma.com/api/mcp/asset/e48f6aa6-a195-453b-8963-358299e9ab07'
const iconPool =
  'https://www.figma.com/api/mcp/asset/50d9a539-3acf-49b3-9b04-648ff62ea601'

function WelcomeScreen() {
  return (
    <section className="phone phone--welcome" aria-label="Welcome to Aspen">
      <div className="phone__inner phone__inner--welcome">
        <div className="welcome-hero">
          <img
            src={heroWelcome}
            alt="Snowy mountains near Aspen"
            className="welcome-hero__image"
          />
          <div className="welcome-hero__overlay" />
          <div className="welcome-hero__content">
            <h1 className="welcome-title">Aspen</h1>
            <p className="welcome-subtitle">
              <span>Plan your</span>
              <br />
              <span>Luxurious Vacation</span>
            </p>
          </div>
        </div>

        <button className="primary-button primary-button--full">
          Explore
        </button>
      </div>
    </section>
  )
}

function ExploreScreen() {
  return (
    <section className="phone phone--explore" aria-label="Explore Aspen">
      <div className="phone__inner">
        <header className="phone-header">
          <div>
            <p className="phone-header__eyebrow">Explore</p>
            <h2 className="phone-header__title">Aspen</h2>
          </div>
          <div className="phone-header__location">
            <span className="dot" />
            <span className="phone-header__location-label">Aspen, USA</span>
            <span className="chevron chevron--down" aria-hidden="true" />
          </div>
        </header>

        <div className="search-bar">
          <span className="search-bar__icon" aria-hidden="true" />
          <span className="search-bar__placeholder">Find things to do</span>
        </div>

        <nav className="tabs" aria-label="Categories">
          <button className="tab tab--active">Location</button>
          <button className="tab">Hotels</button>
          <button className="tab">Food</button>
          <button className="tab">Adventure</button>
        </nav>

        <section className="section">
          <div className="section__header">
            <h3 className="section__title">Popular</h3>
            <button className="link-button">See all</button>
          </div>

          <div className="popular-row">
            <article className="popular-card">
              <div className="popular-card__image-wrapper">
                <img
                  src={popularCardPhoto}
                  alt="Charming buildings in Aspen"
                  className="popular-card__image"
                />
                <button
                  className="icon-badge icon-badge--heart"
                  aria-label="Save Coeurdes Alpes"
                >
                  <img src={iconHeart} alt="" />
                </button>
                <div className="popular-card__label">
                  <span>Alley Palace</span>
                </div>
                <div className="popular-card__rating">
                  <img src={iconStar} alt="" />
                  <span>4.1</span>
                </div>
              </div>
            </article>

            <article className="popular-card popular-card--secondary">
              <div className="popular-card__image-wrapper">
                <img
                  src={popularCard}
                  alt="Snowy town in Aspen"
                  className="popular-card__image"
                />
              </div>
            </article>
          </div>
        </section>

        <section className="section section--recommended">
          <h3 className="section__title">Recommended</h3>

          <div className="recommended-row">
            <article className="recommended-card">
              <div className="recommended-card__image-wrapper">
                <img
                  src={recommendedCard1}
                  alt="Ski resort in Aspen"
                  className="recommended-card__image"
                />
                <span className="badge badge--duration">4N/5D</span>
              </div>
              <div className="recommended-card__body">
                <h4 className="recommended-card__title">Explore Aspen</h4>
                <div className="recommended-card__pill">
                  <span className="trend-dot" />
                  <span>Hot deal</span>
                </div>
              </div>
            </article>

            <article className="recommended-card">
              <div className="recommended-card__image-wrapper">
                <img
                  src={recommendedCard2}
                  alt="Luxury train in snow"
                  className="recommended-card__image"
                />
                <span className="badge badge--duration">2N/3D</span>
              </div>
              <div className="recommended-card__body">
                <h4 className="recommended-card__title">Luxurious Aspen</h4>
                <div className="recommended-card__pill">
                  <span className="trend-dot" />
                  <span>Hot deal</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <nav className="bottom-nav" aria-label="Main navigation">
          <button className="bottom-nav__item bottom-nav__item--active">
            <span className="bottom-nav__icon bottom-nav__icon--home" />
          </button>
          <button className="bottom-nav__item">
            <span className="bottom-nav__icon bottom-nav__icon--ticket" />
          </button>
          <button className="bottom-nav__item">
            <span className="bottom-nav__icon bottom-nav__icon--heart" />
          </button>
          <button className="bottom-nav__item">
            <span className="bottom-nav__icon bottom-nav__icon--profile" />
          </button>
        </nav>
      </div>
    </section>
  )
}

function DetailScreen() {
  return (
    <section className="phone phone--detail" aria-label="Hotel details">
      <div className="phone__inner">
        <div className="detail-hero">
          <img
            src={heroDetailPhoto}
            alt="Coeurdes Alpes hotel"
            className="detail-hero__image"
          />
          <button
            className="icon-badge icon-badge--heart detail-hero__heart"
            aria-label="Save Coeurdes Alpes"
          >
            <img src={iconHeart} alt="" />
          </button>
        </div>

        <header className="detail-header">
          <h2 className="detail-header__title">Coeurdes Alpes</h2>
          <button className="link-button">Show map</button>
        </header>
        <div className="detail-rating">
          <img src={iconStar} alt="" />
          <span className="detail-rating__score">4.5</span>
          <span className="detail-rating__meta">(355 reviews)</span>
        </div>

        <p className="detail-description">
          Aspen is as close as one can get to a storybook alpine town in
          America. The choose-your-own-adventure possibilities—skiing, hiking,
          dining, shopping and more—are endless.
        </p>

        <section className="section section--facilities">
          <h3 className="section__title">Facilities</h3>
          <div className="facilities-row">
            <div className="facility-card">
              <img src={iconWifi} alt="" />
              <span>1 Heater</span>
            </div>
            <div className="facility-card">
              <img src={iconFood} alt="" />
              <span>Dinner</span>
            </div>
            <div className="facility-card">
              <img src={iconBath} alt="" />
              <span>1 Tub</span>
            </div>
            <div className="facility-card">
              <img src={iconPool} alt="" />
              <span>Pool</span>
            </div>
          </div>
        </section>

        <footer className="detail-footer">
          <div className="detail-price">
            <span className="detail-price__label">Price</span>
            <span className="detail-price__value">$199</span>
          </div>
          <button className="primary-button detail-footer__cta">
            Book now
          </button>
        </footer>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-background">
      <div className="aspen-layout">
        <WelcomeScreen />
        <ExploreScreen />
        <DetailScreen />
      </div>
      <div className="aspen-layout__snow" aria-hidden="true">
        <img
          src={heroDetail}
          alt=""
          className="aspen-layout__snow-image"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default App
