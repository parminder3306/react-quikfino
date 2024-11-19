// import MobileNav from '../components/MobileNav';
import Sidebar from '../components/Sidebar';
import Home from '../pages/Home';

const User = () => {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <img src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>{/* <MobileNav /> */}</div>
        </div>
        <Home />
      </div>
    </main>
  );
};

export default User;
