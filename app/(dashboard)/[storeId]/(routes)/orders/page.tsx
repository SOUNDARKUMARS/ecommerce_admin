import prismadb from '@/lib/prismadb'
import {format} from 'date-fns'

import { OrderClient } from './components/client'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils'

const  OrdersPage = async({params}:{params:{storeId:string}}) => {

  const  order=await prismadb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItem:{
        include:{
          product:true
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedOrders:OrderColumn[]=order.map((item)=>({
    id:item.id,
    phone:item.phone,
    address:item.address,
    isPaid:item.paid,
    products:item.orderItem.map((oitem)=>oitem.product.name).join(', '),
    totalPrice:formatter.format(item.orderItem.reduce((total,item)=>{
      return total+Number(item.product.price)
    },0)),
    createdAt:format(item.createdAt,'MMMM do, yyyy')
  }))


  return (
    <div className='flex-col'> 
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <OrderClient data={formattedOrders}/>
        </div>
    </div>
  )
}

export default  OrdersPage