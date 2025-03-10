import React from "react";
import { ViewState } from "@/gui/store";

export interface LazyOllamaDashboardSidebarNavigationItemProps {
  to: ViewState;
  label: string;
  icon: React.ReactNode;
}