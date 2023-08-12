"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string
  description2:string,
  price: string
  category:string,
  color:string,
  isFeatures:boolean,
  isArchived:boolean,
  createdAt:string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: 'description2',
    header: "Product Description",
  },
  {
    accessorKey: "isArchived",
    header: "Archive",
  },
  {
    accessorKey: "isFeatures",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Shopname",
    
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:'actions',
    header:"Actions",
    cell:({row})=><CellAction data={row.original}/>
  }
]
