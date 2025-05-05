
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, ShoppingBag, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

// Dummy data for charts
const salesData = [
  { date: "Mon", amount: 450 },
  { date: "Tue", amount: 380 },
  { date: "Wed", amount: 620 },
  { date: "Thu", amount: 520 },
  { date: "Fri", amount: 780 },
  { date: "Sat", amount: 850 },
  { date: "Sun", amount: 720 },
];

const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", total: 42.97, status: "pending" },
  { id: "#ORD-002", customer: "Sarah Smith", total: 37.98, status: "preparing" },
  { id: "#ORD-003", customer: "Michael Johnson", total: 23.97, status: "ready" },
  { id: "#ORD-004", customer: "Emily Brown", total: 53.97, status: "delivered" },
];

const topSellingItems = [
  { name: "Spaghetti Bolognese", sold: 24, revenue: 359.76 },
  { name: "Grilled Salmon", sold: 18, revenue: 341.82 },
  { name: "Tiramisu", sold: 22, revenue: 153.78 },
  { name: "Bruschetta", sold: 16, revenue: 143.84 },
];

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("week");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="mt-2 sm:mt-0">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-green-100 p-2 rounded-md">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 12%
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">$4,325</h3>
                <p className="text-gray-500 text-sm">Total Revenue</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 p-2 rounded-md">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 8%
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-gray-500 text-sm">Total Orders</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-orange-100 p-2 rounded-md">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 5%
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">89</h3>
                <p className="text-gray-500 text-sm">New Customers</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-red-100 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" /> 2%
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">$27.80</h3>
                <p className="text-gray-500 text-sm">Avg. Order Value</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sales Chart */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="relative h-full">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full flex justify-between items-end h-full px-2">
                      {salesData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="bg-orange-500 rounded-t w-12" 
                            style={{ 
                              height: `${(item.amount / 900) * 100}%`,
                              maxHeight: '90%'
                            }}
                          ></div>
                          <span className="text-xs mt-2">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p className={`text-xs px-2 py-1 rounded-full inline-block ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'ready' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                  View All Orders →
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Top Selling Items */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2">Item</th>
                    <th className="pb-2 text-right">Sold</th>
                    <th className="pb-2 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingItems.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3">{item.name}</td>
                      <td className="py-3 text-right">{item.sold}</td>
                      <td className="py-3 text-right">${item.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                  View Full Menu Performance →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
