// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://egqxohxaurbqlwcocoqt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncXhvaHhhdXJicWx3Y29jb3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDI3NDAsImV4cCI6MjA1OTQxODc0MH0.HIXjeb6HBmDs2_Wz0frJtAtXTLnuXYZccLbzex0410Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);