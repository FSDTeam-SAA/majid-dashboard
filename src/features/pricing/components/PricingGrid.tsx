"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { useSubscriptions } from "../hooks/usePricing";
import { normalizeSubscriptionPlan, SubscriptionPlan } from "../types";

interface ProcessedPlan {
  id: string;
  title: string;
  badge?: string;
  price: string;
  description: string;
  ctaText: string;
  color: string;
  tags: string[];
  features: Array<{
    text: string;
    included: boolean;
    icon: React.ElementType;
  }>;
}

export function PricingGrid({ onEdit }: { onEdit: (id: string) => void }) {
  const { data: subscriptionsData, isLoading } = useSubscriptions();

  const plans: ProcessedPlan[] =
    subscriptionsData?.data?.map((p: SubscriptionPlan) => ({
      ...(() => {
        const plan = normalizeSubscriptionPlan(p);
        return {
          id: plan._id,
          title: plan.name,
          badge: plan.type,
          price: plan.priceLabel,
          description: plan.description,
          ctaText: plan.ctaText,
          color: plan.type.toLowerCase().includes("starter")
            ? "blue"
            : plan.customPricing
              ? "green"
              : "purple",
          tags: [
            plan.isPopular ? "Popular" : "",
            plan.apiAccess ? "API Access" : "",
            plan.customPricing ? "Custom Pricing" : "",
          ].filter(Boolean),
          features: plan.features.map((f) => ({
            text: f.name,
            included: f.included,
            icon: f.included ? Check : X,
          })),
        };
      })(),
    })) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[400px] bg-muted animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (!plans.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
        <h3 className="text-lg font-bold text-foreground">
          No pricing plans yet
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your first pricing plan and it will appear here dynamically.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan: ProcessedPlan, i: number) => (
        <Card
          key={i}
          className={cn(
            "border shadow-md overflow-hidden relative pt-4 transition-all duration-300 hover:shadow-xl",
            plan.color === "blue"
              ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/30"
              : plan.color === "green"
                ? "bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-800/30"
                : "bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/30",
          )}
        >
          <CardHeader className="space-y-4 px-8 pb-4">
            {plan.badge && (
              <Badge
                className={cn(
                  "w-fit rounded-lg px-3 py-1 font-bold text-[10px]",
                  plan.color === "blue"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    : plan.color === "green"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50",
                )}
              >
                {plan.badge}
              </Badge>
            )}
            {!plan.badge && <div className="h-6" />}

            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-foreground">
                {plan.title}
              </h3>
              {plan.price && (
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                </div>
              )}
              <p className="pt-2 text-sm leading-6 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-6 space-y-4">
            {!!plan.tags.length && (
              <div className="flex flex-wrap gap-2">
                {plan.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-[10px] font-semibold"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {plan.features.map((feature, j: number) => (
              <div key={j} className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-1 rounded-full",
                    feature.included
                      ? plan.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : plan.color === "green"
                          ? "text-green-600 dark:text-green-400"
                          : "text-purple-600 dark:text-purple-400"
                      : "text-muted-foreground/60",
                  )}
                >
                  <feature.icon className="w-4 h-4" />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    feature.included
                      ? "text-muted-foreground"
                      : "text-muted-foreground line-through opacity-70",
                  )}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4">
            <div className="w-full space-y-3">
              <Button className="w-full rounded-full font-bold h-11">
                {plan.ctaText}
              </Button>
              <Button
                variant="outline"
                onClick={() => onEdit(plan.id)}
                className="w-full rounded-full border-primary text-primary font-bold h-11 transition-all duration-300"
              >
                Edit
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
