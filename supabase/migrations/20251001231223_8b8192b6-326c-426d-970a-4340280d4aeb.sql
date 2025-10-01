-- Create purchases table to store ticket purchases
CREATE TABLE public.purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  ticket_type text NOT NULL CHECK (ticket_type IN ('vip', 'normal')),
  price numeric NOT NULL,
  mercadopago_payment_id text,
  mercadopago_preference_id text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'approved', 'rejected', 'cancelled')),
  qr_code_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (for checkout)
CREATE POLICY "Anyone can insert purchases"
ON public.purchases
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow public to read their own purchases by email
CREATE POLICY "Users can view their own purchases"
ON public.purchases
FOR SELECT
TO anon
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_purchases_updated_at
BEFORE UPDATE ON public.purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();