import { z } from "zod";

const subscriptionFeatureSchema = z.object({
  name: z.string(),
  included: z.boolean().default(true),
});

export const subscriptionPlanSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  badge: z.string().optional(),
  price: z
    .union([
      z.number(),
      z.object({
        amount: z.number().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        currency: z.string().optional(),
      }),
    ])
    .optional(),
  priceLabel: z.string().optional(),
  billingModel: z.string().optional(),
  description: z.string().optional(),
  features: z
    .array(z.union([z.string(), subscriptionFeatureSchema]))
    .default([]),
  discount: z
    .array(
      z.object({
        tier: z.string(),
        percentage: z.number(),
      }),
    )
    .optional(),
  isPopular: z.boolean().optional(),
  apiAccess: z.boolean().optional(),
  customPricing: z.boolean().optional(),
  isFree: z.boolean().optional(),
  ctaText: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;
export type SubscriptionFeature = z.infer<typeof subscriptionFeatureSchema>;

export const createSubscriptionSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.string().min(2, "Type is required"),
  price: z.number().min(0),
  priceLabel: z.string().min(1, "Price label is required"),
  description: z.string().min(5, "Description is required"),
  features: z
    .array(
      z.object({
        name: z.string(),
        included: z.boolean(),
      }),
    )
    .min(1, "At least one feature is required"),
  isPopular: z.boolean(),
  apiAccess: z.boolean(),
  customPricing: z.boolean(),
  ctaText: z.string().min(1, "CTA text is required"),
});

export type CreateSubscriptionValues = z.infer<typeof createSubscriptionSchema>;

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: SubscriptionPlan[];
}

export interface SingleSubscriptionResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: SubscriptionPlan;
}

export interface NormalizedSubscriptionPlan {
  _id: string;
  name: string;
  type: string;
  price: number;
  priceLabel: string;
  description: string;
  features: SubscriptionFeature[];
  isPopular: boolean;
  apiAccess: boolean;
  customPricing: boolean;
  ctaText: string;
  billingModel?: string;
  discount: Array<{
    tier: string;
    percentage: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export function normalizeSubscriptionPlan(
  plan: SubscriptionPlan,
): NormalizedSubscriptionPlan {
  const priceValue =
    typeof plan.price === "number"
      ? plan.price
      : (plan.price?.amount ?? plan.price?.min ?? 0);

  const derivedPriceLabel =
    plan.priceLabel ||
    (typeof plan.price === "number"
      ? `$${plan.price}`
      : plan.price?.amount !== undefined
        ? `$${plan.price.amount}`
        : plan.price?.min !== undefined && plan.price?.max !== undefined
          ? `$${plan.price.min} - $${plan.price.max}`
          : plan.isFree
            ? "Free"
            : "Custom");

  const normalizedFeatures = (plan.features || []).map((feature) =>
    typeof feature === "string"
      ? { name: feature, included: true }
      : { name: feature.name, included: feature.included ?? true },
  );

  const normalizedName = plan.name || plan.title || "Untitled Plan";
  const normalizedType = plan.type || plan.badge || "PLAN";
  const normalizedDescription =
    plan.description ||
    (plan.billingModel === "free"
      ? "Basic free plan for new users."
      : plan.billingModel === "one-time"
        ? "Flexible pay-as-you-go option."
        : "Subscription plan with scalable features.");

  return {
    _id: plan._id,
    name: normalizedName,
    type: normalizedType,
    price: priceValue,
    priceLabel: derivedPriceLabel,
    description: normalizedDescription,
    features: normalizedFeatures,
    isPopular: plan.isPopular ?? false,
    apiAccess: plan.apiAccess ?? false,
    customPricing: plan.customPricing ?? false,
    ctaText:
      plan.ctaText ||
      (plan.isFree
        ? "Get Started"
        : plan.billingModel === "one-time"
          ? "Buy Now"
          : "Choose Plan"),
    billingModel: plan.billingModel,
    discount: plan.discount || [],
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
}
