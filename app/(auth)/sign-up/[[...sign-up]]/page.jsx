import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full mt-40">
      <SignUp afterSignUpUrl={'/dashboard'} />
    </div>
  );
}
