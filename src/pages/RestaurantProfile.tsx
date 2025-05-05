
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Building, MapPin, Clock, Phone, Globe, CreditCard } from "lucide-react";

const RestaurantProfile = () => {
  const [formData, setFormData] = useState({
    name: "Le Bistro",
    address: "123 Main Street, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    website: "www.lebistro.com",
    description: "A cozy French bistro serving authentic cuisine in the heart of the city.",
    openingHours: "Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm",
    acceptsReservations: true,
    acceptsCreditCards: true,
    hasDelivery: true,
    hasTakeout: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Restaurant profile updated successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Restaurant Profile</h1>
          <Button onClick={() => toast.success("Changes saved successfully!")}>
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Address
                    </Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="openingHours" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Opening Hours
                    </Label>
                    <Input 
                      id="openingHours" 
                      name="openingHours" 
                      value={formData.openingHours} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Website
                    </Label>
                    <Input 
                      id="website" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Restaurant Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptsReservations"
                    checked={formData.acceptsReservations}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("acceptsReservations", checked as boolean)
                    }
                  />
                  <Label htmlFor="acceptsReservations">Accepts Reservations</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="acceptsCreditCards"
                    checked={formData.acceptsCreditCards}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("acceptsCreditCards", checked as boolean)
                    }
                  />
                  <Label htmlFor="acceptsCreditCards">Accepts Credit Cards</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasDelivery"
                    checked={formData.hasDelivery}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("hasDelivery", checked as boolean)
                    }
                  />
                  <Label htmlFor="hasDelivery">Offers Delivery</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasTakeout"
                    checked={formData.hasTakeout}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("hasTakeout", checked as boolean)
                    }
                  />
                  <Label htmlFor="hasTakeout">Offers Takeout</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{formData.name}</h3>
                  <p className="text-gray-600">{formData.description}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {formData.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {formData.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  {formData.openingHours}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RestaurantProfile;
