
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-white/10 p-2">
              <Search className="h-5 w-5 text-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <span className="text-white">Jacques Kagabo</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-black text-white flex-1 pt-10 pb-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Register your restaurant on SupaMenu
          </h1>
          <p className="text-xl mb-8">for free and get more revenue!</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/register-restaurant">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                Register your Restaurant
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-white text-black hover:bg-white/10 px-8 py-6 text-lg hover:text-white">
                Restaurant already registered? Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Step 1</h3>
              <p className="text-gray-600">Register your restaurant</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Step 2</h3>
              <p className="text-gray-600">Create your restaurant profile and create menu items</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Step 3</h3>
              <p className="text-gray-600">Start receiving orders</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
