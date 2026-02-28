import React, { useState } from 'react';
import {
  ArrowRight, Calendar, Globe, User, Mail, Phone,
  Building2, ChevronLeft, ChevronRight, Check, Briefcase,
  AlertCircle, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// ── Constants ────────────────────────────────────────────────────────────────

const SLOT_HOURS_IST = [9, 10, 11, 14, 15, 16, 17];

const DEMO_TYPES = [
  { id: 'Product Walkthrough',      label: 'Product Walkthrough',      duration: '30 min' },
  { id: 'Technical Deep Dive',      label: 'Technical Deep Dive',      duration: '60 min' },
  { id: 'Enterprise Consultation',  label: 'Enterprise Consultation',  duration: '60 min' },
  { id: 'Pilot Program Discussion', label: 'Pilot Program Discussion', duration: '45 min' },
];

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–1000', '1000+'];

const INDUSTRIES = [
  'Manufacturing', 'Retail', 'Healthcare', 'Logistics & Supply Chain',
  'Defense & Security', 'Agriculture', 'Construction', 'Energy',
  'Research & Academia', 'Other',
];

const TIMEZONES = [
  { value: 'Asia/Kolkata',        label: 'India (IST, UTC+5:30)' },
  { value: 'America/New_York',    label: 'New York (EST/EDT)' },
  { value: 'America/Chicago',     label: 'Chicago (CST/CDT)' },
  { value: 'America/Denver',      label: 'Denver (MST/MDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'America/Sao_Paulo',   label: 'São Paulo (BRT)' },
  { value: 'Europe/London',       label: 'London (GMT/BST)' },
  { value: 'Europe/Paris',        label: 'Paris (CET/CEST)' },
  { value: 'Europe/Berlin',       label: 'Berlin (CET/CEST)' },
  { value: 'Europe/Moscow',       label: 'Moscow (MSK)' },
  { value: 'Africa/Cairo',        label: 'Cairo (EET)' },
  { value: 'Africa/Lagos',        label: 'Lagos (WAT)' },
  { value: 'Asia/Dubai',          label: 'Dubai (GST, UTC+4)' },
  { value: 'Asia/Karachi',        label: 'Karachi (PKT, UTC+5)' },
  { value: 'Asia/Dhaka',          label: 'Dhaka (BST, UTC+6)' },
  { value: 'Asia/Bangkok',        label: 'Bangkok (ICT, UTC+7)' },
  { value: 'Asia/Singapore',      label: 'Singapore (SGT, UTC+8)' },
  { value: 'Asia/Shanghai',       label: 'Shanghai (CST, UTC+8)' },
  { value: 'Asia/Tokyo',          label: 'Tokyo (JST, UTC+9)' },
  { value: 'Asia/Seoul',          label: 'Seoul (KST, UTC+9)' },
  { value: 'Australia/Sydney',    label: 'Sydney (AEST/AEDT)' },
  { value: 'Pacific/Auckland',    label: 'Auckland (NZST/NZDT)' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const convertSlot = (istDateStr, istHour, clientTz) => {
  if (!istDateStr || istHour === null || istHour === undefined)
    return { time: '', date: '', utcDate: new Date() };
  const [y, m, d] = istDateStr.split('-').map(Number);
  const utcMs = Date.UTC(y, m - 1, d, istHour - 5, -30);
  const utcDate = new Date(utcMs);
  return {
    time: new Intl.DateTimeFormat('en-US', { timeZone: clientTz, hour: 'numeric', minute: '2-digit', hour12: true }).format(utcDate),
    date: new Intl.DateTimeFormat('en-US', { timeZone: clientTz, weekday: 'short', month: 'short', day: 'numeric' }).format(utcDate),
    utcDate,
  };
};

const formatISTDisplay = (hour) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${period} IST`;
};

// ── Sub-components ────────────────────────────────────────────────────────────

const StepIndicator = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
    {Array.from({ length: total }).map((_, i) => (
      <React.Fragment key={i}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: i < current ? '#00FFD1' : 'transparent',
          border: i <= current ? '2px solid #00FFD1' : '2px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
          color: i < current ? '#000' : i === current ? '#00FFD1' : 'rgba(255,255,255,0.3)',
          transition: 'all 0.3s ease',
        }}>
          {i < current ? <Check size={13} /> : i + 1}
        </div>
        {i < total - 1 && (
          <div style={{ flex: 1, height: 2, background: i < current ? '#00FFD1' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const inputBase = (error, hasIcon) => ({
  width: '100%', background: '#0a0a0a',
  border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,0.12)'}`,
  color: '#fff', padding: hasIcon ? '13px 14px 13px 42px' : '13px 14px',
  fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s ease', borderRadius: 0,
});

const FormInput = ({ label, icon: Icon, error, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />}
      <input {...props} style={{ ...inputBase(error, !!Icon), ...props.style }}
        onFocus={e => e.target.style.borderColor = '#00FFD1'}
        onBlur={e => e.target.style.borderColor = error ? '#ff4444' : 'rgba(255,255,255,0.12)'} />
    </div>
    {error && <span style={{ fontSize: 11, color: '#ff4444' }}>{error}</span>}
  </div>
);

const FormSelect = ({ label, icon: Icon, children, error, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', zIndex: 1 }} />}
      <select {...props} style={{ ...inputBase(error, !!Icon), appearance: 'none', cursor: 'pointer', color: props.value ? '#fff' : 'rgba(255,255,255,0.3)' }}
        onFocus={e => e.target.style.borderColor = '#00FFD1'}
        onBlur={e => e.target.style.borderColor = error ? '#ff4444' : 'rgba(255,255,255,0.12)'}>
        {children}
      </select>
    </div>
    {error && <span style={{ fontSize: 11, color: '#ff4444' }}>{error}</span>}
  </div>
);

// ── Calendar ──────────────────────────────────────────────────────────────────

const CalendarPicker = ({ selectedDate, onSelect }) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDay    = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();

  const isDisabled = (day) => {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return d < today || d.getDay() === 0;
  };
  const isSelected = (day) => selectedDate === formatDateKey(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
  const isToday    = (day) => formatDateKey(today) === formatDateKey(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));

  return (
    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', padding: '18px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
          {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.3)', padding: '3px 0', fontWeight: 600 }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day); const selected = isSelected(day); const todayMark = isToday(day);
          return (
            <button key={day} disabled={disabled}
              onClick={() => onSelect(formatDateKey(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)))}
              style={{
                background: selected ? '#00FFD1' : 'transparent',
                color: disabled ? 'rgba(255,255,255,0.15)' : selected ? '#000' : todayMark ? '#00FFD1' : '#fff',
                border: todayMark && !selected ? '1px solid rgba(0,255,209,0.4)' : '1px solid transparent',
                borderRadius: 0, padding: '7px 2px', fontSize: 12, fontWeight: selected ? 700 : 400,
                cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; }}
              onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.background = 'transparent'; }}
            >{day}</button>
          );
        })}
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 12, fontSize: 10, color: 'rgba(255,255,255,0.3)', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, background: '#00FFD1', display: 'inline-block' }} /> Selected</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, border: '1px solid rgba(0,255,209,0.4)', display: 'inline-block' }} /> Today</span>
        <span>Sundays off</span>
      </div>
    </div>
  );
};

