"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, MapPin, Shield, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    title: "Starter",
    badge: "STARTER",
    price: "$0",
    period: "/month",
    color: "blue",
    features: [
      { text: "2 Free Checks", icon: Check },
      { text: "Basic Device Report", icon: Check },
      { text: "Free AI Explanation", icon: Check },
    ],
  },
  {
    title: "Best Value",
    badge: "BEST VALUE",
    price: "$2 - $30",
    period: "",
    color: "green",
    features: [
      { text: "Top-up from $2 to $30", icon: Zap },
      { text: "Free AI explanation", icon: MapPin },
      { text: "No subscription required", icon: Shield },
      { text: "Credits never expire", icon: History },
    ],
  },
  {
    title: "Enterprise",
    price: "",
    period: "",
    color: "purple",
    features: [
      { text: "Top-up from $2 to $30", icon: Zap },
      { text: "Free AI explanation", icon: MapPin },
      { text: "No subscription required", icon: Shield },
    ],
    offer: { icon: Diamond, text: "Diamond", discount: "10% Off" },
  },
];

import { History } from "lucide-react";

export function PricingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan, i) => (
        <Card
          key={i}
          className={cn(
            "border-none shadow-md overflow-hidden relative pt-4",
            plan.color === "blue"
              ? "bg-blue-50/50"
              : plan.color === "green"
                ? "bg-green-50/50"
                : "bg-purple-50/50",
          )}
        >
          <CardHeader className="space-y-4 px-8 pb-4">
            {plan.badge && (
              <Badge
                className={cn(
                  "w-fit rounded-lg px-3 py-1 font-bold text-[10px]",
                  plan.color === "blue"
                    ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-100",
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
            {plan.features.map((feature, j) => (
              <div key={j} className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-1 rounded-full",
                    plan.color === "blue"
                      ? "text-blue-500"
                      : plan.color === "green"
                        ? "text-green-500"
                        : "text-purple-500",
                  )}
                >
                  <feature.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {feature.text}
                </span>
              </div>
            ))}

            {plan.offer && (
              <div className="mt-8 bg-white rounded-xl p-3 flex items-center justify-between border border-border/50">
                <div className="flex items-center gap-2">
                  <plan.offer.icon className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold">{plan.offer.text}</span>
                </div>
                <span className="text-xs font-bold">{plan.offer.discount}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4">
            <Button
              variant="outline"
              className="w-full bg-white rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold h-11"
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
