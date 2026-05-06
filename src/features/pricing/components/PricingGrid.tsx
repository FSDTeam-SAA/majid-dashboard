"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { useSubscriptions } from "../hooks/usePricing";
import { SubscriptionPlan } from "../types";

interface ProcessedPlan {
  id: string;
  title: string;
  badge?: string;
  price: string;
  period: string;
  color: string;
  features: Array<{ text: string; icon: React.ElementType }>;
}

export function PricingGrid({ onEdit }: { onEdit: (id: string) => void }) {
  const { data: subscriptionsData, isLoading } = useSubscriptions();

  const plans: ProcessedPlan[] =
    subscriptionsData?.data?.map((p: SubscriptionPlan) => ({
      id: p._id,
      title: p.name,
      badge: p.type,
      price: p.priceLabel || (p.price ? `$${p.price}` : "Contact Us"),
      period: "",
      color: p.type?.toLowerCase().includes("starter") ? "blue" : "purple",
      features: p.features.map((f: { name: string; included?: boolean }) => ({
        text: f.name,
        icon: Check,
      })),
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
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-8 py-6 space-y-4">
            {plan.features.map(
              (
                feature: { text: string; icon: React.ElementType },
                j: number,
              ) => (
                <div key={j} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1 rounded-full",
                      plan.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : plan.color === "green"
                          ? "text-green-600 dark:text-green-400"
                          : "text-purple-600 dark:text-purple-400",
                    )}
                  >
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {feature.text}
                  </span>
                </div>
              ),
            )}
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4">
            <Button
              variant="outline"
              onClick={() => onEdit(plan.id)}
              className="w-full rounded-full border-primary text-primary font-bold h-11 transition-all duration-300"
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
