import type { TransactionType } from "../types/transactions"



interface TransactionTypeSelectorProps {
    value: TransactionType;
    id?: string;
    onChange: (type: TransactionType) => void;
}

const TransactionTypeSelector = ({value, onChange, id}: TransactionTypeSelectorProps) => {

    const transactionsTypeButtons: {
        type: TransactionType;
        label: string;
        activeClasses: string;
        inativeClasses: string;
        }[] = [
        {
            type: "expense",
            label: "Despesa",
            activeClasses: "bg-red-300 border-red-500 text-red-800 font-medium hover:bg-red-500",
            inativeClasses: "bg-transparent border-red-300 text-red-700 hover:bg-red-400 hover:scale-101 transition-all"

        },
        {
            type: "income",
            label: "Receita",
            activeClasses: "bg-green-300 border-green-500 text-green-700 font-medium hover:bg-green-500",
            inativeClasses: "bg-transparent border-green-300 text-green-700 hover:bg-green-300 hover:scale-101 transition-all"

        }
    ]



    return (
        <fieldset id={id} className="grid grid-cols-2 gap-4">
                {transactionsTypeButtons.map((item) => (
                     <button key={item.type}
                     type="button"
                     onClick={() => onChange(item.type)}
                     className={` cursor-pointer flex items-center justify-center border rounded-md py-2 px-4 transition-all
                        ${value === item.type ? item.activeClasses : item.inativeClasses}
                        `}
                     >
                        {item.label}
                     </button>
                ))}
        </fieldset>
    )
}

export default TransactionTypeSelector