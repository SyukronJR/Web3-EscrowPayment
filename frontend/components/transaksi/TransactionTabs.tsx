"use client";

interface Props {

  activeTab: string;

  setActiveTab: (tab: string) => void;

}

export default function TransactionTabs({

  activeTab,

  setActiveTab,

}: Props) {

  const tabs = [

    {
      id: "create",
      title: "Buat Escrow",
    },

    {
      id: "active",
      title: "Escrow Aktif",
    },

    {
      id: "history",
      title: "Riwayat",
    },

  ];

  return (

    <div className="mt-6 border-b border-slate-200">

      <div className="flex gap-12">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              pb-5
              text-[18px]
              transition

              ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-600 font-semibold text-indigo-600"
                  : "text-slate-500 hover:text-indigo-600"
              }
            `}
          >

            {tab.title}

          </button>

        ))}

      </div>

    </div>

  );

}