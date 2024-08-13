import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <header className="flex items-center justify-between pb-4 mb-4 border-b border-gray-700">
          <ArrowLeftIcon className="w-6 h-6 text-white" />
          <h1 className="text-xl font-semibold">Withdraw</h1>
          <div className="w-6 h-6" />
        </header>
        <section className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm text-red-500">24-hour withdrawal</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">Withdrawable</span>
                <span className="text-2xl font-bold text-yellow-500">0.000000</span>
                <span className="text-lg">USDT</span>
              </div>
              <span className="text-sm text-gray-500">pending_money</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex justify-between">
              <span>Payment method</span>
              <div className="flex space-x-2">
                <Button className="bg-yellow-500 text-black">TRC20-USDT</Button>
                <Button className="bg-gray-600">TRX</Button>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <Input placeholder="Withdrawal limit range 3.00 - 9999999.00" className="bg-gray-600" />
              <Input placeholder="Withdrawal Address" className="bg-gray-600" />
              <div className="relative">
                <Input type="password" placeholder="Password" className="bg-gray-600" />
                <EyeIcon className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Handling Fee</span>
            <span>Number of remaining fee-free withdrawals 999999</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Receipt</span>
            <span className="text-green-500">0 USDT</span>
          </div>
        </section>
      </div>
    </div>
  )
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}