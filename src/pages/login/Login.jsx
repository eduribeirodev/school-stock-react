import { FaGraduationCap } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react"; 
import { useState } from 'react'; 
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const {
        user,
        setUser,
        password,
        setPassword,
        handleLogin,
        error,
        isLoading,
        token, 
    } = useAuth();
    
    
    const [showPassword, setShowPassword] = useState(false);
    
  
    if (token || localStorage.getItem("token")) {
        return null;
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-xl flex flex-col gap-6 w-[35%] items-center justify-center"
            >
                <div className="bg-red-500 p-4 rounded-full mb-2">
                    <FaGraduationCap className="text-white text-2xl" />
                </div>

                <div className="text-center mb-4">
                    <h1 className="font-bold text-lg">Escola Estadual Vila do Lago</h1>
                    <p className="text-gray-500 text-sm">Sistema de Controle de Estoque</p>
                </div>

                <div className="w-full">
                    <label htmlFor="registro" className="text-sm font-medium text-gray-700">
                        Número de Registro
                    </label>
                    <input
                        id="registro"
                        type="text"
                        placeholder="12345678"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
                                 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
                                 value={user}
                                 onChange={(e) => setUser(e.target.value)}
                                 disabled={isLoading}
                                 />
                </div>

                
                <div className="w-full relative">
                    <label htmlFor="senha" className="text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input
                        id="senha"
                        
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
                                 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 pr-10" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        minLength={6}
                        />
                    
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 text-gray-500 hover:text-red-500 transition-colors"
                        title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        disabled={isLoading}
                        >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                            {error && !isLoading && (
                                <p className="text-red-500 text-md text-center w-full font-semibold ">
                                    {error === "Credenciais inválidas"
                                        ? "Credênciais inválidas, tente novamente."
                                        : error}
                                </p>
                            )}

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 font-semibold text-xl"
                    disabled={isLoading}
                    >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Carregando...
                        </div>
                    ) : (
                        "Entrar"
                    )}
                </button>
            </form>
        </div>
    );
}