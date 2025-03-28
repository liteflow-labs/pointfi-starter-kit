"use client";
import useLeaderboardPosition from "@/hooks/useLeaderboardPosition";
import { useAccount } from "wagmi";
import { ENSName } from "./ens-name";
import { WalletAvatar } from "./wallet-avatar";

export function Header() {
  const { address } = useAccount();
  const user = useLeaderboardPosition(address);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-10 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 md:flex-row md:gap-8 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-4 md:gap-x-6">
            <WalletAvatar />
            <h1 className="shrink-0">
              <div className="flex gap-2 font-semibold leading-6">
                <ENSName address={address} />
                {user.data && (
                  <div className="text-muted-foreground">
                    #{user.data.position}
                  </div>
                )}
              </div>
              <div className="mt-1 hidden text-sm leading-6 text-muted-foreground md:block">
                {address}
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-x-6">
            <div className="font-semibold leading-6">Total points</div>
            <div className="text-2xl font-semibold leading-6">
              {user.isLoading
                ? "-"
                : user.isError
                  ? "0"
                  : user.data?.points.toString() || "0"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
