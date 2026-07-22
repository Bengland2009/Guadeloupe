function TimelineStep({ time, label, accent, isLast }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 10, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 4 }} />
        {!isLast && <div style={{ flex: 1, width: 2, background: "var(--border-default)", minHeight: 28 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 16, flex: 1, display: "grid", gridTemplateColumns: "112px 1fr", columnGap: 10 }}>
        <div style={{ font: "var(--text-hero-time)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{time}</div>
        <div style={{ font: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{label}</div>
      </div>
    </div>
  );
}

function FuelIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="15" y2="22" />
      <line x1="4" y1="9" x2="14" y2="9" />
      <path d="M4 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18" />
      <path d="M16 8h1.5a2 2 0 0 1 2 2v3.5a1.5 1.5 0 0 0 3 0V9a2 2 0 0 0-.59-1.41L19 5.5" />
    </svg>
  );
}

function TimelineMilestone({ label, accent, isLast }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 10, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 4 }} />
        {!isLast && <div style={{ flex: 1, width: 2, background: "var(--border-default)", minHeight: 28 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 16, flex: 1, display: "grid", gridTemplateColumns: "112px 1fr", columnGap: 10, alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FuelIcon color={accent} />
        </div>
        <div style={{ font: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
      </div>
    </div>
  );
}

function SectionCard({ icon, accent, title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: "var(--radius-icon-tile)", background: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 17, height: 17, background: "#fff", WebkitMaskImage: `url(assets/icons/${icon}.svg)`, maskImage: `url(assets/icons/${icon}.svg)`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
        </div>
        <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{title}</div>
      </div>
      {children}
    </div>
  );
}

function CheckStep({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 18, height: 18, background: "var(--accent-tropical)", WebkitMaskImage: "url(assets/icons/circle-check.svg)", maskImage: "url(assets/icons/circle-check.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", flexShrink: 0 }} />
      <div style={{ font: "var(--text-body)", color: "var(--text-primary)" }}>{text}</div>
    </div>
  );
}

function CompactLine({ label, detail }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{label}</div>
      <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{detail}</div>
    </div>
  );
}

function GateBadge({ accent, gate }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 26, borderRadius: "var(--radius-pill)", background: accent, color: "#fff", font: "var(--text-caption)", fontWeight: 700, flexShrink: 0 }}>
      Porte {gate}
    </div>
  );
}

function GatePlan({ letter, accent, icon, title, gate, conditions, note, isLast }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "26px 1fr 64px", columnGap: 10, alignItems: "start", padding: "12px 0", borderBottom: isLast ? "none" : "1px solid var(--border-default)" }}>
      <div style={{ width: 26, height: 26, borderRadius: "var(--radius-icon-tile)", background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 13, height: 13, background: "#fff", WebkitMaskImage: `url(assets/icons/${icon}.svg)`, maskImage: `url(assets/icons/${icon}.svg)`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)", lineHeight: "26px" }}>{letter ? `${letter} — ${title}` : title}</div>
        {conditions.map((c, i) => <div key={i} style={{ font: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 2 }}>{c}</div>)}
        {note && <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 2 }}>{note}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end", height: 26 }}>
        <GateBadge accent={accent} gate={gate} />
      </div>
    </div>
  );
}

