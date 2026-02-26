import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Globe, User, Mail, Phone, Building2, ChevronLeft, ChevronRight, Check, Briefcase, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// ── Constants ────────────────────────────────────────────────────────────────

const OWNER_TIMEZONE = 'Asia/Kolkata'; // IST

// Available slots in IST (9 AM to 6 PM, Mon–Sat)
const SLOT_HOURS_IST = [9, 10, 11, 14, 15, 16, 17]; // skip lunch 12-13

const DEMO_TYPES = [
  { id: 'product', label: 'Product Walkthrough', duration: '30 min' },
  { id: 'technical', label: 'Technical Deep Dive', duration: '60 min' },
  { id: 'enterprise', label: 'Enterprise Consultation', duration: '60 min' },
  { id: 'pilot', label: 'Pilot Program Discussion', duration: '45 min' },
];

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–1000', '1000+'];

const INDUSTRIES = [
  'Manufacturing', 'Retail', 'Healthcare', 'Logistics & Supply Chain',
  'Defense & Security', 'Agriculture', 'Construction', 'Energy', 'Research & Academia', 'Other'
];

// Common world timezones with display labels
const TIMEZONES = [
  { value: 'Asia/Kolkata',         label: 'India (IST, UTC+5:30)' },
  { value: 'America/New_York',     label: 'New York (EST/EDT)' },
  { value: 'America/Chicago',      label: 'Chicago (CST/CDT)' },
  { value: 'America/Denver',       label: 'Denver (MST/MDT)' },
  { value: 'America/Los_Angeles',  label: 'Los Angeles (PST/PDT)' },
  { value: 'America/Sao_Paulo',    label: 'São Paulo (BRT)' },
  { value: 'Europe/London',        label: 'London (GMT/BST)' },
  { value: 'Europe/Paris',         label: 'Paris (CET/CEST)' },
  { value: 'Europe/Berlin',        label: 'Berlin (CET/CEST)' },
  { value: 'Europe/Moscow',        label: 'Moscow (MSK)' },
  { value: 'Africa/Cairo',         label: 'Cairo (EET)' },
  { value: 'Africa/Lagos',         label: 'Lagos (WAT)' },
  { value: 'Asia/Dubai',           label: 'Dubai (GST, UTC+4)' },
  { value: 'Asia/Karachi',         label: 'Karachi (PKT, UTC+5)' },
  { value: 'Asia/Dhaka',           label: 'Dhaka (BST, UTC+6)' },
  { value: 'Asia/Bangkok',         label: 'Bangkok (ICT, UTC+7)' },
  { value: 'Asia/Singapore',       label: 'Singapore (SGT, UTC+8)' },
  { value: 'Asia/Shanghai',        label: 'Shanghai (CST, UTC+8)' },
  { value: 'Asia/Tokyo',           label: 'Tokyo (JST, UTC+9)' },
  { value: 'Asia/Seoul',           label: 'Seoul (KST, UTC+9)' },
  { value: 'Australia/Sydney',     label: 'Sydney (AEST/AEDT)' },
  { value: 'Pacific/Auckland',     label: 'Auckland (NZST/NZDT)' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const isSunday = (date) => date.getDay() === 0;

// Convert IST slot on a given IST-date to the client's timezone display
const convertSlot = (istDateStr, istHour, clientTz) => {
  if (!istDateStr || istHour === null || istHour === undefined) return { time: '', date: '', utcDate: new Date() };
  // Build a Date object for that IST time
  const [y, m, d] = istDateStr.split('-').map(Number);
  // IST = UTC+5:30 -> subtract 5h30m to get UTC
  const utcMs = Date.UTC(y, m - 1, d, istHour - 5, -30); // IST is UTC+5:30, so UTC = IST - 5h30m
  const utcDate = new Date(utcMs);

  const clientFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: clientTz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const clientDateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: clientTz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return {
    time: clientFormatter.format(utcDate),
    date: clientDateFormatter.format(utcDate),
    utcDate,
  };
};

const formatISTDisplay = (hour) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour > 12 ? hour - 12 : hour;
  return `${h}:00 ${period} IST`;
};

// ── Sub-components ────────────────────────────────────────────────────────────

const StepIndicator = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 48 }}>
    {Array.from({ length: total }).map((_, i) => (
      <React.Fragment key={i}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: i < current ? '#00FFD1' : i === current ? 'transparent' : 'transparent',
          border: i < current ? '2px solid #00FFD1' : i === current ? '2px solid #00FFD1' : '2px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
          color: i < current ? '#000' : i === current ? '#00FFD1' : 'rgba(255,255,255,0.3)',
          flexShrink: 0,
          transition: 'all 0.3s ease',
        }}>
          {i < current ? <Check size={14} /> : i + 1}
        </div>
        {i < total - 1 && (
          <div style={{
            flex: 1, height: 2,
            background: i < current ? '#00FFD1' : 'rgba(255,255,255,0.1)',
            transition: 'background 0.3s ease',
          }} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const FormInput = ({ label, icon: Icon, error, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />}
      <input
        {...props}
        style={{
          width: '100%', background: '#0a0a0a', border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,0.12)'}`,
          color: '#fff', padding: Icon ? '13px 14px 13px 42px' : '13px 14px',
          fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.2s ease',
          ...props.style,
        }}
        onFocus={e => e.target.style.borderColor = '#00FFD1'}
        onBlur={e => e.target.style.borderColor = error ? '#ff4444' : 'rgba(255,255,255,0.12)'}
      />
    </div>
    {error && <span style={{ fontSize: 12, color: '#ff4444' }}>{error}</span>}
  </div>
);

const FormSelect = ({ label, icon: Icon, children, error, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', zIndex: 1 }} />}
      <select
        {...props}
        style={{
          width: '100%', background: '#0a0a0a', border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,0.12)'}`,
          color: props.value ? '#fff' : 'rgba(255,255,255,0.3)',
          padding: Icon ? '13px 14px 13px 42px' : '13px 14px',
          fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
          appearance: 'none', cursor: 'pointer',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={e => e.target.style.borderColor = '#00FFD1'}
        onBlur={e => e.target.style.borderColor = error ? '#ff4444' : 'rgba(255,255,255,0.12)'}
      >
        {children}
      </select>
    </div>
    {error && <span style={{ fontSize: 12, color: '#ff4444' }}>{error}</span>}
  </div>
);

// ── Calendar Component ────────────────────────────────────────────────────────
const CalendarPicker = ({ selectedDate, onSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const monthLabel = viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  const isDisabled = (day) => {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return d < today || d.getDay() === 0; // disable past & Sundays
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return formatDateKey(d) === selectedDate;
  };

  const isToday = (day) => {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return formatDateKey(d) === formatDateKey(today);
  };

  return (
    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={prevMonth} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{monthLabel}</span>
        <button onClick={nextMonth} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '4px 0', fontWeight: 600, letterSpacing: '0.5px' }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {/* Empty cells */}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const todayMark = isToday(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => {
                const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
                onSelect(formatDateKey(d));
              }}
              style={{
                background: selected ? '#00FFD1' : 'transparent',
                color: disabled ? 'rgba(255,255,255,0.15)' : selected ? '#000' : todayMark ? '#00FFD1' : '#fff',
                border: todayMark && !selected ? '1px solid rgba(0,255,209,0.4)' : '1px solid transparent',
                borderRadius: 0,
                padding: '8px 4px',
                fontSize: 14,
                fontWeight: selected ? 700 : 400,
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; }}
              onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.background = 'transparent'; }}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 16, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: '#00FFD1', display: 'inline-block' }} /> Selected
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, border: '1px solid rgba(0,255,209,0.4)', display: 'inline-block' }} /> Today
        </span>
        <span>Sundays unavailable</span>
      </div>
    </div>
  );
};

