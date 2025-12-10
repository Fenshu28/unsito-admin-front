import React from "react";
import { Icon } from "@iconify/react";

const StatsCard = ({ title, value, subtitle, icon, trend, trendValue, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/20",
    green: "bg-green-100 dark:bg-green-900/20",
    purple: "bg-purple-100 dark:bg-purple-900/20",
    orange: "bg-orange-100 dark:bg-orange-900/20",
    red: "bg-red-100 dark:bg-red-900/20",
    cyan: "bg-cyan-100 dark:bg-cyan-900/20"
  };

  const iconColorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    orange: "text-orange-600 dark:text-orange-400",
    red: "text-red-600 dark:text-red-400",
    cyan: "text-cyan-600 dark:text-cyan-400"
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorClasses[color]}`}>
        <Icon icon={icon} className={`size-6 ${iconColorClasses[color]}`} />
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {value?.toLocaleString() || '0'}
          </h4>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {trend && trendValue !== undefined && (
          <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            <Icon icon={trend === 'up' ? 'mdi:arrow-up' : 'mdi:arrow-down'} className="size-4" />
            {trendValue}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
