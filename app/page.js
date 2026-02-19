"use client";
import { useState } from "react";

const P = {
  bg:"#0b0e18",s1:"#111528",s2:"#161b32",brd:"#222845",
  tx:"#e1e7f0",tx2:"#8b95b0",tx3:"#576080",
  ac:"#818cf8",acS:"rgba(129,140,248,.12)",
  g:"#34d399",gS:"rgba(52,211,153,.12)",
  am:"#fbbf24",amS:"rgba(251,191,36,.12)",
  ro:"#fb7185",roS:"rgba(251,113,133,.12)",
  cy:"#22d3ee",
};

const ROLES = [
  { id:"hr_chef", label:"HR-chef / CHRO / VP HR", reply:"14.4%", best:"Uppföljning (38%) & Social/casual (21%)", strategy:"Bygg relation först. HR-chefer äger rekryteringsfrågan och vill känna förtroende innan de bokar möte. Undvik hård pitch." },
  { id:"hr_spec", label:"HR-specialist / HRBP", reply:"15.5%", best:"Värdeerbjudande (27%) & Social/casual (18%)", strategy:"Lyft konkret vad ni kan göra. De jobbar operativt med rekrytering och vill förstå ert erbjudande i praktiken." },
  { id:"vd", label:"VD / CEO / GM", reply:"9.7%", best:"Samarbete (17%) & Kandidat-pitch (13%)", strategy:"Tänk strategi och partnerskap. VD:ar svarar inte på EB-pitch (5%), de vill höra om samarbete och tillväxt." },
  { id:"cfo", label:"CFO / Ekonomichef", reply:"10.8%", best:"Mötesfråga rakt av (18%)", strategy:"Rakt på sak. CFO:er gillar inte small talk (social/casual = 3%). Gå direkt på mötesfrågan." },
  { id:"cto", label:"CTO / IT-chef / Tech Lead", reply:"4.6%", best:"Värdeerbjudande (8%), men svårast att nå", strategy:"CTO:er öppnar 40% men svarar sällan. Undvik EB-pitch helt (3%). Prova kandidat-pitch eller konkret värdeerbjudande kopplat till tech-rekrytering." },
  { id:"cmo", label:"CMO / Marknadschef", reply:"9.9%", best:"Mötesfråga (18%)", strategy:"Mötesfråga funkar bäst. De förstår employer branding men vill inte bli sålda till. Fråga istället." },
  { id:"salj", label:"Säljchef / CCO / Affärsutvecklare", reply:"7.5%", best:"Uppföljning (33%) & Kandidat-pitch (18%)", strategy:"Säljchefer filtrerar hårt. Uppföljning funkar bäst (33%), inte Mötesfråga (10%). Automation = 0% på 397 mail. Personligt eller inget." },
  { id:"mellan", label:"Mellanchef / Manager / Ansvarig", reply:"9.5%", best:"Mötesfråga (12%) & Uppföljning (19%)", strategy:"Bredast mottagliga gruppen. Mötesfråga som volymstrategi, uppföljning som konverterare. Fungerar i de flesta branscher." },
  { id:"ovrigt", label:"Övrigt / Okänd roll", reply:"~7%", best:"Mötesfråga (generellt säkrast)", strategy:"När rollen är okänd eller bred, kör Mötesfråga med kort svensk ämnesrad och frågetecken. Det är den approach som fungerar bredast enligt datan." },
];

