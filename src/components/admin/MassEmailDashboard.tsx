import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Send, Loader2, AlertCircle, Eye, RefreshCw, CheckCircle2, Play, Pause, 
  Trash2, Mail, Save, Clock, ArrowRight, Server, FileCode, Users, ListFilter, Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserActivityRecord {
  id: string;
  email: string;
  full_name: string;
  provider: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_verified: boolean;
}

interface SignupAttemptRecord {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  status: string;
  error_reason: string | null;
  created_at: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  logo_url: string;
  banner_url: string;
  body_text: string;
  button_1_text: string;
  button_1_url: string;
  button_2_text: string;
  button_2_url: string;
  button_3_text: string;
  button_3_url: string;
}

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  target_group: string;
  status: string;
  total_count: number;
  sent_count: number;
  failed_count: number;
  created_at: string;
  completed_at: string | null;
}

interface EmailLog {
  id: string;
  recipient_email: string;
  recipient_name: string | null;
  status: string;
  error_message: string | null;
  sent_at: string;
}

export default function MassEmailDashboard() {
  const { toast } = useToast();
  
  // Data lists from database
  const [users, setUsers] = useState<UserActivityRecord[]>([]);
  const [signupAttempts, setSignupAttempts] = useState<SignupAttemptRecord[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [selectedCampaignLogs, setSelectedCampaignLogs] = useState<EmailLog[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  // Load states
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [syncingStatus, setSyncingStatus] = useState(false);

  // Template Form State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('new');
  const [templateName, setTemplateName] = useState('My Custom Template');
  const [emailSubject, setEmailSubject] = useState('New Updates on College Study website! 🚀');
  const [logoUrl, setLogoUrl] = useState('https://college-study.netlify.app/logo.png');
  const [headerUrl, setHeaderUrl] = useState('https://college-study.netlify.app/scholarship_banner.png');
  const [showHeaderImage, setShowHeaderImage] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('https://college-study.netlify.app/');
  const [bodyText, setBodyText] = useState(`We have added some amazing resources, scholarships, and opportunities for college students on the **College Study** website. 

Check them out now to stay ahead in your academics and career!`);
  const [btn1Text, setBtn1Text] = useState('Check Scholarships 🎓');
  const [btn1Url, setBtn1Url] = useState('https://college-study.netlify.app/scholarship-portal');
  const [btn2Text, setBtn2Text] = useState('Explore Opportunities 💼');
  const [btn2Url, setBtn2Url] = useState('https://college-study.netlify.app/opportunities');
  const [btn3Text, setBtn3Text] = useState('Gate Study 📚');
  const [btn3Url, setBtn3Url] = useState('https://college-study.netlify.app/gate-study');

  const [fromAddress, setFromAddress] = useState('College Study <collegestudy.support@gmail.com>');
  const [sendAsBcc, setSendAsBcc] = useState(false);

  const [selectedPreset, setSelectedPreset] = useState<string>('none');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Campaign Config & Sending State
  const [targetGroup, setTargetGroup] = useState<'failed_verification' | 'failed_signups' | 'verified' | 'all' | 'custom'>('failed_verification');
  const [customEmails, setCustomEmails] = useState('');
  const [prioritizeActive, setPrioritizeActive] = useState(true);
  const [inactiveExcludeDays, setInactiveExcludeDays] = useState<number>(0);
  const [batchSize, setBatchSize] = useState(50);
  const [sendDelay, setSendDelay] = useState(2); // delay in seconds between batches

  // Live Sending Queue State
  const [isSending, setIsSending] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sendQueue, setSendQueue] = useState<{ email: string; name: string; isGoogleAuthFail?: boolean }[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [campaignProgressId, setCampaignProgressId] = useState<string | null>(null);
  const [sendLogs, setSendLogs] = useState<string[]>([]);
  const [sentCount, setSentCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const PRESETS = {
    none: { name: 'Select Preset (Empty)' },
    otp_assist: {
      name: 'Preset: Sign-up OTP Glitch Assistance ⚡',
      subject: 'Sign-up assistance for College Study website! 🚀',
      bodyText: `We noticed you encountered an authentication issue or verification rate-limit while trying to sign up on College Study.

To complete your registration in seconds with zero hassle, please use the **Continue with Google** or **Continue with GitHub** option. These options are instantaneous, secure, and do not require email OTP codes!

Simply click one of the buttons below to log in or sign up immediately.`,
      logoUrl: 'https://college-study.netlify.app/logo.png',
      headerUrl: 'https://college-study.netlify.app/important_update_banner.png',
      showHeaderImage: true,
      bannerUrl: 'https://college-study.netlify.app/new_update_banner.png',
      btn1Text: 'Login with Google 🌐',
      btn1Url: 'https://college-study.netlify.app/auth?provider=google',
      btn2Text: 'Login with GitHub 💻',
      btn2Url: 'https://college-study.netlify.app/auth?provider=github',
      btn3Text: '',
      btn3Url: ''
    },
    scholarship_alert: {
      name: 'Preset: Scholarship Deadline Alert 🎓',
      subject: 'Urgent: Upcoming Scholarship Deadlines on College Study! 🎓',
      bodyText: `Don't miss out on funding your education! We've updated the **College Study** website with several new scholarships that have deadlines closing this week.

Check out the eligible lists, application guidelines, and links directly on our portal.

Click the buttons below to view the latest active scholarships immediately.`,
      logoUrl: 'https://college-study.netlify.app/logo.png',
      headerUrl: 'https://college-study.netlify.app/scholarship_banner.png',
      showHeaderImage: true,
      bannerUrl: 'https://college-study.netlify.app/deadline_banner.png',
      btn1Text: 'View Scholarships 🎓',
      btn1Url: 'https://college-study.netlify.app/scholarship-portal',
      btn2Text: 'Explore Opportunities 💼',
      btn2Url: 'https://college-study.netlify.app/opportunities',
      btn3Text: 'Gate Study 📚',
      btn3Url: 'https://college-study.netlify.app/gate-study'
    },
    hackathon_alert: {
      name: 'Preset: New Hackathons & Coding Alert 🏆',
      subject: 'New Hackathons & Coding Competitions are Live! 🏆',
      bodyText: `Ready to build project prototypes, win cash prizes, and secure internship opportunities? We have indexed 5+ new premium student hackathons on the **College Study** website.

Form your teams, prepare your IDEs, and register before slots fill up!

Click below to check out the details, themes, and registration links.`,
      logoUrl: 'https://college-study.netlify.app/logo.png',
      headerUrl: 'https://college-study.netlify.app/hackathon_banner.png',
      showHeaderImage: true,
      bannerUrl: 'https://college-study.netlify.app/new_update_banner.png',
      btn1Text: 'Check Opportunities 💼',
      btn1Url: 'https://college-study.netlify.app/opportunities',
      btn2Text: 'Premium Content 👑',
      btn2Url: 'https://college-study.netlify.app/premium-content',
      btn3Text: '',
      btn3Url: ''
    }
  };

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    if (presetKey === 'none') return;
    const preset = PRESETS[presetKey as keyof typeof PRESETS];
    if ('subject' in preset) {
      setEmailSubject(preset.subject);
      setBodyText(preset.bodyText);
      setLogoUrl(preset.logoUrl);
      setHeaderUrl(preset.headerUrl);
      setShowHeaderImage(preset.showHeaderImage);
      setBannerUrl(preset.bannerUrl);
      setBtn1Text(preset.btn1Text);
      setBtn1Url(preset.btn1Url);
      setBtn2Text(preset.btn2Text);
      setBtn2Url(preset.btn2Url);
      setBtn3Text(preset.btn3Text);
      setBtn3Url(preset.btn3Url);
    }
  };

  // Load templates, campaigns, attempts and user logs
  useEffect(() => {
    fetchUsers();
    fetchSignupAttempts();
    fetchTemplates();
    fetchCampaigns();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.rpc('get_user_login_activity');
      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      toast({ title: 'Error fetching users', description: err.message, variant: 'destructive' });
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchSignupAttempts = async () => {
    setLoadingAttempts(true);
    try {
      const { data, error } = await supabase
        .from('signup_attempts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSignupAttempts(data || []);
    } catch (err: any) {
      console.error('Error fetching signup attempts:', err);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      setTemplates(data || []);
      
      // Select the first template if available
      if (data && data.length > 0) {
        loadTemplateData(data[0]);
      }
    } catch (err: any) {
      console.error('Error fetching templates:', err);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const fetchCampaigns = async () => {
    setLoadingCampaigns(true);
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCampaigns(data || []);
    } catch (err: any) {
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const loadTemplateData = (tpl: EmailTemplate) => {
    setSelectedTemplateId(tpl.id);
    setTemplateName(tpl.name);
    setEmailSubject(tpl.subject);
    setLogoUrl(tpl.logo_url || '');
    setHeaderUrl((tpl as any).header_url || '/college_study_email_header.png');
    setShowHeaderImage((tpl as any).show_header_image || false);
    setBannerUrl(tpl.banner_url || '');
    setBodyText(tpl.body_text || '');
    setBtn1Text(tpl.button_1_text || '');
    setBtn1Url(tpl.button_1_url || '');
    setBtn2Text(tpl.button_2_text || '');
    setBtn2Url(tpl.button_2_url || '');
    setBtn3Text(tpl.button_3_text || '');
    setBtn3Url(tpl.button_3_url || '');
  };

  const handleSaveTemplate = async () => {
    try {
      const payload = {
        name: templateName,
        subject: emailSubject,
        logo_url: logoUrl,
        header_url: headerUrl,
        show_header_image: showHeaderImage,
        banner_url: bannerUrl,
        body_text: bodyText,
        button_1_text: btn1Text,
        button_1_url: btn1Url,
        button_2_text: btn2Text,
        button_2_url: btn2Url,
        button_3_text: btn3Text,
        button_3_url: btn3Url,
        updated_at: new Date().toISOString()
      };

      if (selectedTemplateId === 'new') {
        const { data, error } = await supabase
          .from('email_templates')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        toast({ title: 'Template Saved ✅', description: 'Created new template successfully.' });
        fetchTemplates();
        if (data) setSelectedTemplateId(data.id);
      } else {
        const { error } = await supabase
          .from('email_templates')
          .update(payload)
          .eq('id', selectedTemplateId);
        if (error) throw error;
        toast({ title: 'Template Updated ✅', description: 'Updated template details.' });
        fetchTemplates();
      }
    } catch (err: any) {
      toast({ title: 'Failed to save template', description: err.message, variant: 'destructive' });
    }
  };

  // Compile full recipients list based on targeting & login filters
  const recipientsList = useMemo(() => {
    let list: { email: string; name: string; lastLogin: string | null; isGoogleAuthFail?: boolean }[] = [];

    if (targetGroup === 'custom') {
      // Parse custom email list
      const emails = customEmails
        .split(/[,\n]/)
        .map(e => e.trim())
        .filter(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
      
      list = emails.map(email => ({
        email,
        name: email.split('@')[0],
        lastLogin: null
      }));
    } else if (targetGroup === 'failed_signups') {
      // Fetch from failed signup attempts (errors / blocked temp emails)
      const uniqueFailedEmails = new Map<string, typeof signupAttempts[0]>();
      signupAttempts.forEach(attempt => {
        if (attempt.status === 'failed' && attempt.email !== 'oauth-attempt@college-study.netlify.app' && attempt.email !== 'oauth-callback-failed@college-study.netlify.app') {
          // Avoid duplicate emails, keep the latest attempt
          if (!uniqueFailedEmails.has(attempt.email)) {
            uniqueFailedEmails.set(attempt.email, attempt);
          }
        }
      });
      
      list = Array.from(uniqueFailedEmails.values()).map(attempt => ({
        email: attempt.email,
        name: attempt.full_name || attempt.username || attempt.email.split('@')[0],
        lastLogin: null
      }));
    } else if (targetGroup === 'failed_verification') {
      // Find unverified users (is_verified = false and provider = 'Email')
      // Also fetch pending signup attempts that never verified
      const unverifiedMap = new Map<string, { email: string; name: string; lastLogin: string | null; isGoogleAuthFail?: boolean }>();

      // 1. From database users rpc
      users.forEach(u => {
        if (!u.is_verified && u.provider === 'Email') {
          unverifiedMap.set(u.email, {
            email: u.email,
            name: u.full_name || u.email.split('@')[0],
            lastLogin: u.last_sign_in_at
          });
        }
      });

      // 2. From pending signup attempts (never verified)
      signupAttempts.forEach(attempt => {
        if (attempt.status === 'pending' && !unverifiedMap.has(attempt.email)) {
          unverifiedMap.set(attempt.email, {
            email: attempt.email,
            name: attempt.full_name || attempt.username || attempt.email.split('@')[0],
            lastLogin: null
          });
        }
      });

      // 3. Google auth failures (if logged in attempts)
      signupAttempts.forEach(attempt => {
        if (attempt.status === 'failed' && attempt.error_reason?.toLowerCase().includes('google')) {
          const emailStr = attempt.email.includes('@') ? attempt.email : 'oauth-fail-user@college-study.netlify.app';
          if (!unverifiedMap.has(emailStr)) {
            unverifiedMap.set(emailStr, {
              email: emailStr,
              name: attempt.full_name || 'Student',
              lastLogin: null,
              isGoogleAuthFail: true
            });
          }
        }
      });

      list = Array.from(unverifiedMap.values());
    } else if (targetGroup === 'verified') {
      // Verified users (is_verified = true)
      users.forEach(u => {
        if (u.is_verified) {
          list.push({
            email: u.email,
            name: u.full_name || u.email.split('@')[0],
            lastLogin: u.last_sign_in_at
          });
        }
      });
    } else if (targetGroup === 'all') {
      // All users (both verified and unverified, excluding disposable failures)
      const allEmailsMap = new Map<string, { email: string; name: string; lastLogin: string | null }>();
      
      users.forEach(u => {
        allEmailsMap.set(u.email, {
          email: u.email,
          name: u.full_name || u.email.split('@')[0],
          lastLogin: u.last_sign_in_at
        });
      });

      signupAttempts.forEach(attempt => {
        if (attempt.status !== 'failed' && !allEmailsMap.has(attempt.email)) {
          allEmailsMap.set(attempt.email, {
            email: attempt.email,
            name: attempt.full_name || attempt.username || attempt.email.split('@')[0],
            lastLogin: null
          });
        }
      });

      list = Array.from(allEmailsMap.values());
    }

    // Filter by login activity if requested
    if (inactiveExcludeDays > 0 && targetGroup !== 'custom' && targetGroup !== 'failed_signups') {
      const cutoffTime = Date.now() - inactiveExcludeDays * 24 * 60 * 60 * 1000;
      list = list.filter(item => {
        if (!item.lastLogin) return false; // Never logged in or unknown
        return new Date(item.lastLogin).getTime() > cutoffTime;
      });
    }

    // Sort priority: Weekly Active -> Monthly Active -> Inactive
    if (prioritizeActive && targetGroup !== 'custom') {
      list.sort((a, b) => {
        const timeA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        const timeB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
        return timeB - timeA; // Descending order (more recent first)
      });
    }

    return list;
  }, [targetGroup, users, signupAttempts, customEmails, prioritizeActive, inactiveExcludeDays]);

  // Handle live sending process
  const startCampaign = async () => {
    if (recipientsList.length === 0) {
      toast({ title: 'No recipients', description: 'The recipient list is empty.', variant: 'destructive' });
      return;
    }

    setIsSending(true);
    setIsPaused(false);
    setSendLogs([]);
    setSentCount(0);
    setFailedCount(0);
    setQueueIndex(0);

    try {
      // 1. Create a Campaign record in database
      const campaignName = `${templateName} - ${new Date().toLocaleDateString()} (${targetGroup})`;
      const { data: camp, error: campErr } = await supabase
        .from('email_campaigns')
        .insert({
          name: campaignName,
          subject: emailSubject,
          template_id: selectedTemplateId === 'new' ? null : selectedTemplateId,
          target_group: targetGroup,
          status: 'sending',
          total_count: recipientsList.length,
          sent_count: 0,
          failed_count: 0
        })
        .select()
        .single();

      if (campErr) throw campErr;
      
      const newCampaignId = camp.id;
      setCampaignProgressId(newCampaignId);
      
      // Initialize queue
      const queue = recipientsList.map(r => ({
        email: r.email,
        name: r.name,
        isGoogleAuthFail: r.isGoogleAuthFail
      }));
      setSendQueue(queue);
      
      // Start batch sender loop
      triggerNextBatch(queue, 0, newCampaignId);
    } catch (err: any) {
      setIsSending(false);
      toast({ title: 'Failed to start campaign', description: err.message, variant: 'destructive' });
    }
  };

  const triggerNextBatch = async (
    queue: typeof sendQueue, 
    startIndex: number, 
    campaignId: string
  ) => {
    if (startIndex >= queue.length) {
      // Completed sending
      setIsSending(false);
      
      await supabase
        .from('email_campaigns')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', campaignId);

      toast({ title: 'Campaign Completed! 🎉', description: `Successfully dispatched emails.` });
      fetchCampaigns();
      return;
    }

    const currentBatch = queue.slice(startIndex, startIndex + batchSize);
    setQueueIndex(startIndex);

    setSendLogs(prev => [...prev, `[Queue] Dispatched batch: ${startIndex + 1} to ${Math.min(startIndex + batchSize, queue.length)} of ${queue.length}...`]);

    try {
      // Call Supabase Edge Function to send email batch
      const { data: session } = await supabase.auth.getSession();
      
      const response = await fetch(`${(supabase as any).supabaseUrl}/functions/v1/send-campaign-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'send',
          recipients: currentBatch,
          subject: emailSubject,
          bodyText,
          logoUrl,
          headerUrl: showHeaderImage ? headerUrl : undefined,
          bannerUrl,
          siteUrl: 'https://college-study.netlify.app',
          fromAddress,
          sendAsBcc,
          buttons: [
            { text: btn1Text, url: btn1Url },
            { text: btn2Text, url: btn2Url },
            { text: btn3Text, url: btn3Url }
          ].filter(b => b.text.trim() !== '' && b.url.trim() !== '')
        })
      });

      const result = await response.json();

      if (!response.ok) {
        // If 429 daily rate limit hit (Brevo free tier: 300 emails/day)
        if (response.status === 429) {
          setSendLogs(prev => [...prev, `[WARNING] Daily sending limit hit (Brevo: 300 emails/day on free tier). Pausing queue.`]);
          setIsPaused(true);
          await supabase.from('email_campaigns').update({ status: 'paused' }).eq('id', campaignId);
          return;
        }
        throw new Error(result.error || 'Edge Function execution error');
      }

      let localSent = 0;
      let localFailed = 0;

      // Result returns per-email details
      const batchLogs: any[] = [];
      
      if (result.results && Array.isArray(result.results)) {
        for (const emailResult of result.results) {
          const recipientEmail = emailResult.recipientEmail;
          
          if (emailResult.success && (emailResult.brevoMessageId || emailResult.resendEmailId)) {
            localSent++;
            batchLogs.push({
              campaign_id: campaignId,
              recipient_email: recipientEmail,
              recipient_name: queue.find(q => q.email === recipientEmail)?.name || null,
              resend_email_id: emailResult.brevoMessageId || emailResult.resendEmailId || null,
              status: 'sent'
            });
          } else {
            localFailed++;
            const errMsg = emailResult.error || 'Brevo rejected this email';
            batchLogs.push({
              campaign_id: campaignId,
              recipient_email: recipientEmail,
              recipient_name: queue.find(q => q.email === recipientEmail)?.name || null,
              status: 'failed',
              error_message: errMsg
            });
            // Log first error to the output console so user sees the real reason
            if (localFailed === 1) {
              setSendLogs(prev => [...prev, `[WARN] Sample failure reason: ${errMsg}`]);
            }
          }
        }
      }

      // Write logs to database
      if (batchLogs.length > 0) {
        await supabase.from('email_logs').insert(batchLogs);
      }

      // Update counters
      setSentCount(prev => {
        const next = prev + localSent;
        supabase.from('email_campaigns').update({ sent_count: next }).eq('id', campaignId).then(() => {});
        return next;
      });

      setFailedCount(prev => {
        const next = prev + localFailed;
        supabase.from('email_campaigns').update({ failed_count: next }).eq('id', campaignId).then(() => {});
        return next;
      });

      setSendLogs(prev => [...prev, `[Success] Sent: ${localSent}, Failed: ${localFailed} in this batch.`]);

      // Set timeout for next batch delay
      setTimeout(() => {
        if (!isPaused && isSending) {
          triggerNextBatch(queue, startIndex + batchSize, campaignId);
        }
      }, sendDelay * 1000);

    } catch (err: any) {
      console.error('Batch send error:', err);
      let errMsg = err.message || 'Unknown error';
      if (errMsg === 'Failed to fetch' || errMsg.includes('fetch')) {
        errMsg = 'Failed to fetch. (HINT: Since you are running on localhost, you must first deploy your Edge Functions to your Supabase project. Deploy using: "npx supabase functions deploy send-campaign-emails --project-ref axalbmmjqdezbkpffore" so that the production endpoint is active!)';
      }
      setSendLogs(prev => [...prev, `[ERROR] Batch failed: ${errMsg}`]);
      setFailedCount(prev => prev + currentBatch.length);

      // Increment failures in DB campaign
      await supabase.from('email_campaigns').update({ 
        failed_count: failedCount + currentBatch.length 
      }).eq('id', campaignId);

      // Continue to next batch despite failure
      setTimeout(() => {
        if (!isPaused && isSending) {
          triggerNextBatch(queue, startIndex + batchSize, campaignId);
        }
      }, sendDelay * 1000);
    }
  };

  const handlePauseResume = async () => {
    if (!campaignProgressId) return;

    if (isPaused) {
      // Resume
      setIsPaused(false);
      setSendLogs(prev => [...prev, `[Queue] Resuming campaign queue...`]);
      await supabase.from('email_campaigns').update({ status: 'sending' }).eq('id', campaignProgressId);
      triggerNextBatch(sendQueue, queueIndex + batchSize, campaignProgressId);
    } else {
      // Pause
      setIsPaused(true);
      setSendLogs(prev => [...prev, `[Queue] Campaign paused by administrator.`]);
      await supabase.from('email_campaigns').update({ status: 'paused' }).eq('id', campaignProgressId);
    }
  };

  // Sync campaign email delivery metrics (opens/clicks) from Resend
  const syncCampaignStatus = async (campaignId: string) => {
    setSyncingStatus(true);
    try {
      // 1. Fetch all sent logs for this campaign that don't have opened/clicked/failed status
      const { data: logs, error: logsError } = await supabase
        .from('email_logs')
        .select('id, resend_email_id')
        .eq('campaign_id', campaignId)
        .eq('status', 'sent');

      if (logsError) throw logsError;

      if (!logs || logs.length === 0) {
        toast({ title: 'All synced!', description: 'No emails in pending delivery state.' });
        setSyncingStatus(false);
        return;
      }

      const resendIds = logs.map(l => l.resend_email_id).filter(Boolean) as string[];

      if (resendIds.length === 0) {
        setSyncingStatus(false);
        return;
      }

      // Call Edge Function sync endpoint
      const { data: session } = await supabase.auth.getSession();
      const response = await fetch(`${(supabase as any).supabaseUrl}/functions/v1/send-campaign-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'sync',
          emailIds: resendIds
        })
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to sync statuses');

      if (result.statuses && Array.isArray(result.statuses)) {
        // Update database with latest statuses
        for (const item of result.statuses) {
          if (item.status && item.status !== 'unknown') {
            await supabase
              .from('email_logs')
              .update({ status: item.status })
              .eq('resend_email_id', item.resendEmailId);
          }
        }

        toast({ title: 'Metrics Synced 🔄', description: `Updated status for ${result.statuses.length} emails.` });
        
        // Refresh details
        if (selectedCampaignId === campaignId) {
          fetchCampaignLogs(campaignId);
        }
      }
    } catch (err: any) {
      toast({ title: 'Sync Failed', description: err.message, variant: 'destructive' });
    } finally {
      setSyncingStatus(false);
    }
  };

  const fetchCampaignLogs = async (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    try {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('sent_at', { ascending: false });
      if (error) throw error;
      setSelectedCampaignLogs(data || []);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteCampaign = async (campaignId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!window.confirm("Are you sure you want to delete this campaign? This will also delete all associated email delivery logs.")) {
      return;
    }
    
    try {
      // First delete associated logs
      const { error: logsError } = await supabase
        .from('email_logs')
        .delete()
        .eq('campaign_id', campaignId);
        
      if (logsError) throw logsError;

      // Then delete the campaign itself
      const { error: campaignError } = await supabase
        .from('email_campaigns')
        .delete()
        .eq('id', campaignId);

      if (campaignError) throw campaignError;

      toast({ title: 'Campaign Deleted 🗑️', description: 'The campaign and its logs were deleted.' });
      
      // If the deleted campaign was currently selected, clear selection
      if (selectedCampaignId === campaignId) {
        setSelectedCampaignId(null);
        setSelectedCampaignLogs([]);
      }
      
      fetchCampaigns();
    } catch (err: any) {
      toast({ title: 'Failed to delete campaign', description: err.message, variant: 'destructive' });
    }
  };

  // Compile markdown-to-html preview dynamically on the screen
  const htmlPreviewBody = useMemo(() => {
    let html = bodyText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    html = html.split(/\n\s*\n/).map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      return `<p style="margin: 0 0 16px; line-height: 1.6; color: #334155; font-size: 14px;">${trimmed.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return html;
  }, [bodyText]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* Col 1: Template Editor */}
      <Card className="xl:col-span-3 border-0 shadow-md bg-white dark:bg-slate-900">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <FileCode className="h-5 w-5" />
                Email Template Composer
              </CardTitle>
              <CardDescription>Design dynamic, personalized marketing and verification emails</CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={selectedTemplateId} onValueChange={(val) => {
                if (val === 'new') {
                  setSelectedTemplateId('new');
                  setTemplateName('My Custom Template');
                } else {
                  const t = templates.find(item => item.id === val);
                  if (t) loadTemplateData(t);
                }
              }}>
                <SelectTrigger className="w-[200px] h-9">
                  <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">+ Create New Template</SelectItem>
                  {templates.map(tpl => (
                    <SelectItem key={tpl.id} value={tpl.id}>{tpl.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={handleSaveTemplate} size="sm" className="bg-sky-600 hover:bg-sky-700 text-white font-semibold gap-1.5 h-9">
                <Save className="h-4 w-4" />
                Save Template
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-4">
          {/* Presets and Preview Trigger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Quick-Start Preset Templates
              </Label>
              <Select value={selectedPreset} onValueChange={handlePresetChange}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Choose a pre-configured template preset..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">-- Start from Scratch / Blank --</SelectItem>
                  <SelectItem value="otp_assist">Preset: Sign-up OTP Glitch Assistance ⚡</SelectItem>
                  <SelectItem value="scholarship_alert">Preset: Scholarship Deadline Alert 🎓</SelectItem>
                  <SelectItem value="hackathon_alert">Preset: New Hackathons & Coding Alert 🏆</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end justify-end md:col-span-1">
              <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-750 h-9 gap-1.5">
                    <Eye className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    Preview Email Mockup
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px] max-h-[85vh] p-0 overflow-y-auto bg-slate-900 border border-slate-800 text-white rounded-2xl">
                  <div className="bg-slate-950 p-4 border-b border-slate-800 text-xs text-slate-400">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-300">College Study Email Preview</span>
                      <span className="text-[10px] bg-slate-800 text-sky-400 px-2 py-0.5 rounded-full font-semibold">Mock Inbox</span>
                    </div>
                    <div><strong className="text-slate-500">From:</strong> College Study &lt;collegestudy.support@gmail.com&gt;</div>
                    <div className="mt-1"><strong className="text-slate-500">Subject:</strong> {emailSubject}</div>
                  </div>
                  
                  {/* Mock Email Container */}
                  <div className="p-4 bg-[#f0f9ff] text-slate-950 overflow-y-auto max-h-[60vh]">
                    <div className="bg-white border border-[#e0f2fe] rounded-2xl overflow-hidden shadow-sm max-w-[420px] mx-auto">
                      
                      {/* Logo Header */}
                      <div className="p-4 text-center border-b border-[#f0f9ff]">
                        {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 mx-auto mb-1" />}
                        <h3 className="m-0 text-sm font-bold text-[#0369a1] tracking-wide">College Study</h3>
                        <span className="text-[8px] text-[#0284c7] font-semibold tracking-wider uppercase">Your Ultimate Academic Hub</span>
                      </div>

                      {/* Optional Header Banner */}
                      {showHeaderImage && headerUrl && (
                        <div className="px-4 pt-3">
                          <img 
                            src={headerUrl.startsWith('http') ? headerUrl : `https://college-study.netlify.app${headerUrl}`} 
                            alt="Header Banner" 
                            className="w-full h-auto rounded-xl border border-[#e0f2fe]" 
                          />
                        </div>
                      )}

                      {/* Body */}
                      <div className="p-5 text-xs">
                        <h4 className="m-0 mb-3 text-sm font-bold text-slate-900">
                          {targetGroup === 'failed_verification' && customEmails.length === 0 ? 'Dear Student,' : 'Hi Priyal! 👋'}
                        </h4>
                        
                        {/* Body Text */}
                        <div dangerouslySetInnerHTML={{ __html: htmlPreviewBody }} className="leading-relaxed" />

                        {/* Buttons */}
                        <div className="my-4 text-center flex flex-wrap gap-2 justify-center">
                          {btn1Text && btn1Url && <span className="bg-[#0284c7] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">{btn1Text}</span>}
                          {btn2Text && btn2Url && <span className="bg-[#0284c7] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">{btn2Text}</span>}
                          {btn3Text && btn3Url && <span className="bg-[#0284c7] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">{btn3Text}</span>}
                        </div>
                      </div>

                      {/* Poster */}
                      <div className="px-4 text-center">
                        <div className="rounded-xl overflow-hidden border border-[#e0f2fe] bg-[#f8fafc]">
                          <img src={bannerUrl || '/college_study_email_poster.png'} alt="Features Poster" className="w-full h-auto block" />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[9px] text-slate-400 leading-normal">
                        <p className="font-bold text-slate-600 m-0 mb-0.5">Have questions or need help?</p>
                        <p className="m-0 mb-2">Reach out at <span className="text-sky-600 font-semibold">collegestudy.support@gmail.com</span></p>
                        <hr className="border-0 border-t border-slate-200 my-2" />
                        <p className="font-semibold text-sky-600 m-0 mb-0.5">Made with ❤️ for College Students</p>
                        <p className="m-0">© 2026 College Study. All rights reserved.</p>
                      </div>

                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="tpl-name" className="text-xs font-bold text-slate-500">Template Identifier</Label>
              <Input id="tpl-name" value={templateName} onChange={e => setTemplateName(e.target.value)} placeholder="e.g. Verification Assistance Mail" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tpl-subj" className="text-xs font-bold text-slate-500">Email Subject Line</Label>
              <Input id="tpl-subj" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} placeholder="e.g. Try using Continue with Google Option!" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="logo-url" className="text-xs font-bold text-slate-500">Logo Image Link</Label>
              <Input id="logo-url" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="HTTPS Image Link" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="banner-url" className="text-xs font-bold text-slate-500">Clickable Poster Banner Link</Label>
              <Input id="banner-url" value={bannerUrl} onChange={e => setBannerUrl(e.target.value)} placeholder="Relative path or full URL" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="from-address" className="text-xs font-bold text-slate-500">Sender Email (From Address)</Label>
              <Input id="from-address" value={fromAddress} onChange={e => setFromAddress(e.target.value)} placeholder="College Study <collegestudy.support@gmail.com>" />
              <p className="text-[10px] text-slate-400 mt-1">
                Must match your verified sender email on Brevo (collegestudy.support@gmail.com is pre-verified).
              </p>
            </div>
            <div className="flex items-center justify-between border border-slate-100 dark:border-slate-800 rounded-lg p-3 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-350">Send via BCC (Recipient Privacy)</Label>
                <p className="text-[10px] text-slate-400">Hides recipient email list from other users. (Highly Recommended)</p>
              </div>
              <Switch checked={sendAsBcc} onCheckedChange={setSendAsBcc} />
            </div>
          </div>

          {/* Optional Header Banner Configuration */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Include Header Image Banner</Label>
                <p className="text-[10px] text-slate-400">Display an interesting hero graphic at the top of the email</p>
              </div>
              <Switch checked={showHeaderImage} onCheckedChange={setShowHeaderImage} />
            </div>

            {showHeaderImage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-250">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-500">Preset Header Options</Label>
                  <Select 
                    value={['/scholarship_banner.png', '/hackathon_banner.png', '/important_update_banner.png', '/deadline_banner.png', '/new_update_banner.png'].includes(headerUrl) ? headerUrl : 'custom'} 
                    onValueChange={(val) => {
                      if (val !== 'custom') {
                        setHeaderUrl(val);
                      } else {
                        setHeaderUrl('');
                      }
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select Banner Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="/scholarship_banner.png">Scholarship Portal Banner</SelectItem>
                      <SelectItem value="/hackathon_banner.png">Opportunities & Hackathons Banner</SelectItem>
                      <SelectItem value="/important_update_banner.png">Important Update Banner</SelectItem>
                      <SelectItem value="/deadline_banner.png">Deadline Reminder Banner</SelectItem>
                      <SelectItem value="/new_update_banner.png">New Feature/Update Banner</SelectItem>
                      <SelectItem value="custom">-- Custom Header Image URL --</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-500">Header Image URL</Label>
                  <Input 
                    value={headerUrl} 
                    onChange={e => setHeaderUrl(e.target.value)} 
                    disabled={['/scholarship_banner.png', '/hackathon_banner.png', '/important_update_banner.png', '/deadline_banner.png', '/new_update_banner.png'].includes(headerUrl)} 
                    placeholder="Enter custom image URL" 
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="email-body" className="text-xs font-bold text-slate-500">Email Markdown Content</Label>
              <span className="text-[10px] text-slate-400">Use **text** for bold, *text* for italics. Greeting is auto-personalized.</span>
            </div>
            <Textarea 
              id="email-body" 
              value={bodyText} 
              onChange={e => setBodyText(e.target.value)} 
              rows={6} 
              className="resize-y"
              placeholder="Type email body content here..." 
            />
          </div>

          <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Action Links (Buttons in Email)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-400">Button 1 Title</Label>
                <Input value={btn1Text} onChange={e => setBtn1Text(e.target.value)} className="h-8 text-xs" />
                <Label className="text-[10px] text-slate-400">Button 1 Link Path</Label>
                <Input value={btn1Url} onChange={e => setBtn1Url(e.target.value)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-400">Button 2 Title</Label>
                <Input value={btn2Text} onChange={e => setBtn2Text(e.target.value)} className="h-8 text-xs" />
                <Label className="text-[10px] text-slate-400">Button 2 Link Path</Label>
                <Input value={btn2Url} onChange={e => setBtn2Url(e.target.value)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-400">Button 3 Title</Label>
                <Input value={btn3Text} onChange={e => setBtn3Text(e.target.value)} className="h-8 text-xs" />
                <Label className="text-[10px] text-slate-400">Button 3 Link Path</Label>
                <Input value={btn3Url} onChange={e => setBtn3Url(e.target.value)} className="h-8 text-xs" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 2: Campaign targeting and Sending Queue */}
      <Card className="xl:col-span-2 border-0 shadow-md bg-white dark:bg-slate-900">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Users className="h-5 w-5 text-sky-500" />
            Target Audience Selection & Batch Queue
          </CardTitle>
          <CardDescription>Filter recipients and manage delivery throttle to stay within Brevo limits (300/day free)</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Filter selection form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500">Recipients Target Group</Label>
                <Select value={targetGroup} onValueChange={(val: any) => setTargetGroup(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose targeting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="failed_verification">Failed Email Verification (Genuine Users)</SelectItem>
                    <SelectItem value="failed_signups">Failed Signups (Errors / Temp Mail Blocks)</SelectItem>
                    <SelectItem value="verified">Verified Logged In Users</SelectItem>
                    <SelectItem value="all">All Contacts (Verified & Unverified)</SelectItem>
                    <SelectItem value="custom">Custom Manual List (Add Comma/Newline Emails)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {targetGroup === 'custom' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Label className="text-xs font-bold text-slate-500">Paste Emails</Label>
                  <Textarea 
                    value={customEmails} 
                    onChange={e => setCustomEmails(e.target.value)} 
                    placeholder="paste email addresses e.g. user1@gmail.com, user2@hbtu.ac.in" 
                    rows={4}
                  />
                </div>
              )}

              {targetGroup !== 'custom' && targetGroup !== 'failed_signups' && (
                <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Prioritize Recently Active</Label>
                      <p className="text-[10px] text-slate-400">Sort sending queue so users active this week/month receive first</p>
                    </div>
                    <Switch checked={prioritizeActive} onCheckedChange={setPrioritizeActive} />
                  </div>
                  
                  <div className="space-y-1.5 pt-2 border-t border-slate-150 dark:border-slate-800">
                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-350">Inactive User Exclusion</Label>
                    <Select 
                      value={inactiveExcludeDays.toString()} 
                      onValueChange={(val) => setInactiveExcludeDays(parseInt(val))}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Do not exclude inactive users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Do Not Exclude (Send to All)</SelectItem>
                        <SelectItem value="30">Exclude if inactive &gt; 30 Days</SelectItem>
                        <SelectItem value="60">Exclude if inactive &gt; 60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-slate-400 mt-0.5">Filters out users who haven't logged in recently to stay within Brevo's 300 emails/day free limit.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-500">Batch Size</Label>
                  <Input 
                    type="number" 
                    value={batchSize} 
                    onChange={e => setBatchSize(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} 
                    placeholder="max 100" 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-500">Batch Delay (seconds)</Label>
                  <Input 
                    type="number" 
                    value={sendDelay} 
                    onChange={e => setSendDelay(Math.max(1, parseInt(e.target.value) || 1))} 
                    placeholder="e.g. 2" 
                  />
                </div>
              </div>

              {!isSending ? (
                <Button 
                  onClick={startCampaign} 
                  disabled={loadingUsers || recipientsList.length === 0} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold h-11"
                >
                  <Send className="h-4.5 w-4.5 mr-2" />
                  Launch Email Campaign ({recipientsList.length} Emails)
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    onClick={handlePauseResume} 
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold h-11"
                  >
                    {isPaused ? <Play className="h-4.5 w-4.5 mr-2" /> : <Pause className="h-4.5 w-4.5 mr-2" />}
                    {isPaused ? 'Resume Queue' : 'Pause Queue'}
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsSending(false);
                      setIsPaused(false);
                      setSendLogs(prev => [...prev, `[Queue] Campaign sending aborted by user.`]);
                    }} 
                    variant="destructive" 
                    className="h-11 font-bold"
                  >
                    Abort
                  </Button>
                </div>
              )}
            </div>

            {/* Queue progress and logs */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-4 bg-slate-50/30 dark:bg-slate-900/30 flex flex-col h-full min-h-[300px]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Dispatched Queue Output</h4>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-sky-50 text-sky-600 text-[10px] font-bold">Sent: {sentCount}</Badge>
                  <Badge variant="destructive" className="text-[10px] font-bold">Fail: {failedCount}</Badge>
                </div>
              </div>

              {isSending && (
                <div className="mb-4 space-y-2 animate-in fade-in duration-200">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span>Sending Queue Status: {queueIndex} / {sendQueue.length}</span>
                    <span>{Math.round((queueIndex / sendQueue.length) * 100)}%</span>
                  </div>
                  <Progress value={(queueIndex / sendQueue.length) * 100} className="h-2 bg-slate-100" />
                </div>
              )}

              {/* Logs display */}
              <div className="flex-1 bg-slate-950 text-slate-200 font-mono text-[10px] rounded-lg p-3 overflow-y-auto max-h-[220px] space-y-1">
                {sendLogs.length === 0 ? (
                  <span className="text-slate-500 italic">No campaign sending. Hit launch button to initiate queue dispatch.</span>
                ) : (
                  sendLogs.map((log, i) => (
                    <div key={i} className={
                      log.includes('[ERROR]') ? 'text-red-400' :
                      log.includes('[WARNING]') ? 'text-yellow-400' :
                      log.includes('[Success]') ? 'text-green-400' :
                      'text-slate-300'
                    }>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Recipients list review */}
      <Card className="border-0 shadow-md bg-white dark:bg-slate-900 flex flex-col">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <CardTitle className="text-md font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <ListFilter className="h-4 w-4 text-sky-500" />
            Filtered Recipients List
          </CardTitle>
          <CardDescription>Showing {recipientsList.length} filtered target users</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 overflow-y-auto max-h-[380px]">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {loadingUsers ? (
              <div className="flex justify-center items-center py-12 text-slate-400 text-xs">
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                Loading recipient database...
              </div>
            ) : recipientsList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs italic">
                No users match the filtered criteria.
              </div>
            ) : (
              recipientsList.map((item, idx) => (
                <div key={idx} className="p-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.email}</div>
                  </div>
                  <div className="text-right">
                    {item.isGoogleAuthFail ? (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[9px] scale-90 border-0">Google Fail</Badge>
                    ) : targetGroup === 'failed_verification' ? (
                      <Badge className="bg-red-50 text-red-600 hover:bg-red-50 text-[9px] scale-90 border-0">Unverified</Badge>
                    ) : targetGroup === 'failed_signups' ? (
                      <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-[9px] scale-90 border-0">Signup Blocked</Badge>
                    ) : (
                      <Badge className="bg-green-50 text-green-600 hover:bg-green-50 text-[9px] scale-90 border-0">Verified</Badge>
                    )}
                    
                    {item.lastLogin && (
                      <div className="text-[8px] text-slate-400 mt-1">
                        Active: {new Date(item.lastLogin).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Row 3: Campaigns History & delivery logs */}
      <Card className="xl:col-span-3 border-0 shadow-md bg-white dark:bg-slate-900 mt-4">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Clock className="h-5 w-5 text-sky-500" />
            Campaign Dispatch & Delivery logs
          </CardTitle>
          <CardDescription>Track previous campaigns and trigger delivery metrics synchronization</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Campaigns list */}
            <div className="lg:col-span-1 border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/20 dark:bg-slate-900/20">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Select Campaign</span>
                <Button onClick={fetchCampaigns} variant="ghost" size="icon" className="h-6 w-6">
                  <RefreshCw className={`h-3 w-3 ${loadingCampaigns ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[300px] overflow-y-auto">
                {campaigns.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs italic">
                    No campaigns launched yet.
                  </div>
                ) : (
                  campaigns.map(camp => (
                    <div 
                      key={camp.id} 
                      onClick={() => fetchCampaignLogs(camp.id)}
                      className={`p-3.5 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 cursor-pointer text-xs transition-colors group relative ${
                        selectedCampaignId === camp.id ? 'bg-sky-50/50 dark:bg-sky-950/20 border-l-4 border-sky-500' : ''
                      }`}
                    >
                      <div className="font-bold text-slate-700 dark:text-slate-200 flex justify-between items-start gap-1 pr-6">
                        <span className="truncate">{camp.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {camp.status === 'completed' && <Badge className="bg-green-50 text-green-600 border-0 text-[8px] scale-90">Done</Badge>}
                          {camp.status === 'sending' && <Badge className="bg-sky-50 text-sky-600 border-0 text-[8px] scale-90 animate-pulse">Sending</Badge>}
                          {camp.status === 'paused' && <Badge className="bg-yellow-50 text-yellow-600 border-0 text-[8px] scale-90">Paused</Badge>}
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-slate-500 mt-1 flex justify-between items-center pr-6">
                        <span>Total: {camp.total_count} (S: {camp.sent_count} | F: {camp.failed_count})</span>
                        <span className="text-[9px]">{new Date(camp.created_at).toLocaleDateString()}</span>
                      </div>

                      {/* Delete Campaign Button - Shown on Hover */}
                      <button
                        onClick={(e) => handleDeleteCampaign(camp.id, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 rounded transition-opacity duration-150"
                        title="Delete Campaign"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Email delivery logs list */}
            <div className="lg:col-span-2 border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col h-[350px]">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Email Logs & Delivery Stats</span>
                
                {selectedCampaignId && (
                  <Button 
                    onClick={() => syncCampaignStatus(selectedCampaignId)} 
                    disabled={syncingStatus} 
                    size="sm" 
                    variant="outline" 
                    className="h-7 text-[10px] border-sky-200 hover:bg-sky-50 hover:text-sky-600 text-sky-500 dark:border-sky-800 dark:hover:bg-sky-950/20"
                  >
                    {syncingStatus ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <RefreshCw className="h-3 w-3 mr-1" />}
                    Sync Delivery Status
                  </Button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {!selectedCampaignId ? (
                  <div className="h-full flex flex-col justify-center items-center py-12 text-slate-400 text-xs italic">
                    <Mail className="h-8 w-8 text-slate-300 mb-2" />
                    Select a campaign on the left to inspect detailed delivery logs.
                  </div>
                ) : selectedCampaignLogs.length === 0 ? (
                  <div className="h-full flex justify-center items-center py-12 text-slate-400 text-xs italic">
                    No recipient logs available for this campaign.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                        <th className="p-3">Recipient</th>
                        <th className="p-3">Email ID</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Sent Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                      {selectedCampaignLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20">
                          <td className="p-3">
                            <div className="font-semibold text-slate-800 dark:text-slate-100">{log.recipient_name || 'Student'}</div>
                            <div className="text-[10px] text-slate-400">{log.recipient_email}</div>
                          </td>
                          <td className="p-3 font-mono text-[9px] text-slate-400 truncate max-w-[120px]">{log.resend_email_id || 'N/A'}</td>
                          <td className="p-3">
                            {log.status === 'sent' && <Badge className="bg-slate-100 text-slate-600 border-0 text-[8px]">Dispatched</Badge>}
                            {log.status === 'delivered' && <Badge className="bg-green-50 text-green-600 border-0 text-[8px]">Delivered</Badge>}
                            {log.status === 'opened' && <Badge className="bg-sky-50 text-sky-600 border-0 text-[8px] font-bold">Opened 👁</Badge>}
                            {log.status === 'clicked' && <Badge className="bg-indigo-50 text-indigo-600 border-0 text-[8px] font-bold">Clicked 🔗</Badge>}
                            {log.status === 'bounced' && <Badge className="bg-red-50 text-red-600 border-0 text-[8px]">Bounced ⚠️</Badge>}
                            {log.status === 'failed' && <Badge variant="destructive" className="text-[8px]">Failed ❌</Badge>}
                            
                            {log.error_message && (
                              <div className="text-[8px] text-red-400 mt-1 truncate max-w-[150px]" title={log.error_message}>
                                {log.error_message}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-[10px] text-slate-400">
                            {new Date(log.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
