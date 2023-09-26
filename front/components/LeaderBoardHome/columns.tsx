"use client"

import { Leaderboard } from "@/types/leaderboard"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isOrganisation",
    cell: ({ row }) => {
      console.log(row.getValue("isOrganisation"))
      const isOrganistaion = row.getValue("isOrganisation")
 
      return isOrganistaion ? <span className="bg-green-500/50 dark:text-green-400 p-2 rounded-lg">Organistaion</span> : <span className="bg-blue-500/50 dark:text-blue-300 p-2 rounded-lg">Individual</span>
    },
    header: "Type",
  },
  {
    accessorKey: "totalRewardEarn",
    header: "Total Reward Earn",
  },
]
