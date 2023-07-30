'use client'

import * as z from 'zod'
import axios from "axios"
import { Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useState } from "react"


import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from '@/components/modals/alert.modal'

const formSchema=z.object({
    name:z.string().min(1),
    value:z.string().min(1)
})


type SizeFormvalues=z.infer<typeof formSchema>


interface SizeFormProps{
    initialData:Size | null
}

export const SizeForm:React.FC<SizeFormProps> = ({initialData}) => {
        const params=useParams()
        const router=useRouter()

        const [open,setOpen]=useState(false)
        const [loading,setLoading] =useState(false)

        const title=initialData ? "Edit description" : "Create description"
        const description=initialData ? "Edit a description" : "Add a new description"
        const toastMessage=initialData ? "description Updated" : "description Created"
        const action=initialData ? "Save Changes" : "Create"


        const form =useForm<SizeFormvalues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            name:'',
            value:''
        }
    })

    const onSubmit=async(data:SizeFormvalues)=>{
        try{
            setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
        }else{
            await axios.post(`/api/${params.storeId}/sizes`,data)

        }
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)          
        }catch(error){
            toast.error("Somthing went wrong.")
        }finally{
            setLoading(false)
        }
    }

    const onDelete=async()=>{
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success('Description deleted.')

        }catch(error){
            toast.error('Please delete all the products using this Description.')
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

  return (
    <>
        <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
        <div className="flex items-center justify-between">
            <Heading
            title={title}
            description={description}
            />
            {initialData && (<Button variant='destructive' size='icon' onClick={()=>setOpen(true)} disabled={loading}><Trash className='h-4 w-4 '/></Button>)}
        </div>

        <Separator/>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                
                <div className="grid grid-cols-3 gap-8">
                    <FormField control={form.control} name='name' render={({field})=>(
                        <FormItem>
                            <FormLabel>Description </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Size name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    
                </div>
                <div>
                    <Button disabled={loading} className='ml-auto' type="submit">{action}</Button>
                </div>
            </form>
        </Form>
       
    </>
  )
}
