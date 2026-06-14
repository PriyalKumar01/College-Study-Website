import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Search, ArrowRight, Mail, Lock, Plus, Pencil, Trash2,
  X, Loader2, ArrowLeft, Building, Sparkles, Crown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { LockedSection, PremiumPlan } from '@/components/LockedSection';
import { PremiumModal } from '@/components/PremiumModal';
import STATIC_COMPANIES_FULL from '@/data/static_companies.json';
import STATIC_HR_FULL from '@/data/static_hr.json';

interface CompanyEntry {
  id?: string;
  no?: number;
  name: string;
  type?: string;
  sector: string;
  url: string;
  mode: string;
  branches: string;
  note?: string;
}

interface HRContact {
  id?: string;
  company: string;
  hr_email: string;
  type?: string;
  name?: string;
  designation?: string;
}

const STATIC_COMPANIES: CompanyEntry[] = [
  { no: 1, name: 'TCS', type: 'MNC', sector: 'IT/Software', url: 'https://www.tcs.com/careers/india', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, CE, EE, ECE, CHE', note: 'TCS NextStep portal' },
  { no: 2, name: 'Infosys', type: 'MNC', sector: 'IT/Software', url: 'https://www.infosys.com/careers/apply.html', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE, CHE', note: 'InfyTQ platform' },
  { no: 3, name: 'Wipro', type: 'MNC', sector: 'IT/Software', url: 'https://careers.wipro.com/', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE', note: 'WILP program' },
  { no: 4, name: 'HCLTech', type: 'MNC', sector: 'IT/Software', url: 'https://www.hcltech.com/careers', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE, CE', note: 'HCL TechBee' },
  { no: 5, name: 'Accenture', type: 'MNC', sector: 'IT/Consulting', url: 'https://www.accenture.com/in-en/careers', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE, CHE, CE', note: 'ASE roles' },
  { no: 6, name: 'Cognizant', type: 'MNC', sector: 'IT/Software', url: 'https://careers.cognizant.com/global/en', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE', note: 'GenC program' },
  { no: 7, name: 'Capgemini', type: 'MNC', sector: 'IT/Consulting', url: 'https://www.capgemini.com/in-en/careers/', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE', note: 'Fresher campus roles' },
  { no: 8, name: 'IBM India', type: 'MNC', sector: 'IT/Software', url: 'https://www.ibm.com/in-en/employment/', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE', note: 'IBM Campus Connect' },
  { no: 9, name: 'Tech Mahindra', type: 'MNC', sector: 'IT/Software', url: 'https://careers.techmahindra.com/', mode: 'Campus + Off-Campus', branches: 'CSE/IT, ME, EE, ECE', note: '' },
  { no: 10, name: 'Mphasis', type: 'MNC', sector: 'IT/Software', url: 'https://careers.mphasis.com/', mode: 'Off-Campus', branches: 'CSE/IT, EE, ECE', note: '' },
];

const STATIC_HR: HRContact[] = [
  { company: 'TCS', hr_email: 'hr.recruitment@tcs.com', type: 'MNC' },
  { company: 'Infosys', hr_email: 'campus@infosys.com', type: 'MNC' },
  { company: 'Wipro', hr_email: 'campus.recruitment@wipro.com', type: 'MNC' },
  { company: 'Cognizant', hr_email: 'campus.recruitment@cognizant.com', type: 'MNC' },
  { company: 'Capgemini', hr_email: 'india.recruitment@capgemini.com', type: 'MNC' },
  { company: 'HCLTech', hr_email: 'campus@hcl.com', type: 'MNC' },
  { company: 'Tech Mahindra', hr_email: 'fresher.recruitment@techmahindra.com', type: 'MNC' },
  { company: 'Accenture', hr_email: 'in.campus@accenture.com', type: 'MNC' },
  { company: 'IBM India', hr_email: 'ibm_campus@in.ibm.com', type: 'MNC' },
  { company: 'Deloitte', hr_email: 'IN-campus-recruitment@deloitte.com', type: 'MNC' },
];

const typeBadge = (type?: string) => {
  const t = (type || 'MNC').toUpperCase();
  if (t === 'MNC') return 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
  if (t === 'PSU') return 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800';
  if (t === 'UNICORN') return 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
  if (t === 'GOVERNMENT') return 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
  return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700';
};

// ─── Reusable High-Contrast Pagination Component ─────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number; totalPages: number; onPageChange: (page: number) => void;
}) {
  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push('...');
      const start = Math.max(3, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const btnClass = "min-w-[38px] h-9 px-2 rounded-xl text-xs font-black bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300 disabled:opacity-25 transition-all shadow-md flex items-center justify-center font-mono";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}
        className={btnClass} title="First page">
        «
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className={btnClass} title="Previous page">
        ‹
      </button>
      {getPages().map((p, i) => (
        p === '...'
          ? <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-gray-500 font-extrabold">...</span>
          : <button key={p} onClick={() => onPageChange(p as number)}
              className={`min-w-[38px] h-9 px-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center ${
                currentPage === p
                  ? 'bg-violet-700 text-white dark:bg-violet-600 border border-violet-500 shadow-violet-500/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300'
              }`}>
              {p}
            </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className={btnClass} title="Next page">
        ›
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}
        className={btnClass} title="Last page">
        »
      </button>
    </div>
  );
}

// ─── Company/HR Add-Edit Modal ────────────────────────────────────────────────
function EntryModal({ open, onClose, mode, editingCompany, editingHR, onSaved }: {
  open: boolean; onClose: () => void; mode: 'company' | 'hr';
  editingCompany?: CompanyEntry | null; editingHR?: HRContact | null; onSaved: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === 'company') {
      setForm(editingCompany || { name: '', type: 'MNC', sector: '', url: '', mode: 'Off-Campus', branches: '', note: '' });
    } else {
      setForm(editingHR || { company: '', hr_email: '', name: '', designation: '', type: 'MNC' });
    }
  }, [open, mode, editingCompany, editingHR]);

  const f = (k: string, v: string) => setForm((p: any) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (mode === 'company' && (!form.name || !form.url)) {
      toast({ title: 'Validation Error', description: 'Name and URL are required', variant: 'destructive' });
      return;
    }
    if (mode === 'hr' && (!form.company || !form.hr_email)) {
      toast({ title: 'Validation Error', description: 'Company and HR Email are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const table = mode === 'company' ? 'company_directory' : 'hr_contacts';
      const editing = mode === 'company' ? editingCompany : editingHR;
      if (editing?.id) {
        const { error } = await (supabase as any).from(table).update(form).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await (supabase as any).from(table).insert(form);
        if (error) throw error;
      }
      toast({ title: '✅ Saved!', description: `${mode === 'company' ? 'Company' : 'HR contact'} saved.` });
      onSaved(); onClose();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;
  const inputCls = "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-805 text-sm px-3 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";
  const gradient = mode === 'company' ? 'from-violet-500 to-indigo-600' : 'from-emerald-500 to-teal-600';

  return (
    <AnimatePresence>
      <motion.div key="entry-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div key="entry-modal" initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className={`px-6 py-4 bg-gradient-to-r ${gradient} flex items-center justify-between`}>
            <h2 className="text-lg font-bold text-white">{(mode === 'company' ? editingCompany : editingHR)?.id ? 'Edit' : 'Add'} {mode === 'company' ? 'Company' : 'HR Contact'}</h2>
            <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
            {mode === 'company' ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Company Name *</label><input className={inputCls} value={form.name || ''} onChange={e => f('name', e.target.value)} placeholder="e.g. Google India" /></div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Type</label>
                  <select className={inputCls} value={form.type || 'MNC'} onChange={e => f('type', e.target.value)}>
                    {['MNC', 'PSU', 'Indian MNC', 'Unicorn', 'Government', 'Startup'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Sector</label><input className={inputCls} value={form.sector || ''} onChange={e => f('sector', e.target.value)} placeholder="IT/Software" /></div>
                <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Career Page URL *</label><input className={inputCls} value={form.url || ''} onChange={e => f('url', e.target.value)} placeholder="https://..." /></div>
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Mode</label><input className={inputCls} value={form.mode || ''} onChange={e => f('mode', e.target.value)} placeholder="Campus + Off-Campus" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Branches</label><input className={inputCls} value={form.branches || ''} onChange={e => f('branches', e.target.value)} placeholder="CSE/IT, ME, EE" /></div>
                <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Note</label><input className={inputCls} value={form.note || ''} onChange={e => f('note', e.target.value)} placeholder="Optional note..." /></div>
              </div>
            ) : (
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Company Name *</label><input className={inputCls} value={form.company || ''} onChange={e => f('company', e.target.value)} placeholder="Company name" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">HR Email *</label><input className={inputCls} value={form.hr_email || ''} onChange={e => f('hr_email', e.target.value)} placeholder="hr@company.com" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">HR Name</label><input className={inputCls} value={form.name || ''} onChange={e => f('name', e.target.value)} placeholder="e.g. Akanksha Puri" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Designation</label><input className={inputCls} value={form.designation || ''} onChange={e => f('designation', e.target.value)} placeholder="e.g. Head HR" /></div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Type</label>
                  <select className={inputCls} value={form.type || 'MNC'} onChange={e => f('type', e.target.value)}>
                    {['MNC', 'PSU', 'Indian MNC', 'Unicorn', 'Government', 'Startup'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className={`px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${gradient} hover:opacity-90 flex items-center gap-2 disabled:opacity-60`}>
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PremiumDirectory() {
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state
  const activeTab = (searchParams.get('tab') || 'companies') as 'companies' | 'hr';

  // Data state
  const [companies, setCompanies] = useState<CompanyEntry[]>(STATIC_COMPANIES_FULL as CompanyEntry[]);
  const [hrContacts, setHrContacts] = useState<HRContact[]>(STATIC_HR_FULL as HRContact[]);
  const [loading, setLoading] = useState(false);

  // Search & Filter state
  const [companySearch, setCompanySearch] = useState('');
  const [companyTypeFilter, setCompanyTypeFilter] = useState('All');
  const [hrSearch, setHrSearch] = useState('');

  // Pagination state
  const [companyPage, setCompanyPage] = useState(1);
  const [hrPage, setHrPage] = useState(1);
  const ITEMS_PER_PAGE = 100;

  // Modals state
  const [entryModal, setEntryModal] = useState<{ open: boolean; mode: 'company' | 'hr'; editingCompany?: CompanyEntry | null; editingHR?: HRContact | null }>({ open: false, mode: 'company' });
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; plan: PremiumPlan }>({ open: false, plan: 'companies' });

  // Purchase state
  const [hasCompaniesAccess, setHasCompaniesAccess] = useState(false);
  const [hasHRAccess, setHasHRAccess] = useState(false);

  const checkPurchases = useCallback(async () => {
    if (!user) return;
    const { data } = await (supabase as any)
      .from('premium_purchases')
      .select('plan')
      .eq('user_id', user.id)
      .in('payment_status', ['completed', 'free']);
    
    const unlockedPlans = data ? data.map((p: any) => p.plan) : [];
    setHasCompaniesAccess(isOwner || unlockedPlans.includes('companies'));
    setHasHRAccess(isOwner || unlockedPlans.includes('hr_emails'));
  }, [user, isOwner]);

  const fetchCompanies = async () => {
    const { data } = await (supabase as any).from('company_directory').select('*').order('no', { ascending: true });
    if (data && data.length > 0) {
      setCompanies(data as CompanyEntry[]);
    } else {
      setCompanies(STATIC_COMPANIES_FULL as CompanyEntry[]);
    }
  };

  const fetchHR = async () => {
    setLoading(true);
    try {
      let allData: HRContact[] = [];
      let from = 0;
      let to = 999;
      let keepFetching = true;

      while (keepFetching) {
        const { data, error } = await (supabase as any)
          .from('hr_contacts')
          .select('*')
          .order('company', { ascending: true })
          .range(from, to);
        
        if (error) {
          console.error("Error fetching HR batch:", error);
          break;
        }

        if (data && data.length > 0) {
          allData = [...allData, ...data];
          if (data.length < 1000) {
            keepFetching = false;
          } else {
            from += 1000;
            to += 1000;
          }
        } else {
          keepFetching = false;
        }
      }

      if (allData.length > 0) {
        setHrContacts(allData);
      } else {
        setHrContacts(STATIC_HR_FULL as HRContact[]);
      }
    } catch (err) {
      console.error("Failed to load HR contacts:", err);
      setHrContacts(STATIC_HR_FULL as HRContact[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPurchases();
    fetchCompanies();
    fetchHR();
  }, [checkPurchases]);

  // Filters logic
  const filteredCompanies = companies.filter(c => {
    const matchSearch = !companySearch || 
      (c.name || '').toLowerCase().includes(companySearch.toLowerCase()) || 
      (c.branches || '').toLowerCase().includes(companySearch.toLowerCase()) || 
      (c.sector || '').toLowerCase().includes(companySearch.toLowerCase());
    const matchType = companyTypeFilter === 'All' || (c.type || 'MNC') === companyTypeFilter;
    return matchSearch && matchType;
  });

  const filteredHR = hrContacts.filter(h => 
    !hrSearch || 
    (h.company || '').toLowerCase().includes(hrSearch.toLowerCase()) || 
    (h.type || 'MNC').toLowerCase().includes(hrSearch.toLowerCase())
  );

  // Pagination
  const companyTotalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const pagedCompanies = filteredCompanies.slice((companyPage - 1) * ITEMS_PER_PAGE, companyPage * ITEMS_PER_PAGE);
  const hrTotalPages = Math.ceil(filteredHR.length / ITEMS_PER_PAGE);
  const pagedHR = filteredHR.slice((hrPage - 1) * ITEMS_PER_PAGE, hrPage * ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => { setCompanyPage(1); }, [companySearch, companyTypeFilter]);
  useEffect(() => { setHrPage(1); }, [hrSearch]);

  const handleDeleteCompany = async (id: string) => {
    if (!confirm('Delete this company?')) return;
    const { error } = await (supabase as any).from('company_directory').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    fetchCompanies();
    toast({ title: 'Deleted' });
  };

  const handleDeleteHR = async (id: string) => {
    if (!confirm('Delete this HR contact?')) return;
    const { error } = await (supabase as any).from('hr_contacts').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    fetchHR();
    toast({ title: 'Deleted' });
  };

  const currentHasAccess = activeTab === 'companies' ? hasCompaniesAccess : hasHRAccess;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/opportunities')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Opportunities
        </button>

        {/* Serif Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-violet-600/80 dark:text-violet-400 mb-2">
            ✦ Premium Resources Directory ✦
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            <span className="font-serif italic" style={{ fontFamily: '"Georgia", "Times New Roman", serif', letterSpacing: '-0.01em' }}>
              Explore Career Databases
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Browse through official career links of top companies and direct HR manager emails to boost your applications.
          </p>
        </div>

        {/* Directory Tab Switches */}
        <div className="flex border-b border-gray-250 dark:border-gray-800 mb-6 gap-2">
          <button
            onClick={() => setSearchParams({ tab: 'companies' })}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-black transition-all border-b-2 -mb-[2px] ${
              activeTab === 'companies'
                ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            🏢 Company Portals {hasCompaniesAccess && '✓'}
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'hr' })}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-black transition-all border-b-2 -mb-[2px] ${
              activeTab === 'hr'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            📧 HR Email Contacts {hasHRAccess && '✓'}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
          {currentHasAccess ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              
              {/* Header Title in Card */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    {activeTab === 'companies' ? '🏢 90+ Company Career Pages' : '📧 1800+ HR Email Directory'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {activeTab === 'companies' 
                      ? 'Official job portals and careers page links of major corporate groups'
                      : 'Send direct, personalized applications directly to hiring managers'
                    }
                  </p>
                </div>
                {isOwner && (
                  <button
                    onClick={() => setEntryModal({ open: true, mode: activeTab === 'companies' ? 'company' : 'hr', editingCompany: null, editingHR: null })}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-all ${
                      activeTab === 'companies' ? 'bg-violet-600 hover:bg-violet-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Entry
                  </button>
                )}
              </div>

              {/* Warning/Guide message for HR tab */}
              {activeTab === 'hr' && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 mb-5">
                  <span className="text-xl flex-shrink-0">⚠️</span>
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    <strong>Use responsibly:</strong> These emails are for sending genuine, professional job applications. Spam or bulk unsolicited emails may get you blacklisted. Always personalize your cover letter and try to obtain a referral.
                  </p>
                </div>
              )}

              {/* Search + Filters */}
              {activeTab === 'companies' ? (
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={companySearch}
                      onChange={e => setCompanySearch(e.target.value)}
                      placeholder="Search companies, sectors, branches..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-905 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {['All', 'MNC', 'PSU', 'Indian MNC', 'Unicorn', 'Government', 'Startup'].map(t => (
                      <button
                        key={t}
                        onClick={() => setCompanyTypeFilter(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          companyTypeFilter === t
                            ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                            : 'bg-white dark:bg-gray-805 border-gray-200 dark:border-gray-750 text-gray-650 dark:text-gray-300 hover:border-violet-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative mb-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={hrSearch}
                    onChange={e => setHrSearch(e.target.value)}
                    placeholder="Search company or type..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-905 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              )}

              {/* Data Count */}
              <p className="text-xs text-gray-400 mb-4 font-bold tracking-wide">
                {activeTab === 'companies'
                  ? `Showing ${(companyPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(companyPage * ITEMS_PER_PAGE, filteredCompanies.length)} of ${filteredCompanies.length} companies`
                  : `Showing ${(hrPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(hrPage * ITEMS_PER_PAGE, filteredHR.length)} of ${filteredHR.length} contacts`
                }
              </p>

              {/* Tables Container */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  {activeTab === 'companies' ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-750">
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">#</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">Company</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden sm:table-cell">Type</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden md:table-cell">Sector</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden lg:table-cell">Branches</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden md:table-cell">Mode</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">Action</th>
                          {isOwner && <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">Admin</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {pagedCompanies.map((c, i) => (
                          <tr key={c.id || c.no || i} className="border-b border-gray-50 dark:border-gray-805 hover:bg-violet-50/20 dark:hover:bg-violet-950/5 transition-colors">
                            <td className="px-4 py-3 text-gray-400 text-xs font-mono">{(companyPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                            <td className="px-4 py-3">
                              <span className="font-bold text-gray-800 dark:text-gray-100">{c.name}</span>
                              {c.note && <span className="ml-2 text-xs text-gray-400 hidden sm:inline">({c.note})</span>}
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${typeBadge(c.type)}`}>
                                {c.type || 'MNC'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs hidden md:table-cell">{c.sector}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs hidden lg:table-cell max-w-[180px] truncate">{c.branches}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs hidden md:table-cell">{c.mode}</td>
                            <td className="px-4 py-3">
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-650 dark:text-violet-400 text-xs font-bold hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors shadow-sm border border-violet-100 dark:border-violet-900/30"
                              >
                                Open Portal <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                            </td>
                            {isOwner && (
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <button onClick={() => setEntryModal({ open: true, mode: 'company', editingCompany: c })}
                                    className="p-1.5 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                                  {c.id && <button onClick={() => handleDeleteCompany(c.id!)}
                                    className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-750">
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">#</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">Company</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden sm:table-cell">Type</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden md:table-cell">HR Name</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase hidden md:table-cell">Designation</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">Email Address</th>
                          {isOwner && <th className="px-4 py-3 text-left font-bold text-gray-500 dark:text-gray-450 text-xs uppercase">Admin</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {pagedHR.map((h, i) => (
                          <tr key={h.id || h.company + i} className="border-b border-gray-50 dark:border-gray-805 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/5 transition-colors">
                            <td className="px-4 py-3 text-gray-400 text-xs font-mono">{(hrPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                            <td className="px-4 py-3">
                              <span className="font-bold text-gray-800 dark:text-gray-100">{h.company}</span>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${typeBadge(h.type)}`}>
                                {h.type || 'MNC'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs hidden md:table-cell">{h.name || '—'}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs hidden md:table-cell">{h.designation || '—'}</td>
                            <td className="px-4 py-3">
                              <a
                                href={`mailto:${h.hr_email}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-650 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors shadow-sm border border-emerald-100 dark:border-emerald-900/30 font-mono"
                              >
                                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                {h.hr_email}
                              </a>
                            </td>
                            {isOwner && (
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <button onClick={() => setEntryModal({ open: true, mode: 'hr', editingHR: h })}
                                    className="p-1.5 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                                  {h.id && <button onClick={() => handleDeleteHR(h.id!)}
                                    className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Empty check */}
                {((activeTab === 'companies' && filteredCompanies.length === 0) || (activeTab === 'hr' && filteredHR.length === 0)) && (
                  <div className="text-center py-12 text-gray-400 text-sm font-medium">No results match your search parameters.</div>
                )}
              </div>

              {/* Paginations */}
              {activeTab === 'companies' ? (
                <Pagination
                  currentPage={companyPage}
                  totalPages={companyTotalPages}
                  onPageChange={setCompanyPage}
                />
              ) : (
                <Pagination
                  currentPage={hrPage}
                  totalPages={hrTotalPages}
                  onPageChange={setHrPage}
                />
              )}

              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-5 font-semibold">
                Full database loaded — contacts are continuously verified and added.
              </p>

            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="py-6">
              <LockedSection
                plan={activeTab === 'companies' ? 'companies' : 'hr_emails'}
                onUnlock={() => setPremiumModal({ open: true, plan: activeTab === 'companies' ? 'companies' : 'hr_emails' })}
                hasAccess={false}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Entry Modal for modifications */}
      <EntryModal
        open={entryModal.open}
        onClose={() => setEntryModal(p => ({ ...p, open: false }))}
        mode={entryModal.mode}
        editingCompany={entryModal.editingCompany}
        editingHR={entryModal.editingHR}
        onSaved={() => { entryModal.mode === 'company' ? fetchCompanies() : fetchHR(); }}
      />

      {/* Payment handling modal */}
      <PremiumModal
        open={premiumModal.open}
        onClose={() => setPremiumModal(p => ({ ...p, open: false }))}
        plan={premiumModal.plan}
        onSuccess={() => { checkPurchases(); }}
      />
    </div>
  );
}
