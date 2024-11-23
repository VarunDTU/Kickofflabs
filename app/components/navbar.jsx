import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-full h-20">
      <div className="flex items-center justify-between p-2 border-b-2">
        <div className="logo">logo</div>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>

        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
