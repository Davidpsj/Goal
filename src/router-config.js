import Login from './spa/Login';
import Home from './spa/Home';
import Dash from './spa/Dash/Dash';
import GeneralNotifications from './spa/GeneralNotifications';
import Goal from './spa/Goal/Goal';
import Notifications from './spa/Goal/Notifications';
import EditGoal from './spa/Goal/Edit';
import NewGoal from './spa/Goal/NewGoal';

import database from './vuex/database';

/* eslint-disable import/prefer-default-export */
export const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'dash',
        name: 'dash',
        component: Dash,
      },
      {
        path: 'goal',
        name: 'goal',
        component: NewGoal,
      },
      {
        path: 'goal/:id',
        component: Goal,
      },
      {
        path: 'goal/:id/notifications',
        component: Notifications,
      },
      {
        path: 'goal/:id/edit',
        component: EditGoal,
      },
      {
        path: '/notifications',
        component: GeneralNotifications,
      },
    ],
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const createDatabaseIfNotExists = () => {
  database.getDoc('goals')
    .catch(() => database.persist());
};

export const routesConfig = (to) => {
  if (to.path === '/logout') {
    database.destroyDatabase()
      .then(() => {
        to.path = '/login';
      });
  } else {
    createDatabaseIfNotExists();
  }
};
