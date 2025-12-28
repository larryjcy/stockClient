import { lazy } from 'react'

// project import
import Loadable from 'components/Loadable'
//import MainLayout from 'layout/MainLayout'
import DashboardLayout from 'layout/Dashboard'
import AuthGuard from "../guards/AuthGuards"



// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')))

// render - sample page
const SymbolTable = Loadable(lazy(() => import('pages/symbol/SymbolTable')))
const SymbolDetail = Loadable(lazy(() => import('pages/symbol/SymbolDetail')))
const SymbolEdit = Loadable(lazy(() => import('pages/symbol/SymbolEdit')))
const SymbolCreate = Loadable(lazy(() => import('pages/symbol/SymbolCreate')))


const CategoryTable = Loadable(lazy(() => import('pages/category/CategoryTable')))
const CategoryCreate = Loadable(lazy(() => import('pages/category/CategoryCreate')))
const CategoryEdit = Loadable(lazy(() => import('pages/category/CategoryEdit')))

const TradingViewWidget = Loadable(lazy(() => import('pages/chart/TradingViewWidget')))
const Chart = Loadable(lazy(() => import('pages/chart/Chart')))


const AuthLogout = Loadable(lazy(() => import('pages/auth/Logout')))
const Error404 = Loadable(lazy(() => import('pages/general/Error404')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element:  <AuthGuard navId={'public'} component={<DashboardLayout />} />,
  children: [
    {
      path: 'dashboard',
      element: <AuthGuard navId={'dashboard'} component={<DashboardDefault />} />
    },
    {
      path: 'dashboard/:id',
      element: <AuthGuard navId={'dashboard'} component={<DashboardDefault />} />
    },

    // {
    //   path: 'familyCreditSessionHistory',
    //   element: <AuthGuard navId={'familyCreditSessionHistory'} component={<FamilyCreditSessionHistory />}/>
    // },
    {
      path: 'symbol',
      element: <AuthGuard navId={'users'} component={<SymbolTable />} />
    },
    // {
    //   path: 'users',
    //   element: <AuthGuard navId={'users'} component={<UsersTable />} />
    // },
    {
      path: 'symbol/detail/:id',
      element: <AuthGuard navId={'user'} component={<SymbolDetail />} />
    },
    {
      path: 'symbol/edit/:id',
      element: <AuthGuard navId={'user'} component={<SymbolEdit />} />
    },
     {
      path: 'symbol/create',
      element: <AuthGuard navId={'user'} component={<SymbolCreate />} />
    },
    {
      path: 'categories',
      element: <AuthGuard navId={'category'} component={<CategoryTable />} />
    },
    {
      path: 'category/create',
      element: <AuthGuard navId={'category'} component={<CategoryCreate />} />
    },
    {
      path: 'category/edit/:id',
      element: <AuthGuard navId={'category'} component={<CategoryEdit />} />
    },
    {
      path: 'tradingViewWidget/:id',
      element: <AuthGuard navId={'TradingViewWidget'} component={<TradingViewWidget />} />
    },
    {
      path: 'chart/:id',
      element: <AuthGuard navId={'Chart'} component={<Chart />} />
    },
    {
      path: 'logout',
      element: <AuthGuard navId={'public'} component={<AuthLogout />} />
    },
    {
      path: '404',
      element: <AuthGuard navId={'public'} component={<Error404 />} />
    },
    {
      path: '*',
      element: <AuthGuard navId={'public'} component={<Error404 />} />
    }
  ]
}

export default MainRoutes
