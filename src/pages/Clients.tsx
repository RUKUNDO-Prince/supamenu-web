
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Plus, Edit, Trash, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

// Client type definition
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Sample clients data
  const [clients, setClients] = useState<Client[]>([
    {
      id: "client1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      totalOrders: 12,
      totalSpent: 325.75,
      joinedDate: "2025-01-15"
    },
    {
      id: "client2",
      name: "Sarah Smith",
      email: "sarah.smith@example.com",
      phone: "+1 (555) 234-5678",
      address: "456 Park Ave, Boston, MA 02108",
      totalOrders: 8,
      totalSpent: 210.50,
      joinedDate: "2025-02-20"
    },
    {
      id: "client3",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "+1 (555) 345-6789",
      address: "789 Oak St, Chicago, IL 60007",
      totalOrders: 5,
      totalSpent: 150.25,
      joinedDate: "2025-03-10"
    },
    {
      id: "client4",
      name: "Emily Brown",
      email: "emily.brown@example.com",
      phone: "+1 (555) 456-7890",
      address: "101 Pine St, San Francisco, CA 94101",
      totalOrders: 15,
      totalSpent: 430.80,
      joinedDate: "2025-01-05"
    }
  ]);

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
    setShowDeleteConfirm(null);
    toast.success("Client deleted successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Client Management</h1>
          <Link to="/dashboard/clients/new">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" /> Add New Client
            </Button>
          </Link>
        </div>

        {/* Clients Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Clients</p>
                <h3 className="text-3xl font-bold">{clients.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-3xl font-bold">
                  {clients.reduce((sum, client) => sum + client.totalOrders, 0)}
                </h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Revenue</p>
                <h3 className="text-3xl font-bold">
                  ${clients.reduce((sum, client) => sum + client.totalSpent, 0).toFixed(2)}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search clients by name, email, or phone..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Clients List */}
        <div className="space-y-4">
          {filteredClients.length > 0 ? (
            filteredClients.map(client => (
              <Card key={client.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{client.name}</h3>
                      <div className="flex flex-col space-y-1 text-gray-500 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${client.email}`} className="hover:underline">
                            {client.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${client.phone}`} className="hover:underline">
                            {client.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{client.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="text-center md:text-right">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="font-bold">{client.totalOrders}</p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="font-bold">${client.totalSpent.toFixed(2)}</p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="font-medium">{client.joinedDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                    {showDeleteConfirm === client.id ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-600">Are you sure?</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Link to={`/dashboard/clients/${client.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => setShowDeleteConfirm(client.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No clients match your search</p>
              <Link to="/dashboard/clients/new" className="mt-2 inline-block text-orange-500 hover:underline">
                Add a new client
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
