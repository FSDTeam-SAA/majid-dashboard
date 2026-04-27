"use client";

import { useState } from "react";
import { PricingGrid } from "@/features/pricing/components/PricingGrid";
import { PricingEditForm } from "@/features/pricing/components/PricingEditForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PricingPlanPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pricing Plan</h1>
          <p className="text-sm text-muted-foreground">
            Track your payment status and invoices.
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-primary hover:bg-primary/90 text-white font-bold flex items-center gap-2 rounded-lg h-11 px-6"
        >
          <Plus className="w-5 h-5" />
          {isEditing ? "Back to Plans" : "Add"}
        </Button>
      </div>

      {isEditing ? <PricingEditForm /> : <PricingGrid />}
    </div>
  );
}
