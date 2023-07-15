'use client'

import { toast } from "react-hot-toast"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { BillboardColumn } from "./columns"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert.modal"


interface CellActionProps{
    data:BillboardColumn
}


export const CellAction:React.FC<CellActionProps>=({data})=>{


    const router=useRouter()
    const params=useParams()

    const onCopy=(id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success("Billboard Id Copied")
    }

    const[loading,setLoading]=useState(false)
    const[open,setOpen]=useState(false)

    const onDelete=async()=>{
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            router.refresh()
           
            toast.success('Billboard deleted.')

        }catch(error){
            console.log(error);
            
            toast.error('Make sure all the catogories are deleted.')
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }


    return(
        <>
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-4 w-4 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2"/>
                        Copy Id
                    </DropdownMenuItem>               
                    <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Update
                    </DropdownMenuItem>               
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className='text-red-600'/>
                        <span className='text-red-600'>Delete</span>
                    </DropdownMenuItem>               
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}