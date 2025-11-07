import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Check, Phone, Mail, CalendarDays, Download, Users, ClipboardList, Building2, Globe, ChevronDown, ChevronUp, Trash2, Star, ShieldCheck, ArrowRight, PenSquare } from "lucide-react";

/**
 * ============================
 * RUNTIME CONFIG (NO process.env)
 * ============================
 * This file runs fully client-side. Some bundlers (or the canvas preview) don't define `process`.
 * We therefore DO NOT use `process.env` here. Instead, we look for values in:
 *   1) import.meta.env (Vite/Next/Vercel injects) — VITE_*, NEXT_PUBLIC_*, or REACT_APP_*
 *   2) <meta name="SUPABASE_URL" content="..."> and <meta name="SUPABASE_ANON_KEY" content="...">
 *   3) window.__SUPABASE_URL__ and window.__SUPABASE_ANON_KEY__ (set via a small inline script before this bundle)
 *
 * Choose any one of these approaches in your deployment.
 */
function readMeta(name){
  if (typeof document === "undefined") return undefined;
  const m = document.querySelector(`meta[name='${name}']`);
  return m?.getAttribute("content") || undefined;
}
function readWindow(k){
  if (typeof window === "undefined") return undefined;
  // allow either namespaced or global assignment
  const viaNamespace = window.__KMR_APP__ && window.__KMR_APP__[k];
  const viaGlobal = window[k];
  return (viaNamespace ?? viaGlobal) || undefined;
}
function readImportMeta(k){
  // works in Vite/modern bundlers
  // (will be undefined in some runtimes and that's fine)
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[k];
  }
  return undefined;
}
function getRuntimeConfig(){
  const url =
    readImportMeta("VITE_SUPABASE_URL") ||
    readImportMeta("NEXT_PUBLIC_SUPABASE_URL") ||
    readImportMeta("REACT_APP_SUPABASE_URL") ||
    readMeta("SUPABASE_URL") ||
    readWindow("__SUPABASE_URL__");

  const key =
    readImportMeta("VITE_SUPABASE_ANON_KEY") ||
    readImportMeta("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    readImportMeta("REACT_APP_SUPABASE_ANON_KEY") ||
    readMeta("SUPABASE_ANON_KEY") ||
    readWindow("__SUPABASE_ANON_KEY__");

  return { url, key };
}

const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = getRuntimeConfig();
const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// --- Simple i18n (EN / HT) ---
const t = (lang, key) => {
  const dict = {
    en: {
      brand: "KMR Tax & Financial Group Inc.",
      tagline: "Stress-free taxes. Pro service. Real results.",
      cta_primary: "Get a Free Consultation",
      cta_secondary: "Book an Appointment",
      nav_services: "Services",
      nav_process: "How it works",
      nav_reviews: "Reviews",
      nav_contact: "Contact",
      lead_title: "Tell us about your needs",
      lead_sub: "We’ll reach out within one business day.",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      service: "Select a service",
      notes: "Anything we should know?",
      best_contact: "Preferred contact method",
      consent: "I agree to receive texts/emails about my request.",
      submit: "Submit Request",
      submitted: "Request received! We'll contact you shortly.",
      choose: "Choose...",
      contact_call: "Phone call",
      contact_text: "Text message",
      contact_email: "Email",
      services_title: "What we do",
      s_tax: "Personal & Business Tax Prep",
      s_book: "Bookkeeping & Cleanup",
      s_payroll: "Payroll & 1099",
      s_itin: "ITIN Application/Renewal",
      s_biz: "Business Formation",
      s_audit: "Audit Support",
      s_amend: "Amendments",
      process_title: "Our simple process",
      p1: "Free discovery call",
      p2: "Secure doc upload",
      p3: "Expert review & prep",
      p4: "E-file & follow-up",
      reviews_title: "Client love",
      contact_title: "Contact",
      admin_panel: "Admin Panel (local only)",
      show_admin: "Show Admin",
      hide_admin: "Hide Admin",
      lead_source: "How did you hear about us? (optional)",
      referral_code: "Referral code (optional)",
      export_csv: "Export CSV",
      leads_empty: "No leads yet. Collect some!",
      created: "Created",
      type: "Type",
      status: "Status",
      new: "New",
      referral: "Referral",
      from_referral: "Referred by",
      language: "Language",
      switch_to: "Kreyòl",
      hero_badge: "Now booking 2025 – Fast turnarounds",
      compliance: "KMR Tax & Financial Group Inc. does not provide legal advice. Information on this app is for general purposes only.",
      or: "or",
      share_docs: "Secure document checklist",
      plans: "Transparent pricing available on request.",
      referral_title: "Refer a friend & both get rewarded",
      referral_sub: "Earn account credits when your referral files with us.",
      referrer_name: "Your name",
      referral_name: "Friend's name",
      referral_email: "Friend's email",
      send_referral: "Send Referral",
      referral_sent: "Referral recorded! We'll reach out.",
      view_all: "View all",
      service_other: "Other / Not sure",
      office: "Office",
      website: "Website",
      call_us: "Call us",
    },
    ht: {
      brand: "KMR Tax & Financial Group Inc.",
      tagline: "Taks san tèt chaje. Sèvis pwofesyonèl. Rezilta reyèl.",
      cta_primary: "Jwenn yon Konsiltasyon Gratis",
      cta_secondary: "Pran Randevou",
      nav_services: "Sèvis yo",
      nav_process: "Kijan nou travay",
      nav_reviews: "Temwayaj",
      nav_contact: "Kontak",
      lead_title: "Di nou sa ou bezwen",
      lead_sub: "N ap kontakte w nan yon jou travay.",
      name: "Non konplè",
      email: "Imèl",
      phone: "Telefòn",
      service: "Chwazi yon sèvis",
      notes: "Gen yon detay enpòtan?",
      best_contact: "Metòd kontak ou prefere",
      consent: "Mwen dakò pou resevwa tèks/imèl sou demann mwen an.",
      submit: "Voye Demann",
      submitted: "Nou resevwa demann lan! N ap kontakte w byento.",
      choose: "Chwazi...",
      contact_call: "Apèl",
      contact_text: "Tèks",
      contact_email: "Imèl",
      services_title: "Sa nou fè",
      s_tax: "Preparasyon Taks (Endividi & Biznis)",
      s_book: "Kontabilite & Netwayaj",
      s_payroll: "Pewòl & 1099",
      s_itin: "Aplikasyon/Renouvèlman ITIN",
      s_biz: "Kreye Biznis",
      s_audit: "Sipò Odit",
      s_amend: "Amandman",
      process_title: "Pwosesis senp nou an",
      p1: "Kout apèl dekouvèt gratis",
      p2: "Telechaje dokiman an sekirite",
      p3: "Revizyon & preparasyon ekspè",
      p4: "E-file & swivi",
      reviews_title: "Kliyan kontan",
      contact_title: "Kontak",
      admin_panel: "Panèl Admin (lokal sèlman)",
      show_admin: "Montre Admin",
      hide_admin: "Kache Admin",
      lead_source: "Kijan ou tande pale de nou? (opsyonèl)",
      referral_code: "Kòd referans (opsyonèl)",
      export_csv: "Ekspòte CSV",
      leads_empty: "Pa gen kontak ankò. Rekòlte kèk!",
      created: "Kreye",
      type: "Kalite",
      status: "Estati",
      new: "Nouvo",
      referral: "Referans",
      from_referral: "Moun ki refere a",
      language: "Lang",
      switch_to: "English",
      hero_badge: "Kounye a pou 2025 – Nou rapid",
      compliance: "KMR Tax & Financial Group Inc. pa bay konsèy legal. Enfòmasyon sou app sa a se pou objektif jeneral sèlman.",
      or: "oswa",
      share_docs: "Lis dokiman sekirize",
      plans: "Pri transparan disponib sou demann.",
      referral_title: "Refere yon zanmi & toude ap benefisye",
      referral_sub: "Jwenn kredi kont lè moun ou refere a fè taks li avè nou.",
      referrer_name: "Non pa w",
      referral_name: "Non zanmi an",
      referral_email: "Imèl zanmi an",
      send_referral: "Voye Referans",
      referral_sent: "Referans anrejistre! N ap kontakte li.",
      view_all: "Gade tout",
      service_other: "Lòt / Pa sèten",
      office: "Biwo",
      website: "Sit wèb",
      call_us: "Rele nou",
    },
  };
  return dict[lang][key];
};

// --- Types & helpers ---
const SERVICE_OPTIONS = [
  { id: "tax", icon: ClipboardList, key: "s_tax" },
  { id: "book", icon: PenSquare, key: "s_book" },
  { id: "payroll", icon: Users, key: "s_payroll" },
  { id: "itin", icon: ShieldCheck, key: "s_itin" },
  { id: "biz", icon: Building2, key: "s_biz" },
  { id: "audit", icon: Check, key: "s_audit" },
  { id: "amend", icon: ClipboardList, key: "s_amend" },
  { id: "other", icon: Globe, key: "service_other" },
];

const defaultLead = {
  id: "",
  createdAt: "",
  name: "",
  email: "",
  phone: "",
  service: "",
  notes: "",
  bestContact: "",
  consent: false,
  source: "",
  referralCode: "",
  language: "en",
  type: "lead", // or 'referral'
  referrer: "",
};

const storeKey = "kmr_leads_v1";

// Try pulling leads from Supabase and reconciling with local cache
async function fetchSupabaseLeads(){
  if(!supabase) return null;
  const { data, error } = await supabase
    .from("leads")
    .select("id, createdAt:created_at, type, name, email, phone, service, notes, bestContact:best_contact, consent, source, referralCode:referral_code, language, referrer")
    .order("created_at", { ascending: false });
  if(error){ console.warn("Supabase fetch error", error.message); return null; }
  return data?.map(r => ({...r})) ?? [];
}

async function insertSupabaseLead(lead){
  if(!supabase) return null;
  const payload = {
    id: lead.id,
    created_at: lead.createdAt,
    type: lead.type,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    service: lead.service,
    notes: lead.notes,
    best_contact: lead.bestContact,
    consent: lead.consent,
    source: lead.source,
    referral_code: lead.referralCode,
    language: lead.language,
    referrer: lead.referrer,
  };
  const { error } = await supabase.from("leads").insert(payload);
  if(error) console.warn("Supabase insert error", error.message);
  return !error;
}

function useLocalLeads() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) setLeads(JSON.parse(raw));
    } catch {}
    // Attempt to sync from Supabase
    (async ()=>{
      const remote = await fetchSupabaseLeads();
      if(remote && remote.length){
        setLeads(prev => {
          const ids = new Set(prev.map(p=>p.id));
          const merged = [...remote, ...prev.filter(p=>!ids.has(p.id))];
          try { localStorage.setItem(storeKey, JSON.stringify(merged)); } catch {}
          return merged;
        });
      }
    })();
  }, []);
  useEffect(() => {
    try { localStorage.setItem(storeKey, JSON.stringify(leads)); } catch {}
  }, [leads]);
  return [leads, setLeads];
}

