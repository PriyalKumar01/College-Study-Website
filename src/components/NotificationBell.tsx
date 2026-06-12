import { useState, useEffect, useRef } from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  body: string;
  sent_by: string;
  sent_by_email: string | null;
  created_at: string;
  is_active: boolean;
}

export default function NotificationBell() {
  const { user, isOwner } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchNotifications = async () => {
    const { data } = await (supabase as any)
      .from('notifications')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setNotifications(data as Notification[]);
  };

  // Fetch notifications on mount
  useEffect(() => { fetchNotifications(); }, []);

  // Fetch read IDs for logged-in users
  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await (supabase as any)
        .from('user_notification_reads')
        .select('notification_id')
        .eq('user_id', user.id);
      if (data) setReadIds(new Set((data as any[]).map(r => r.notification_id)));
    };
    fetch();
  }, [user]);

  const unreadCount = notifications.filter(n => !readIds.has(n.id)).length;

  const markAllRead = async () => {
    if (!user) return;
    const unread = notifications.filter(n => !readIds.has(n.id));
    if (unread.length === 0) return;
    const rows = unread.map(n => ({ user_id: user.id, notification_id: n.id }));
    await (supabase as any).from('user_notification_reads').upsert(rows, { onConflict: 'user_id,notification_id' });
    setReadIds(prev => {
      const next = new Set(prev);
      unread.forEach(n => next.add(n.id));
      return next;
    });
  };

  const handleOpen = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) markAllRead();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await (supabase as any).from('notifications').delete().eq('id', id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div ref={ref} className="relative">
      {/* Bell trigger — plain icon, no filled background */}
      <button
        onClick={handleOpen}
        aria-label="Notifications"
        className="relative flex items-center justify-center w-9 h-9 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
      >
        <Bell className="h-[19px] w-[19px]" strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span
            className="absolute top-[4px] right-[4px] flex h-[16px] w-[16px] items-center justify-center rounded-full text-[9px] font-bold text-white leading-none"
            style={{ background: '#EF4444', boxShadow: '0 0 0 2px hsl(var(--background))' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-[300] overflow-hidden"
          style={{
            width: 'min(380px, calc(100vw - 24px))',
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 16,
            boxShadow: '0 8px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 16px', borderBottom: '1px solid hsl(var(--border))',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={15} style={{ color: 'hsl(var(--foreground))', opacity: 0.7 }} strokeWidth={1.8} />
              <span style={{ fontSize: 14, fontWeight: 700, color: 'hsl(var(--foreground))' }}>
                Notifications
              </span>
              {unreadCount > 0 && (
                <span style={{
                  padding: '1px 7px', borderRadius: 999, fontSize: 10.5, fontWeight: 700,
                  background: '#EF4444', color: '#fff',
                }}>
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          {/* List */}
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '40px 16px', textAlign: 'center' }}>
                <Bell size={32} style={{ color: 'hsl(var(--muted-foreground))', opacity: 0.3, margin: '0 auto 10px' }} />
                <p style={{ fontSize: 13.5, color: 'hsl(var(--muted-foreground))' }}>No notifications yet</p>
              </div>
            ) : (
              notifications.map(n => {
                const isUnread = !readIds.has(n.id);
                return (
                  <div
                    key={n.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid hsl(var(--border))',
                      background: isUnread ? 'hsl(var(--primary)/0.04)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      {/* Sender initial avatar */}
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 65%))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, fontSize: 12, fontWeight: 700, color: '#fff',
                        marginTop: 1,
                      }}>
                        {n.sent_by.charAt(0).toUpperCase()}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--foreground))', lineHeight: 1.3 }}>
                            {n.title}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                            {isUnread && (
                              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'hsl(var(--primary))', display: 'inline-block' }} />
                            )}
                            {/* Owner delete button */}
                            {isOwner && (
                              <button
                                onClick={e => handleDelete(n.id, e)}
                                title="Delete notification"
                                style={{
                                  background: 'none', border: 'none', cursor: 'pointer',
                                  padding: '2px 4px', borderRadius: 5, color: '#EF4444',
                                  opacity: 0.7, transition: 'opacity 0.15s',
                                  display: 'flex', alignItems: 'center',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', margin: '0 0 4px', lineHeight: 1.5 }}>
                          {n.body}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                          <span style={{ fontWeight: 600, color: 'hsl(var(--primary))' }}>{n.sent_by}</span>
                          <span style={{ color: 'hsl(var(--muted-foreground))' }}>·</span>
                          <span style={{ color: 'hsl(var(--muted-foreground))' }}>{timeAgo(n.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {!user && notifications.length > 0 && (
            <div style={{
              padding: '10px 16px', borderTop: '1px solid hsl(var(--border))',
              background: 'hsl(var(--muted)/0.3)', textAlign: 'center',
            }}>
              <p style={{ fontSize: 11.5, color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                Sign in to track read notifications
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
