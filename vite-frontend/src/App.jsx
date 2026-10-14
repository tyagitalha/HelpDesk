
import Landing from './Home-Page/Landing'
import Login from './Home-Page/login'
import Register from './Home-Page/register'
import UserTickets from './User/User.Tickets'
import CreateTicket from './User/Create-Ticket'
import UserDashboard from './User/User.Dashboard'
import { Route, Routes } from 'react-router-dom'
import TicketDetails from './User/Ticket-Details'
import Dashboard from './Admin/Dashboard'
import Tickets from './Admin/Tickets'
import AdminTicketDetails from './Admin/Admin.Ticket-Details'
import Logout from './components/Logout'
import About from './Home-Page/About'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/userDashboard' element={<UserDashboard />} />
            <Route path='/createTicket' element={<CreateTicket />} />
            <Route path='/allTicket' element={<Tickets/>} />
            <Route path='/userTicket' element={<UserTickets />} />
            <Route path='/userTicketDetail/:ticketId' element={<TicketDetails />} />
            <Route path='/adminDashboard' element={<Dashboard />} />
            <Route path='/adminticketdetail/:ticketId' element={<AdminTicketDetails />}/>
            <Route path='/logout' element={<Logout />} />
            <Route path='/about' element={<About />} />
        </Routes>
    )
}

export default App
