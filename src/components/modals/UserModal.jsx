import { useState } from "react";
import { toast } from "sonner";

export default function UserModal({ isOpen, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    number_registration: "",
    password: "",
    isadmin: "user", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.number_registration || !formData.password) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      await onConfirm(formData);
      toast.success("Usuário cadastrado com sucesso!");
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário!");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-1">Cadastrar Colaborador</h2>
        <p className="text-gray-500 text-sm mb-4">
          Preencha os dados do novo colaborador
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:ring focus:ring-black/80"
            required
          />
          <input
            type="text"
            name="number_registration"
            placeholder="Número de Registro ex: (123456)"
            value={formData.number_registration}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:ring focus:ring-black/80"
            required
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-bold"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
