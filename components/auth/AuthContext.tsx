'use client';

import { createContext, useEffect, useState } from 'react';
import { getUser } from './authentication';
import { usePathname, useRouter } from 'next/navigation';
import { UserInfo } from '@/lib/auth/types';
import toast from 'react-hot-toast';

export const AuthContext = createContext<{ user: UserInfo | null | undefined }>({
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null | undefined>(null);

  const router = useRouter();
  const pathname = usePathname();

  async function updateUser() {
    try {
      const user = await getUser();
      if(user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    } catch (error) {
      toast.error('Failed to fetch user data');
    } finally {
    }
  }

  useEffect(() => {
    updateUser();
  }, [pathname, router])
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};