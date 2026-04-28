"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import {
  useSubscriptions,
  useCreateSubscription,
  useUpdateSubscription,
} from "../hooks/usePricing";
import { toast } from "sonner";
import { SubscriptionPlan } from "../types";

const pricingSchema = z.object({
  title: z.string().min(2, "Title is required"),
  badge: z.string().optional(),
  amount: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  billingModel: z.enum(["subscription", "one-time"]),
  isFree: z.boolean(),
  features: z.array(z.string()).min(1, "At least one feature is required"),
});

type PricingValues = z.infer<typeof pricingSchema>;

export function PricingEditForm({
  planId,
  onSuccess,
}: {
  planId?: string | null;
  onSuccess: () => void;
}) {
  const { data: subscriptionsData } = useSubscriptions();
  const createMutation = useCreateSubscription();
  const updateMutation = useUpdateSubscription();

  const [featureInput, setFeatureInput] = useState("");

  const form = useForm<PricingValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      title: "",
      badge: "",
      billingModel: "subscription",
      isFree: false,
      features: [],
    },
  });

  useEffect(() => {
    if (planId && subscriptionsData?.data) {
      const plan = subscriptionsData.data.find(
        (p: SubscriptionPlan) => p._id === planId,
      );
      if (plan) {
        form.reset({
          title: plan.title,
          badge: plan.badge || "",
          amount: plan.price?.amount,
          min: plan.price?.min,
          max: plan.price?.max,
          billingModel: plan.billingModel as "subscription" | "one-time",
          isFree: plan.isFree,
          features: plan.features.map(
            (f: string | { name: string; included?: boolean }) =>
              typeof f === "string" ? f : f.name,
          ),
        });
      }
    }
  }, [planId, subscriptionsData, form]);

  const onSubmit = async (values: PricingValues) => {
    try {
      const payload = {
        ...values,
        price: values.isFree
          ? { amount: 0 }
          : values.amount !== undefined
            ? { amount: values.amount }
            : { min: values.min, max: values.max },
        features: values.features.map((f) => ({ name: f, included: true })),
      };

      if (planId) {
        await updateMutation.mutateAsync({ id: planId, data: payload });
        toast.success("Subscription updated successfully");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Subscription created successfully");
      }
      onSuccess();
    } catch {
      toast.error("An error occurred");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues("features");
      if (!currentFeatures.includes(featureInput.trim())) {
        form.setValue("features", [...currentFeatures, featureInput.trim()]);
      }
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index),
    );
  };

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-8 space-y-10">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Title</label>
              <Input
                {...form.register("title")}
                placeholder="Basic Plan"
                className="h-12 bg-card rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Badge</label>
              <Input
                {...form.register("badge")}
                placeholder="Popular"
                className="h-12 bg-card rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">
                Billing Model
              </label>
              <Select
                value={form.watch("billingModel")}
                onValueChange={(val) =>
                  form.setValue(
                    "billingModel",
                    val as "subscription" | "one-time",
                  )
                }
              >
                <SelectTrigger className="h-12 bg-card rounded-xl">
                  <SelectValue placeholder="Select Billing Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscription">
                    Subscription (Monthly)
                  </SelectItem>
                  <SelectItem value="one-time">One-time Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">
                Price Amount
              </label>
              <Input
                type="number"
                {...form.register("amount", { valueAsNumber: true })}
                placeholder="0.00"
                className="h-12 bg-card rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">
              Provide Service Item
            </label>
            <div className="flex gap-3">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
                placeholder="+ Add Features"
                className="h-12 bg-card rounded-xl flex-1"
              />
              <Button
                type="button"
                onClick={addFeature}
                className="h-12 bg-green-100 text-green-600 hover:bg-green-200 px-6 font-bold flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {form.watch("features").map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm"
                >
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)}>
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-white px-12 h-12 rounded-2xl font-bold"
            >
              {planId ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
