import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { UserCircle, Key, Bell, LogOut } from "lucide-react";
import { toast } from "sonner";

const Account = () => {
   // User profile
   const [name, setName] = useState("Jacques Kagabo");
   const [email, setEmail] = useState("jacques@example.com");
   const [phone, setPhone] = useState("+1 (555) 123-4567");
   const [role, setRole] = useState("Administrator");

   // Security settings
   const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
   const [sessionTimeout, setSessionTimeout] = useState(30);

   // Notification preferences
   const [emailNotifications, setEmailNotifications] = useState(true);
   const [pushNotifications, setPushNotifications] = useState(true);

   const handleSaveProfile = () => {
      toast.success("Profile updated successfully");
   };

   const handleSaveSecuritySettings = () => {
      toast.success("Security settings updated successfully");
   };

   const handleSaveNotificationPreferences = () => {
      toast.success("Notification preferences updated successfully");
   };

   const handleLogout = () => {
      toast.success("Logged out successfully");
      // In a real app, this would handle actual logout and redirection
   };

   const handleChangePassword = () => {
      toast.success("Password reset link sent to your email");
      // In a real app, this would initiate the password reset flow
   };

   return (
      <DashboardLayout>
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-bold">My Account</h1>
               <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
               >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
               </Button>
            </div>

            <Tabs
               defaultValue="profile"
               className="w-full"
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
               </TabsList>

               {/* Profile Tab */}
               <TabsContent value="profile">
                  <Card>
                     <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                           <div className="flex flex-col items-center space-y-2">
                              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                 <UserCircle className="h-32 w-32 text-gray-400" />
                              </div>
                              <Button
                                 variant="outline"
                                 size="sm"
                              >
                                 Change Avatar
                              </Button>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                              <div className="space-y-2">
                                 <Label htmlFor="name">Full Name</Label>
                                 <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                 <Label htmlFor="role">Role</Label>
                                 <Input
                                    id="role"
                                    value={role}
                                    disabled
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="border-t pt-4 mt-4">
                           <Label>Account Status</Label>
                           <div className="mt-2 bg-green-100 text-green-800 px-3 py-2 rounded-md inline-block text-sm">
                              Active
                           </div>
                        </div>

                        <Button
                           className="bg-orange-500 hover:bg-orange-600"
                           onClick={handleSaveProfile}
                        >
                           Save Changes
                        </Button>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Security Tab */}
               <TabsContent value="security">
                  <Card>
                     <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                 <h4 className="text-sm font-medium">
                                    Two-Factor Authentication
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Add an extra layer of security to your
                                    account
                                 </p>
                              </div>
                              <Switch
                                 id="two-factor"
                                 checked={twoFactorEnabled}
                                 onCheckedChange={setTwoFactorEnabled}
                              />
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="session-timeout">
                                 Session Timeout (minutes)
                              </Label>
                              <Input
                                 id="session-timeout"
                                 type="number"
                                 min="5"
                                 max="60"
                                 value={sessionTimeout}
                                 onChange={(e) =>
                                    setSessionTimeout(parseInt(e.target.value))
                                 }
                              />
                              <p className="text-xs text-gray-500">
                                 You'll be automatically logged out after this
                                 period of inactivity
                              </p>
                           </div>
                        </div>

                        <div className="border-t pt-6 space-y-4">
                           <h4 className="text-sm font-medium flex items-center">
                              <Key className="h-4 w-4 mr-2" /> Password
                           </h4>
                           <div className="space-y-2">
                              <p className="text-sm text-gray-500">
                                 Your password was last changed on April 15,
                                 2025
                              </p>
                              <Button
                                 variant="outline"
                                 onClick={handleChangePassword}
                              >
                                 Change Password
                              </Button>
                           </div>
                        </div>

                        <div className="border-t pt-6 space-y-4">
                           <h4 className="text-sm font-medium">
                              Login Sessions
                           </h4>
                           <div className="bg-gray-50 p-4 rounded-md space-y-3">
                              <div className="flex justify-between items-center">
                                 <div>
                                    <p className="font-medium text-sm">
                                       Current Session
                                    </p>
                                    <p className="text-xs text-gray-500">
                                       Windows • Chrome • New York, USA
                                    </p>
                                 </div>
                                 <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Active Now
                                 </div>
                              </div>
                              <div className="flex justify-between items-center">
                                 <div>
                                    <p className="font-medium text-sm">
                                       Previous Session
                                    </p>
                                    <p className="text-xs text-gray-500">
                                       MacOS • Safari • New York, USA
                                    </p>
                                 </div>
                                 <div className="text-xs text-gray-500">
                                    2 days ago
                                 </div>
                              </div>
                           </div>
                        </div>

                        <Button
                           className="bg-orange-500 hover:bg-orange-600"
                           onClick={handleSaveSecuritySettings}
                        >
                           Save Security Settings
                        </Button>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Notifications Tab */}
               <TabsContent value="notifications">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center">
                           <Bell className="h-5 w-5 mr-2" /> Notification
                           Preferences
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                 <h4 className="text-sm font-medium">
                                    Email Notifications
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Receive updates and alerts via email
                                 </p>
                              </div>
                              <Switch
                                 checked={emailNotifications}
                                 onCheckedChange={setEmailNotifications}
                              />
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                 <h4 className="text-sm font-medium">
                                    Push Notifications
                                 </h4>
                                 <p className="text-sm text-gray-500">
                                    Receive notifications in your browser
                                 </p>
                              </div>
                              <Switch
                                 checked={pushNotifications}
                                 onCheckedChange={setPushNotifications}
                              />
                           </div>
                        </div>

                        <div className="border-t pt-6">
                           <h4 className="text-sm font-medium mb-4">
                              Notification Types
                           </h4>
                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <span className="text-sm">
                                    New Order Alerts
                                 </span>
                                 <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm">
                                    Order Status Changes
                                 </span>
                                 <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm">
                                    Client Messages
                                 </span>
                                 <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm">System Updates</span>
                                 <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm">
                                    Marketing & Promotions
                                 </span>
                                 <Switch />
                              </div>
                           </div>
                        </div>

                        <Button
                           className="bg-orange-500 hover:bg-orange-600"
                           onClick={handleSaveNotificationPreferences}
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

export default Account;
