
import { nanoid } from 'nanoid';
import { WaitlistUser } from '../types';

// In a real app, this would use Supabase or another backend
// For this demo, we'll use localStorage

const WAITLIST_KEY = 'waitlist_users';
const WAITLIST_COUNT_KEY = 'waitlist_count';

// Initialize waitlist count
const getWaitlistCount = (): number => {
  const count = localStorage.getItem(WAITLIST_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
};

const setWaitlistCount = (count: number): void => {
  localStorage.setItem(WAITLIST_COUNT_KEY, count.toString());
};

// Get all users
export const getWaitlistUsers = (): WaitlistUser[] => {
  const users = localStorage.getItem(WAITLIST_KEY);
  return users ? JSON.parse(users) : [];
};

// Save all users
const saveWaitlistUsers = (users: WaitlistUser[]): void => {
  localStorage.setItem(WAITLIST_KEY, JSON.stringify(users));
};

// Get user by email
export const getUserByEmail = (email: string): WaitlistUser | undefined => {
  const users = getWaitlistUsers();
  return users.find(user => user.email === email);
};

// Get user by referral code
export const getUserByReferralCode = (code: string): WaitlistUser | undefined => {
  const users = getWaitlistUsers();
  return users.find(user => user.referralCode === code);
};

// Add user to waitlist
export const addToWaitlist = (email: string, referredBy?: string): WaitlistUser => {
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return existingUser;
  }

  const users = getWaitlistUsers();
  const count = getWaitlistCount();
  const newPosition = count + 1;
  
  // Create new user
  const newUser: WaitlistUser = {
    id: nanoid(),
    email,
    referralCode: nanoid(8),
    referredBy,
    position: newPosition,
    referralCount: 0,
    createdAt: new Date().toISOString(),
  };
  
  // If referred by someone, increment their referral count
  if (referredBy) {
    const referrer = getUserByReferralCode(referredBy);
    if (referrer) {
      const updatedUsers = users.map(user => 
        user.id === referrer.id 
          ? { ...user, referralCount: user.referralCount + 1 } 
          : user
      );
      saveWaitlistUsers([...updatedUsers, newUser]);
    } else {
      saveWaitlistUsers([...users, newUser]);
    }
  } else {
    saveWaitlistUsers([...users, newUser]);
  }
  
  // Update waitlist count
  setWaitlistCount(newPosition);
  
  return newUser;
};

// Get user position
export const getUserPosition = (email: string): number | null => {
  const user = getUserByEmail(email);
  return user ? user.position : null;
};

// Calculate new position based on referrals
export const calculateAdjustedPosition = (user: WaitlistUser): number => {
  // Each referral moves you up by 1 position, but never below 1
  const adjustment = user.referralCount;
  const newPosition = Math.max(1, user.position - adjustment);
  return newPosition;
};