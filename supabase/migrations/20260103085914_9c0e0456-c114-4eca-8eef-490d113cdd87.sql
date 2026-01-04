
-- Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'donor', 'blood_bank', 'user');
CREATE TYPE public.blood_availability AS ENUM ('available', 'low', 'not_available');
CREATE TYPE public.request_status AS ENUM ('pending', 'accepted', 'fulfilled', 'cancelled');
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  area TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Blood banks table
CREATE TABLE public.blood_banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  area TEXT,
  pin_code TEXT,
  phone TEXT,
  email TEXT,
  license_url TEXT,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blood stock table
CREATE TABLE public.blood_stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_bank_id UUID REFERENCES public.blood_banks(id) ON DELETE CASCADE NOT NULL,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_available INTEGER NOT NULL DEFAULT 0,
  availability blood_availability NOT NULL DEFAULT 'not_available',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (blood_bank_id, blood_group)
);

-- Donors table
CREATE TABLE public.donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  city TEXT NOT NULL,
  area TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  share_contact BOOLEAN NOT NULL DEFAULT false,
  last_donation_date DATE,
  total_donations INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blood requests table
CREATE TABLE public.blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_needed INTEGER NOT NULL DEFAULT 1,
  city TEXT NOT NULL,
  area TEXT,
  hospital_name TEXT,
  patient_name TEXT,
  contact_phone TEXT NOT NULL,
  urgency_level TEXT NOT NULL DEFAULT 'normal' CHECK (urgency_level IN ('normal', 'urgent', 'critical')),
  status request_status NOT NULL DEFAULT 'pending',
  fulfilled_by_donor_id UUID REFERENCES public.donors(id),
  fulfilled_by_blood_bank_id UUID REFERENCES public.blood_banks(id),
  fulfilled_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Donation history table
CREATE TABLE public.donation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.donors(id) ON DELETE CASCADE NOT NULL,
  blood_request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
  blood_bank_id UUID REFERENCES public.blood_banks(id) ON DELETE SET NULL,
  donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  units_donated INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Donor request responses table
CREATE TABLE public.donor_request_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.donors(id) ON DELETE CASCADE NOT NULL,
  blood_request_id UUID REFERENCES public.blood_requests(id) ON DELETE CASCADE NOT NULL,
  response TEXT NOT NULL CHECK (response IN ('accepted', 'declined')),
  responded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (donor_id, blood_request_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_request_responses ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Blood banks policies
CREATE POLICY "Anyone can view active verified blood banks" ON public.blood_banks FOR SELECT USING (is_active = true AND verification_status = 'approved');
CREATE POLICY "Blood bank owners can view own record" ON public.blood_banks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Blood bank owners can update own record" ON public.blood_banks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Blood bank owners can insert own record" ON public.blood_banks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all blood banks" ON public.blood_banks FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage blood banks" ON public.blood_banks FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Blood stock policies
CREATE POLICY "Anyone can view stock of verified blood banks" ON public.blood_stock FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.blood_banks WHERE id = blood_bank_id AND is_active = true AND verification_status = 'approved')
);
CREATE POLICY "Blood bank owners can manage own stock" ON public.blood_stock FOR ALL USING (
  EXISTS (SELECT 1 FROM public.blood_banks WHERE id = blood_bank_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can manage all stock" ON public.blood_stock FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Donors policies
CREATE POLICY "Available donors are visible to authenticated users" ON public.donors FOR SELECT TO authenticated USING (is_available = true AND is_active = true);
CREATE POLICY "Donors can view own record" ON public.donors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Donors can update own record" ON public.donors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Donors can insert own record" ON public.donors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all donors" ON public.donors FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage donors" ON public.donors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Blood requests policies
CREATE POLICY "Authenticated users can create requests" ON public.blood_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Requesters can view own requests" ON public.blood_requests FOR SELECT USING (auth.uid() = requester_id);
CREATE POLICY "Donors can view matching requests" ON public.blood_requests FOR SELECT TO authenticated USING (
  status = 'pending' AND EXISTS (
    SELECT 1 FROM public.donors WHERE user_id = auth.uid() AND blood_group = blood_requests.blood_group AND city = blood_requests.city
  )
);
CREATE POLICY "Blood banks can view requests in their city" ON public.blood_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.blood_banks WHERE user_id = auth.uid() AND city = blood_requests.city)
);
CREATE POLICY "Blood banks can update requests" ON public.blood_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.blood_banks WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can manage all requests" ON public.blood_requests FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Donation history policies
CREATE POLICY "Donors can view own history" ON public.donation_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.donors WHERE id = donor_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can view all history" ON public.donation_history FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Blood banks can insert donation records" ON public.donation_history FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.blood_banks WHERE user_id = auth.uid())
);

-- Donor request responses policies
CREATE POLICY "Donors can manage own responses" ON public.donor_request_responses FOR ALL USING (
  EXISTS (SELECT 1 FROM public.donors WHERE id = donor_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can view all responses" ON public.donor_request_responses FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data ->> 'role')::app_role, 'user'));
  
  RETURN NEW;
END;
$$;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blood_banks_updated_at BEFORE UPDATE ON public.blood_banks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blood_stock_updated_at BEFORE UPDATE ON public.blood_stock FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donors_updated_at BEFORE UPDATE ON public.donors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blood_requests_updated_at BEFORE UPDATE ON public.blood_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.blood_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blood_requests;
