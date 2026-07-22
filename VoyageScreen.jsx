function IconHeader({ icon, accent, tint, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: "var(--radius-icon-tile)", background: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, background: "#fff", WebkitMaskImage: `url(assets/icons/${icon}.svg)`, maskImage: `url(assets/icons/${icon}.svg)`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
      </div>
      <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>{label}</div>
    </div>
  );
}

function CodeChip({ children }) {
  return <span style={{ display: "inline-block", border: "1px solid var(--border-default)", borderRadius: 8, padding: "2px 8px", font: "var(--text-caption)", fontWeight: 700, color: "var(--text-primary)", marginTop: 4 }}>{children}</span>;
}

function FlightBlock({ f, direction, tone, accent, leaveLabel, leaveTime }) {
  const { Badge } = window.Guadeloupe2026DesignSystem_3f20c8;
  return (
    <div style={{ padding: "14px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Badge tone={tone}>{direction}</Badge>
        <span style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{f.date}</span>
        <span style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>· {f.airline} {f.code}</span>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />
          <div style={{ flex: 1, width: 2, background: "var(--border-default)", minHeight: 40 }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 17, color: "var(--text-primary)" }}>{f.from}</div>
              <CodeChip>{f.fromCode}</CodeChip>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ font: "var(--text-hero-time)", fontSize: 30, color: "var(--text-primary)" }}>{f.depart}</div>
              <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>Prévu</div>
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", border: "1px solid var(--border-default)", borderRadius: "var(--radius-pill)", padding: "4px 10px" }}>
            <div style={{ width: 12, height: 12, background: "var(--text-secondary)", WebkitMaskImage: "url(assets/icons/clock.svg)", maskImage: "url(assets/icons/clock.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
            <span style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{f.duration}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 17, color: "var(--text-primary)" }}>{f.to}</div>
              <CodeChip>{f.toCode}</CodeChip>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ font: "var(--text-hero-time)", fontSize: 30, color: "var(--text-primary)" }}>{f.arrive}</div>
              <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>Prévu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function VoyageScreen({ D, go }) {
  const { Card, SectionHeader, Accordion, Button, Badge } = window.Guadeloupe2026DesignSystem_3f20c8;
  const t = D.trip;
  const stayStyle = [
    { tint: "var(--lagoon-tint-16)", accent: "var(--accent-lagoon)", tone: "lagoon", icon: "sun" },
    { tint: "var(--coral-tint-14)", accent: "var(--accent-coral)", tone: "coral", icon: "sun" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, padding: "24px 16px 100px" }}>
      <window.ScreenHeader title="Voyage" subtitle="Vols et voiture" />

      <div>
        <window.SectionLabel label="Vols" />
        <Card padding={18}>
          <IconHeader icon="plane" accent="var(--accent-lagoon)" label="Air Transat" />
          <FlightBlock f={t.flights.aller} direction="Aller" tone="lagoon" accent="var(--accent-lagoon)" leaveLabel="Quitter la maison" leaveTime={t.flights.aller.leaveHome} />
          <div style={{ borderTop: "1px solid var(--border-default)", margin: "4px 0 0" }} />
          <FlightBlock f={t.flights.retour} direction="Retour" tone="coral" accent="var(--accent-coral)" leaveLabel="Quitter Deshaies" leaveTime={t.flights.retour.leaveHouse} />
        </Card>
      </div>

      <div>
        <window.SectionLabel label="Voiture" />
        <Card padding={18}>
          <IconHeader icon="car" accent="var(--accent-tropical)" label={t.car.agency} />
          <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>Prise en charge : {t.car.pickup} · Retour : {t.car.dropoff}</div>
          <div style={{ borderTop: "1px solid var(--border-default)", margin: "14px 0 0" }} />
          <Accordion title="Détails du véhicule">
            <div>{t.car.model}</div>
            <div>{t.car.transmission}</div>
            <div>{t.car.extras}</div>
            <div>{t.car.mileage}</div>
            <div>{t.car.fuel}</div>
            <div>{t.car.deposit}</div>
          </Accordion>
          <div style={{ marginTop: 16, borderTop: "1px solid var(--border-default)", paddingTop: 16 }}>
            <div style={{ font: "var(--text-caption)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>À présenter</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {t.car.bring.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, font: "var(--text-body)", color: "var(--text-primary)" }}>
                  <div style={{ width: 18, height: 18, background: "var(--accent-tropical)", WebkitMaskImage: "url(assets/icons/circle-check.svg)", maskImage: "url(assets/icons/circle-check.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", flexShrink: 0 }} />
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-default)", margin: "16px 0 0" }} />
          <Accordion title="Récupérer la voiture (8 août)">{t.car.pickupInstructions}</Accordion>
          <Accordion title="Retourner la voiture (18 août)">{t.car.returnInstructions}</Accordion>
        </Card>
      </div>

      {t.stays.map((s, i) => {
        const st = stayStyle[i];
        return (
          <div key={s.id}>
            <window.SectionLabel label={s.name} />
            <Card padding={18}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--radius-icon-tile)", background: st.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 20, height: 20, background: "#fff", WebkitMaskImage: "url(assets/icons/house.svg)", maskImage: "url(assets/icons/house.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
                  </div>
                  <Badge tone={st.tone}>{s.place}</Badge>
                </div>
              </div>
              <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{s.period} · Hôte {s.host}</div>
              <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                <div>
                  <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>Arrivée</div>
                  <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>{s.checkin.replace("Arrivée ", "")}</div>
                </div>
                <div>
                  <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>Départ</div>
                  <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>{s.checkout.replace("Départ ", "")}</div>
                </div>
              </div>
              <button onClick={() => go(`stay-${s.id}`)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", borderTop: "1px solid var(--border-default)", marginTop: 14, paddingTop: 14, cursor: "pointer", font: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)" }}>
                Voir l'hébergement
                <div style={{ width: 16, height: 16, background: "var(--text-secondary)", WebkitMaskImage: "url(assets/icons/chevron-right.svg)", maskImage: "url(assets/icons/chevron-right.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
              </button>
            </Card>
          </div>
        );
      })}
      <Button variant="secondary" fullWidth icon="assets/icons/map-pin.svg" onClick={() => go("adresses")}>Voir les adresses</Button>
    </div>
  );
}
window.VoyageScreen = VoyageScreen;
