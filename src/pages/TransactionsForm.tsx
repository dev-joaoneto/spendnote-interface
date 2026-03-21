import { useEffect, useState, useId, type ChangeEvent, type FormEvent } from "react";
import type { CreateTransactionDTO, TransactionType } from "../types/transactions";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import Input from "../components/Input";
import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { createTransaction } from "../services/transactionService";
import { toast } from "react-toastify";


interface FormData {
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    type: TransactionType;
}

const initalFormData: FormData = {
    description: '',
    amount: 0,
    date: '',
    categoryId: '',
    type: "expense"
}

const TransactionsForm = () => {
 
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<FormData>(initalFormData);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const formId = useId()
    
    const navigate = useNavigate()

    useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
        const response = await getCategories();
        setCategories(response);
    };

    fetchCategories();
}, []);

    const filteredCategories = categories.filter((category) => category.type === formData.type);

    const validateForm = (): boolean => {
        if(!formData.description || !formData.amount || !formData.date || !formData.categoryId) {
            setError('Preencha todos os campos')
            return false
        }

        if(formData.amount <= 0) {
            setError('O valor da transação deve ser maior que zero')
            return false
        }

        return true
    }

    const handleTransactionType = (itemtype: TransactionType):void => {
        setFormData((prev) => ({ ...prev, type: itemtype }));
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>):void => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event: FormEvent):Promise<void> => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if(!validateForm()) {
                return;
            }

            const transactionData:CreateTransactionDTO ={
                description: formData.description,
                amount: formData.amount,
                date: `${formData.date}T12:00:00.000Z`,
                categoryId: formData.categoryId,
                type: formData.type,
            }

            await createTransaction(transactionData);
            toast.success("Transação criada com sucesso.");
            navigate('/transacoes')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (err) {
            toast.error("Erro ao criar transação.");
        }
        finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        navigate('/transacoes')
    }

    return (
        <div className="container-app py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Nova Transação</h1>

                <Card>

                    {error && (
                        <div className="flex items-center bg-red-300 border border-red-800 rounded-xl p-4 mb-6 gap-2">
                            <AlertCircle className="w-5 h-5 text-red-700" />
                            <p className="text-red-800 font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor={formId}>Tipo de Transação</label>
                            <TransactionTypeSelector 
                            id={formId}
                            value={formData.type}
                            onChange={handleTransactionType} />
                        </div>

                        <Input 
                        label="Descrição"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ex: Supermercado, Salário, etc..."
                        />

                        <Input 
                        label="Valor"
                        name="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="R$0.00"
                        icon={<DollarSign className="w-4 h-4 text-gray-400"/>}
                        />

                        <Input 
                        label="Data"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        icon={<Calendar className="w-4 h-4 text-gray-400"/>}
                        className="cursor-text"
                        /> 

                        <Select
                        label="Categoria"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        icon={<Tag className="w-4 h-4"/>}
                        options={[
                            { value: "", label: "Selecione uma categoria" },
                            ...filteredCategories.map((category) => ({
                                value: category.id,
                                label: category.name,
                            })),
                        ]}
                         />

                         <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={handleCancel} type="button" disabled={loading}> 
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                <div className="flex items-center justify-center h-28">
                                    <div className="w-4 h-4 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                ) :(
                                    <Save className="w-4 h-4 mr-2"/>
                                )}
                                Salvar
                            </Button>
                         </div>

                    </form>
                </Card>
            </div>
        </div>
    )
}

export default TransactionsForm