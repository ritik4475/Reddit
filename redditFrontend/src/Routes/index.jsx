import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedPage from '../Pages/FeedPage';
import CreatePostPage from '../components/Posts/CreatePostPage';
import Login from '../Pages/common/Login';
import Signup from '../Pages/common/Signup';
import ProtectedRoutes from './protectedRoutes';
import PostDetails from '../components/Posts/PostDetails';
import ProfilePages from '../Pages/common/ProfilePages';
import Profile from '../Pages/common/Profile';

const RoutesPage = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element=<FeedPage /> />
                <Route path="/login" element=<Login /> />
                <Route path="/signup" element=<Signup /> />
                <Route path="/create-post" element=<ProtectedRoutes Component={CreatePostPage} /> />
                <Route path="/post/:id" element=<ProtectedRoutes Component={PostDetails} /> />
                <Route path="/profile/:id" element=<ProtectedRoutes Component={ProfilePages} /> />
                <Route path="/profile" element=<ProtectedRoutes Component={Profile} /> />
                {/* <Route component={NotFound} /> */}
            </Routes>
        </Router>
    )
}

export default RoutesPage;