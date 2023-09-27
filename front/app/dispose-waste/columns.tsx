"use client"

import { Leaderboard } from "@/types/leaderboard"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "facility",
    header: "Waste Dispose At",
  },
  {
    accessorKey: "product",
    header: "Disposed Product",
  },
  {
    accessorKey: "creditEarned",
    header: "Total Credit Earned",
  },
]
