import { useState, useEffect, useCallback } from 'react';
import {
  Root,
  PageBody,
  Logo,
  Icon,
  Heading,
  Paragraph,
  Button,
  PreHeading,
} from '@rijkshuisstijl-community/components-react';

import { PRODUCTS, TEAM } from './data.js';
import { pingUrl } from './ping.js';
import RijksoverheidLogo from './components/RijksoverheidLogo.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductDialog from './components/ProductDialog.jsx';
import TeamMember from './components/TeamMember.jsx';

const TABS = [
  { id: 'producten', label: 'Producten' },
  { id: 'team', label: 'Wie zijn wij' },
];

export default function App() {
  const [statuses, setStatuses] = useState(
    () => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.url ? 'checking' : 'unknown'])),
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('producten');

  const checkHealth = useCallback(async () => {
    const pings = PRODUCTS.map(async (p) => {
      if (!p.url) return [p.id, 'unknown'];
      return [p.id, await pingUrl(p.url)];
    });
    setStatuses(Object.fromEntries(await Promise.all(pings)));
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 60000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const onlineCount = Object.values(statuses).filter((s) => s === 'up').length;
  const totalPingable = PRODUCTS.filter((p) => p.url).length;

  return (
    <Root className="rhc-theme app-root">
      <header className="app-header">
        <div className="app-header__bar">
          <Logo organisation="Rijksoverheid" subtitle="Ministerie van Financiën">
            <RijksoverheidLogo />
          </Logo>
        </div>

        <div className="app-header__hero">
          <div className="app-header__intro">
            <img className="app-header__logo" src="icons/innovatieteam_logo.svg" alt="" />
            <div>
              <Heading level={1} className="app-header__title">Innovatieteam</Heading>
              <Paragraph className="app-header__tagline">
                Innovatieve producten maken voor het Ministerie van Financiën
              </Paragraph>
            </div>
          </div>
          <div className="app-header__count">
            <span className="app-header__count-value">{onlineCount}/{totalPingable}</span>
            <span className="app-header__count-label">tools online</span>
          </div>
        </div>

        <nav className="app-tabs" role="tablist" aria-label="Secties">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeSection === tab.id}
              className={`app-tab${activeSection === tab.id ? ' app-tab--active' : ''}`}
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <PageBody className="app-main">
        {activeSection === 'producten' && (
          <section>
            <div className="app-section-head">
              <div>
                <Heading level={2}>Onze producten</Heading>
                <Paragraph className="app-muted">
                  Klik op een product voor details en de link naar de tool
                </Paragraph>
              </div>
              <Button appearance="subtle-button" onClick={checkHealth}>
                <Icon icon="refresh" /> Status vernieuwen
              </Button>
            </div>

            <div className="app-grid">
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  status={statuses[p.id]}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {activeSection === 'team' && (
          <section>
            <div className="app-section-head">
              <div>
                <Heading level={2}>Wie zijn wij</Heading>
                <Paragraph className="app-muted">
                  Het innovatieteam van het Ministerie van Financiën
                </Paragraph>
              </div>
            </div>

            <div className="app-card app-mission">
              <PreHeading>Onze missie</PreHeading>
              <Heading level={3} className="app-mission__title">
                Wij versterken het innovatievermogen van het Ministerie van Financiën
              </Heading>
              <Paragraph>
                Door innovatie doelgericht en wendbaar te organiseren, ondersteunen wij het beleidsdepartement van het
                Ministerie van Financiën bij het ontwikkelen, testen en toepassen van nieuwe producten en diensten. We
                leggen een solide basis voor innovatie en bouwen deze agile uit via continu leren en verbeteren. Dit
                doen we door aandacht te geven aan innovatiecultuur, structuur, middelen en planning, zodat kansrijke
                initiatieven effectief bijdragen aan waarde voor burger en klant.
              </Paragraph>
            </div>

            <Heading level={3} className="app-subhead">Teamleden</Heading>
            <div className="app-team">
              {TEAM.map((m) => <TeamMember key={m.id} member={m} />)}
            </div>
          </section>
        )}
      </PageBody>

      <footer className="app-footer">
        <span>Innovatieteam — Ministerie van Financiën</span>
        <span>Status wordt elke 60 seconden bijgewerkt</span>
      </footer>

      <ProductDialog
        product={selectedProduct}
        status={selectedProduct ? statuses[selectedProduct.id] : 'unknown'}
        onClose={() => setSelectedProduct(null)}
      />
    </Root>
  );
}
