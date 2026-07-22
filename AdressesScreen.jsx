function SectorPicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, background: "var(--color-bg)", borderRadius: "var(--radius-button)", padding: 4, border: "1px solid var(--border-default)" }}>
      {window.LIEUX_SECTORS.map(s => {
        const active = value === s.key;
        return (
          <button key={s.key} onClick={() => onChange(s.key)} style={{
            flex: 1, minHeight: 44, borderRadius: "var(--radius-button)", border: "none",
            background: active ? "#fff" : "transparent", color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
            font: "var(--text-body)", fontWeight: active ? 700 : 500, fontSize: 14, cursor: "pointer",
            boxShadow: active ? "var(--shadow-card)" : "none",
          }}>{s.label}</button>
        );
      })}
    </div>
  );
}

function CategoryGrid({ value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {window.LIEUX_CATEGORIES.map(c => {
        const active = value === c.key;
        return (
          <button key={c.key} onClick={() => onChange(c.key)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 48, padding: "6px 8px",
            borderRadius: "var(--radius-card)", border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
            background: active ? "var(--lagoon-tint-16)" : "#fff", color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
            font: "var(--text-caption)", fontWeight: active ? 700 : 600, fontSize: 13, cursor: "pointer",
          }}>
            <div style={{ width: 16, height: 16, background: active ? "var(--accent-lagoon)" : "var(--text-secondary)", WebkitMaskImage: `url(assets/icons/${c.icon}.svg)`, maskImage: `url(assets/icons/${c.icon}.svg)`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", flexShrink: 0 }} />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

function EpicerieCard({ p }) {
  const { Button } = window.Guadeloupe2026DesignSystem_3f20c8;
  const distTime = [p.distance, p.time].filter(Boolean).join(" · ");
  return (
    <div style={{ background: "#fff", borderRadius: "var(--radius-card)", border: "1px solid var(--border-default)", padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{p.name}</div>
      <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{p.type} · {p.usage}</div>
      {distTime && <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{distTime}</div>}
      {p.note && <div style={{ font: "var(--text-caption)", color: "var(--text-primary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.note}</div>}
      <a href={window.mapsUrl(p.query)} target="_blank" rel="noopener" style={{ textDecoration: "none", marginTop: 4 }}>
        <Button variant="secondary" fullWidth icon="assets/icons/map-pin.svg">Itinéraire</Button>
      </a>
    </div>
  );
}

function VoirCard({ p }) {
  const { Button, Badge } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: "var(--radius-card)", border: "1px solid var(--border-default)", padding: 14 }}>
      <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{p.name}</div>
      <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 3 }}>{p.info[0]}{p.info[1] ? " · " + p.info[1] : ""}</div>
      {p.badge && <div style={{ marginTop: 6 }}><Badge tone="coral">{p.badge}</Badge></div>}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, gap: 8 }}>
        <button onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", font: "var(--text-caption)", fontWeight: 600, color: "var(--accent-lagoon)", padding: "6px 0", minHeight: 32 }}>
          Détails
          <div style={{ width: 12, height: 12, background: "var(--accent-lagoon)", transform: open ? "rotate(180deg)" : "none", WebkitMaskImage: "url(assets/icons/chevron-down.svg)", maskImage: "url(assets/icons/chevron-down.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
        </button>
        <a href={window.mapsUrl(p.query)} target="_blank" rel="noopener" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Button variant="secondary" size="compact" icon="assets/icons/map-pin.svg">Itinéraire</Button>
        </a>
      </div>
      {open && <div style={{ font: "var(--text-caption)", color: "var(--text-primary)", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border-default)" }}>{p.note}</div>}
    </div>
  );
}

function RestoCard({ r }) {
  const { Button } = window.Guadeloupe2026DesignSystem_3f20c8;
  return (
    <div style={{ background: "#fff", borderRadius: "var(--radius-card)", border: "1px solid var(--border-default)", padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ font: "var(--text-body)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{r.name}</div>
          {r.note && <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 3 }}>{r.note}</div>}
        </div>
        <a href={window.mapsUrl(r.name + " Guadeloupe")} target="_blank" rel="noopener" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Button variant="secondary" size="compact" icon="assets/icons/map-pin.svg">Itinéraire</Button>
        </a>
      </div>
    </div>
  );
}

function AdressesScreen({ D }) {
  const [sector, setSector] = React.useState(() => { const s = window.currentSector(); return s === "de" ? "de" : "sf"; });
  const [cat, setCat] = React.useState("epiceries");
  const places = window.LIEUX_PLACES.filter(p => p.category === cat && p.sector === sector);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 16px 100px" }}>
      <window.ScreenHeader title="Lieux" subtitle="Suggestions utiles sur place" />
      <SectorPicker value={sector} onChange={setSector} />
      <CategoryGrid value={cat} onChange={setCat} />

      {cat === "epiceries" && (
        <div style={{ background: "#fff", border: "1px solid var(--border-default)", borderRadius: "var(--radius-card)", padding: 12, font: "var(--text-caption)", color: "var(--text-secondary)" }}>
          {window.EPICERIES_NOTE}
        </div>
      )}

      {cat === "restos" && (
        <div style={{ background: "var(--surface-emergency)", borderRadius: "var(--radius-card)", padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <div style={{ width: 16, height: 16, background: "var(--accent-emergency)", WebkitMaskImage: "url(assets/icons/triangle-alert.svg)", maskImage: "url(assets/icons/triangle-alert.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", flexShrink: 0 }} />
            <div style={{ font: "var(--text-caption)", fontWeight: 700, color: "var(--accent-emergency)" }}>{window.ALLERGY_BANNER.title}</div>
          </div>
          <div style={{ font: "var(--text-caption)", color: "var(--text-primary)" }}>{window.ALLERGY_BANNER.body}</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {cat === "epiceries" && places.map(p => <EpicerieCard key={p.id} p={p} />)}
        {(cat === "avoir" || cat === "plages") && places.map(p => <VoirCard key={p.id} p={p} />)}
        {cat === "restos" && window.LIEUX_RESTAURANTS.map(r => <RestoCard key={r.id} r={r} />)}
      </div>
    </div>
  );
}
window.AdressesScreen = AdressesScreen;
