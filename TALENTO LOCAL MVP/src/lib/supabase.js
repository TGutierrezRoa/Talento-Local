
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cqxixdpadkpcpvqreiei.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxeGl4ZHBhZGtwY3B2cXJlaWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODA0MTksImV4cCI6MjA1OTY1NjQxOX0.wDUsUKIIZCRXmKJlJ4FAaZSGjPpe4wdDK27qfnIN5v0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
