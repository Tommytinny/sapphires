import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface RaidSession {
  id: number;
  project_name: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  likes: number;
  retweets: number;
  comments: number;
  engagements: number;
  started_at: string;
  estimated_end: string;
  twitter_link?: string;
  duration?: string;
  package?: string;
  chain_id: string;
  token_address: string;
  created_at?: string;
}

interface RaidContextType {
  raids: RaidSession[];
  addRaid: (raid: Omit<RaidSession, 'id' | 'created_at'>) => Promise<void>;
  updateRaid: (id: number, updates: Partial<RaidSession>) => Promise<void>;
  deleteRaid: (id: number) => Promise<void>;
  getRaidById: (id: number) => RaidSession | undefined;
  loading: boolean;
  error: string | null;
}

const RaidContext = createContext<RaidContextType | undefined>(undefined);

// Initial demo raids - will be used as fallback if Supabase is not connected
const INITIAL_RAIDS: RaidSession[] = [
  {
    id: 1,
    project_name: 'Demo Project',
    status: 'active',
    progress: 0,
    likes: 0,
    retweets: 0,
    comments: 0,
    engagements: 0,
    started_at: new Date().toISOString(),
    estimated_end: new Date(Date.now() + 3600000).toISOString(),
    twitter_link: '',
    duration: '1 hour',
    package: '12hrs',
    chain_id: '',
    token_address: '',
  },
];

export const RaidProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [raids, setRaids] = useState<RaidSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch raids from Supabase on mount
  useEffect(() => {
    const fetchRaids = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('raids')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.warn('Failed to fetch from Supabase, using fallback data:', supabaseError);
          setRaids(INITIAL_RAIDS);
          setError('Using demo data. Connect Supabase to use live data.');
        } else if (data) {
          setRaids(data as RaidSession[]);
        }
      } catch (err) {
        console.warn('Error fetching raids:', err);
        setRaids(INITIAL_RAIDS);
        setError('Using demo data. Failed to connect to Supabase.');
      } finally {
        setLoading(false);
      }
    };

    fetchRaids();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('raids')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'raids' },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchRaids();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const addRaid = async (raid: Omit<RaidSession, 'id' | 'created_at'>) => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('raids')
        .insert([raid])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        setRaids([...raids, ...(data as RaidSession[])]);
      }
    } catch (err) {
      console.error('Error adding raid:', err);
      setError('Failed to add raid');
      throw err;
    }
  };

  const updateRaid = async (id: number, updates: Partial<RaidSession>) => {
    try {
      const { error: supabaseError } = await supabase
        .from('raids')
        .update(updates)
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      setRaids(raids.map(raid => (raid.id === id ? { ...raid, ...updates } : raid)));
    } catch (err) {
      console.error('Error updating raid:', err);
      setError('Failed to update raid');
      throw err;
    }
  };

  const deleteRaid = async (id: number) => {
    try {
      const { error: supabaseError } = await supabase
        .from('raids')
        .delete()
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      setRaids(raids.filter(raid => raid.id !== id));
    } catch (err) {
      console.error('Error deleting raid:', err);
      setError('Failed to delete raid');
      throw err;
    }
  };

  const getRaidById = (id: number) => {
    return raids.find(raid => raid.id === id);
  };

  return (
    <RaidContext.Provider value={{ raids, addRaid, updateRaid, deleteRaid, getRaidById, loading, error }}>
      {children}
    </RaidContext.Provider>
  );
};

export const useRaids = () => {
  const context = useContext(RaidContext);
  if (!context) {
    throw new Error('useRaids must be used within RaidProvider');
  }
  return context;
};
