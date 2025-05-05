import { ReactNode, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
   Search,
   Bell,
   Menu,
   User,
   Home,
   Settings,
   Users,
   FileText,
   PieChart,
   ChevronDown,
} from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
   children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
   const location = useLocation();
   const { toast } = useToast();
   const [collapsed, setCollapsed] = useState(false);

   const menuItems = [
      { name: "Overview", path: "/dashboard", icon: Home },
      { name: "Clients", path: "/dashboard/clients", icon: Users },
      { name: "Users", path: "/dashboard/users", icon: Users },

      { name: "Orders", path: "/dashboard/orders", icon: FileText },
      { name: "Menu", path: "/dashboard/menu", icon: FileText },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
      { name: "My Account", path: "/dashboard/account", icon: User },
   ];

   const handleLogout = () => {
      toast({
         title: "Logged out successfully",
         description: "You have been logged out",
      });
      // In a real app, this would handle actual logout
      window.location.href = "/";
   };

   const pageTitle =
      menuItems.find((item) => item.path === location.pathname)?.name ||
      "Dashboard";

   return (
      <div className="flex h-screen bg-gray-50">
         {/* Sidebar */}
         <aside
            className={cn(
               "bg-[#121212] text-white transition-all duration-300 flex flex-col",
               collapsed ? "w-[70px]" : "w-[220px]"
            )}
         >
            <div className="p-4">
               <Logo />
            </div>

            <nav className="flex-1 overflow-y-auto">
               <ul className="space-y-1">
                  {menuItems.map((item) => {
                     const isActive = location.pathname === item.path;
                     const isSettingsOrAccount =
                        item.name === "Settings" || item.name === "My Account";

                     return (
                        <li
                           key={item.name}
                           className={isSettingsOrAccount ? "mt-auto" : ""}
                        >
                           <NavLink
                              to={item.path}
                              className={cn(
                                 "flex items-center px-4 py-3 text-sm transition-colors",
                                 isActive
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-300 hover:bg-gray-800"
                              )}
                           >
                              <item.icon className="h-5 w-5 mr-3" />
                              {!collapsed && <span>{item.name}</span>}
                           </NavLink>
                        </li>
                     );
                  })}
               </ul>
            </nav>

            <div className="p-4 bg-orange-500 mt-auto">{/* Footer area */}</div>
         </aside>

         {/* Main Content */}
         <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top header */}
            <header className="bg-white border-b p-4 flex items-center justify-between">
               <div className="flex items-center">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setCollapsed(!collapsed)}
                     className="mr-4"
                  >
                     <Menu className="h-5 w-5" />
                  </Button>
                  <h1 className="text-xl font-medium">{pageTitle}</h1>
               </div>

               <div className="flex items-center space-x-4">
                  <button className="p-2">
                     <Search className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 relative">
                     <Bell className="h-5 w-5 text-gray-500" />
                     <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                  </button>
                  <div className="flex items-center space-x-2">
                     <span className="text-sm font-medium">Jacques Kagabo</span>
                     <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                           src="/uploads/62feb466-8968-48d0-b985-9ec4add172cc.png"
                           alt="User avatar"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </div>
            </header>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
               {children}
            </div>
         </main>
      </div>
   );
};

export default DashboardLayout;
