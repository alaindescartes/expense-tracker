'use client';
import SideNav from '@/app/(routes)/dashboard/_componets/SideNav';
import DashboardHeader from '@/app/(routes)/dashboard/_componets/DashboardHeader';
import db from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!isOpen);
  };

  const checkUserBudget = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));
      if (result?.length === 0) {
        await router.replace('/dashboard/budgets');
      }
    }
  };

  useEffect(() => {
    console.log('isOpen:', isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isLoaded && user) {
      checkUserBudget();
    }
  }, [isLoaded, user]);

  return (
    <div>
      {/* SideNav for desktop */}
      <div className={`fixed md:w-64 hidden md:block ${isOpen ? 'block' : ''}`}>
        <SideNav open={isOpen} />
      </div>

      {/* SideNav for mobile */}
      <div
        className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleNav}
      >
        <div
          className="bg-white w-64 h-full shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <SideNav open={isOpen} toggle={toggleNav} />
        </div>
      </div>

      {/* Main content area */}
      <div
        className={`md:ml-64 transition-all duration-300 ${
          isOpen && 'ml-0 md:ml-64'
        }`}
      >
        <DashboardHeader open={toggleNav} hide={isOpen} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
