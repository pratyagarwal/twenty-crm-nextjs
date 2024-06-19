"use client";

import { FC } from "react";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { CreateTaskDrawer } from "~modules/tasks/layouts/create-task-drawer";

export const CreateTaskDrawerWrapper: FC = () => {
  const { getOrCreateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.CREATE_TASK);

  return <>{open ? <CreateTaskDrawer /> : null}</>;
};
