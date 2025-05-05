import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import TextLogo from "@/components/TextLogo";
import { toast } from "sonner";

const Signup = () => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you would connect this to a backend
      if (firstName && lastName && phone && email && password) {
         toast.success("Account created successfully!");
         // Redirect to dashboard or profile creation
         window.location.href = "/restaurant-profile";
      } else {
         toast.error("Please fill all the fields");
      }
   };

   return (
      <div className="min-h-screen bg-orange-500 flex justify-center items-center p-4 xl:border-x-[20px] border-black border-x-4">
         <div className="w-full container mx-auto flex flex-col md:flex-row">
            {/* Logo section - full width on mobile, half width on larger screens */}
            <div className="w-full md:w-1/3 flex items-center justify-center p-6 md:p-10">
               <TextLogo size="large" />
            </div>

            {/* Form section - full width on mobile, half width on larger screens */}
            <div className="w-full md:w-1/2 bg-white rounded-lg p-6 md:p-8">
               <div className="text-center mb-6">
                  <h1 className="text-xl font-bold">Signup</h1>
               </div>

               <form
                  onSubmit={handleSubmit}
                  className="space-y-3 md:space-y-4"
               >
                  <div className="space-y-1">
                     <label
                        htmlFor="firstName"
                        className="text-gray-500 uppercase text-xs"
                     >
                        FIRST NAME
                     </label>
                     <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full"
                     />
                  </div>

                  <div className="space-y-1">
                     <label
                        htmlFor="lastName"
                        className="text-gray-500 uppercase text-xs"
                     >
                        LAST NAME
                     </label>
                     <Input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full"
                     />
                  </div>

                  <div className="space-y-1">
                     <label
                        htmlFor="phone"
                        className="text-gray-500 uppercase text-xs"
                     >
                        PHONE
                     </label>
                     <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full"
                     />
                  </div>

                  <div className="space-y-1">
                     <label
                        htmlFor="email"
                        className="text-gray-500 uppercase text-xs"
                     >
                        EMAIL
                     </label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="Enter address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                     />
                  </div>

                  <div className="space-y-1">
                     <label
                        htmlFor="password"
                        className="text-gray-500 uppercase text-xs"
                     >
                        PASSWORD
                     </label>
                     <div className="relative">
                        <Input
                           id="password"
                           type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full pr-10"
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                           {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                           ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                           )}
                        </button>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-2"
                  >
                     Sign up
                  </Button>
               </form>

               <div className="mt-6 text-center">
                  <p className="text-gray-500 text-xs">
                     Already have an account?
                     <Link
                        to="/login"
                        className="text-blue-500 ml-1 font-medium"
                     >
                        Login
                     </Link>
                  </p>
               </div>

            
            </div>
         </div>
      </div>
   );
};

export default Signup;
