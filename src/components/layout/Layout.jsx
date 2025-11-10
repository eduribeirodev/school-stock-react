import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner'; 
import Sidebar from "../sidebar/Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      
      <Toaster 
        position="bottom-right" 
        richColors 
        duration={3000} 
      />

      <Sidebar />
      <main className="flex-1 p-6 w-full ml-[15%] bg-gray-100 ">
        <Outlet /> 
      </main>
    </div>
  );
}