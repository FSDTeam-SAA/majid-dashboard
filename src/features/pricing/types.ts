import { z } from "zod";

export const subscriptionPlanSchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  price: z.number(),
  priceLabel: z.string(),
  description: z.string(),
  features: z.array(
    z.object({
      name: z.string(),
      included: z.boolean().default(true),
    }),
  ),
  isPopular: z.boolean().default(false),
  apiAccess: z.boolean().default(false),
  customPricing: z.boolean().default(false),
  ctaText: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;

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
