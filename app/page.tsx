import Head from "next/head"


interface TAction {
    id: number;
    description: string;
    paidby: User;
    split?: User[];
    split_manual?: number[];
    amount: number;
}

enum User {
    DANIEL = 0,
    SAMUEL = 1,
    MARCELO = 2,
}

const data: TAction[] = [
    {id: 1, description: "Batatas", paidby: User.MARCELO, amount: 18.0, split: [User.DANIEL, User.SAMUEL, User.MARCELO], split_manual: [1, 1, 2] },
    {id: 2, description: "Rabawn Beer", paidby: User.DANIEL, amount: 30.0, split: [User.DANIEL, User.MARCELO] },
    {id: 3, description: "Comidas", paidby: User.MARCELO, amount: 41.0, split: [User.DANIEL, User.SAMUEL, User.MARCELO] },
    {id: 4, description: "Canecao Br Roots", paidby: User.SAMUEL, amount: 25.5, split: [User.DANIEL, User.SAMUEL, User.MARCELO] },
    {id: 5, description: "Cerveja Br Roots", paidby: User.DANIEL, amount: 16.0, split: [User.DANIEL, User.SAMUEL] },
    {id: 6, description: "Chopp", paidby: User.SAMUEL, amount: 18.0, split: [User.DANIEL, User.SAMUEL, User.MARCELO] },
    {id: 7, description: "Breja na rua", paidby: User.SAMUEL, amount: 10.0, split: [User.DANIEL, User.SAMUEL] },
    {id: 8, description: "Cerveja na rua", paidby: User.DANIEL, amount: 24.0, split: [User.DANIEL, User.SAMUEL, User.MARCELO] },
    {id: 9, description: "Heinekens", paidby: User.SAMUEL, amount: 17.5, split: [User.DANIEL, User.SAMUEL, User.MARCELO] },
    {id: 10, description: "Kebab", paidby: User.SAMUEL, amount: 14.0, split: [User.DANIEL, User.SAMUEL] },
    {id: 11, description: "Caipirinhas", paidby: User.MARCELO, amount: 50.0, split: [User.DANIEL, User.SAMUEL, User.MARCELO], split_manual: [1, 1, 2] },
    {id: 12, description: "Chopp", paidby: User.MARCELO, amount: 22.5, split: [User.DANIEL, User.SAMUEL, User.MARCELO] },
]

const CalculateCost = (user: User) => {
    let res: number = 0
    
    data.forEach((a) => {

        // creating igual division if `split_manual` dont exist
        if (!a.split_manual?.length) {
            a.split_manual = Array(a.split?.length).fill(1)
        }

        // calculating factor
        const nt_: number = a.split_manual.reduce((m,n) => m + n)
        let pos_: number = 0
        a.split?.forEach((ai, i) => {if (ai == user) pos_ = i})

        const factor: number = a.split_manual[pos_] / nt_

        // compute split
        if (!a.split || a.split?.includes(user)) {
            const value = a.amount * factor
            res += value
        }
        
        // remove payed amount
        if (a.paidby == user) {
            res -= a.amount
        }

    })	

    return res.toFixed(2)
}

const CalculateTotal = () => {
    let total: number = 0.

    data.forEach((a) => {
        total += a.amount
    })
    
    return total
}

export default function Home() {
    return (
        <div className="bg-sky-950 text-gray-300 min-h-screen">
            <Head>
                <title>Movie</title>
                <meta name='' content="a simple movie database" />
            </Head>
            
            <main className="container mx-auto py-10 px-4 flex flex-col items-center justify-center">
                <h1 className="text-4x1 font-bold">asdfasdf</h1>



                
                <ul role="list" className="divide-y divide-sky-500">

                    {data.map((el) => 
                        <li key={el.id} className="flex justify-between gap-x-6 py-5">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-300">{el.description}</p>
                            </div>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-300">{User[el.paidby]}</p>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="mt-1 truncate text-xs leading-5 text-gray-200">{el.amount}</p>
                            </div>
                        </li>
                    )}
                </ul>

                
                <p>Marcelo: {CalculateCost(User.MARCELO)}</p>
                <p>Samuel : {CalculateCost(User.SAMUEL)}</p>
                <p>Daniel : {CalculateCost(User.DANIEL)}</p>
                <p>Total: {CalculateTotal()}</p>
                
            </main>
        </div>
    )
}