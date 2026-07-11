"use client";

import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import {
  useSubscriptions,
  useCreateSubscription,
  useUpdateSubscription,
} from "../hooks/usePricing";
import { toast } from "sonner";
import {
  CreateSubscriptionValues,
  createSubscriptionSchema,
  normalizeSubscriptionPlan,
  SubscriptionPlan,
} from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

type PricingValues = CreateSubscriptionValues;

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

  const form: UseFormReturn<PricingValues> = useForm<PricingValues>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      name: "",
      type: "",
      price: 0,
      priceLabel: "",
      description: "",
      features: [],
      isPopular: false,
      apiAccess: false,
      customPricing: false,
      ctaText: "",
    } as PricingValues,
  });

  const { control } = form;
  const isPopular = useWatch({ control, name: "isPopular" });
  const apiAccess = useWatch({ control, name: "apiAccess" });
  const customPricing = useWatch({ control, name: "customPricing" });
  const features = useWatch({ control, name: "features" }) || [];

  useEffect(() => {
    if (!planId) {
      form.reset({
        name: "",
        type: "",
        price: 0,
        priceLabel: "",
        description: "",
        features: [],
        isPopular: false,
        apiAccess: false,
        customPricing: false,
        ctaText: "",
      });
      return;
    }

    if (subscriptionsData?.data) {
      const plan = subscriptionsData.data.find(
        (p: SubscriptionPlan) => p._id === planId,
      );
      if (plan) {
        const normalizedPlan = normalizeSubscriptionPlan(plan);
        form.reset({
          name: normalizedPlan.name,
          type: normalizedPlan.type,
          price: normalizedPlan.price,
          priceLabel: normalizedPlan.priceLabel,
          description: normalizedPlan.description,
          isPopular: normalizedPlan.isPopular,
          apiAccess: normalizedPlan.apiAccess,
          customPricing: normalizedPlan.customPricing,
          ctaText: normalizedPlan.ctaText,
          features: normalizedPlan.features,
        });
      }
    }
  }, [planId, subscriptionsData, form]);

  const onSubmit: SubmitHandler<PricingValues> = async (values) => {
    try {
      if (planId) {
        await updateMutation.mutateAsync({ id: planId, data: values });
        toast.success("Subscription updated successfully");
      } else {
        await createMutation.mutateAsync(values);
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
      if (!currentFeatures.find((f) => f.name === featureInput.trim())) {
        form.setValue("features", [
          ...currentFeatures,
          { name: featureInput.trim(), included: true },
        ]);
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
              <label className="text-sm font-bold text-foreground">
                Plan Name
              </label>
              <Input
                {...form.register("name")}
                placeholder="Enterprise"
                className="h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">
                Type / Category
              </label>
              <Input
                {...form.register("type")}
                placeholder="ENTERPRISE"
                className="h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
              {form.formState.errors.type && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Price</label>
              <Input
                type="number"
                {...form.register("price", { valueAsNumber: true })}
                placeholder="0"
                className="h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
              {form.formState.errors.price && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">
                Price Label
              </label>
              <Input
                {...form.register("priceLabel")}
                placeholder="Custom or $0/month"
                className="h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
              {form.formState.errors.priceLabel && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.priceLabel.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">
              Description
            </label>
            <Textarea
              {...form.register("description")}
              placeholder="Custom solution for large companies"
              className="min-h-[100px] rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPopular"
                checked={isPopular}
                onCheckedChange={(checked) =>
                  form.setValue("isPopular", !!checked)
                }
              />
              <label htmlFor="isPopular" className="text-sm font-medium">
                Is Popular
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="apiAccess"
                checked={apiAccess}
                onCheckedChange={(checked) =>
                  form.setValue("apiAccess", !!checked)
                }
              />
              <label htmlFor="apiAccess" className="text-sm font-medium">
                API Access
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="customPricing"
                checked={customPricing}
                onCheckedChange={(checked) =>
                  form.setValue("customPricing", !!checked)
                }
              />
              <label htmlFor="customPricing" className="text-sm font-medium">
                Custom Pricing
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">
              CTA Text
            </label>
            <Input
              {...form.register("ctaText")}
              placeholder="Contact Us"
              className="h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.ctaText && (
              <p className="text-xs text-destructive">
                {form.formState.errors.ctaText.message}
              </p>
            )}
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
                className="h-12 flex-1 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
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
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm"
                >
                  <button
                    type="button"
                    className={`h-2.5 w-2.5 rounded-full ${feature.included ? "bg-primary" : "bg-muted-foreground/40"}`}
                    onClick={() =>
                      form.setValue(
                        "features",
                        features.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, included: !item.included }
                            : item,
                        ),
                      )
                    }
                    title={
                      feature.included ? "Mark as excluded" : "Mark as included"
                    }
                  />
                  <span
                    className={
                      feature.included ? "" : "line-through opacity-70"
                    }
                  >
                    {feature.name}
                  </span>
                  <button type="button" onClick={() => removeFeature(index)}>
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
              {form.formState.errors.features && (
                <p className="text-xs text-destructive w-full">
                  {form.formState.errors.features.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-white px-12 h-12 rounded-2xl font-bold"
            >
              {planId
                ? updateMutation.isPending
                  ? "Updating..."
                  : "Update"
                : createMutation.isPending
                  ? "Saving..."
                  : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
