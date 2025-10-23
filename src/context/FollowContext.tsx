import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FollowData {
  user: string;
  following: string[];
  followers: string[];
}

interface FollowContextType {
  follows: FollowData[];
  followUser: (currentUser: string, targetUser: string) => void;
  unfollowUser: (currentUser: string, targetUser: string) => void;
  getFollowers: (userEmail: string) => string[];
  getFollowing: (userEmail: string) => string[];
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const FollowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [follows, setFollows] = useState<FollowData[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('@follows');
      if (stored) setFollows(JSON.parse(stored));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@follows', JSON.stringify(follows));
  }, [follows]);

  const followUser = (currentUser: string, targetUser: string) => {
    if (currentUser === targetUser) return;

    setFollows(prev => {
      const existingCurrent = prev.find(f => f.user === currentUser) || { user: currentUser, following: [], followers: [] };
      const existingTarget = prev.find(f => f.user === targetUser) || { user: targetUser, following: [], followers: [] };

      if (!existingCurrent.following.includes(targetUser)) existingCurrent.following.push(targetUser);
      if (!existingTarget.followers.includes(currentUser)) existingTarget.followers.push(currentUser);

      const updated = prev.filter(f => f.user !== currentUser && f.user !== targetUser);
      return [...updated, existingCurrent, existingTarget];
    });
  };

  const unfollowUser = (currentUser: string, targetUser: string) => {
    setFollows(prev => {
      const existingCurrent = prev.find(f => f.user === currentUser);
      const existingTarget = prev.find(f => f.user === targetUser);
      if (!existingCurrent || !existingTarget) return prev;

      existingCurrent.following = existingCurrent.following.filter(u => u !== targetUser);
      existingTarget.followers = existingTarget.followers.filter(u => u !== currentUser);

      const updated = prev.filter(f => f.user !== currentUser && f.user !== targetUser);
      return [...updated, existingCurrent, existingTarget];
    });
  };

  const getFollowers = (userEmail: string) =>
    follows.find(f => f.user === userEmail)?.followers || [];

  const getFollowing = (userEmail: string) =>
    follows.find(f => f.user === userEmail)?.following || [];

  return (
    <FollowContext.Provider value={{ follows, followUser, unfollowUser, getFollowers, getFollowing }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
    const ctx = useContext(FollowContext);
    if (!ctx) throw new Error('useFollow debe usarse dentro de FollowProvider');
    return ctx;
};