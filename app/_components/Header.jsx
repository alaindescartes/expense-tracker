'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm ">
      <Image src={'./logoipsum-332.svg'} alt="logo" width={100} height={80} />
      <Link href={'/sign-in'}>
        <Button> {isSignedIn ? <UserButton /> : 'Get started'}</Button>
      </Link>
    </div>
  );
}

export default Header;