const REGIONS = [
  { id:"sthlm", label:"Stockholm-regionen", reply:"8.8%", note:"Mest mättat. Transaktionell approach. Mötesfråga 9.1%, Social 9.9%. Uppföljning 17.9%." },
  { id:"gbg", label:"Göteborgs-regionen", reply:"10.8%", note:"Relationell approach funkar extra bra. Uppföljning 31.8%(!), Social 12.1%, Mötesfråga 11.7%." },
  { id:"syd", label:"Sydsverige (Malmö/Lund/Halmstad)", reply:"9.0%", note:"Social/casual 12.5%. Mötesfråga 8.2%. Halmstad 15% svar, Lund 12%." },
  { id:"mellan", label:"Mellansverige (Uppsala/Västerås/Örebro)", reply:"10.7%", note:"Värdeerbjudande funkar starkt här (18.5%). Mötesfråga 11.2%." },
  { id:"ovr", label:"Övriga Sverige", reply:"12.8%", note:"Bäst svar av alla! Social/casual 15%, Mötesfråga 14.6%, Uppföljning 26.8%. Industristäder: Trollhättan 30%, Södertälje 21%." },
  { id:"no", label:"Norge", reply:"3.1%", note:"Öppnar mest (45.5%) men svarar minst. Nästan inga uppföljningar skickas. Mötesfråga 5.8%. Kräver helt ny approach med systematiska uppföljningar." },
  { id:"ovrigt", label:"Övrigt / Okänd region", reply:"~7-10%", note:"Ingen specifik regiondata. Generella best practices: svenska ämnesrader, frågetecken, 07:00 mån-tis. Uppföljning är alltid starkt." },
];

const INDUSTRIES = [
  { id:"staffing", label:"Staffing & Recruiting", reply:"14.4%" },
  { id:"logistics", label:"Logistik & Supply Chain", reply:"13.8%" },
  { id:"construction", label:"Bygg & Construction", reply:"12.5%" },
  { id:"government", label:"Offentlig sektor", reply:"12.3%" },
  { id:"renewables", label:"Renewables & Miljö", reply:"10.4%" },
  { id:"realestate", label:"Fastigheter", reply:"9.9%" },
  { id:"machinery", label:"Maskiner & Industri", reply:"9.5%" },
  { id:"healthcare", label:"Sjukvård & Hälsa", reply:"8.6%" },
  { id:"mechanical", label:"Mek. / Industriell teknik", reply:"8.6%" },
  { id:"automotive", label:"Automotive", reply:"8.5%" },
  { id:"hr", label:"Human Resources", reply:"8.0%" },
  { id:"food", label:"Livsmedel / Food Production", reply:"7.9%" },
  { id:"it_services", label:"IT & Services", reply:"7.4%" },
  { id:"consumer", label:"Konsumentvaror", reply:"7.1%" },
  { id:"building", label:"Byggmaterial", reply:"6.9%" },
  { id:"consulting", label:"Management Consulting", reply:"6.7%" },
  { id:"retail", label:"Retail / Detaljhandel", reply:"6.4%" },
  { id:"financial", label:"Financial Services", reply:"6.0%" },
  { id:"software", label:"Computer Software / SaaS", reply:"3.9%" },
  { id:"telecom", label:"Telecom", reply:"3.3%" },
  { id:"internet", label:"Internet / Digital", reply:"1.4%" },
  { id:"ovrigt", label:"Övrigt / Okänd bransch", reply:"~7%" },
];

const LIFECYCLES = [
  { id:"cold", label:"Kall lead (första kontakt)", reply:"7.5%", strategy:"Första kontakten. Behöver 3+ steg. Mötesfråga eller Social som öppnare." },
  { id:"mql", label:"MQL (visat intresse)", reply:"11.7%", strategy:"Har visat intresse. Värdeerbjudande funkar. 2-3 steg." },
  { id:"sql", label:"SQL (kvalificerad)", reply:"16.2%", strategy:"Kvalificerad kontakt. Mötesfråga direkt. 2 steg räcker ofta." },
  { id:"opp", label:"Opportunity (pågående dialog)", reply:"14.9%", strategy:"Pågående dialog. Uppföljning med ny vinkel. 2 steg." },
  { id:"customer", label:"Befintlig kund", reply:"18.2%", strategy:"2.4x bättre svar än kalla leads. Relationell approach. Social/casual eller Uppföljning." },
  { id:"unknown", label:"Oklassificerad / vet ej", reply:"~7.5%", strategy:"Behandla som kall lead. 3 steg med gradvis uppbyggnad." },
];



