// src/helpers/user.helper.ts

import { UserCountResponse } from "../models/response";

export const transformCountsToCategories = (counts: UserCountResponse) => {
  return [
    { type: 'Super Admin', count: counts.superAdmin, value:"Super-Admin"},
    { type: 'Users', count: counts.user, value: "User" },
    { type: 'System Integrators', count: counts.systemIntegrator,value:"System-Integrator" },
  ];
};
