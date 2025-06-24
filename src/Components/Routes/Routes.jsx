import {Routes, Route} from 'react-router-dom'
import {lazy, Suspense, useEffect, useState} from 'react'
import { CircularProgress } from '@mui/material'

import './routes.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

// Acount Routes
import Sidebar from '../Accounts/Sidebar/AccountSidebar'
const Profile  = lazy(()=> import('../GeneralProfile/Profile'))
const Dashboard = lazy(()=> import('../Accounts/AccountsDashboard/Dashboard'))
const Fees =  lazy(()=>import('../Accounts/FeesManager/Fees'))
const TutionList = lazy(()=>import('../Accounts/TutionClearanceList/TutionClearance'))
const AccountReports = lazy(()=>import('../Accounts/AccountReports/AccountReports'))
const Settings = lazy(()=>import('../Accounts/AccountSettings/Settings'))

function AppRoutes(){
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); 
      setIsLoading(false);
    };
    initApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

   const LoadingSpinner = () => (
      <div className="center-content">
        <CircularProgress size={40} sx={{color:'#600018'}}/>
      </div>
    );

    return (
       <>
       <Routes>

        {/* accounts Routes */}
        <Route path='/accounts/*' element={
        <div className="accounts_window">
            <Sidebar/>
         <div className="accounts_pages">
            <Routes>
             <Route path='account_profile' element={<Suspense fallback={<LoadingSpinner />}><Profile/></Suspense>}/>
             <Route path='account_dashboard' element={<Suspense fallback={<LoadingSpinner />}><Dashboard/></Suspense>}/>
             <Route path='fees' element={<Suspense fallback={<LoadingSpinner />}><Fees/></Suspense>}/>
             <Route path='tution_list' element={<Suspense fallback={<LoadingSpinner />}><TutionList/></Suspense>}/>
             <Route path='account_reports' element={<Suspense fallback={<LoadingSpinner />}><AccountReports/></Suspense>}/>
             <Route path='settings' element={<Suspense fallback={<LoadingSpinner />}><Settings/></Suspense>}/>
            </Routes>
         </div>
        </div>
        }/>

       </Routes>
       </>
    )
}

export default AppRoutes