// ── Buttons ───────────────────────────────────────────────────────────────────

const PrimaryBtn = ({ children, onClick, disabled, loading }) => (
  <button onClick={onClick} disabled={disabled || loading}
    style={{
      background: disabled || loading ? 'rgba(0,255,209,0.3)' : '#00FFD1',
      color: '#000', border: 'none', padding: '13px 28px', fontSize: 14, fontWeight: 700,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'all 0.3s', fontFamily: 'inherit', whiteSpace: 'nowrap', flex: 1,
    }}
    onMouseEnter={e => { if (!disabled && !loading) { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; } }}
    onMouseLeave={e => { if (!disabled && !loading) { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; } }}
  >{children}</button>
);

const BackBtn = ({ onClick }) => (
  <button onClick={onClick}
    style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 20px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
    <ChevronLeft size={15} /> Back
  </button>
);

// ── Main ──────────────────────────────────────────────────────────────────────

export const BookDemo = () => {
  const navigate = useNavigate();
  const [step, setStep]                   = useState(0);
  const [errors, setErrors]               = useState({});
  const [loading, setLoading]             = useState(false);
  const [apiError, setApiError]           = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultTz  = TIMEZONES.find(t => t.value === detectedTz)?.value || 'Asia/Kolkata';

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', companySize: '', industry: '', jobTitle: '',
    demoType: '', message: '', timezone: defaultTz, date: '', slot: null,
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validateStep0 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim())    e.phone       = 'Required';
    if (!form.company.trim())  e.company     = 'Required';
    if (!form.companySize)     e.companySize = 'Required';
    if (!form.industry)        e.industry    = 'Required';
    if (!form.jobTitle.trim()) e.jobTitle    = 'Required';
    if (!form.demoType)        e.demoType    = 'Please select a demo type';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.date)         e.date = 'Please select a date';
    if (form.slot === null) e.slot = 'Please select a time slot';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => { setStep(s => s - 1); setErrors({}); setApiError(''); };

  const submit = async () => {
    setLoading(true); setApiError('');
    const selectedDT = DEMO_TYPES.find(d => d.id === form.demoType);
    const payload = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email, phone: form.phone, company: form.company,
      jobTitle: form.jobTitle, companySize: form.companySize, industry: form.industry,
      demoType: selectedDT?.label || form.demoType, demoDuration: selectedDT?.duration || '60 min',
      message: form.message, date: form.date, slotHourIST: form.slot, timezone: form.timezone,
    };
    try {
      const res  = await fetch('https://connect-3.vercel.app/api/schedule-demo', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to schedule demo.');
      setBookingResult({ meetLink: data.meetLink, scheduledTime: data.scheduledTime });
      setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const slotDisplay      = form.date && form.slot !== null ? convertSlot(form.date, form.slot, form.timezone) : null;
  const selectedDemoType = DEMO_TYPES.find(d => d.id === form.demoType);

  return (
    <>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.94); }      to { opacity:1; transform:scale(1); } }
        @keyframes spin    { to { transform:rotate(360deg); } }
        select option { background:#121212; color:#fff; }

        /* ── Responsive grid classes ── */
        .bd-col2        { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        .bd-col4        { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
        .bd-cal-grid    { display:grid; grid-template-columns:1fr 1fr; gap:22px; align-items:start; }
        .bd-confirm-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        .bd-btn-row     { display:flex; gap:10px; margin-top:26px; }
        .bd-page        { padding:110px 5% 80px; }
        .bd-success-meta{ display:inline-flex; gap:28px; flex-wrap:wrap; justify-content:center; padding:18px 26px; }
        .bd-success-btns{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

        @media (max-width:900px) {
          .bd-col4 { grid-template-columns:1fr 1fr; }
        }

        @media (max-width:700px) {
          .bd-col2        { grid-template-columns:1fr; }
          .bd-cal-grid    { grid-template-columns:1fr; }
          .bd-confirm-grid{ grid-template-columns:1fr; }
          .bd-btn-row     { flex-direction:column; }
          .bd-btn-row > * { flex:unset !important; width:100%; }
          .bd-page        { padding:90px 4% 60px; }
        }

        @media (max-width:480px) {
          .bd-col4        { grid-template-columns:1fr; }
          .bd-page        { padding:80px 16px 50px; }
          .bd-success-btns{ flex-direction:column; align-items:center; }
          .bd-success-btns button { width:100%; max-width:280px; }
          .bd-success-meta{ gap:18px; padding:16px 18px; }
        }
      `}</style>

      <Header />

      <div className="bd-page" style={{ background: '#000', minHeight: '100vh' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>

          {/* ── Page header ── */}
          {step < 3 && (
            <div style={{ marginBottom: 36, animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.2)', padding: '5px 12px', marginBottom: 16 }}>
                <Calendar size={12} style={{ color: '#00FFD1' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>Schedule a Demo</span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 5vw, 46px)', fontWeight: 600, color: '#fff', margin: '0 0 10px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                See NeuroForgeAI<br /><span style={{ color: '#00FFD1' }}>in Action</span>
              </h1>
              <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6, maxWidth: 460 }}>
                Book a personalized demo. All times shown in your local timezone.
              </p>
            </div>
          )}

          {step < 3 && <StepIndicator current={step} total={3} />}

          {/* ════════ STEP 0 — Details ════════ */}
          {step === 0 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontSize: 'clamp(17px, 3vw, 21px)', fontWeight: 600, color: '#fff', margin: '0 0 5px' }}>Your Details</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 26px' }}>Tell us about yourself and what you're looking for.</p>

              {/* Demo type */}
              <div style={{ marginBottom: 26 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Demo Type *</div>
                <div className="bd-col4">
                  {DEMO_TYPES.map(d => (
                    <button key={d.id} onClick={() => set('demoType', d.id)} style={{
                      background: form.demoType === d.id ? 'rgba(0,255,209,0.1)' : '#0a0a0a',
                      border: form.demoType === d.id ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.1)',
                      color: form.demoType === d.id ? '#00FFD1' : 'rgba(255,255,255,0.6)',
                      padding: '12px 12px', cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s', fontFamily: 'inherit',
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{d.label}</div>
                      <div style={{ fontSize: 11, color: form.demoType === d.id ? 'rgba(0,255,209,0.6)' : 'rgba(255,255,255,0.3)' }}>{d.duration}</div>
                    </button>
                  ))}
                </div>
                {errors.demoType && <div style={{ fontSize: 11, color: '#ff4444', marginTop: 5 }}>{errors.demoType}</div>}
              </div>

              <div className="bd-col2">
                <FormInput label="First Name *" icon={User}      placeholder="John"             value={form.firstName}  onChange={e => set('firstName',  e.target.value)} error={errors.firstName} />
                <FormInput label="Last Name *"  icon={User}      placeholder="Smith"            value={form.lastName}   onChange={e => set('lastName',   e.target.value)} error={errors.lastName} />
              </div>
              <div className="bd-col2">
                <FormInput label="Work Email *"   icon={Mail}  type="email" placeholder="john@company.com" value={form.email}    onChange={e => set('email',    e.target.value)} error={errors.email} />
                <FormInput label="Phone Number *" icon={Phone} type="tel"   placeholder="+1 555 000 0000"  value={form.phone}   onChange={e => set('phone',    e.target.value)} error={errors.phone} />
              </div>
              <div className="bd-col2">
                <FormInput label="Company Name *" icon={Building2} placeholder="Acme Corp"          value={form.company}  onChange={e => set('company',  e.target.value)} error={errors.company} />
                <FormInput label="Job Title *"    icon={Briefcase} placeholder="CTO / Head of Ops" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} error={errors.jobTitle} />
              </div>
              <div className="bd-col2">
                <FormSelect label="Company Size *" icon={Building2} value={form.companySize} onChange={e => set('companySize', e.target.value)} error={errors.companySize}>
                  <option value="">Select size</option>
                  {COMPANY_SIZES.map(s => <option key={s} value={s}>{s} employees</option>)}
                </FormSelect>
                <FormSelect label="Industry *" value={form.industry} onChange={e => set('industry', e.target.value)} error={errors.industry}>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </FormSelect>
              </div>

              <div style={{ marginBottom: 26 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>What would you like to discuss? (Optional)</div>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={4}
                  placeholder="Tell us about your use case, challenges, or specific questions..."
                  style={{ width: '100%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s', borderRadius: 0 }}
                  onFocus={e => e.target.style.borderColor = '#00FFD1'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
              </div>

              <div className="bd-btn-row">
                <PrimaryBtn onClick={next}>Choose Date & Time <ArrowRight size={16} /></PrimaryBtn>
              </div>
            </div>
          )}

          {/* ════════ STEP 1 — Date & Time ════════ */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontSize: 'clamp(17px, 3vw, 21px)', fontWeight: 600, color: '#fff', margin: '0 0 5px' }}>Choose Date & Time</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 22px' }}>Available Monday–Saturday. Slots shown in your timezone.</p>

              <div style={{ marginBottom: 22 }}>
                <FormSelect label="Your Timezone" icon={Globe} value={form.timezone} onChange={e => { set('timezone', e.target.value); set('slot', null); }}>
                  {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                </FormSelect>
              </div>

              <div className="bd-cal-grid">
                {/* Calendar */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Select Date</div>
                  <CalendarPicker selectedDate={form.date} onSelect={(d) => { set('date', d); set('slot', null); }} />
                  {errors.date && <div style={{ fontSize: 11, color: '#ff4444', marginTop: 5 }}>{errors.date}</div>}
                </div>

                {/* Time slots */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                    {form.date
                      ? `Time — ${new Date(form.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`
                      : 'Select Time'}
                  </div>
                  {!form.date ? (
                    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: '28px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
                      ← Select a date first
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {SLOT_HOURS_IST.map(hour => {
                        const converted = convertSlot(form.date, hour, form.timezone);
                        const isSel = form.slot === hour;
                        return (
                          <button key={hour} onClick={() => set('slot', hour)} style={{
                            background: isSel ? 'rgba(0,255,209,0.1)' : '#0a0a0a',
                            border: isSel ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.1)',
                            color: isSel ? '#00FFD1' : 'rgba(255,255,255,0.7)',
                            padding: '10px 13px', cursor: 'pointer', textAlign: 'left',
                            transition: 'all 0.2s', fontFamily: 'inherit',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                          }}
                            onMouseEnter={e => { if (!isSel) { e.currentTarget.style.borderColor = 'rgba(0,255,209,0.3)'; e.currentTarget.style.color = '#fff'; } }}
                            onMouseLeave={e => { if (!isSel) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
                          >
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600 }}>{converted.time}</div>
                              <div style={{ fontSize: 11, color: isSel ? 'rgba(0,255,209,0.6)' : 'rgba(255,255,255,0.3)', marginTop: 1 }}>{converted.date}</div>
                            </div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'right', flexShrink: 0 }}>
                              {formatISTDisplay(hour)}<br /><span style={{ fontSize: 9 }}>Host (IST)</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.slot && <div style={{ fontSize: 11, color: '#ff4444', marginTop: 5 }}>{errors.slot}</div>}
                </div>
              </div>

              <div className="bd-btn-row">
                <BackBtn onClick={back} />
                <PrimaryBtn onClick={next}>Review Booking <ArrowRight size={16} /></PrimaryBtn>
              </div>
            </div>
          )}

          {/* ════════ STEP 2 — Confirm ════════ */}
          {step === 2 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontSize: 'clamp(17px, 3vw, 21px)', fontWeight: 600, color: '#fff', margin: '0 0 5px' }}>Confirm Your Booking</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 22px' }}>Please review your details before confirming.</p>

              <div className="bd-confirm-grid">
                <div style={{ background: '#0d0d0d', border: '1px solid rgba(0,255,209,0.2)', padding: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>📅 Booking Summary</div>
                  {[
                    { label: 'Demo Type',       value: selectedDemoType?.label },
                    { label: 'Duration',        value: selectedDemoType?.duration },
                    { label: 'Date',            value: slotDisplay?.date },
                    { label: 'Your Time',       value: slotDisplay?.time },
                    { label: 'Host Time (IST)', value: form.slot !== null ? formatISTDisplay(form.slot) : '' },
                    { label: 'Timezone',        value: TIMEZONES.find(t => t.value === form.timezone)?.label },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{row.label}</span>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>👤 Your Details</div>
                  {[
                    { label: 'Name',     value: `${form.firstName} ${form.lastName}` },
                    { label: 'Email',    value: form.email },
                    { label: 'Phone',    value: form.phone },
                    { label: 'Company',  value: form.company },
                    { label: 'Title',    value: form.jobTitle },
                    { label: 'Industry', value: form.industry },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{row.label}</span>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 500, textAlign: 'right', wordBreak: 'break-all' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {form.message && (
                <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>💬 Your Message</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>{form.message}</p>
                </div>
              )}

              {apiError && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.3)', padding: '12px 14px', marginBottom: 14 }}>
                  <AlertCircle size={15} style={{ color: '#ff4444', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#ff4444', marginBottom: 2 }}>Booking Failed</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)' }}>{apiError}</div>
                  </div>
                </div>
              )}

              <div className="bd-btn-row" style={{ alignItems: 'stretch' }}>
                <BackBtn onClick={back} />
                <PrimaryBtn onClick={submit} loading={loading} disabled={loading}>
                  {loading
                    ? <><span style={{ display: 'inline-block', width: 15, height: 15, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Booking...</>
                    : <>Confirm Booking <Check size={15} /></>}
                </PrimaryBtn>
              </div>
            </div>
          )}

          {/* ════════ STEP 3 — Success ════════ */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 70px) 0', animation: 'scaleIn 0.5s ease' }}>
              <div style={{ width: 60, height: 60, background: 'rgba(0,255,209,0.1)', border: '2px solid #00FFD1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
                <Check size={26} style={{ color: '#00FFD1' }} />
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 600, color: '#fff', margin: '0 0 10px' }}>You're Booked!</h2>
              <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.5)', maxWidth: 420, margin: '0 auto 10px', lineHeight: 1.6 }}>
                A confirmation with your Google Meet link has been sent to <strong style={{ color: '#fff' }}>{form.email}</strong>.
              </p>

              <div className="bd-success-meta" style={{ background: '#0d0d0d', border: '1px solid rgba(0,255,209,0.2)', margin: '22px auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>Your Time</div>
                  <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 700, color: '#00FFD1' }}>{slotDisplay?.time}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{slotDisplay?.date}</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>Demo Type</div>
                  <div style={{ fontSize: 'clamp(13px, 2.5vw, 16px)', fontWeight: 700, color: '#fff' }}>{selectedDemoType?.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{selectedDemoType?.duration}</div>
                </div>
              </div>

              {bookingResult?.meetLink && bookingResult.meetLink !== 'Meet link not generated' && (
                <div style={{ marginBottom: 22 }}>
                  <a href={bookingResult.meetLink} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.25)', color: '#00FFD1', padding: '9px 18px', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                    <ExternalLink size={13} /> Open Google Meet
                  </a>
                </div>
              )}

              <div className="bd-success-btns">
                <button onClick={() => navigate('/')} style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '12px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Back to Home
                </button>
                <button onClick={() => navigate('/products')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 26px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Explore Products
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};