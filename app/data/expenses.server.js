import { prisma } from './database.server';

export async function addExpense(expenseData) {
    try{
    return await prisma.expense.create({
        data: {
            title: expenseData.title,
            amount: +expenseData.amount,
            date: new Date(expenseData.date)
        }
    });
    } catch (error) {
        console.log(error);
        throw new Error('Could not create expense.');
    }

}

export async function getExpenses() {
    try {
        const expenses = prisma.expense.findMany({ orderBy: { date: 'desc' } });
        return expenses;
    } catch (error) {
        console.log(error);
        throw new Error('Could not fetch expenses.');
    }

}

export async function updateExpense(id, expenseData) {
    try {

        return await prisma.expense.update({
            where: { id },
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            }
        });
    } catch {
        console.log(error);
        throw new Error('Could not update expense.');
    }

}

export async function deleteExpense(id) {
    try {
        await prisma.expense.delete({
            where: { id }
        })
    }catch (error) {
        console.log(error);
        throw new Error('Could not delete expense.');
    }

}