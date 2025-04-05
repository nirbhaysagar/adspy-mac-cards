
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';
import { Database } from '@/integrations/supabase/types';

export interface Ad {
  id: string;
  platform: string | null;
  ad_text: string | null;
  account_name: string | null;
  email: string | null;
  location: string | null;
  keywords: string[] | null;
  scraped_at: string | null;
}

export interface SavedAd {
  id: string;
  user_id: string;
  ad_id: string;
  saved_at: string;
  ads: Ad;
}

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Failed to sign in. Please try again.",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };
  
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({
        title: "Sign up successful",
        description: "Please check your email for verification.",
      });
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Failed to sign up. Please try again.",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };
  
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  return {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
};

export const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ads')
        .select('*');
        
      if (error) throw error;
      setAds(data as Ad[]);
    } catch (error: any) {
      toast({
        title: "Error fetching ads",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAds();
  }, []);
  
  return { ads, loading, fetchAds };
};

export const useSavedAds = (userId: string | undefined) => {
  const [savedAds, setSavedAds] = useState<SavedAd[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchSavedAds = async () => {
    if (!userId) {
      setSavedAds([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_ads')
        .select('*, ads(*)')
        .eq('user_id', userId);
        
      if (error) throw error;
      setSavedAds(data as SavedAd[]);
    } catch (error: any) {
      toast({
        title: "Error fetching saved ads",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const saveAd = async (adId: string) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save ads.",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('saved_ads')
        .insert([{ user_id: userId, ad_id: adId }]);
        
      if (error) throw error;
      
      toast({
        title: "Ad saved",
        description: "The ad has been saved to your account."
      });
      
      fetchSavedAds();
      return true;
    } catch (error: any) {
      toast({
        title: "Error saving ad",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };
  
  const unsaveAd = async (savedAdId: string) => {
    try {
      const { error } = await supabase
        .from('saved_ads')
        .delete()
        .eq('id', savedAdId);
        
      if (error) throw error;
      
      toast({
        title: "Ad removed",
        description: "The ad has been removed from your saved ads."
      });
      
      fetchSavedAds();
    } catch (error: any) {
      toast({
        title: "Error removing ad",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    fetchSavedAds();
  }, [userId]);
  
  return { savedAds, loading, saveAd, unsaveAd };
};