// ── Main Scheduler Page ───────────────────────────────────────────────────────
export const BookDemo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: details, 1: datetime, 2: confirm, 3: success
  const [errors, setErrors] = useState({});

  // Detect user timezone
  const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultTz = TIMEZONES.find(t => t.value === detectedTz)?.value || 'Asia/Kolkata';

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', companySize: '', industry: '', jobTitle: '',
    demoType: '', message: '',
    timezone: defaultTz,
    date: '',
    slot: null, // IST hour
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // ── Validation ──
  const validateStep0 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.company.trim()) e.company = 'Required';
    if (!form.companySize) e.companySize = 'Required';
    if (!form.industry) e.industry = 'Required';
    if (!form.jobTitle.trim()) e.jobTitle = 'Required';
    if (!form.demoType) e.demoType = 'Please select a demo type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.date) e.date = 'Please select a date';
    if (form.slot === null) e.slot = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => { setStep(s => s - 1); setErrors({}); };

  const submit = () => setStep(3);

  // Compute client-side display of selected slot
  const slotDisplay = form.date && form.slot !== null
    ? convertSlot(form.date, form.slot, form.timezone)
    : null;

  const selectedDemoType = DEMO_TYPES.find(d => d.id === form.demoType);

  // ── Render ──
  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        .scheduler-input::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #121212; color: #fff; }
      `}</style>

      <Header />

      <div style={{ background: '#000', minHeight: '100vh', padding: '120px 7.6923% 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* ── Page Header ── */}
          {step < 3 && (
            <div style={{ marginBottom: 48, animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.2)', padding: '6px 14px', marginBottom: 20 }}>
                <Calendar size={13} style={{ color: '#00FFD1' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>Schedule a Demo</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                See NeuroForgeAI<br /><span style={{ color: '#00FFD1' }}>in Action</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                Book a personalized demo with our team. All times shown in your local timezone.
              </p>
            </div>
          )}

          {/* ── Step Indicator ── */}
          {step < 3 && <StepIndicator current={step} total={3} />}

          {/* ════════════════════════════════════════
              STEP 0 — Your Details
          ════════════════════════════════════════ */}
          {step === 0 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>Your Details</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px' }}>Tell us about yourself and what you're looking for.</p>

              {/* Demo Type */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>Demo Type *</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  {DEMO_TYPES.map(d => (
                    <button
                      key={d.id}
                      onClick={() => set('demoType', d.id)}
                      style={{
                        background: form.demoType === d.id ? 'rgba(0,255,209,0.1)' : '#0a0a0a',
                        border: form.demoType === d.id ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.1)',
                        color: form.demoType === d.id ? '#00FFD1' : 'rgba(255,255,255,0.6)',
                        padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s ease', fontFamily: 'inherit',
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{d.label}</div>
                      <div style={{ fontSize: 12, color: form.demoType === d.id ? 'rgba(0,255,209,0.6)' : 'rgba(255,255,255,0.3)' }}>{d.duration}</div>
                    </button>
                  ))}
                </div>
                {errors.demoType && <div style={{ fontSize: 12, color: '#ff4444', marginTop: 6 }}>{errors.demoType}</div>}
              </div>

              {/* Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <FormInput label="First Name *" icon={User} placeholder="John" value={form.firstName} onChange={e => set('firstName', e.target.value)} error={errors.firstName} />
                <FormInput label="Last Name *" icon={User} placeholder="Smith" value={form.lastName} onChange={e => set('lastName', e.target.value)} error={errors.lastName} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <FormInput label="Work Email *" icon={Mail} type="email" placeholder="john@company.com" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} />
                <FormInput label="Phone Number *" icon={Phone} type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={e => set('phone', e.target.value)} error={errors.phone} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <FormInput label="Company Name *" icon={Building2} placeholder="Acme Corp" value={form.company} onChange={e => set('company', e.target.value)} error={errors.company} />
                <FormInput label="Job Title *" icon={Briefcase} placeholder="CTO / Head of Operations" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} error={errors.jobTitle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <FormSelect label="Company Size *" icon={Building2} value={form.companySize} onChange={e => set('companySize', e.target.value)} error={errors.companySize}>
                  <option value="">Select size</option>
                  {COMPANY_SIZES.map(s => <option key={s} value={s}>{s} employees</option>)}
                </FormSelect>
                <FormSelect label="Industry *" value={form.industry} onChange={e => set('industry', e.target.value)} error={errors.industry}>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </FormSelect>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>What would you like to discuss? (Optional)</div>
                <textarea
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  rows={4}
                  placeholder="Tell us about your use case, challenges, or specific questions..."
                  style={{ width: '100%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '13px 14px', fontSize: 15, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#00FFD1'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>

              <button onClick={next} style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
              >
                Choose Date & Time <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════
              STEP 1 — Date & Time
          ════════════════════════════════════════ */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>Choose Date & Time</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px' }}>
                Available Monday–Saturday. All slots shown in your selected timezone.
              </p>

              {/* Timezone selector */}
              <div style={{ marginBottom: 28 }}>
                <FormSelect label="Your Timezone" icon={Globe} value={form.timezone} onChange={e => { set('timezone', e.target.value); set('slot', null); }}>
                  {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                </FormSelect>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                {/* Calendar */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Select Date</div>
                  <CalendarPicker selectedDate={form.date} onSelect={(d) => { set('date', d); set('slot', null); }} />
                  {errors.date && <div style={{ fontSize: 12, color: '#ff4444', marginTop: 6 }}>{errors.date}</div>}
                </div>

                {/* Time Slots */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                    Select Time {form.date ? `— ${new Date(form.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}` : ''}
                  </div>

                  {!form.date ? (
                    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
                      ← Select a date first
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {SLOT_HOURS_IST.map(hour => {
                        const converted = convertSlot(form.date, hour, form.timezone);
                        const isSelected = form.slot === hour;
                        return (
                          <button
                            key={hour}
                            onClick={() => set('slot', hour)}
                            style={{
                              background: isSelected ? 'rgba(0,255,209,0.1)' : '#0a0a0a',
                              border: isSelected ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.1)',
                              color: isSelected ? '#00FFD1' : 'rgba(255,255,255,0.7)',
                              padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                              transition: 'all 0.2s ease', fontFamily: 'inherit',
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            }}
                            onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(0,255,209,0.3)'; e.currentTarget.style.color = '#fff'; } }}
                            onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
                          >
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 600 }}>{converted.time}</div>
                              <div style={{ fontSize: 12, color: isSelected ? 'rgba(0,255,209,0.6)' : 'rgba(255,255,255,0.3)', marginTop: 2 }}>{converted.date}</div>
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>
                              {formatISTDisplay(hour)}<br />
                              <span style={{ fontSize: 10 }}>Host (IST)</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.slot && <div style={{ fontSize: 12, color: '#ff4444', marginTop: 6 }}>{errors.slot}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button onClick={back} style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', padding: '14px 24px', fontSize: 15, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button onClick={next} style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s', fontFamily: 'inherit' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
                >
                  Review Booking <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════
              STEP 2 — Confirm
          ════════════════════════════════════════ */}
          {step === 2 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>Confirm Your Booking</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px' }}>Please review your details before confirming.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {/* Booking Summary */}
                <div style={{ background: '#0d0d0d', border: '1px solid rgba(0,255,209,0.2)', padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 }}>📅 Booking Summary</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { label: 'Demo Type', value: selectedDemoType?.label },
                      { label: 'Duration', value: selectedDemoType?.duration },
                      { label: 'Date', value: slotDisplay?.date },
                      { label: 'Your Time', value: slotDisplay?.time },
                      { label: 'Host Time (IST)', value: form.slot !== null ? formatISTDisplay(form.slot) : '' },
                      { label: 'Timezone', value: TIMEZONES.find(t => t.value === form.timezone)?.label },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.label}</span>
                        <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 }}>👤 Your Details</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                      { label: 'Email', value: form.email },
                      { label: 'Phone', value: form.phone },
                      { label: 'Company', value: form.company },
                      { label: 'Title', value: form.jobTitle },
                      { label: 'Industry', value: form.industry },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.label}</span>
                        <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, textAlign: 'right', wordBreak: 'break-all' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {form.message && (
                <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>💬 Your Message</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>{form.message}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={back} style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', padding: '14px 24px', fontSize: 15, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
                  <ChevronLeft size={16} /> Edit
                </button>
                <button onClick={submit} style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s', fontFamily: 'inherit' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
                >
                  Confirm Booking <Check size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════
              STEP 3 — Success
          ════════════════════════════════════════ */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '60px 0', animation: 'scaleIn 0.5s ease' }}>
              <div style={{ width: 72, height: 72, background: 'rgba(0,255,209,0.1)', border: '2px solid #00FFD1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                <Check size={32} style={{ color: '#00FFD1' }} />
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 600, color: '#fff', margin: '0 0 12px' }}>You're Booked!</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto 12px', lineHeight: 1.6 }}>
                Your demo has been scheduled. A confirmation has been sent to <strong style={{ color: '#fff' }}>{form.email}</strong>.
              </p>

              <div style={{ background: '#0d0d0d', border: '1px solid rgba(0,255,209,0.2)', padding: '20px 32px', display: 'inline-flex', gap: 32, margin: '28px auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Your Time</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#00FFD1' }}>{slotDisplay?.time}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{slotDisplay?.date}</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Demo Type</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{selectedDemoType?.label}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{selectedDemoType?.duration}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/')} style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Back to Home
                </button>
                <button onClick={() => navigate('/products')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
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