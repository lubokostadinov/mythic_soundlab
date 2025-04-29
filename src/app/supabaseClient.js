import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grxandvmphfzepoqtbtp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeGFuZHZtcGhmemVwb3F0YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2MTgsImV4cCI6MjA2MTQzODYxOH0.xwm3whmK63tNvqyIQSLPHrgAqHU9r9LGcIeqquKloww';

export const supabase = createClient(supabaseUrl, supabaseKey);
