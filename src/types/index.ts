
export interface WaitlistUser {
  id: string;
  email: string;
  referralCode: string;
  referredBy?: string;
  position: number;
  referralCount: number;
  createdAt: string;
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}