function buildUserPrompt(role, region, industry, lifecycle, name, company, context, humor, warmth, directness) {
  const r = ROLES.find(x => x.id === role);
  const reg = REGIONS.find(x => x.id === region);
  const ind = INDUSTRIES.find(x => x.id === industry);
  const lc = LIFECYCLES.find(x => x.id === lifecycle);

  const humorLabels = {1:"Seriös", 2:"Lite humor", 3:"Lekfull"};
  const warmthLabels = {1:"Affärsmässig", 2:"Vänlig", 3:"Personlig"};
  const directLabels = {1:"Mjuk", 2:"Balanserad", 3:"Rakt på"};

  let prompt = `Generera en mailsekvens för:\n\n`;
  prompt += `ROLL: ${r?.label || role}\n`;
  prompt += `REGION: ${reg?.label || region}\n`;
  prompt += `BRANSCH: ${ind?.label || industry}\n`;
  prompt += `KONTAKTNIVÅ: ${lc?.label || lifecycle} (${lc?.reply || '?'} svar)\n`;
  if (name) prompt += `KONTAKTPERSON: ${name}\n`;
  if (company) prompt += `FÖRETAG: ${company}\n`;
  if (context) prompt += `EXTRA KONTEXT: ${context}\n`;

  prompt += `\nTON: Humor=${humor} (${humorLabels[humor]}), Värme=${warmth} (${warmthLabels[warmth]}), Rakhet=${directness} (${directLabels[directness]})\n`;

  prompt += `\nRegiondata: ${reg?.note || ''}\n`;
  prompt += `Rolldata: ${r?.strategy || ''}\n`;
  prompt += `Branschens svarsfrekvens: ${ind?.reply || 'okänd'}\n`;
  prompt += `Kontaktnivå: ${lc?.strategy || 'Behandla som kall lead.'}\n`;

  prompt += `\nKom ihåg: Syftet är att boka möte men svarsfrekvens är också viktigt. Om inget namn angetts, använd [Förnamn] som placeholder - hitta ALDRIG på namn. Använd rätt approach för just denna kombination av roll × bransch × region. Tonen ska följa användarens val men strategin styrs av datan. INGA talstreck (— –) i texten. Svara BARA med JSON.`;

  return prompt;
}

const Select = ({ label, value, onChange, options, helpText }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: P.tx2, display: "block", marginBottom: 5 }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: "100%", padding: "10px 12px", background: P.s2, border: `1px solid ${P.brd}`,
      borderRadius: 8, color: P.tx, fontSize: 13, fontFamily: "inherit", cursor: "pointer",
      appearance: "auto"
    }}>
      <option value="">Välj...</option>
      {options.map(o => <option key={o.id} value={o.id}>{o.label}{o.reply ? ` · ${o.reply} svar` : ''}</option>)}
    </select>
    {helpText && <div style={{ fontSize: 10, color: P.tx3, marginTop: 3 }}>{helpText}</div>}
  </div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: P.tx2, display: "block", marginBottom: 5 }}>{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
      width: "100%", padding: "10px 12px", background: P.s2, border: `1px solid ${P.brd}`,
      borderRadius: 8, color: P.tx, fontSize: 13, fontFamily: "inherit"
    }} />
  </div>
);