function PratiqueScreen({ D }) {
  const { Button } = window.Guadeloupe2026DesignSystem_3f20c8;
  const p = D.trip.practical;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px 16px 100px" }}>
      <window.ScreenHeader title="Pratique" subtitle="Départ, retour et transition" />

      <div>
        <window.SectionLabel label="Départ de Montréal" />
        <SectionCard icon="plane" accent="var(--accent-lagoon)" title="Vers l'aéroport">
          <TimelineStep time={p.depart.leave} label="Quitter la maison" accent="var(--accent-lagoon)" />
          <TimelineStep time={p.depart.airportArrival} label="Arrivée au terminal" accent="var(--accent-lagoon)" />
          <TimelineStep time={p.depart.flight} label="Départ du vol" accent="var(--accent-lagoon)" isLast />
          <div style={{ display: "flex", gap: 14, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-default)", font: "var(--text-caption)", color: "var(--text-secondary)" }}>
            <span>Distance : {p.depart.distance}</span>
            <span>Trajet : {p.depart.duration}</span>
          </div>
        </SectionCard>
      </div>

      <div>
        <SectionCard icon="car" accent="var(--accent-lagoon)" title="Accès à YUL">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <CompactLine label="Taxi réservé" detail="Jusqu'à l'aérogare" />
            <CompactLine label="La veille" detail="Vérifier le Planificateur de transit YUL" />
            <CompactLine label="Si P10 recommandé" detail="Demander au taxi de déposer au P10" />
            <CompactLine label="P10 → porte 20" detail="Navette en voie dédiée, environ 5 minutes" />
          </div>
          <a href="https://yuldirections.admtl.com/fr/" target="_blank" rel="noopener" style={{ textDecoration: "none", display: "block", marginTop: 12 }}>
            <Button variant="secondary" fullWidth icon="assets/icons/external-link.svg">Ouvrir le planificateur YUL</Button>
          </a>
        </SectionCard>
      </div>

      <div>
        <window.SectionLabel label="Retour" />
        <SectionCard icon="car" accent="var(--accent-coral)" title="Trajet vers PTP">
          <TimelineStep time={p.retour.leave} label="Quitter Deshaies" accent="var(--accent-coral)" />
          <TimelineStep time={p.retour.airportArrival} label="Arrivée à PTP" accent="var(--accent-coral)" />
          <TimelineMilestone label="Faire le plein" accent="var(--accent-coral)" />
          <TimelineStep time="10 h" label="Retourner la voiture" accent="var(--accent-coral)" />
          <TimelineStep time={p.retour.flight} label="Départ du vol" accent="var(--accent-coral)" isLast />
        </SectionCard>
      </div>

      <div>
        <SectionCard icon="navigation" accent="var(--accent-coral)" title="Sortie de YUL">
          <div style={{ font: "var(--text-caption)", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 2 }}>
            Choisir selon la congestion et la longueur des files. Ne rien réserver à heure fixe.
          </div>
          <GatePlan letter="Plan A" accent="var(--accent-lagoon)" icon="car" title="Taxi" gate="23" conditions={["Premier choix"]} />
          <GatePlan letter="Plan B" accent="var(--accent-tropical)" icon="car" title="Limousine" gate="24" conditions={["Si l’attente pour les taxis paraît longue", "Sans réservation"]} />
          <GatePlan letter="Plan C" accent="var(--accent-coral)" icon="navigation" title="P10" gate="20" conditions={["Si le secteur des portes est congestionné ou bloqué", "Navette dédiée · environ 5 min"]} note="Récupération par un proche ou un chauffeur." />
          <GatePlan accent="var(--text-secondary)" icon="car" title="Uber Black" gate="25" conditions={[]} />
          <GatePlan accent="var(--text-secondary)" icon="car" title="Uber et Lyft réguliers" gate="28" conditions={["Secteur Leigh-Capreol"]} isLast />
        </SectionCard>
      </div>

      <div>
        <window.SectionLabel label={`Transition du ${p.transition.date}`} />
        <SectionCard icon="luggage" accent="var(--accent-tropical)" title="Changement d'hébergement">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <CheckStep text={`Quitter Raisins Clairs ${p.transition.from}`} />
            <CheckStep text={`Arrivée à Deshaies ${p.transition.to}`} />
            <CheckStep text="Garder les bagages avec soi" />
            <CheckStep text="Ne rien laisser visible dans la voiture" />
          </div>
        </SectionCard>
      </div>

      <div>
        <window.SectionLabel label="Urgences" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {p.emergency.map(n => (
            <div key={n.number} style={{ background: "var(--surface-emergency)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)", padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "var(--radius-icon-tile)", background: "var(--accent-emergency)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 20, height: 20, background: "#fff", WebkitMaskImage: "url(assets/icons/phone.svg)", maskImage: "url(assets/icons/phone.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 17, color: "var(--text-primary)" }}>{n.label}</div>
                <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{n.number}</div>
              </div>
              <a href={`tel:${n.number}`} style={{ textDecoration: "none" }}><Button variant="urgence" size="compact" icon="assets/icons/phone.svg">Appeler</Button></a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.PratiqueScreen = PratiqueScreen;
