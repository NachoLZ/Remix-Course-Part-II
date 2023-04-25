// /expenses/<some-id> => /expenses/expense-1, /expenes/e-1

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
import { redirect } from "@remix-run/node";
/*
export async function loader({ params }) {
    console.log('EXPENSES ID LOADER');
    const expenseId = params.id;
    const expense = await getExpense(expenseId);
    return expense;
}
*/
export async function action({params, request}) {
    const expenseId = params.id;
    if (request.method === 'PATCH') {
        const formData = await request.formData();
        const expenseData = Object.fromEntries(formData);

        try {
            validateExpenseInput(expenseData);
        } catch (error) {
            return error;
        }
        await updateExpense(expenseId, expenseData);
        return redirect('/expenses');

    } else if (request.method === 'DELETE') {
        await deleteExpense(expenseId);
        return {deletedId: expenseId};
    }



}

export default function UpdateExpensesPage() {
    const navigate = useNavigate();

    function closeHandler() {
        //Navigate programatically
        navigate('..'); //.. means go back one level
    }

    return (
        <Modal onCLose={closeHandler}>
            <ExpenseForm />
        </ Modal>
    )
}