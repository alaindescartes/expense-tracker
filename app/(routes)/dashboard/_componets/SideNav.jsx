'use client';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SideNav = ({ toggle }) => {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets',
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses',
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade',
    },
  ];
  const path = usePathname();
  return (
    <div className="h-screen p-5 border shadow-md">
      <Image
        src={'/logoipsum-332.svg'}
        alt={'logo image'}
        width={100}
        height={80}
        className="mb-4"
      />
      <div>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium
            p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 mb-2
            ${path === menu.path && 'text-primary bg-blue-100'}`}
              onClick={toggle}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className=" fixed bottom-10 p-5 flex gap-2 items-center font-semibold">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;
