import {Routes, Route} from 'react-router-dom'
import Sidebar from '../Accounts/Sidebar/AccountSidebar'
import Profile from '../GeneralProfile/Profile'
import Dashboard from '../Accounts/AccountsDashboard/Dashboard'
import Fees from '../Accounts/FeesManager/Fees'
import Expense from '../Accounts/ExpenseManagement/Expense'
import './routes.css'
import AccountReports from '../Accounts/AccountReports/AccountReports'
import Settings from '../Accounts/AccountSettings/Settings'

function AppRoutes(){
    return (
       <>
       <Routes>

        {/* accounts Routes */}
        <Route path='/accounts/*' element={
        <div className="accounts_window">
            <Sidebar/>
         <div className="accounts_pages">
            <Routes>
             <Route path='account_profile' element={<Profile/>}/>
             <Route path='account_dashboard' element={<Dashboard/>}/>
             <Route path='fees' element={<Fees/>}/>
             <Route path='expense' element={<Expense/>}/>
             <Route path='account_reports' element={<AccountReports/>}/>
             <Route path='settings' element={<Settings/>}/>
            </Routes>
         </div>
        </div>
        }/>

       </Routes>
       </>
    )
}

export default AppRoutes