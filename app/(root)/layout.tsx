import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export default async function SetUpLayout({children}:{children:React.ReactNode}){
    const {userId}=auth()
    if(!userId){
        redirect('/sign-in')
    }
    const store=await prismadb.store.findFirst({
        where:{
            userId:userId
        }
    })
    if(store){
        redirect(`/${store.id}`)
    }

    return(
        <>
        {children}
        </>
    )
}