import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
   Search,
   Plus,
   Edit,
   Trash,
   Mail,
   Shield,
   UserCircle,
} from "lucide-react";
import { toast } from "sonner";

// User type definition
interface User {
   id: string;
   name: string;
   email: string;
   role: "Admin" | "Manager" | "Staff";
   status: "Active" | "Inactive";
   joinedDate: string;
   lastActive: string;
}

const Users = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
      null
   );

   // Sample users data
   const [users, setUsers] = useState<User[]>([
      {
         id: "user1",
         name: "Jacques Kagabo",
         email: "jacques@example.com",
         role: "Admin",
         status: "Active",
         joinedDate: "2025-01-10",
         lastActive: "2025-04-28",
      },
      {
         id: "user2",
         name: "Sarah Miller",
         email: "sarah@example.com",
         role: "Manager",
         status: "Active",
         joinedDate: "2025-02-15",
         lastActive: "2025-04-27",
      },
      {
         id: "user3",
         name: "David Parker",
         email: "david@example.com",
         role: "Staff",
         status: "Active",
         joinedDate: "2025-03-05",
         lastActive: "2025-04-25",
      },
      {
         id: "user4",
         name: "Lisa Rodriguez",
         email: "lisa@example.com",
         role: "Staff",
         status: "Inactive",
         joinedDate: "2025-02-20",
         lastActive: "2025-04-10",
      },
   ]);

   // Filter users based on search term
   const filteredUsers = users.filter(
      (user) =>
         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.role.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const handleDeleteUser = (id: string) => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setShowDeleteConfirm(null);
      toast.success("User deleted successfully");
   };

   const getRoleBadgeColor = (role: string) => {
      switch (role) {
         case "Admin":
            return "bg-red-100 text-red-800";
         case "Manager":
            return "bg-blue-100 text-blue-800";
         case "Staff":
            return "bg-green-100 text-green-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   return (
      <DashboardLayout>
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-bold">User Management</h1>
               <Link to="/dashboard/users/new">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                     <Plus className="h-4 w-4 mr-2" /> Add New User
                  </Button>
               </Link>
            </div>

            {/* Users Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <Card>
                  <CardContent className="pt-6">
                     <div className="text-center">
                        <p className="text-sm text-gray-500">Total Users</p>
                        <h3 className="text-3xl font-bold">{users.length}</h3>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="pt-6">
                     <div className="text-center">
                        <p className="text-sm text-gray-500">Active Users</p>
                        <h3 className="text-3xl font-bold">
                           {
                              users.filter((user) => user.status === "Active")
                                 .length
                           }
                        </h3>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="pt-6">
                     <div className="text-center">
                        <p className="text-sm text-gray-500">Admins</p>
                        <h3 className="text-3xl font-bold">
                           {
                              users.filter((user) => user.role === "Admin")
                                 .length
                           }
                        </h3>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Search */}
            <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
               <Input
                  placeholder="Search users by name, email, or role..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            {/* Users List */}
            <div className="space-y-4">
               {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                     <Card
                        key={user.id}
                        className="overflow-hidden"
                     >
                        <div className="p-6">
                           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="flex items-center space-x-4">
                                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <UserCircle className="h-8 w-8 text-gray-500" />
                                 </div>
                                 <div>
                                    <h3 className="text-lg font-bold">
                                       {user.name}
                                    </h3>
                                    <div className="flex items-center text-gray-500 text-sm">
                                       <Mail className="h-4 w-4 mr-2" />
                                       <a
                                          href={`mailto:${user.email}`}
                                          className="hover:underline"
                                       >
                                          {user.email}
                                       </a>
                                    </div>
                                 </div>
                              </div>

                              <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                                 <div className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-gray-400" />
                                    <span
                                       className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(
                                          user.role
                                       )}`}
                                    >
                                       {user.role}
                                    </span>
                                 </div>
                                 <div className="text-sm">
                                    <span
                                       className={`px-2 py-1 rounded-full ${
                                          user.status === "Active"
                                             ? "bg-green-100 text-green-800"
                                             : "bg-gray-100 text-gray-800"
                                       }`}
                                    >
                                       {user.status}
                                    </span>
                                 </div>
                                 <div className="text-sm text-gray-500">
                                    Last active: {user.lastActive}
                                 </div>
                              </div>
                           </div>

                           <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                              {showDeleteConfirm === user.id ? (
                                 <div className="flex items-center space-x-2">
                                    <span className="text-sm text-red-600">
                                       Are you sure?
                                    </span>
                                    <Button
                                       size="sm"
                                       variant="outline"
                                       onClick={() =>
                                          setShowDeleteConfirm(null)
                                       }
                                    >
                                       Cancel
                                    </Button>
                                    <Button
                                       size="sm"
                                       variant="destructive"
                                       onClick={() => handleDeleteUser(user.id)}
                                    >
                                       Delete
                                    </Button>
                                 </div>
                              ) : (
                                 <>
                                    <Link to={`/dashboard/users/${user.id}`}>
                                       <Button
                                          size="sm"
                                          variant="outline"
                                       >
                                          <Edit className="h-4 w-4 mr-2" /> Edit
                                       </Button>
                                    </Link>
                                    <Button
                                       size="sm"
                                       variant="outline"
                                       className="text-red-600 border-red-200 hover:bg-red-50"
                                       onClick={() =>
                                          setShowDeleteConfirm(user.id)
                                       }
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
                     <p className="text-gray-500">No users match your search</p>
                     <Link
                        to="/dashboard/users/new"
                        className="mt-2 inline-block text-orange-500 hover:underline"
                     >
                        Add a new user
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Users;
