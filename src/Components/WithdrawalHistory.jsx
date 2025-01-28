import React from 'react';
import useWithdrawalsHistory from '../hooks/useWithdrawalsHistory';




const WithdrawalHistory = () => {
    const [withdrawals, refetch] = useWithdrawalsHistory();

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Withdrawals History</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Coins</th>
                            <th>Dollar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawals && withdrawals.length > 0 ? (
                            withdrawals.map((withdrawal, index) => (
                                <tr key={withdrawal.id || index}>
                                    <th>{index + 1}</th>
                                    <td>{withdrawal.email}</td>
                                    <td>{withdrawal.coin}</td>
                                    <td>{withdrawal.dollar}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No withdrawals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




export default WithdrawalHistory;