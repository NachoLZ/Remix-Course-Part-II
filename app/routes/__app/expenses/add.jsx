

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { addExpense } from '~/data/expenses.server';
import { redirect } from '@remix-run/node';
import { validateExpenseInput } from '~/data/validation.server';

export async function action({ request }) {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData); //Converts to object so we don't use 'get' many times
    console.log(expenseData, formData);
    try {
        validateExpenseInput(expenseData);
    } catch (error) {
        return error;
    }


    await addExpense(expenseData);
    return redirect('/expenses'); //Redirect to expenses page (see app\routes\__app\expenses.jsx

}

export default function AddExpensesPage() {
    const navigate = useNavigate();

    function closeHandler() {
        //Navigate programatically
        navigate('..'); //.. means go back one level
    }


    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>
    )
}