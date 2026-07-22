import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  return (
    <div
      className="
      group
      w-full
      min-h-[300px]
      rounded-[28px]
      border
      border-[#EEF2F7]
      bg-white
      p-9
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
      "
    >
      <div
        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <h3 className="mb-3 text-[20px] font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-[16px] leading-8 text-slate-500">
        {description}
      </p>
    </div>
  );
}