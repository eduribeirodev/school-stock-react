import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; 

export default function EditUserModal({ isOpen, onClose, user, onUserUpdated, updateUser, updatePassword }) {
    
    const [formData, setFormData] = useState({ 
        name: "", 
        number_registration: "", 
        password: "", 
        password_confirmation: "" 
    });
    
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                number_registration: user.number_registration || "",
                password: "",
                password_confirmation: "" 
            });
        }
    }, [user]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: formData.name,
            number_registration: formData.number_registration,
        };
        
        const passwordData = {
            password: formData.password,
            password_confirmation: formData.password_confirmation
        };

        try {
            if (passwordData.password || passwordData.password_confirmation) {
                if (passwordData.password !== passwordData.password_confirmation) {
                    toast.error("As senhas não conferem!");
                    return; 
                }
            }

            const userResponse = await updateUser(user.id, userData);
            onUserUpdated(userResponse); 

            let toastMessage = "Usuário atualizado com sucesso!";

            if (passwordData.password) { 
                await updatePassword(user.id, passwordData);
                toastMessage = "Usuário e senha atualizados com sucesso!";
            }
            
            toast.success(toastMessage);
            
            onClose();

        } catch (error) {
            console.error("Falha no handleSubmit do EditUserModal:", error);
            toast.error("Falha ao salvar alterações. Tente novamente.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="text-sm text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700">Número de Registro</label>
                        <input
                            type="text"
                            name="number_registration"
                            value={formData.number_registration}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>

                    <h3 className="text-md font-medium pt-2 border-t">Alterar Senha</h3> 

                    <div className="relative">
                        <label className="text-sm text-gray-700">Nova Senha (opcional)</label>
                        <input
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 pr-10" 
                            placeholder="Deixe em branco para não alterar"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-red-500 transition-colors"
                            title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <label className="text-sm text-gray-700">Confirmação de Nova Senha</label>
                        <input
                            type={showPassword ? "text" : "password"} 
                            name="password_confirmation" 
                            value={formData.password_confirmation} 
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 pr-10" 
                            placeholder="Repita a senha" 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-red-500 transition-colors"
                            title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}