"use client";

import { useState } from "react";
import { PricingGrid } from "@/features/pricing/components/PricingGrid";
import { PricingEditForm } from "@/features/pricing/components/PricingEditForm";
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PricingPlanPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => {
    setSelectedPlanId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedPlanId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Pricing Plan</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your subscription tiers and one-time payment options.
          </p>
        </div>

        <Button
          onClick={handleAdd}
          className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold h-11 px-6 shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Plan
        </Button>
      </div>

      <PricingGrid onEdit={handleEdit} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl p-0 border-none overflow-hidden rounded-3xl">
          <DialogHeader className="p-8 pb-0">
            <DialogTitle className="text-2xl font-bold">
              {selectedPlanId ? "Edit Pricing Plan" : "Create New Plan"}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <PricingEditForm
              planId={selectedPlanId}
              onSuccess={() => setIsModalOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
