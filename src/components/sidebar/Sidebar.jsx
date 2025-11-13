import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  Tag,
  LogOut,
  PackagePlus,
  PackageMinus,
  Truck,
  ShoppingCart,
  Users,
} from "lucide-react";
import useAuth from "../../hooks/useAuth"

export default function Sidebar() {
  const { logout } = useAuth();

  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.isadmin === "admin";
  const name = userData?.name || "Usuário";
  const roleText = isAdmin ? "Administrador" : "Funcionário";

  const links = [
    { to: "/stock-control/dashboard", label: "Início", icon: <Home size={20} /> },
    { to: "/stock-control/products", label: "Produtos", icon: <Package size={20} /> },
    { to: "/stock-control/categories", label: "Categorias", icon: <Tag size={20} /> },
    { to: "/stock-control/entries", label: "Entradas", icon: <PackagePlus size={20} /> },
    { to: "/stock-control/exits", label: "Saídas", icon: <PackageMinus size={20} /> },
    { to: "/stock-control/sales", label: "Vendas", icon: <ShoppingCart size={20} /> },
    { to: "/stock-control/suppliers", label: "Fornecedores", icon: <Truck size={20} /> },
  ];

  if (isAdmin) {
    links.push({
      to: "/stock-control/users",
      label: "Usuários",
      icon: <Users size={20} />,
    });
  }

  return (
    <div className="w-[15%] h-full bg-white fixed px-4 flex flex-col justify-between shadow-xl pt-2">
      <div className="flex flex-col justify-start gap-8">
        <div>
          <h1 className="text-xl font-semibold text-start text-black/80">Vila do Lago</h1>
          <h2 className="text-start text-gray-500">Controle de Estoque</h2>
        </div>

        <nav className="flex flex-col justify-evenly gap-3 pb-2.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-1 rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "text-black/80 hover:bg-red-200 hover:text-red-900"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-gray-400 pb-4 flex flex-col items-start border-t">
        <div className="pl-4 py-2">
          <p className="text-black/80 font-semibold">{name}</p>
          <p className="text-gray-500">{roleText}</p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-start gap-3 px-4 py-1.5 rounded-lg text-black/80 bg-white hover:bg-red-200 hover:text-red-900 transition-colors"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </div>
  );
}
