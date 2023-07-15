import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stocks-count"
import { getTotalRevenue } from "@/actions/get-total-rev"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { formatter } from "@/lib/utils"
import { CreditCardIcon, IndianRupee, Package } from "lucide-react"
import { Overview } from "@/components/overview"

interface DashBoardProps{
  params:{storeId:string}
}


const DashboardPage:React.FC<DashBoardProps> =async ({params}) => {

  const totalRevenue=await getTotalRevenue(params.storeId)
  const salesCount=await getSalesCount(params.storeId)
  const StockCount=getStockCount(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-6 ">
        <Heading title="Dashboard" description="Stay cool!! No orders? No frustrations."/>
        <Separator/>
        <div className="grid gap-7 mt-10 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>             
              <IndianRupee className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-3x font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">
               Sales
              </CardTitle>             
              <CreditCardIcon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-3x font-bold">
              +{salesCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">
               Product In Stock
              </CardTitle>             
              <Package className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-3x font-bold">
                +{StockCount}
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  )
}

export default DashboardPage