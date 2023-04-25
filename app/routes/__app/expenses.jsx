// /expenses => shared layout

import { Outlet, Link, useLoaderData, useCatch } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { getExpenses } from '~/data/expenses.server';
import { json } from '@remix-run/node';

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
];
*/

export async function loader() {
    console.log('EXPENSES LOADER');
    const expenses = await getExpenses();

    return expenses;
    /*
    if (!expenses || expenses.length === 0) {
        throw json(
            { message: 'Could not find any expenses.' },
            { status: 404, statusText: 'No expenses found' }
        );
    }

    return getExpenses();*/
}

export function CatchBoundary() {
    const caughtResponse = useCatch();
    return (<main>
        <Error title={caughtResponse.satusText}>
            <p>{caughtResponse.data?.message || 'Something went wrong, could not load expenses.'}</p>
        </Error>

    </main>);
}

export default function ExpensesLayout() {
    const expenses = useLoaderData();
    console.log(expenses);

    const hasExpenses=expenses && expenses.length > 0;

    return (
        <>
            <Outlet />
            <section id="expenses-actions">
                <Link to="add">
                    <FaPlus />
                    <span>Add Expense</span>
                </Link>
                <a href="/expenses/raw">
                    <FaDownload />
                    <span>Download Raw Data</span>
                </a>
            </section>
            <main>
                {hasExpenses && <ExpensesList expenses={expenses} />}
                {!hasExpenses && <section id="no-expenses"><h1>No expenses found</h1><p>Start <Link to="add">adding some</Link> today.</p></section>}
            </main>
        </>
    );
}
