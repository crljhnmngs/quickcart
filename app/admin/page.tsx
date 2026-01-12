import { handleLogout } from '../actions/auth';
import { auth } from '@/auth';

const Admin = async () => {
    const session = await auth();

    return (
        <div className="text-black">
            <h1>Admin Page</h1>
            <p>Welcome, {session?.user?.name}</p>
            <form action={handleLogout}>
                <button type="submit">Logout</button>
            </form>
        </div>
    );
};

export default Admin;
