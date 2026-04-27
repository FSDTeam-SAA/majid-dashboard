"use client";

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
import { Plus } from "lucide-react";

export function PricingEditForm() {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">
              Select Category
            </label>
            <Select>
              <SelectTrigger className="h-12 bg-card rounded-xl">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="top-up">Top-up</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">
              Edit Price
            </label>
            <Input placeholder="$3-$30" className="h-12 bg-card rounded-xl" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground">
            Provide Service Item
          </label>
          <div className="flex gap-3">
            <Input
              placeholder="+ Add Points"
              className="h-12 bg-card rounded-xl flex-1"
            />
            <Button className="h-12 bg-green-100 text-green-600 hover:bg-green-200 px-6 font-bold flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-primary hover:bg-primary/90 text-white px-12 h-12 rounded-2xl font-bold">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
