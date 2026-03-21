import { AlertCircle, ArrowDown, ArrowUp, Plus, Search, Trash2 } from "lucide-react"
import { Link } from "react-router"
import MonthYearSelect from "../components/MonthYearSelect"
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import type { Transaction } from "../types/transactions";
import { DeleteTransaction, getTransactions } from "../services/transactionService";
import Button from "../components/Button";
import { formatCurrency, formatDate } from "../utils/formartters";
import { toast } from "react-toastify";



const Transactions = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [deletingId, setDeletingId] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");

    const fetchTransactions = async (): Promise<void> => {
        setLoading(true);
        setError("");
        try {
            const data = await getTransactions({ month, year });
            setTransactions(data);
            setFilteredTransactions(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("Erro ao carregar transações.");
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id: string): Promise<void> => {
        try {
            setDeletingId(id);
            await DeleteTransaction(id);
            toast.success("Transação excluida com sucesso.");
            setFilteredTransactions((prev) => prev.filter((t) => t.id !== id));
        }catch (error) {
            console.log(error);
            toast.error("Erro ao excluir transação.");
        } finally {
            setDeletingId("");
        }
    }

    const confirmDelete = (id: string):void => {
        if(window.confirm("Tem certeza que deseja excluir essa transação?")) {
            handleDelete(id);
        }
    }

    useEffect(() => {
        fetchTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, year]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
        setFilteredTransactions(
            transactions.filter( (transaction) => 
                transaction.description.toUpperCase().includes(e.target.value.toUpperCase()))
            )
    }



    return (
        <div className="container-app py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
                <Link to="/transacoes/nova"
                    className="bg-primary-500 text-[#051626] px-4 py-2.5 rounded-md font-semibold hover:bg-primary-700 transition-all duration-300 ease-in-out
                flex items-center justify-center">
                    <Plus size={22} className="w-4 h-4 mr-2" />  Nova Transação
                </Link>
            </div>

            <Card className="mb-6">
                <MonthYearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
            </Card>

            <Card className="mb-6">
                <Input
                    placeholder="Buscar transações..."
                    icon={<Search className="w-4 h-4" />}
                    fullWidth
                    onChange={handleSearchChange}
                    value={searchText}
                />
            </Card>

            <Card className="overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-28">
                        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <p>{error}</p>
                        <Button onClick={fetchTransactions} className="mx-auto mt-6">Tentar novamente</Button>
                    </div>
                ) : transactions?.length === 0 ? (
                    <div className="py-10 text-center">
                        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                        <p className="text-gray-500 mb-4">Nenhuma transação encontrada.</p>
                        <Link to="/transacoes/nova"
                            className=" w-fit mx-auto mt-6 bg-primary-500 text-[#051626] px-4 py-2.5 rounded-md font-semibold hover:bg-primary-700 transition-all duration-300 ease-in-out
                            flex items-center justify-center">
                            <Plus size={22} className="w-4 h-4 mr-2" />  Nova Transação
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="divide-y divide-gray-700 min-h-full w-full">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Descrição
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Data
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Categoria
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Valor
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-700">
                                {filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-800">
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    {transaction.type === "income" ? (
                                                        <ArrowUp className="w-4 h-4 text-primary-500" />
                                                    ): (
                                                        <ArrowDown className="w-4 h-4 text-red-500" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-50">
                                                    {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4 whitespace-nowrap">
                                            {formatDate(transaction.date)}            
                                        </td>

                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: transaction.category.color}} />
                                                    <span className="text-sm text-gray-400">
                                                        {transaction.category.name}
                                                    </span>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4 whitespace-nowrap">
                                           <span className={`${transaction.type === "income" ? "text-primary-500" : "text-red-500"}`}>
                                             {formatCurrency(transaction.amount)}
                                           </span>
                                        </td>

                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <button
                                            type="button"
                                            onClick={() => confirmDelete(transaction.id)}
                                            className="text-red-500 hover:text-red-400 rounded-full 
                                            cursor-pointer transaction-all hover:scale-125 duration-300 ease-in-out"
                                            disabled={deletingId === transaction.id}
                                            >
                                                {deletingId === transaction.id ? (
                                                    <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                                
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                }
            </Card>
        </div>
    )
}

export default Transactions