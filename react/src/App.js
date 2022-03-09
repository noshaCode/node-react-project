import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateQuestion from './components/CreateQuestion';
import Layout from './components/Layout';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import QuestionsList from './components/QuestionsList';
import ReadQuestion from './components/ReadQuestion';
import Signup from './components/Signup';
import EditQuestion from './components/EditQuestion';
import LogIn from './components/LogIn'



export const UserContext = React.createContext(null)

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user:user, setUser: setUser}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuestionsList />} />
          <Route path="signup" element={<Signup setUser={setUser} />} />
          <Route path="logout" element={<Logout />} />
          <Route path="login" element={<LogIn />} />

          


          <Route path="questions">
                <Route index element={<QuestionsList />} />
                <Route path=":id" element={<ReadQuestion/>} /> 
                
                <Route path="new" element={<CreateQuestion/>} />
                <Route path="edit/:id" element={<EditQuestion/>} />
               
          </Route>
        
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
