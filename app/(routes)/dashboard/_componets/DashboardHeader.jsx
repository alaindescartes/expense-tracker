import { UserButton } from '@clerk/nextjs';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const DashboardHeader = ({ open, hide }) => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div className="">
        <HamburgerMenuIcon
          onClick={open}
          className="text-primary transform animate-scale-pulse"
        />
      </div>
      <div className="animate-scale-pulse">
        <UserButton />
      </div>
    </div>
  );
};
export default DashboardHeader;
