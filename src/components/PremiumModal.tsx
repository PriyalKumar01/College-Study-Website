import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  X, Crown, CheckCircle2, Tag, Loader2, Sparkles
} from 'lucide-react';
import { PremiumPlan } from './LockedSection';

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  plan: PremiumPlan;
  onSuccess: () => void;
}

// ─── Razorpay Payment Button Component ────────────────────────────────────────
const RazorpayButton = ({ buttonId }: { buttonId: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    
    const form = document.createElement('form');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', buttonId);
    script.async = true;
    form.appendChild(script);
    containerRef.current.appendChild(form);
  }, [buttonId]);

  return <div ref={containerRef} className="w-full flex justify-center py-2 animate-pulse-slow" />;
};

export function PremiumModal({ open, onClose, plan, onSuccess }: PremiumModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  useEffect(() => {
    if (open) {
      setCoupon('');
      setCouponApplied(false);
      setDiscount(0);
      setProcessing(false);
      setValidatingCoupon(false);
      setShowCoupon(false);
    }
  }, [open, plan]);

  const originalPrice = plan === 'companies' ? 149 : plan === 'resume' ? 167 : 999;
  const discountedPrice = Math.round(originalPrice * (1 - discount / 100));
  const isFree = discountedPrice === 0;

  const planConfig = {
    companies: {
      title: '90+ Company Career Pages',
      subtitle: 'Direct links to official career portals',
      icon: '🏢',
      color: 'from-violet-500 to-indigo-600',
      features: [
        '90+ MNCs, PSUs, Unicorns & Indian MNCs',
        'Direct career page links',
        'Filter by type & branch',
        'Owner-curated & regularly updated',
        'One-time access forever'
      ]
    },
    hr_emails: {
      title: '1800+ HR Email Directory',
      subtitle: 'Direct HR contacts for genuine applications',
      icon: '📧',
      color: 'from-emerald-500 to-teal-600',
      features: [
        '1800+ verified HR email addresses',
        'Organized by company & type',
        'Search & filter by company',
        'Use responsibly for genuine applications',
        'One-time access forever'
      ]
    },
    resume: {
      title: 'ATS Friendly Resume Guide',
      subtitle: 'Premium resume template & ATS optimization checklists',
      icon: '📄',
      color: 'from-orange-500 to-amber-600',
      features: [
        'Overleaf standard resume template links',
        'ATS optimization checklists',
        'Formatting and bullet-point writing guides',
        'Useful tools (like CGPA Calculator integration)',
        'One-time access forever'
      ]
    },
  }[plan];

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return;

    // Frontend-override for coupon
    if (coupon.trim().toUpperCase() === 'HBTU@143' && plan === 'resume') {
      setDiscount(100);
      setCouponApplied(true);
      toast({
        title: `🎉 Coupon Applied! 100% off`,
        description: 'HBTU Special Discount Applied!'
      });
      return;
    }

    setValidatingCoupon(true);
    try {
      const { data, error } = await (supabase as any).rpc('validate_coupon', {
        p_code: coupon.trim().toUpperCase(),
        p_plan: plan
      });
      if (error) throw error;
      if (data?.valid) {
        setDiscount(data.discount_percent);
        setCouponApplied(true);
        toast({
          title: `🎉 Coupon Applied! ${data.discount_percent}% off`,
          description: data.message
        });
      } else {
        toast({
          title: '❌ Invalid Coupon',
          description: data?.message || 'Coupon not valid',
          variant: 'destructive'
        });
      }
    } catch {
      toast({
        title: 'Error validating coupon',
        variant: 'destructive'
      });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleFreeEnroll = async () => {
    if (!user) {
      toast({
        title: 'Please login first',
        variant: 'destructive'
      });
      return;
    }
    setProcessing(true);
    try {
      const { data, error } = await (supabase as any).rpc('record_free_purchase', {
        p_plan: plan,
        p_coupon: coupon.trim().toUpperCase(),
        p_discount: discount
      });
      if (error) throw error;
      if (data?.success) {
        toast({
          title: '✅ Access Granted!',
          description: 'You now have full access.'
        });
        onSuccess();
        onClose();
      }
    } catch {
      toast({
        title: 'Error processing',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="pay-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="pay-modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`px-6 pt-8 pb-6 bg-gradient-to-br ${planConfig.color} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-4 text-8xl">{planConfig.icon}</div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold mb-3">
                <Crown className="w-3 h-3" /> Premium Access
              </div>
              <h2 className="text-2xl font-black text-white mb-1">
                {planConfig.icon} {planConfig.title}
              </h2>
              <p className="text-white/70 text-sm">{planConfig.subtitle}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Features */}
            <div className="space-y-2.5 mb-6">
              {planConfig.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Price display */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">One-time Price</div>
                  <div className="flex items-center gap-3">
                    {couponApplied && discount > 0 && (
                      <span className="text-xl font-bold text-gray-400 line-through">₹{originalPrice}</span>
                    )}
                    <span className={`text-3xl font-black ${isFree ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
                      {isFree ? 'FREE' : `₹${discountedPrice}`}
                    </span>
                  </div>
                  {couponApplied && discount > 0 && (
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <Tag className="w-3 h-3" /> {discount}% off applied!
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-medium">Lifetime Access</span>
              </div>
            </div>

            {/* Coupon input */}
            <div className="mb-5">
              <button
                onClick={() => setShowCoupon(!showCoupon)}
                className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2 hover:underline"
              >
                <Tag className="w-4 h-4" />
                Have a coupon code? {showCoupon ? '▲' : '▼'}
              </button>
              {showCoupon && (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={e => {
                      setCoupon(e.target.value.toUpperCase());
                      setCouponApplied(false);
                      setDiscount(0);
                    }}
                    placeholder="Enter coupon code"
                    disabled={couponApplied}
                    className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm px-3 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono uppercase"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={validatingCoupon || couponApplied || !coupon.trim()}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                  >
                    {validatingCoupon ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : couponApplied ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    ) : (
                      'Apply'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            {isFree ? (
              <button
                onClick={handleFreeEnroll}
                disabled={processing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {processing ? 'Processing...' : 'Claim Free Access!'}
              </button>
            ) : (
              <div className="w-full py-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-2 flex justify-center shadow-inner">
                <RazorpayButton buttonId={plan === 'companies' ? 'pl_T1GNIPg0SNJ53U' : plan === 'resume' ? 'pl_T1IEg4M4GK54AI' : 'pl_T1GUXU3KOawLmV'} />
              </div>
            )}
            <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-3.5">
              🔒 Secure payment via Razorpay · UPI, Cards, NetBanking accepted
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
