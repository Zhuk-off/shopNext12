import { Status } from '@/src/interfaces/apollo/historyPage.interface';
import React from 'react';

function StatusLabel({ status }: { status: Status }) {
  switch (status) {
    case Status.Pending:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          ожидается оплата
        </span>
      );

    case Status.Processing:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          обработка
        </span>
      );

    case Status.Completed:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          выполнен
        </span>
      );
    case Status.OnHold:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          на удержании
        </span>
      );

    case Status.Cancelled:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
          отменен
        </span>
      );
    case Status.Refunded:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
          возвращен
        </span>
      );
    case Status.Failed:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          не удался
        </span>
      );
    case Status.CheckoutDraft:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          черновик
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          без статуса
        </span>
      );
  }

  return <div></div>;
}

export default StatusLabel;
