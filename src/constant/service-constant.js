const CUSTOM_PLAN = {
  NAME: 'LEGACY',
  LABEL: 'Legacy',
  SLUG: 'legacy',
  AMOUNT: 0.00,
};

const CUSTOM_PLAN_VALUE = {
  APP: 25,
  STORAGE: 10240,
  TEAM_MEMBERS: 40,
  ORIGINAL_PRICE: '$0.00',
  APP_UPLOAD_SIZE: 1024
};

const ADDONS = {
  APP: 'APP',
  STORAGE: 'STORAGE',
  TEAM_MEMBERS: 'TEAM_MEMBERS',
  CODE_PUSH_BUNDLE: 'CODE_PUSH_BUNDLE',
}

const ADDONS_SLUG = {
  APP: 'app-monthly',
  STORAGE: 'storage-monthly',
  TEAM_MEMBERS: 'team-members-monthly',
  CODE_PUSH_BUNDLE: 'codepush-bundle-monthly',
}

const USER_ROLE = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER',
};

const FREE_PLAN_CONFIG = [
  {
    key: 'APP',
    unit: 'COUNT',
    value: 1,
    isFreePlan: true,
  },
  {
    key: 'STORAGE',
    unit: 'MB',
    value: 550,
    isFreePlan: true,
  },
  {
    key: 'TEAM_MEMBERS',
    unit: 'COUNT',
    value: 1,
    isFreePlan: true,
    isTeamSubscription: false,
  },
  {
    key: 'CODE_PUSH_BUNDLE',
    unit: 'COUNT',
    value: 1000,
    isFreePlan: true,
  },
];

module.exports = {
  CUSTOM_PLAN,
  CUSTOM_PLAN_VALUE,
  FREE_PLAN_CONFIG,
  USER_ROLE,
  ADDONS,
  ADDONS_SLUG,
};