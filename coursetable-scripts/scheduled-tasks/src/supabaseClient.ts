import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
const { PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY } = process.env;

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY);

export default supabase;
