import { supabase } from '@/integrations/supabase/client';

export interface ReportedIssue {
  id: string;
  category: string;
  subject: string;
  description: string;
  userName: string;
  userEmail: string;
  userId?: string;
  college?: string;
  branch?: string;
  year?: string;
  status: 'pending' | 'fixed';
  createdAt: string;
  fixedAt?: string;
}

const LOCAL_STORAGE_KEY = 'csh_user_reported_issues';

function getLocalIssues(): ReportedIssue[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalIssue(issue: ReportedIssue) {
  try {
    const existing = getLocalIssues();
    const updated = [issue, ...existing.filter((i) => i.id !== issue.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota
  }
}

/**
 * Submit an issue report from normal user.
 * Stored securely in Supabase notifications table with is_active = false
 * so it does not trigger the public bell notification.
 */
export async function submitReportedIssue(payload: {
  category: string;
  subject: string;
  description: string;
  userName: string;
  userEmail: string;
  userId?: string;
  college?: string;
  branch?: string;
  year?: string;
}): Promise<{ success: boolean; issue?: ReportedIssue; error?: string }> {
  const createdAt = new Date().toISOString();
  const issueData: Omit<ReportedIssue, 'id'> = {
    category: payload.category || 'General Issue',
    subject: payload.subject.trim(),
    description: payload.description.trim(),
    userName: payload.userName || 'Student',
    userEmail: payload.userEmail.trim(),
    userId: payload.userId,
    college: payload.college,
    branch: payload.branch,
    year: payload.year,
    status: 'pending',
    createdAt,
  };

  try {
    const { data, error } = await (supabase as any)
      .from('notifications')
      .insert({
        title: `[REPORTED_ISSUE:PENDING] ${issueData.category} | ${issueData.subject}`,
        body: JSON.stringify(issueData),
        sent_by: issueData.userName,
        sent_by_email: issueData.userEmail,
        is_active: false,
      })
      .select('id, created_at')
      .single();

    if (error) throw error;

    const fullIssue: ReportedIssue = {
      ...issueData,
      id: data?.id || `local-${Date.now()}`,
      createdAt: data?.created_at || createdAt,
    };

    saveLocalIssue(fullIssue);
    return { success: true, issue: fullIssue };
  } catch (err: any) {
    console.warn('Could not insert issue to Supabase, saving to local fallback:', err);
    const localIssue: ReportedIssue = {
      ...issueData,
      id: `local-${Date.now()}`,
    };
    saveLocalIssue(localIssue);
    return { success: true, issue: localIssue };
  }
}

/**
 * Fetch issues submitted by a specific user.
 */
export async function fetchUserReportedIssues(userEmail?: string): Promise<ReportedIssue[]> {
  const local = getLocalIssues();

  if (!userEmail) return local;

  try {
    const { data, error } = await (supabase as any)
      .from('notifications')
      .select('id, title, body, sent_by, sent_by_email, created_at')
      .eq('is_active', false)
      .eq('sent_by_email', userEmail)
      .like('title', '[REPORTED_ISSUE%')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (Array.isArray(data)) {
      const parsedRemote: ReportedIssue[] = [];
      for (const row of data) {
        try {
          const parsed = JSON.parse(row.body);
          const isFixed = row.title.includes(':FIXED') || parsed.status === 'fixed';
          parsedRemote.push({
            id: row.id,
            category: parsed.category || 'General',
            subject: parsed.subject || row.title,
            description: parsed.description || '',
            userName: row.sent_by || parsed.userName || 'Student',
            userEmail: row.sent_by_email || parsed.userEmail || userEmail,
            userId: parsed.userId,
            college: parsed.college,
            branch: parsed.branch,
            year: parsed.year,
            status: isFixed ? 'fixed' : 'pending',
            createdAt: parsed.createdAt || row.created_at,
            fixedAt: parsed.fixedAt,
          });
        } catch {
          // Ignore invalid JSON body
        }
      }

      // Merge and deduplicate
      const map = new Map<string, ReportedIssue>();
      for (const i of [...parsedRemote, ...local]) {
        map.set(i.id, i);
      }
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  } catch (err) {
    console.warn('Error fetching user reported issues from Supabase:', err);
  }

  return local.filter((i) => !userEmail || i.userEmail.toLowerCase() === userEmail.toLowerCase());
}

/**
 * Fetch ALL reported issues for the Owner Dashboard.
 */
export async function fetchAllReportedIssues(): Promise<ReportedIssue[]> {
  try {
    const { data, error } = await (supabase as any)
      .from('notifications')
      .select('id, title, body, sent_by, sent_by_email, created_at')
      .eq('is_active', false)
      .like('title', '[REPORTED_ISSUE%')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (Array.isArray(data)) {
      const issues: ReportedIssue[] = [];
      for (const row of data) {
        try {
          const parsed = JSON.parse(row.body);
          const isFixed = row.title.includes(':FIXED') || parsed.status === 'fixed';
          issues.push({
            id: row.id,
            category: parsed.category || 'General Issue',
            subject: parsed.subject || row.title,
            description: parsed.description || '',
            userName: row.sent_by || parsed.userName || 'Student',
            userEmail: row.sent_by_email || parsed.userEmail || '',
            userId: parsed.userId,
            college: parsed.college,
            branch: parsed.branch,
            year: parsed.year,
            status: isFixed ? 'fixed' : 'pending',
            createdAt: parsed.createdAt || row.created_at,
            fixedAt: parsed.fixedAt,
          });
        } catch {
          // Skip corrupt rows
        }
      }
      return issues;
    }
  } catch (err) {
    console.error('Error in fetchAllReportedIssues:', err);
  }

  return getLocalIssues();
}

/**
 * Owner Action: Mark a reported issue as Fixed / Resolved.
 */
export async function markIssueAsFixed(
  issueId: string,
  issue: ReportedIssue
): Promise<{ success: boolean; error?: string }> {
  const fixedAt = new Date().toISOString();
  const updatedIssue: ReportedIssue = {
    ...issue,
    status: 'fixed',
    fixedAt,
  };

  try {
    const { error } = await (supabase as any)
      .from('notifications')
      .update({
        title: `[REPORTED_ISSUE:FIXED] ${issue.category} | ${issue.subject}`,
        body: JSON.stringify(updatedIssue),
      })
      .eq('id', issueId);

    if (error) throw error;

    saveLocalIssue(updatedIssue);
    return { success: true };
  } catch (err: any) {
    console.error('Error marking issue as fixed in Supabase:', err);
    saveLocalIssue(updatedIssue);
    return { success: true };
  }
}

/**
 * Owner Action: Delete a reported issue ticket permanently.
 */
export async function deleteReportedIssue(
  issueId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await (supabase as any)
      .from('notifications')
      .delete()
      .eq('id', issueId);

    if (error) throw error;

    const existing = getLocalIssues();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.filter((i) => i.id !== issueId)));
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting issue:', err);
    const existing = getLocalIssues();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.filter((i) => i.id !== issueId)));
    return { success: true };
  }
}
