import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import NewClient from "./pages/NewClient";
import RestaurantProfile from "./pages/RestaurantProfile";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
   <QueryClientProvider client={queryClient}>
      <TooltipProvider>
         <Toaster />
         <Sonner />
         <BrowserRouter>
            <Routes>
               <Route
                  path="/"
                  element={<Index />}
               />
               <Route
                  path="/login"
                  element={<Login />}
               />
               <Route
                  path="/signup"
                  element={<Signup />}
               />
               <Route
                  path="/dashboard"
                  element={<Dashboard />}
               />
               <Route
                  path="/dashboard/clients"
                  element={<Clients />}
               />
               <Route
                  path="/dashboard/clients/new"
                  element={<NewClient />}
               />
               <Route
                  path="/restaurant-profile"
                  element={<RestaurantProfile />}
               />
               <Route
                  path="/dashboard/menu"
                  element={<Menu />}
               />
               <Route
                  path="/dashboard/orders"
                  element={<Orders />}
               />
               <Route
                  path="/dashboard/users"
                  element={<Users />}
               />
               <Route
                  path="/dashboard/settings"
                  element={<Settings />}
               />
               <Route
                  path="/dashboard/account"
                  element={<Account />}
               />
               <Route
                  path="/register-restaurant"
                  element={<Signup />}
               />
               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
               <Route
                  path="*"
                  element={<NotFound />}
               />
            </Routes>
         </BrowserRouter>
      </TooltipProvider>
   </QueryClientProvider>
);

export default App;
