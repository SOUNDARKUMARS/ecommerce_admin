import { UserButton, auth } from "@clerk/nextjs"

import { MainNav } from "./main-nav"
import StoreSwitcher from "./store-switcher"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { ModeToggle } from "./theme-toggle"

const Navbar = async() => {
  const {userId} =auth()
  if(!userId){
    redirect('/sign-in')
  }

  const stores=await prismadb.store.findMany({
    where:{
      userId:userId
    }
  })

  return (
    <div className='border-b'>
        <div className='flex items-center px-5  h-16 '>
            <StoreSwitcher items={stores}/>
            <MainNav className="mx-6"/>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl="/"/>
                <ModeToggle/>
            </div>
        </div>
    </div>
  )
}

export default Navbar 