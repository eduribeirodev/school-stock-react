import { useState } from 'react'; 
import { toast } from "sonner";
import SaleService from "../services/SaleService";

export default function useSale() {
    // Estado para feedback de carregamento da ação
    const [isLoading, setIsLoading] = useState(false);
    

    // Função para centralizar o tratamento de erros
    const handleError = (defaultMessage) => {
        setIsLoading(false); 

        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`Falha: ${error.response.data.message}`);
            console.error("ERRO DE VALIDAÇÃO/API:", error.response.data);
        } else {
            toast.error(defaultMessage);
            console.error("ERRO DE REDE/CÓDIGO:", error);
        }
        throw error; 
    };

    // Função para finalizar (checkout) uma venda
    const checkoutSale = async (saleData) => {
        setIsLoading(true);
        try {
            
            const response = await SaleService.checkout(saleData);
            toast.success("Venda concluída com sucesso!");
            setIsLoading(false);
            return response;
        } catch (error) {
    
            handleError(error, "Erro desconhecido ao finalizar a venda.");
        }
    };
    
    return {
        checkoutSale,
        isLoading,   
    };
}