const ToneControl = ({ label, value, onChange, options, icon }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: P.tx2, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
      <span>{icon}</span> {label}
    </div>
    <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: `1px solid ${P.brd}` }}>
      {options.map((opt, i) => (
        <button key={i} onClick={() => onChange(i + 1)} style={{
          flex: 1, padding: "8px 4px", background: value === i + 1 ? P.acS : P.s2,
          border: "none", borderRight: i < 2 ? `1px solid ${P.brd}` : "none",
          color: value === i + 1 ? P.ac : P.tx3, fontSize: 11, fontWeight: value === i + 1 ? 700 : 400,
          cursor: "pointer", fontFamily: "inherit", transition: "all .15s"
        }}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const StepCard = ({ step, index }) => {
  const colors = [P.ac, P.g, P.am, P.cy, P.ro];
  const c = colors[index % colors.length] || P.ac;
  return (
    <div style={{ background: P.s1, border: `1px solid ${P.brd}`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: c + "20", color: c, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{step.step}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: P.tx }}>{step.type}</div>
            <div style={{ fontSize: 10, color: P.tx3 }}>{step.approach}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: c }}>{step.send_day} {step.send_time}</div>
        </div>
      </div>

      <div style={{ background: P.s2, borderRadius: 8, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: P.tx3, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Ämnesrad</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: P.tx }}>{step.subject}</div>
      </div>

      <div style={{ background: P.s2, borderRadius: 8, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: P.tx3, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Mailtext</div>
        <div style={{ fontSize: 13, color: P.tx, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{step.body}</div>
      </div>

      <div style={{ background: c + "10", borderLeft: `3px solid ${c}`, borderRadius: "0 6px 6px 0", padding: "8px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: c, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>Varför denna approach?</div>
        <div style={{ fontSize: 11, color: P.tx2, lineHeight: 1.5 }}>{step.why}</div>
      </div>
    </div>
  );
};

export default function MailGenerator() {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [industry, setIndustry] = useState("");
  const [lifecycle, setLifecycle] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);
  const [addingStep, setAddingStep] = useState(false);
  const [humor, setHumor] = useState(2);
  const [warmth, setWarmth] = useState(2);
  const [directness, setDirectness] = useState(2);

  const canGenerate = role && region && industry && lifecycle;

  async function generate() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: buildUserPrompt(role, region, industry, lifecycle, name, company, context, humor, warmth, directness)
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError("Kunde inte generera. Försök igen. (" + e.message + ")");
    }
    setLoading(false);
  }

  function copyStep(step) {
    const text = `Ämne: ${step.subject}\n\n${step.body}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(step.step);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function copyAll() {
    if (!result) return;
    const text = result.steps.map((s, i) =>
      `--- STEG ${s.step}: ${s.type} (${s.send_day} ${s.send_time}) ---\nÄmne: ${s.subject}\n\n${s.body}\n`
    ).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied("all");
      setTimeout(() => setCopied(null), 2000);
    });
  }

  async function addStep() {
    if (!result) return;
    setAddingStep(true);
    try {
      const lastStep = result.steps[result.steps.length - 1];
      const stepNum = result.steps.length + 1;
      const existingSummary = result.steps.map(s =>
        `Steg ${s.step} (${s.send_day} ${s.send_time}): Approach="${s.approach}", Ämne="${s.subject}"`
      ).join("\n");

      const addPrompt = `Du har redan genererat följande sekvens för ${ROLES.find(x=>x.id===role)?.label || role} i ${INDUSTRIES.find(x=>x.id===industry)?.label || industry} (${REGIONS.find(x=>x.id===region)?.label || region}):

${existingSummary}

Toninställningar: Humor=${humor}, Värme=${warmth}, Rakhet=${directness}

Generera ETT till uppföljningssteg (steg ${stepNum}). Det ska:
- Referera till tidigare mail men adda nytt värde eller ny vinkel
- Inte upprepa samma approach, hitta en ny ingång
- Tidsplaneras logiskt efter steg ${result.steps.length} (${lastStep.send_day} ${lastStep.send_time})
- Följa alla regler i systemprompt (inga talstreck, samma ton)

Svara BARA med JSON för ETT steg:
{"step": ${stepNum}, "type": "Uppföljning ${stepNum - 1}", "send_day": "...", "send_time": "...", "subject": "...", "body": "...", "approach": "...", "why": "..."}`;

      const response = await fetch("/api/add-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addPrompt })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(prev => ({ ...prev, steps: [...prev.steps, data] }));
    } catch (e) {
      setError("Kunde inte lägga till steg. Försök igen.");
    }
    setAddingStep(false);
  }

  const selectedRole = ROLES.find(r => r.id === role);
  const selectedRegion = REGIONS.find(r => r.id === region);
  const selectedIndustry = INDUSTRIES.find(r => r.id === industry);
  const selectedLifecycle = LIFECYCLES.find(r => r.id === lifecycle);

  return (
    <div style={{ background: P.bg, minHeight: "100vh", color: P.tx, fontFamily: "system-ui,-apple-system,sans-serif" }}>

      <div style={{ background: "linear-gradient(135deg,#111528,#1a1040)", borderBottom: `1px solid ${P.brd}`, padding: "20px 24px 16px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: P.ac, boxShadow: `0 0 10px ${P.ac}` }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: P.ac, textTransform: "uppercase", letterSpacing: ".12em" }}>Oddwork Sales Intelligence</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>Mailgenerator</h1>
          <p style={{ fontSize: 11, color: P.tx3, margin: "2px 0 0" }}>AI-driven sekvensbyggare baserad på 44 609 analyserade mail</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 24px 48px" }}>

        {/* Input form */}
        <div style={{ background: P.s1, border: `1px solid ${P.brd}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Vem mailar du?</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Select label="Roll / Titel" value={role} onChange={setRole} options={ROLES} />
            <Select label="Region" value={region} onChange={setRegion} options={REGIONS} />
            <Select label="Bransch" value={industry} onChange={setIndustry} options={INDUSTRIES} />
            <Select label="Kontaktnivå" value={lifecycle} onChange={setLifecycle} options={LIFECYCLES} />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Input label="Kontaktpersonens namn" value={name} onChange={setName} placeholder="t.ex. Anna" />
            <Input label="Företag" value={company} onChange={setCompany} placeholder="t.ex. Volvo" />
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: P.tx2, display: "block", marginBottom: 5 }}>Extra kontext (valfritt)</label>
            <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="t.ex. 'Träffade dem på mässa i höstas', 'De söker 3 utvecklare just nu', 'Bytte HR-chef nyligen'..." rows={2} style={{
              width: "100%", padding: "10px 12px", background: P.s2, border: `1px solid ${P.brd}`,
              borderRadius: 8, color: P.tx, fontSize: 13, fontFamily: "inherit", resize: "vertical"
            }} />
          </div>

          {/* Tone controls */}
          <div style={{ background: P.s2, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: P.tx, marginBottom: 12 }}>Din touch</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <ToneControl label="Humor" icon="😄" value={humor} onChange={setHumor} options={["Seriös", "Lite humor", "Lekfull"]} />
              <ToneControl label="Värme" icon="🤝" value={warmth} onChange={setWarmth} options={["Affärsmässig", "Vänlig", "Personlig"]} />
              <ToneControl label="Rakhet" icon="🎯" value={directness} onChange={setDirectness} options={["Mjuk", "Balanserad", "Rakt på"]} />
            </div>
            <div style={{ fontSize: 10, color: P.am, marginTop: 6 }}>
              Humor och värme är stilpreferenser (datan visar ingen tydlig fördel). Rakhet har datastöd: kort+rakt = 8.1% vs långt+mjukt = 3.3%.
            </div>
          </div>

          {/* Strategy preview */}
          {canGenerate && (
            <div style={{ background: P.acS, border: `1px solid ${P.ac}30`, borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: P.ac, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>Strategi-preview baserat på datan</div>
              <div style={{ fontSize: 12, color: P.tx2, lineHeight: 1.6 }}>
                <b style={{ color: P.tx }}>{selectedRole?.label}</b>: {selectedRole?.strategy}<br />
                <b style={{ color: P.tx }}>{selectedRegion?.label}</b> ({selectedRegion?.reply} svar): {selectedRegion?.note}<br />
                <b style={{ color: P.tx }}>{selectedIndustry?.label}</b>: {selectedIndustry?.reply} svar i snitt<br />
                <b style={{ color: P.tx }}>{selectedLifecycle?.label}</b>: {selectedLifecycle?.strategy}
                {(role === "ovrigt" || region === "ovrigt" || industry === "ovrigt") && (
                  <><br /><span style={{ color: P.am }}>Tips: Ju mer specifik du är med roll/bransch/region desto bättre kan AI:n anpassa mailen efter datan.</span></>
                )}
              </div>
            </div>
          )}

          <button onClick={generate} disabled={!canGenerate || loading} style={{
            width: "100%", padding: "14px", background: canGenerate && !loading ? P.ac : P.brd,
            color: canGenerate && !loading ? "#fff" : P.tx3, border: "none", borderRadius: 10,
            fontSize: 14, fontWeight: 700, cursor: canGenerate && !loading ? "pointer" : "default",
            fontFamily: "inherit", transition: "all .2s"
          }}>
            {loading ? "Genererar sekvens..." : "Generera mailsekvens"}
          </button>
        </div>

        {error && (
          <div style={{ background: P.roS, border: `1px solid ${P.ro}30`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 12, color: P.ro }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Strategy summary */}
            <div style={{ background: P.gS, border: `1px solid ${P.g}30`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: P.g, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Vald strategi</div>
              <div style={{ fontSize: 13, color: P.tx, lineHeight: 1.6 }}>{result.strategy_summary}</div>
            </div>

            {/* Copy all button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Din sekvens ({result.steps?.length} steg)</h2>
              <button onClick={copyAll} style={{
                padding: "8px 16px", background: P.s2, border: `1px solid ${P.brd}`,
                borderRadius: 8, color: copied === "all" ? P.g : P.tx2, fontSize: 11, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit"
              }}>
                {copied === "all" ? "✓ Kopierat!" : "Kopiera alla steg"}
              </button>
            </div>

            {/* Steps */}
            {result.steps?.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <StepCard step={step} index={i} />
                <button onClick={() => copyStep(step)} style={{
                  position: "absolute", top: 20, right: 20, padding: "6px 12px",
                  background: P.s2, border: `1px solid ${P.brd}`, borderRadius: 6,
                  color: copied === step.step ? P.g : P.tx3, fontSize: 10, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit"
                }}>
                  {copied === step.step ? "✓ Kopierat" : "Kopiera"}
                </button>
                {i < (result.steps.length - 1) && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "-6px 0 8px", gap: 8 }}>
                    <div style={{ width: 1, height: 20, background: P.brd }} />
                    <span style={{ fontSize: 10, color: P.tx3 }}>vänta till {result.steps[i + 1]?.send_day} {result.steps[i + 1]?.send_time}</span>
                    <div style={{ width: 1, height: 20, background: P.brd }} />
                  </div>
                )}
              </div>
            ))}

            {/* Add step button */}
            <button onClick={addStep} disabled={addingStep} style={{
              width: "100%", padding: "12px", background: P.gS, border: `1px dashed ${P.g}50`,
              borderRadius: 10, color: addingStep ? P.tx3 : P.g, fontSize: 13, fontWeight: 600, cursor: addingStep ? "default" : "pointer",
              fontFamily: "inherit", marginBottom: 8
            }}>
              {addingStep ? "Genererar nytt steg..." : "+ Lägg till ett steg"}
            </button>

            {/* Regenerate */}
            <button onClick={generate} disabled={loading} style={{
              width: "100%", padding: "12px", background: P.s2, border: `1px solid ${P.brd}`,
              borderRadius: 10, color: P.tx2, fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", marginTop: 8
            }}>
              {loading ? "Genererar..." : "↻ Generera ny variant"}
            </button>
          </div>
        )}

        {/* Data footnote */}
        <div style={{ marginTop: 32, padding: "12px 0", borderTop: `1px solid ${P.brd}`, fontSize: 9, color: P.tx3 }}>
          Alla strategival baserade på analys av 44 609 mail, 11 910 öppnade, 3 212 besvarade (Jan 2024 – Feb 2026). Approach-rekommendationer från korsanalys av roll × bransch × region × arketyp.
        </div>
      </div>
    </div>
  );
}
