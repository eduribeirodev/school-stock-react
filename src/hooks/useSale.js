
import { toast } from "sonner";
import SaleService from "../services/SaleService";

const handleError = (error, defaultMessage) => {
    if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Falha: ${error.response.data.message}`);
        console.error("ERRO DE VALIDAÇÃO/API:", error.response.data);
    } else {
        toast.error(defaultMessage);
        console.error("ERRO DE REDE/CÓDIGO:", error);
    }
    throw error; 
};

export default function useSale() {

    const checkoutSale = async (saleData) => {
        try {
            const response = await SaleService.checkout(saleData);
            toast.success("Venda concluída com sucesso!");
            return response;
        } catch (error) {
            handleError(error, "Erro desconhecido ao finalizar a venda.");
        }
    };
    

    
    return {
        checkoutSale,
    };
}