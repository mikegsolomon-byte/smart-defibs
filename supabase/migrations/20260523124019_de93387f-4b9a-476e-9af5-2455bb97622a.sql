ALTER TABLE public.quote_requests
  ADD CONSTRAINT quote_requests_name_max_len CHECK (char_length(name) > 0 AND char_length(name) <= 200),
  ADD CONSTRAINT quote_requests_org_max_len CHECK (char_length(organisation) > 0 AND char_length(organisation) <= 200),
  ADD CONSTRAINT quote_requests_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT quote_requests_email_max_len CHECK (char_length(email) <= 320),
  ADD CONSTRAINT quote_requests_phone_max_len CHECK (char_length(phone) > 0 AND char_length(phone) <= 30),
  ADD CONSTRAINT quote_requests_message_max_len CHECK (message IS NULL OR char_length(message) <= 2000),
  ADD CONSTRAINT quote_requests_sector_enum CHECK (sector IN ('schools','nursing','workplace','community','other'));