
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, Search } from "lucide-react";
import { toast } from "sonner";
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";

// Menu item type definition
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

// Menu category type definition
interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const Menu = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([
    {
      id: "cat1",
      name: "Appetizers",
      items: [
        {
          id: "item1",
          name: "Bruschetta",
          description: "Toasted bread topped with tomatoes, garlic, olive oil and basil",
          price: 8.99,
          category: "cat1"
        },
        {
          id: "item2",
          name: "Mozzarella Sticks",
          description: "Deep-fried mozzarella with marinara dipping sauce",
          price: 7.99,
          category: "cat1"
        }
      ]
    },
    {
      id: "cat2",
      name: "Main Course",
      items: [
        {
          id: "item3",
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta with rich meat sauce",
          price: 14.99,
          category: "cat2"
        },
        {
          id: "item4",
          name: "Grilled Salmon",
          description: "Fresh salmon fillet with lemon butter sauce and seasonal vegetables",
          price: 18.99,
          category: "cat2"
        }
      ]
    },
    {
      id: "cat3",
      name: "Desserts",
      items: [
        {
          id: "item5",
          name: "Tiramisu",
          description: "Classic Italian coffee-flavored dessert",
          price: 6.99,
          category: "cat3"
        }
      ]
    }
  ]);

  const [newItemForm, setNewItemForm] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleAddItem = () => {
    if (!newItemForm.name || !newItemForm.price || !newItemForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: MenuItem = {
      id: `item${Date.now()}`,
      name: newItemForm.name,
      description: newItemForm.description,
      price: parseFloat(newItemForm.price),
      category: newItemForm.category
    };

    setCategories(prev => 
      prev.map(category => 
        category.id === newItemForm.category
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    );

    setNewItemForm({
      name: "",
      description: "",
      price: "",
      category: ""
    });

    toast.success("Menu item added successfully");
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    
    setCategories(prev => 
      prev.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === editingItem.id ? editingItem : item
        )
      }))
    );
    
    setEditingItem(null);
    toast.success("Menu item updated successfully");
  };

  const handleDeleteItem = (itemId: string, categoryId: string) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === categoryId
          ? { ...category, items: category.items.filter(item => item.id !== itemId) }
          : category
      )
    );
    
    toast.success("Menu item deleted successfully");
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <Button onClick={() => toast.success("Menu saved successfully!")}>
            Save Menu
          </Button>
        </div>

        {/* Search and Add New Item */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search menu items..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" /> Add New Category
          </Button>
        </div>

        {/* Add New Item Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input 
                  id="itemName" 
                  placeholder="e.g., Caesar Salad" 
                  value={editingItem ? editingItem.name : newItemForm.name}
                  onChange={(e) => editingItem 
                    ? setEditingItem({...editingItem, name: e.target.value}) 
                    : setNewItemForm({...newItemForm, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="itemPrice">Price ($)</Label>
                <Input 
                  id="itemPrice" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 12.99"
                  value={editingItem ? editingItem.price : newItemForm.price}
                  onChange={(e) => editingItem 
                    ? setEditingItem({...editingItem, price: parseFloat(e.target.value)}) 
                    : setNewItemForm({...newItemForm, price: e.target.value})}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="itemDescription">Description</Label>
                <Input 
                  id="itemDescription" 
                  placeholder="Brief description of the item"
                  value={editingItem ? editingItem.description : newItemForm.description}
                  onChange={(e) => editingItem 
                    ? setEditingItem({...editingItem, description: e.target.value}) 
                    : setNewItemForm({...newItemForm, description: e.target.value})}
                />
              </div>
              
              {!editingItem && (
                <div className="space-y-2">
                  <Label htmlFor="itemCategory">Category</Label>
                  <select 
                    id="itemCategory"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newItemForm.category}
                    onChange={(e) => setNewItemForm({...newItemForm, category: e.target.value})}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="md:col-span-2 flex justify-end pt-4">
                {editingItem ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setEditingItem(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditItem}>
                      Update Item
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleAddItem}>
                    Add Item
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Categories and Items */}
        <div className="space-y-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <Collapsible key={category.id} defaultOpen={true} className="border rounded-md">
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <span className="text-sm text-gray-500">{category.items.length} items</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-4">
                    {category.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-3 border-b last:border-0">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">{item.name}</h4>
                            <span className="ml-2 text-orange-500 font-medium">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setEditingItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteItem(item.id, category.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">No menu items found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Menu;
