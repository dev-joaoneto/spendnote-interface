import { useEffect, useState } from 'react';
import  MonthYearSelect  from '../components/MonthYearSelect';
import { getTransactionMonthly, GetTransactionSummary } from '../services/transactionService';
import type { MonthlyItem, TransactionSummary } from '../types/transactions';
import Card from '../components/Card';
import { ArrowDown, ArrowUp, Calendar, TrendingUp, Wallet } from 'lucide-react'
import { formatCurrency } from '../utils/formartters';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, type PieLabelRenderProps } from 'recharts';

const initialSummary: TransactionSummary = {
    totalExpenses: 0,
    totalIncomes: 0,
    balance: 0,
    expensesByCategory: [],
};

const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
    const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

    useEffect(() => {

        async function loadTransactionSummary() {
            const response = await GetTransactionSummary(month, year);
            
            setSummary(response);
        }
        loadTransactionSummary();

    }, [month, year]);

    useEffect(() => {

        async function loadTransactionMonthly() {
            const response = await getTransactionMonthly(month, year, 3);
            setMonthlyItemsData(response.history);
            
        }
        loadTransactionMonthly();

    }, [month, year]);


    const renderPieChatLabel = ({payload, percent}:PieLabelRenderProps) => {
        return `${payload.categoryName}: ${(percent! * 100).toFixed(1)}%`;
    }

    const formatToolTypeValue = (value: unknown) => {
        return formatCurrency(Number(value));
    };


    return (
        <div className="container-app py-6">
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
                <MonthYearSelect 
                month={month} 
                year={year} 
                onMonthChange={setMonth} 
                onYearChange={setYear} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card 
                icon={<Wallet size={20} className="text-primary-500" />} 
                title="Saldo"
                hover
                glow={summary.balance > 0 ? "green" : "red"}
                > 
                    <p className={`text-2xl font-semibold mt-2
                        ${summary.balance > 0 ? "text-primary-500" : "text-red-600"}
                        `}>{formatCurrency(summary.balance)}</p>
                </Card>

                <Card 
                icon={<ArrowUp size={20} className="text-primary-500" />} 
                title="Receitas"
                hover
                glow="green"
                >
                    <p className="text-2xl font-semibold mt-2 text-primary-500"
                    >
                        {formatCurrency(summary.totalIncomes)}</p>
                </Card>

                <Card 
                icon={<ArrowDown size={20} className="text-red-400" />} 
                title="Despesas"
                hover
                glow="red"
                >
                    <p className="text-2xl font-semibold mt-2 text-red-600"
                        >{formatCurrency(summary.totalExpenses)}</p>
                </Card>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3'>
                    <Card 
                    icon={<TrendingUp size={20} className="text-primary-500" />}
                    title="Despesas por Categoria" 
                    hover
                    > {summary.expensesByCategory.length > 0 ? (
                        <div className='h-72 mt-5'>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={summary.expensesByCategory}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    dataKey="amount"
                                    nameKey="categoryName"
                                    label={renderPieChatLabel}
                                >
                                    {summary.expensesByCategory.map((entry) => (
                                        <Cell key={entry.categoryId} fill={entry.categoryColor} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={formatToolTypeValue}
                                contentStyle={{
                                    backgroundColor: "#141F2B",
                                    border: "1px solid #1A2B3E",
                                    borderRadius: "8px"
                                }} />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                        ) : ( 
                        <div className="flex items-center justify-center text-gray-400 h-64">
                            Nenhuma despesa registrada para este mês.
                        </div>
                        )}
                    </Card>

                    <Card
                    icon={<Calendar size={20} className="text-primary-500" />}
                    title="Histórico Mensal"
                    hover
                    className='min-h-80 p-2.5'
                    >
                        <div className="h-72 mt-4">
                            {monthlyItemsData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyItemsData} margin={{ left: 40 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis dataKey="name" stroke="#94a3b8" tick={{ style: { textTransform: 'capitalize' }}}/>
                                        <YAxis stroke="#94a3b8" tickFormatter={formatToolTypeValue} tick={{ style: { fontSize: 14 }}} />
                                        <Tooltip formatter={formatToolTypeValue}
                                        contentStyle={{
                                            backgroundColor: "#141F2B",
                                            border: "1px solid #1A2B3E",
                                            borderRadius: "8px"
                                        }} />
                                        <Legend />
                                        <Bar dataKey="expenses" name="Despesas" fill="#ff6384" radius={[10, 10, 0, 0]} barSize={35}/>
                                        <Bar dataKey="incomes" name="Receitas" fill="#37e359" radius={[10, 10, 0, 0]} barSize={35}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center text-gray-400 h-64">
                                    Nenhuma transação registrada para este mês.
                                </div>
                            )}
                        </div>
                    </Card>
            </div>
        </div>
    );
};

export default Dashboard;