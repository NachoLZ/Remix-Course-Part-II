import { getExpenses } from '~/data/expenses.server';

export function loader() {
  return getExpenses();
}

export default function Expenses() {
    return (<h1>Expenses</h1>)
}