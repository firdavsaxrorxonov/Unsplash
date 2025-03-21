import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'


function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className='max-w-[1600px] mx-auto px-5'>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