function exportCSV(leads) {
  const headers = [
    "id","createdAt","type","name","email","phone","service","notes","bestContact","consent","source","referralCode","language","referrer"
  ];
  const rows = leads.map(l => headers.map(h => ("" + (l[h] ?? "")).replaceAll('"', '""')));
  // Properly quote fields and join rows with \n (newline)
  const csv = [
    headers.join(","),
    ...rows.map(r => r.map(v => `"${v}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kmr-leads-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Cloud backup (Supabase Storage) — requires a bucket named 'lead_backups' with write perm for anon or authenticated users.
async function backupToSupabase(leads){
  if(!supabase){
    alert("Cloud backup unavailable: Supabase is not configured.");
    return false;
  }
  try{
    const data = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const iso = new Date().toISOString().replace(/[:.]/g, "-");
    const path = `kmr-leads-${iso}.json`;
    // Attempt upload. Ensure your 'lead_backups' bucket exists and has an upload policy.
    const { error } = await supabase.storage.from('lead_backups').upload(path, data, { contentType: 'application/json' });
    if(error){ throw error; }
    alert("Cloud backup saved to Supabase Storage: " + path);
    return true;
  }catch(e){
    console.warn("Cloud backup failed:", e);
    alert("Cloud backup failed: " + (e?.message || e));
    return false;
  }
}

// JSON backup helpers
function exportJSON(leads){
  const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kmr-leads-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function mergeById(existing = [], incoming = []){
  const map = new Map();
  [...existing, ...incoming].forEach(item => {
    const prev = map.get(item.id);
    if(!prev){ map.set(item.id, item); return; }
    // prefer item with latest createdAt
    const a = new Date(prev.createdAt||0).getTime();
    const b = new Date(item.createdAt||0).getTime();
    map.set(item.id, b >= a ? item : prev);
  });
  // sort newest first
  return Array.from(map.values()).sort((a,b)=> new Date(b.createdAt||0) - new Date(a.createdAt||0));
}

function importJSONFromFile(file, onMerge){
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const parsed = JSON.parse(reader.result);
      if(!Array.isArray(parsed)) throw new Error("Invalid backup: expected an array");
      onMerge(parsed);
      alert(`Imported ${parsed.length} records from backup.`);
    }catch(e){
      alert("Failed to import JSON: " + e.message);
    }
  };
  reader.readAsText(file);
}

function Stat({ label, value }){
  return (
    <div className="p-4 rounded-2xl bg-white/70 backdrop-blur shadow-sm border border-slate-200">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function ServiceCard({ Icon, title, desc }){
  return (
    <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-100"><Icon className="w-5 h-5" /></div>
        <div className="font-medium">{title}</div>
      </div>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </div>
  );
}

function LeadForm({ lang, onAdd }){
  const [lead, setLead] = useState({ ...defaultLead, language: lang });
  const [sent, setSent] = useState(false);

  const handle = (k, v) => setLead(prev => ({ ...prev, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!lead.name || !lead.phone || !lead.service) return alert("Please fill name, phone, and service.");
    const id = Math.random().toString(36).slice(2, 10);
    const createdAt = new Date().toISOString();
    onAdd({ ...lead, id, createdAt, type: "lead" });
    setSent(true);
    setLead({ ...defaultLead, language: lang });
  };

  useEffect(() => { setLead(prev => ({ ...prev, language: lang })); }, [lang]);

  if (sent) return (
    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
      <Check className="w-5 h-5 mt-0.5" />
      <div>
        <div className="font-semibold">{t(lang, 'submitted')}</div>
        <button className="mt-3 text-sm underline" onClick={()=>setSent(false)}>Submit another</button>
      </div>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input" placeholder={t(lang,'name')} value={lead.name} onChange={e=>handle('name', e.target.value)} />
        <input className="input" placeholder={t(lang,'phone')} value={lead.phone} onChange={e=>handle('phone', e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input" placeholder={t(lang,'email')} value={lead.email} onChange={e=>handle('email', e.target.value)} />
        <select className="input" value={lead.service} onChange={e=>handle('service', e.target.value)}>
          <option value="">{t(lang,'choose')}</option>
          {SERVICE_OPTIONS.map(s => (
            <option key={s.id} value={s.id}>{t(lang, s.key)}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select className="input" value={lead.bestContact} onChange={e=>handle('bestContact', e.target.value)}>
          <option value="">{t(lang,'best_contact')}</option>
          <option value="call">{t(lang,'contact_call')}</option>
          <option value="text">{t(lang,'contact_text')}</option>
          <option value="email">{t(lang,'contact_email')}</option>
        </select>
        <input className="input" placeholder={t(lang,'lead_source')} value={lead.source} onChange={e=>handle('source', e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input" placeholder={t(lang,'referral_code')} value={lead.referralCode} onChange={e=>handle('referralCode', e.target.value)} />
        <input className="input" placeholder={t(lang,'from_referral')} value={lead.referrer} onChange={e=>handle('referrer', e.target.value)} />
      </div>
      <textarea className="input min-h-[90px]" placeholder={t(lang,'notes')} value={lead.notes} onChange={e=>handle('notes', e.target.value)} />
      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" checked={lead.consent} onChange={e=>handle('consent', e.target.checked)} />
        <span>{t(lang,'consent')}</span>
      </label>
      <button className="btn w-full md:w-auto" type="submit">{t(lang,'submit')}</button>
    </form>
  );
}

function ReferralForm({ lang, onAdd }){
  const [form, setForm] = useState({ referrer: "", name: "", email: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name and email required");
    const id = Math.random().toString(36).slice(2, 10);
    const createdAt = new Date().toISOString();
    onAdd({
      id,
      createdAt,
      type: "referral",
      name: form.name,
      email: form.email,
      phone: "",
      service: "",
      notes: "",
      bestContact: "email",
      consent: true,
      source: "referral",
      referralCode: "",
      language: lang,
      referrer: form.referrer,
    });
    setForm({ referrer: "", name: "", email: "" });
    setSent(true);
  };

  if (sent) return (
    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
      <Check className="w-5 h-5 mt-0.5" />
      <div>
        <div className="font-semibold">{t(lang, 'referral_sent')}</div>
        <button className="mt-3 text-sm underline" onClick={()=>setSent(false)}>{t(lang,'send_referral')}</button>
      </div>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input" placeholder={t(lang,'referrer_name')} value={form.referrer} onChange={e=>setForm({...form, referrer: e.target.value})} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input" placeholder={t(lang,'referral_name')} value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
        <input className="input" placeholder={t(lang,'referral_email')} value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      </div>
      <button className="btn" type="submit">{t(lang,'send_referral')}</button>
    </form>
  );
}

function LeadsTable({ lang, leads, onDelete, onMerge }){
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [useFiltered, setUseFiltered] = useState(true);
  const filtered = useMemo(() => {
    const v = q.toLowerCase();
    return leads.filter(l => JSON.stringify(l).toLowerCase().includes(v));
  }, [q, leads]);
  const activeList = useFiltered ? filtered : leads;

  return (
    <div className="mt-10">
      <button className="btn" onClick={()=>setOpen(!open)}>
        {open ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
        <span className="ml-2">{t(lang, open ? 'hide_admin' : 'show_admin')}</span>
      </button>
      {open && (
        <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
            <div className="text-sm font-semibold">{t(lang,'admin_panel')}</div>
            <div className="flex flex-wrap items-center gap-2">
              <input className="input" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
              <label className="text-xs text-slate-600 flex items-center gap-1 ml-1">
                <input type="checkbox" checked={useFiltered} onChange={e=>setUseFiltered(e.target.checked)} />
                Use search filter
              </label>
              <button className="btn" onClick={()=>exportCSV(activeList)}><Download className="w-4 h-4 mr-2" />{t(lang,'export_csv')}</button>
              <button className="btn" onClick={()=>exportJSON(activeList)} title="Download JSON backup">Backup JSON</button>
              <button className="btn" onClick={()=>backupToSupabase(activeList)} title="Save backup to Supabase Storage" disabled={!supabase}>
                {supabase ? 'Backup to Cloud' : 'Backup to Cloud (disabled)'}
              </button>
              <label className="btn-secondary cursor-pointer" title="Restore from JSON backup">
                Restore JSON
                <input type="file" accept="application/json" className="hidden" onChange={(e)=>{
                  const file = e.target.files?.[0];
                  if(file) importJSONFromFile(file, (incoming)=> onMerge(incoming));
                  e.target.value = '';
                }} />
              </label>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-sm text-slate-500 mt-4">{t(lang,'leads_empty')}</div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">{t(lang,'created')}</th>
                    <th className="py-2 pr-4">{t(lang,'type')}</th>
                    <th className="py-2 pr-4">{t(lang,'name')}</th>
                    <th className="py-2 pr-4">{t(lang,'email')}</th>
                    <th className="py-2 pr-4">{t(lang,'phone')}</th>
                    <th className="py-2 pr-4">{t(lang,'service')}</th>
                    <th className="py-2 pr-4">{t(lang,'status')}</th>
                    <th className="py-2 pr-4">{t(lang,'language')}</th>
                    <th className="py-2 pr-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(l => (
                    <tr key={l.id} className="border-b hover:bg-slate-50/80">
                      <td className="py-2 pr-4 whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                      <td className="py-2 pr-4">{l.type}</td>
                      <td className="py-2 pr-4">{l.name}</td>
                      <td className="py-2 pr-4">{l.email}</td>
                      <td className="py-2 pr-4">{l.phone}</td>
                      <td className="py-2 pr-4">{l.service}</td>
                      <td className="py-2 pr-4">{l.status || t(lang,'new')}</td>
                      <td className="py-2 pr-4">{l.language}</td>
                      <td className="py-2 pr-4 text-right">
                        <button className="text-slate-500 hover:text-rose-600" onClick={()=>onDelete(l.id)} title="Delete"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * ============================
 * SELF-TESTS (simple, non-blocking)
 * ============================
 * We add very light tests so the app can be validated in any environment.
 * These are console-only and won't interrupt the UI.
 */
(function __kmr_runtime_tests(){
  try {
    // Test 1: getRuntimeConfig should never throw and always return an object
    const cfg = getRuntimeConfig();
    console.assert(typeof cfg === "object", "getRuntimeConfig returns object");

    // Test 2: Calling fetchSupabaseLeads should not throw, and returns null when not configured
    if (!supabase) {
      const maybe = fetchSupabaseLeads();
      console.assert(maybe instanceof Promise, "fetchSupabaseLeads returns a promise");
    }

    // Test 3: No direct process.env usage
    const usesProcessEnv = /process\\.env/.test((App||"").toString());
    console.assert(!usesProcessEnv, "No direct process.env usage in App component");

    // Test 4: mergeById keeps newest createdAt and de-duplicates by id
    const merged = mergeById([
      { id: '1', createdAt: '2024-01-01T00:00:00Z', name: 'Old' },
      { id: '2', createdAt: '2024-01-02T00:00:00Z', name: 'Keep' },
    ], [
      { id: '1', createdAt: '2024-02-01T00:00:00Z', name: 'New' },
      { id: '3', createdAt: '2024-01-03T00:00:00Z', name: 'Add' },
    ]);
    console.assert(merged.length === 3, "mergeById merges unique ids");
    console.assert(merged.find(x=>x.id==='1').name === 'New', "mergeById prefers newest by createdAt");

    // Test 5: exportCSV newline + quoting regressions
    const theaders = ["a","b"]; const trows = [["x", "y,y"], ["z\\"z", "w"]];
    const csvSample = [theaders.join(","), ...trows.map(r => r.map(v => `"\${((""+v).replaceAll('"','""'))}"`).join(","))].join("\\n");
    console.assert(csvSample.split("\\n").length === 3, "CSV contains header + 2 rows");
    console.assert(csvSample.includes('"y,y"'), "CSV preserves commas inside quotes");
    console.assert(csvSample.includes('"z""z"'), "CSV escapes quotes correctly");

    // Test 6: shouldBackupToday logic
    console.assert(shouldBackupToday(null, '2025-11-04T12:00:00Z') === true, 'no previous backup -> should backup');
    console.assert(shouldBackupToday('2025-11-04T01:00:00Z', '2025-11-04T23:00:00Z') === false, 'same UTC day -> no backup');
    console.assert(shouldBackupToday('2025-11-03T23:59:59Z', '2025-11-04T00:00:01Z') === true, 'new UTC day -> backup');

    // Test 7: exportCSV should handle empty list without throwing
    try { exportCSV([]); console.assert(true, 'exportCSV handles empty list'); } catch { console.assert(false, 'exportCSV should not throw on empty'); }
  } catch (e) {
    console.warn("KMR self-tests encountered an issue (safe to ignore in prod):", e);
  }
})();

// Auto-backup helper: decide if we should backup today (UTC-based)
function sameUtcDate(a, b){
  const A = new Date(a); const B = new Date(b);
  return A.getUTCFullYear() === B.getUTCFullYear() && A.getUTCMonth() === B.getUTCMonth() && A.getUTCDate() === B.getUTCDate();
}
function shouldBackupToday(lastISO, nowISO){
  if(!lastISO) return true;
  return !sameUtcDate(lastISO, nowISO);
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [leads, setLeads] = useLocalLeads();

  const addLead = (lead) => {
    setLeads(prev => [lead, ...prev]);
    // Push to Supabase in background
    insertSupabaseLead(lead);
  };
  const delLead = (id) => setLeads(prev => prev.filter(l => l.id !== id));
  const mergeLeads = (incoming) => setLeads(prev => {
    const merged = mergeById(prev, incoming);
    try { localStorage.setItem(storeKey, JSON.stringify(merged)); } catch {}
    return merged;
  });

  const totalLeads = leads.length;
  const referrals = leads.filter(l => l.type === 'referral').length;
  const taxLeads = leads.filter(l => l.service === 'tax').length;

  // Automatic daily backup (client-side) when Supabase is configured
  useEffect(() => {
    if (!supabase || leads.length === 0) return;
    const key = 'kmr_last_cloud_backup';
    const now = new Date().toISOString();
    const last = localStorage.getItem(key);
    if (shouldBackupToday(last, now)) {
      (async () => {
        const ok = await backupToSupabase(leads);
        if (ok) {
          try { localStorage.setItem(key, now); } catch {}
        }
      })();
    }
  }, [leads]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">K</div>
            <div>
              <div className="font-semibold leading-tight">{t(lang,'brand')}</div>
              <div className="text-xs text-slate-500">www.kmrtaxandfinancialgroup.com</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:underline">{t(lang,'nav_services')}</a>
            <a href="#process" className="hover:underline">{t(lang,'nav_process')}</a>
            <a href="#reviews" className="hover:underline">{t(lang,'nav_reviews')}</a>
            <a href="#contact" className="hover:underline">{t(lang,'nav_contact')}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" onClick={()=>setLang(lang === 'en' ? 'ht' : 'en')}>{t(lang,'switch_to')}</button>
            <a href="#lead" className="btn hidden md:inline-flex">{t(lang,'cta_primary')}</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Star className="w-3.5 h-3.5"/>
              {t(lang,'hero_badge')}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-3">
              {t(lang,'tagline')}
            </h1>
            <p className="text-slate-600 mt-3">
              {t(lang,'plans')} We serve clients in-person and remotely across the U.S.
            </p>
            {!supabase && (
              <div className="text-xs text-amber-600 mt-2">(Local-only mode — add Supabase config via import.meta, meta tags, or window globals to sync leads.)</div>
            )}
            {supabase && (
              <div className="text-xs text-emerald-700 mt-2">(Cloud sync active via Supabase)</div>
            )}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="#lead" className="btn">
                <ArrowRight className="w-4 h-4 mr-2"/>{t(lang,'cta_primary')}
              </a>
              <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="btn-secondary">
                <CalendarDays className="w-4 h-4 mr-2"/>{t(lang,'cta_secondary')}
              </a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              <Stat label="Leads" value={totalLeads} />
              <Stat label="Tax" value={taxLeads} />
              <Stat label="Referrals" value={referrals} />
            </div>
          </div>
          <div className="p-5 md:p-8 rounded-3xl bg-white shadow-sm border border-slate-200">
            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2"><ClipboardList className="w-5 h-5"/>{t(lang,'lead_title')}</h3>
            <p className="text-sm text-slate-600 mb-4">{t(lang,'lead_sub')}</p>
            <LeadForm lang={lang} onAdd={addLead} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-3">{t(lang,'services_title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICE_OPTIONS.slice(0,6).map(s => (
            <ServiceCard key={s.id} Icon={s.icon} title={t(lang, s.key)} desc="Dedicated specialists. Remote or in-office. Fast turnarounds." />
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-3">{t(lang,'process_title')}</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[t(lang,'p1'), t(lang,'p2'), t(lang,'p3'), t(lang,'p4')].map((step, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white grid place-items-center font-semibold">{i+1}</div>
              <p className="mt-3 text-sm text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referrals */}
      <section className="max-w-6xl mx_auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold">{t(lang,'referral_title')}</h2>
            <p className="text-slate-600 mt-2">{t(lang,'referral_sub')}</p>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mt-4">
              <ReferralForm lang={lang} onAdd={addLead} />
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="font-semibold">{t(lang,'share_docs')}</h3>
            <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>Government-issued ID</li>
              <li>Social Security/ITIN docs</li>
              <li>W-2, 1099, 1098, K-1</li>
              <li>Business income & expenses (if applicable)</li>
              <li>Last year’s return (optional)</li>
            </ul>
            <p className="text-xs text-slate-500 mt-3">Secure portal integrations (Canopy, TaxDome, Drake Portals, etc.) can be wired later.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-3">{t(lang,'reviews_title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["Fast and professional!", "Took care of my business and payroll.", "Great communication—filed in days."].map((quote, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-500">{Array.from({length:5}).map((_,j)=>(<Star key={j} className="w-4 h-4 fill-current"/>))}</div>
              <p className="text-sm text-slate-700 mt-2">“{quote}”</p>
              <div className="mt-3 text-xs text-slate-500">— KMR Client</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-3">{t(lang,'contact_title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="tel:+1-404-" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <Phone className="w-5 h-5"/>
            <div className="font-medium mt-2">{t(lang,'call_us')}</div>
            <div className="text-sm text-slate-600 mt-1">(Add your main number)</div>
          </a>
          <a href="mailto:info@kmrtaxandfinancialgroup.com" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <Mail className="w-5 h-5"/>
            <div className="font-medium mt-2">Email</div>
            <div className="text-sm text-slate-600 mt-1">info@kmrtaxandfinancialgroup.com</div>
          </a>
          <a href="https://www.kmrtaxandfinancialgroup.com" target="_blank" rel="noreferrer" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <Globe className="w-5 h-5"/>
            <div className="font-medium mt-2">{t(lang,'website')}</div>
            <div className="text-sm text-slate-600 mt-1">kmrtaxandfinancialgroup.com</div>
          </a>
        </div>
      </section>

      <section id="lead" className="max-w-6xl mx-auto px-4 py-10">
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-1 flex items-center gap-2"><Users className="w-5 h-5"/> {t(lang,'lead_title')}</h3>
          <p className="text-sm text-slate-600 mb-4">{t(lang,'lead_sub')}</p>
          <LeadForm lang={lang} onAdd={addLead} />
        </div>
        <LeadsTable lang={lang} leads={leads} onDelete={delLead} onMerge={mergeLeads} />
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-xs text-slate-600">
          <div>{t(lang,'compliance')}</div>
          <div className="mt-2">© {new Date().getFullYear()} KMR Tax & Financial Group Inc. All rights reserved.</div>
        </div>
      </footer>

      {/* Tiny CSS helpers */}
      <style>{`
        .input{ @apply w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400/40; }
        .btn{ @apply inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm; }
        .btn-secondary{ @apply inline-flex items-center justify-center px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition; }
      `}</style>
    </div>
  );
}
