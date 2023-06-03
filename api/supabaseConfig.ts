import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  'https://qgzsvrcuozavxvfuitli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnenN2cmN1b3phdnh2ZnVpdGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU4Mjk5OTMsImV4cCI6MjAwMTQwNTk5M30.HfL8B7ZIz2WXYGMzh-9jK1NjNg3pPiFqIC7Yy5RfQ80',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
