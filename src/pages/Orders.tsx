
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Check, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";

// Order type definition
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  orderNumber: string;
  dateTime: string;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  total: number;
  paymentMethod: string;
  items: OrderItem[];
}

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "order1",
      customerName: "John Doe",
      orderNumber: "#ORD-001",
      dateTime: "2025-05-01 12:30 PM",
      status: "pending",
      total: 42.97,
      paymentMethod: "Credit Card",
      items: [
        { id: "item1", name: "Spaghetti Bolognese", quantity: 2, price: 14.99 },
        { id: "item2", name: "Tiramisu", quantity: 2, price: 6.99 }
      ]
    },
    {
      id: "order2",
      customerName: "Sarah Smith",
      orderNumber: "#ORD-002",
      dateTime: "2025-05-01 12:45 PM",
      status: "preparing",
      total: 37.98,
      paymentMethod: "Cash",
      items: [
        { id: "item3", name: "Grilled Salmon", quantity: 2, price: 18.99 }
      ]
    },
    {
      id: "order3",
      customerName: "Michael Johnson",
      orderNumber: "#ORD-003",
      dateTime: "2025-05-01 13:15 PM",
      status: "ready",
      total: 23.97,
      paymentMethod: "Debit Card",
      items: [
        { id: "item4", name: "Caesar Salad", quantity: 1, price: 8.99 },
        { id: "item5", name: "Bruschetta", quantity: 1, price: 8.99 },
        { id: "item6", name: "Tiramisu", quantity: 1, price: 5.99 }
      ]
    },
    {
      id: "order4",
      customerName: "Emily Brown",
      orderNumber: "#ORD-004",
      dateTime: "2025-05-01 13:30 PM",
      status: "delivered",
      total: 53.97,
      paymentMethod: "Credit Card",
      items: [
        { id: "item7", name: "Grilled Salmon", quantity: 2, price: 18.99 },
        { id: "item8", name: "Tiramisu", quantity: 2, price: 7.99 }
      ]
    },
    {
      id: "order5",
      customerName: "David Wilson",
      orderNumber: "#ORD-005",
      dateTime: "2025-05-01 14:00 PM",
      status: "cancelled",
      total: 29.97,
      paymentMethod: "Cash",
      items: [
        { id: "item9", name: "Spaghetti Bolognese", quantity: 2, price: 14.99 }
      ]
    }
  ]);

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  // Filter and search orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "" || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch(status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <Button>New Order</Button>
        </div>

        {/* Order Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-3xl font-bold">{orders.length}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Pending</p>
                <h3 className="text-3xl font-bold">
                  {orders.filter(o => o.status === "pending").length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Preparing</p>
                <h3 className="text-3xl font-bold">
                  {orders.filter(o => o.status === "preparing").length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Ready</p>
                <h3 className="text-3xl font-bold">
                  {orders.filter(o => o.status === "ready").length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search orders by customer or order number..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              className="border border-gray-300 rounded-md p-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <Collapsible key={order.id} className="border rounded-md">
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium">{order.customerName}</h3>
                      <div className="text-sm text-gray-500">{order.orderNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{order.dateTime}</div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 border-t">
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Item</th>
                            <th className="text-center py-2">Quantity</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map(item => (
                            <tr key={item.id} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <td className="py-2 text-center">{item.quantity}</td>
                              <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                              <td className="py-2 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3} className="py-2 text-right font-medium">Total</td>
                            <td className="py-2 text-right font-medium">${order.total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Payment Method: </span>
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="space-x-2">
                        {order.status !== "delivered" && order.status !== "cancelled" && (
                          <>
                            {order.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, "preparing")}
                              >
                                Start Preparing
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, "ready")}
                              >
                                Mark as Ready
                              </Button>
                            )}
                            {order.status === "ready" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, "delivered")}
                              >
                                Mark as Delivered
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => handleUpdateStatus(order.id, "cancelled")}
                            >
                              <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                          </>
                        )}
                        {order.status === "delivered" && (
                          <div className="text-green-600 flex items-center">
                            <Check className="h-4 w-4 mr-1" /> Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">No orders match your filters</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
