export interface SubscriptionPlan {
  _id: string;
  title: string;
  badge?: string;
  price?: {
    amount?: number;
    min?: number;
    max?: number;
  };
  billingModel: string;
  isFree: boolean;
  features: Array<string | { name: string; included?: boolean }>;
}
