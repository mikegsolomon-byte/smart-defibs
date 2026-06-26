ALTER TABLE public.quote_requests
DROP CONSTRAINT IF EXISTS quote_requests_sector_enum;

ALTER TABLE public.quote_requests
ADD CONSTRAINT quote_requests_sector_enum
CHECK (sector IN ('schools','nursing','workplace','gyms','community','other'));