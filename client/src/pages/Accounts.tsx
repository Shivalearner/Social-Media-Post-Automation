import { useEffect, useState } from "react";
import { dummyAccountsData, PLATFORMS } from "../assets/assets";
import { PlusIcon } from "lucide-react";
import AccountList from "../components/AccountList";
import PlatformPickerModel from "../components/PlatformPickerModel";

const Accounts = () => {
  // State variable
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async (
    isSync: boolean,
    platform?: string | null,
    successMsg?: string,
  ) => {
    setAccounts(dummyAccountsData);
    console.log(isSync, platform, successMsg);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // const handleConnect = async (platformId: string) => {
  //   setConnecting(platformId);
  //   setTimeout(() => {
  //     setConnecting(null);
  //     setAccounts((prev) => [...prev, dummyAccountsData[0]]);
  //     setShowPlatformPicker(false);
  //   }, 1000);
  // };

  const handleConnect = async (platformId: string) => {
  setConnecting(platformId);
  setTimeout(() => {
    setConnecting(null);
    // ✅ Find the dummy account for the chosen platform
    const newAccount = dummyAccountsData.find((a) => a.platform === platformId);
    if (newAccount) {
      setAccounts((prev) => [...prev, newAccount]);
    }
    setShowPlatformPicker(false);
  }, 1000);
};

  const handleDisconnect = async (accountId: string) => {
    setAccounts(accounts.filter((a) => a._id !== accountId));
  };

  const connectedIds = accounts.map((a) => a.platform);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col  items-start sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <div>
          <h2 className="text-xl text-slate-900">Connected Accounts</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <button
          onClick={() => setShowPlatformPicker(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-all w-full sm:w-auto justify-center"
        >
          <PlusIcon className="size-4" />
          Connect Account
        </button>
      </div>
      {/* Platform picker modal */}
      {showPlatformPicker && (
        <PlatformPickerModel
          connectedIds={connectedIds}
          connecting={connecting}
          onClose={() => setShowPlatformPicker(false)}
          onConnect={handleConnect}
        />
      )}
      {/* Connected accounts list */}
      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />
    </div>
  );
};

export default Accounts;
