-- Add checked_in column to purchases table
ALTER TABLE public.purchases 
ADD COLUMN IF NOT EXISTS checked_in BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster check-in queries
CREATE INDEX IF NOT EXISTS idx_purchases_checked_in ON public.purchases(checked_in);

-- Create index for QR code lookups
CREATE INDEX IF NOT EXISTS idx_purchases_id ON public.purchases(id);