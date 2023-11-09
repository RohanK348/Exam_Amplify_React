import React from 'react'
import {FiBox} from 'react-icons/fi'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {formatCurrency} from '../functions/numbers'

const Index = () => {
  const items = [
    {name: 'Creative Design', hours: 80, rate: 40},
    {name: 'Front end development', hours: 120, rate: 60},
    {name: 'API development', hours: 80, rate: 40}
  ]
  const account = {
    bank: 'Barclays UK',
    account: '#13244657',
    date: 'Jan 17, 2021'
  }

  return (
    <>
      <SectionTitle title="Pages" subtitle="Invoice" />
      <Widget>
        <div className="p-4">
          <div className="flex flex-row items-center justify-between mb-16">
            <div className="flex flex-col">
              <span className="text-blue-500 text-4xl uppercase font-bold">
                Invoice
              </span>
              <span className="text-grey-500">#16274619</span>
            </div>
            <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start whitespace-no-wrap">
              <div className="flex flex-row items-center justify-start space-x-2 text-blue-500">
                <FiBox size={28} className="stroke-current text-blue-500" />
                <span>Company logo</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-16">
            <div className="flex flex-col">
              <span className="font-bold">Invoice to:</span>
              <span className="text-grey-500">John Doe</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Date:</span>
              <span className="text-grey-500">Dec 17, 2020</span>
            </div>
          </div>
          <table className="w-full table-auto mb-16 text-left">
            <thead>
              <tr>
                <th className="pr-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Rate
                </th>
                <th className="pl-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="pr-3 py-2 whitespace-no-wrap font-bold">
                    {item.name}
                  </td>
                  <td className="px-3 py-2 whitespace-no-wrap">{item.hours}</td>
                  <td className="px-3 py-2 whitespace-no-wrap">
                    {formatCurrency(item.rate)}
                  </td>
                  <td className="pl-3 py-2 whitespace-no-wrap text-right">
                    {formatCurrency(item.rate * item.hours)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row w-full mb-16">
            <div className="flex flex-col w-1/2">
              <div className="font-bold mb-2">Payment details</div>
              <table className="w-full table-auto text-left">
                <tbody>
                  <tr>
                    <td className="pr-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Bank
                    </td>
                    <td className="pl-3 py-2 whitespace-no-wrap">
                      {account.bank}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Account
                    </td>
                    <td className="pl-3 py-2 whitespace-no-wrap">
                      {account.account}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-grey-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Due date
                    </td>
                    <td className="pl-3 py-2 whitespace-no-wrap">
                      {account.date}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col w-1/2 self-center text-right">
              <span className="font-bold">Total amount</span>
              <span className="text-4xl font-bold text-blue-500">$20,220</span>
              <span className="text-grey-500">VAT free</span>
            </div>
          </div>
        </div>
      </Widget>
    </>
  )
}
export default Index
