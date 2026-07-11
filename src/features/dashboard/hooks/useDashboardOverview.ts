"use client";

import { useAllPayments } from "@/features/payments/hooks/usePayments";
import { useUsers } from "@/features/users/hooks/useUsers";

interface DashboardUserRecord {
  _id: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  deviceName?: string;
  price?: string | number;
  createdAt?: string;
  phone?: string;
  email?: string;
  image?: {
    url?: string;
  };
}

interface DashboardPaymentRecord {
  _id: string;
  amount?: number;
  status?: string;
}

export interface DashboardUserRow {
  id: string;
  name: string;
  deviceName: string;
  price: string;
  date: string;
  contract: string;
  avatar: string;
}

const COMPLETED_PAYMENT_STATUSES = [
  "completed",
  "paid",
  "success",
  "succeeded",
];

function getSafeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100000 ? 0 : 2,
  }).format(value);
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPrice(value?: string | number) {
  if (typeof value === "number") {
    return formatCurrency(value);
  }

  if (typeof value === "string" && value.trim()) {
    const parsedValue = Number(value);
    if (Number.isFinite(parsedValue)) {
      return formatCurrency(parsedValue);
    }

    return value;
  }

  return "N/A";
}

function formatUserName(user: DashboardUserRecord) {
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  return fullName || "Unknown User";
}

function toRecentUser(user: DashboardUserRecord): DashboardUserRow {
  return {
    id: user._id,
    name: formatUserName(user),
    deviceName: user.deviceName || "N/A",
    price: formatPrice(user.price),
    date: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A",
    contract: user.phone || user.email || "N/A",
    avatar: user.image?.url || `https://i.pravatar.cc/150?u=${user._id}`,
  };
}

export function useDashboardOverview() {
  const usersQuery = useUsers();
  const paymentsQuery = useAllPayments();

  const users = getSafeArray<DashboardUserRecord>(usersQuery.data?.data);
  const payments = getSafeArray<DashboardPaymentRecord>(
    paymentsQuery.data?.data,
  );

  const totalUsers = users.length;
  const totalShopkeepers = users.filter(
    (user) => user.role?.toLowerCase() === "shopkeeper",
  ).length;

  const totalCredit = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0,
  );

  const completedPayments = payments.filter((payment) =>
    COMPLETED_PAYMENT_STATUSES.includes(payment.status?.toLowerCase() || ""),
  );

  const usedCredit = completedPayments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0,
  );

  const recentUsers = [...users]
    .sort((a, b) => {
      const firstDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const secondDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return secondDate - firstDate;
    })
    .slice(0, 5)
    .map(toRecentUser);

  const memberMix = totalUsers > 0 ? (totalShopkeepers / totalUsers) * 100 : 0;
  const paymentSuccessRate =
    payments.length > 0
      ? (completedPayments.length / payments.length) * 100
      : 0;
  const creditUtilization =
    totalCredit > 0 ? Math.min((usedCredit / totalCredit) * 100, 100) : 0;

  return {
    summary: {
      totalUsers,
      totalShopkeepers,
      totalCredit,
      usedCredit,
      totalPayments: payments.length,
      completedPayments: completedPayments.length,
      memberMix,
      paymentSuccessRate,
      creditUtilization,
    },
    formattedSummary: {
      totalUsers: formatCompactNumber(totalUsers),
      totalShopkeepers: formatCompactNumber(totalShopkeepers),
      totalCredit: formatCurrency(totalCredit),
      usedCredit: formatCurrency(usedCredit),
      memberMix: `${memberMix.toFixed(1)}%`,
      paymentSuccessRate: `${paymentSuccessRate.toFixed(1)}%`,
      creditUtilization: `${creditUtilization.toFixed(1)}%`,
    },
    recentUsers,
    isLoading: usersQuery.isLoading || paymentsQuery.isLoading,
    isFetching: usersQuery.isFetching || paymentsQuery.isFetching,
  };
}
