import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
   // Restaurant details
   const [restaurantName, setRestaurantName] = useState("Supa Menu Restaurant");
   const [address, setAddress] = useState("123 Food Street, Culinary City");
   const [phone, setPhone] = useState("+1 (555) 123-4567");
   const [email, setEmail] = useState("contact@supamenu.com");

   // System settings
   const [currency, setCurrency] = useState("USD");
   const [timezone, setTimezone] = useState("America/New_York");
   const [language, setLanguage] = useState("en");

   // Notification settings
   const [emailNotifications, setEmailNotifications] = useState(true);
   const [orderNotifications, setOrderNotifications] = useState(true);
   const [marketingNotifications, setMarketingNotifications] = useState(false);

   const handleSaveRestaurantSettings = () => {
      toast.success("Restaurant settings saved successfully");
   };

   const handleSaveSystemSettings = () => {
      toast.success("System settings saved successfully");
   };

   const handleSaveNotificationSettings = () => {
      toast.success("Notification settings saved successfully");
   };

   return (
      <DashboardLayout>
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            <Tabs
               defaultValue="restaurant"
               className="w-full"
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
               </TabsList>

               {/* Restaurant Settings */}
               <TabsContent value="restaurant">
                  <Card>
                     <CardHeader>
                        <CardTitle>Restaurant Details</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="restaurantName">
                                 Restaurant Name
                              </Label>
                              <Input
                                 id="restaurantName"
                                 value={restaurantName}
                                 onChange={(e) =>
                                    setRestaurantName(e.target.value)
                                 }
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                 id="email"
                                 type="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                 id="phone"
                                 value={phone}
                                 onChange={(e) => setPhone(e.target.value)}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                 id="address"
                                 value={address}
                                 onChange={(e) => setAddress(e.target.value)}
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="logo">Restaurant Logo</Label>
                           <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center">
                                 <img
                                    src="/uploads/62feb466-8968-48d0-b985-9ec4add172cc.png"
                                    alt="Logo"
                                    className="max-w-full max-h-full object-contain"
                                 />
                              </div>
                              <Button variant="outline">Change Logo</Button>
                           </div>
                        </div>

                        <Button
                           className="bg-orange-500 hover:bg-orange-600 mt-4"
                           onClick={handleSaveRestaurantSettings}
                        >
                           Save Changes
                        </Button>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* System Settings */}
               <TabsContent value="system">
                  <Card>
                     <CardHeader>
                        <CardTitle>System Settings</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="currency">Currency</Label>
                              <Select
                                 value={currency}
                                 onValueChange={setCurrency}
                              >
                                 <SelectTrigger id="currency">
                                    <SelectValue placeholder="Select Currency" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="USD">
                                       US Dollar (USD)
                                    </SelectItem>
                                    <SelectItem value="EUR">
                                       Euro (EUR)
                                    </SelectItem>
                                    <SelectItem value="GBP">
                                       British Pound (GBP)
                                    </SelectItem>
                                    <SelectItem value="CAD">
                                       Canadian Dollar (CAD)
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="timezone">Timezone</Label>
                              <Select
                                 value={timezone}
                                 onValueChange={setTimezone}
                              >
                                 <SelectTrigger id="timezone">
                                    <SelectValue placeholder="Select Timezone" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="America/New_York">
                                       Eastern Time (ET)
                                    </SelectItem>
                                    <SelectItem value="America/Chicago">
                                       Central Time (CT)
                                    </SelectItem>
                                    <SelectItem value="America/Denver">
                                       Mountain Time (MT)
                                    </SelectItem>
                                    <SelectItem value="America/Los_Angeles">
                                       Pacific Time (PT)
                                    </SelectItem>
                                    <SelectItem value="Europe/London">
                                       London (GMT)
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="language">Language</Label>
                              <Select
                                 value={language}
                                 onValueChange={setLanguage}
                              >
                                 <SelectTrigger id="language">
                                    <SelectValue placeholder="Select Language" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        <div className="space-y-4 mt-6">
                           <div className="flex items-center justify-between">
                              <div>
                                 <h4 className="text-sm font-medium">
                                    Enable Dark Mode
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Use dark theme for the dashboard
                                 </p>
                              </div>
                              <Switch id="dark-mode" />
                           </div>

                           <div className="flex items-center justify-between">
                              <div>
                                 <h4 className="text-sm font-medium">
                                    Automatic Logout
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Log out after 30 minutes of inactivity
                                 </p>
                              </div>
                              <Switch
                                 id="auto-logout"
                                 defaultChecked
                              />
                           </div>
                        </div>

                        <Button
                           className="bg-orange-500 hover:bg-orange-600 mt-4"
                           onClick={handleSaveSystemSettings}
                        >
                           Save Changes
                        </Button>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Notification Settings */}
               <TabsContent value="notifications">
                  <Card>
                     <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div>
                                 <h4 className="text-sm font-medium">
                                    Email Notifications
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Receive notifications via email
                                 </p>
                              </div>
                              <Switch
                                 id="email-notifications"
                                 checked={emailNotifications}
                                 onCheckedChange={setEmailNotifications}
                              />
                           </div>

                           <div className="flex items-center justify-between">
                              <div>
                                 <h4 className="text-sm font-medium">
                                    Order Notifications
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Get notified about new orders and updates
                                 </p>
                              </div>
                              <Switch
                                 id="order-notifications"
                                 checked={orderNotifications}
                                 onCheckedChange={setOrderNotifications}
                              />
                           </div>

                           <div className="flex items-center justify-between">
                              <div>
                                 <h4 className="text-sm font-medium">
                                    Marketing Notifications
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Receive marketing and promotional
                                    information
                                 </p>
                              </div>
                              <Switch
                                 id="marketing-notifications"
                                 checked={marketingNotifications}
                                 onCheckedChange={setMarketingNotifications}
                              />
                           </div>
                        </div>

                        <Button
                           className="bg-orange-500 hover:bg-orange-600 mt-4"
                           onClick={handleSaveNotificationSettings}
                        >
                           Save Preferences
                        </Button>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
      </DashboardLayout>
   );
};

export default Settings;
