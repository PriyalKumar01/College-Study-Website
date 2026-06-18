-- Drop existing constraint check on premium_purchases
ALTER TABLE public.premium_purchases DROP CONSTRAINT IF EXISTS premium_purchases_plan_check;

-- Add updated constraint check including 'roadmaps' plan
ALTER TABLE public.premium_purchases ADD CONSTRAINT premium_purchases_plan_check 
  CHECK (plan IN ('companies', 'hr_emails', 'resume', 'roadmaps'));

-- Update record_free_purchase function to handle 'roadmaps' plan price (₹549 base, ₹2196 original)
CREATE OR REPLACE FUNCTION public.record_free_purchase(
  p_plan text,
  p_coupon text,
  p_discount integer
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_email text := auth.email();
  v_original integer;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Not authenticated');
  END IF;

  -- Check not already purchased
  IF EXISTS (
    SELECT 1 FROM public.premium_purchases
    WHERE user_id = v_user_id AND plan = p_plan AND payment_status IN ('completed', 'free')
  ) THEN
    RETURN json_build_object('success', true, 'message', 'Already purchased');
  END IF;

  v_original := CASE 
    WHEN p_plan = 'companies' THEN 14900 
    WHEN p_plan = 'resume' THEN 16700
    WHEN p_plan = 'roadmaps' THEN 54900
    ELSE 99900 
  END;

  INSERT INTO public.premium_purchases (
    user_id, user_email, plan, amount_paid, original_amount,
    coupon_used, discount_percent, payment_status
  ) VALUES (
    v_user_id, v_email, p_plan, 0, v_original,
    p_coupon, p_discount, 'free'
  );

  RETURN json_build_object('success', true, 'message', 'Purchase recorded');
END;
$$;
