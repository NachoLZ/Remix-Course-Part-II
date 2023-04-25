import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '../../data/expenses.server';
import { json } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import Error from '~/components/util/Error';
/*
const DUMMY_EXPENSES = [{
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString()
},
{
    id: 'e2',
    title: 'Second Expense',
    amount: 16.99,
    date: new Date().toISOString()
    }
];*/

export async function loader() {
    const expenses = await getExpenses();
    if (!expenses || expenses.length === 0) {
        throw json(
            { message: 'Could not load expenses.' },
            { status: 404, statusText: 'No expenses found' }
        );
    }
    return expenses;
}

export default function ExpensesAnalysisPage() {
    const expenses = useLoaderData();
    return (
        <main>
            <Chart expenses={expenses} />
            <ExpenseStatistics expenses={expenses} />
        </main>
    );
}

export function CatchBoundary() {
    const caughtResponse = useCatch();
    return (<main>
        <Error title={caughtResponse.satusText}>
            <p>{caughtResponse.data?.message || 'Something went wrong, could not load expenses.'}</p>
        </Error>

    </main>);
}