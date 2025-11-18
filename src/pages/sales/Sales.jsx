import { useState } from "react";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import Header from "../../components/header/Header";
import SalesCard from "../../components/cards/SalesCard"; 
import SearchBar from "../../components/search-bar/SearchBar";
import CartModal from "../../components/modals/CartModal";
import CategoryFilter from "../../components/filters/CategoryFilter"; 

import useProduct from "../../hooks/useProduct"; 
import useSale from "../../hooks/useSale";

export default function Sales() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const [selectedCategory, setSelectedCategory] = useState('Todos'); 
    
    const { products, isLoading, error } = useProduct(1, 1000); 
    const { checkoutSale } = useSale();

    const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    function handleRemoveItem(id) {
        setCartItems(cartItems.filter(item => item.id !== id));
    }
    
    function handleIncrement(id) {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                if (item.quantity < item.maxStock) { 
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    toast.warning(`Limite de estoque (${item.maxStock}) atingido!`);
                    return item;
                }
            }
            return item;
        }));
    }

    function handleDecrement(id) {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return { ...item, quantity: 0 }; 
                }
            }
            return item;
        }).filter(item => item.quantity > 0)); 
    }
    
    function handleAddClick(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        const maxStock = product.quantity || 0; 
        
        const categoryName = product.category?.category_name;
        const categoryHex = product.category?.color;

        if (existingItem) {
            if (existingItem.quantity >= maxStock) {
                toast.error(`Estoque máximo atingido para ${product.product_name}!`);
                return; 
            }
            
            const updatedItems = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            
            setCartItems(updatedItems);
            toast.success(`+1 ${product.product_name} no carrinho!`); 

        } else {
            if (maxStock <= 0) {
               toast.error(`Produto ${product.product_name} esgotado!`);
                return; 
            }

            setCartItems([...cartItems, { 
                id: product.id, 
                name: product.product_name, 
                price: product.price,       
                quantity: 1,
                maxStock: maxStock, 
                category_name: categoryName,
                color: categoryHex          
            }]);
            toast.success(`${product.product_name} adicionado ao carrinho`);
        }
    }

    const handleFinalizeSale = async (saleData) => {
        try {
            await checkoutSale(saleData); 
        } catch (error) {
            
        }
    };

    const filteredProducts = products.filter(product => {
        const nameMatches = (product.product_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const categoryMatches = 
            selectedCategory === 'Todos' || 
            (product.category?.category_name === selectedCategory);

        return nameMatches && categoryMatches;
    });

    const uniqueCategories = products
        .map(product => product.category)
        .filter(category => category && category.category_name) 
        .map(category => ({ category_name: category.category_name }));


    return (
        <div className="bg-gray-100 min-h-screen p-6 space-y-8">
            <Header
                title="Vendas"
                SubTitle="Sistema de vendas de produtos consumíveis"
                iconButton={ShoppingCart}
                titleButton={`Carrinho (${totalItemsInCart})`}
                functionButton={() => setIsCartOpen(true)}
            />
            
            <div className="max-w-6xl mx-auto space-y-4">
                
                <CategoryFilter 
                    categories={uniqueCategories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory} 
                />

                
                <SearchBar 
                    onSearchChange={setSearchTerm} 
                />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {isLoading && (
                    <p className="col-span-full text-center text-lg text-gray-600">Carregando produtos...</p>
                )}
                
                {!isLoading && products.length > 0 ? (
                    (filteredProducts || []).map((product) => (
                        <SalesCard
                            key={product.id}
                            category={product.category?.category_name || 'Geral'}
                            productName={product.product_name}
                            price={`R$ ${product.price ? product.price.toFixed(2) : '0.00'}`}
                            stock={product.quantity} 
                            onAddClick={() => handleAddClick(product)}
                            categoryHex={product.category?.color} 
                        />
                    ))
                ) : (
                    !isLoading && !error && (
                        <p className="col-span-full text-center text-lg text-gray-500">
                            Nenhum produto encontrado.
                        </p>
                    )
                )}
            </div>

            <CartModal
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onRemove={handleRemoveItem} 
                onIncrement={handleIncrement} 
                onDecrement={handleDecrement} 
                onCheckout={handleFinalizeSale}
                onClearCart={() => setCartItems([])}
            />
        </div>
    );
}