import { Link, useLocation } from 'react-router-dom';

export const sidebarLinks = [
  {
    imgURL: '/icons/home.svg',
    route: '/',
    label: 'Dashboard',
  },
  {
    imgURL: '/icons/dollar-circle.svg',
    route: '/my-banks',
    label: 'My Banks',
  },
  {
    imgURL: '/icons/transaction.svg',
    route: '/transaction-history',
    label: 'Transaction History',
  },
  {
    imgURL: '/icons/money-send.svg',
    route: '/payment-transfer',
    label: 'Transfer Funds',
  },
];

// Sidebar component
const Sidebar = () => {
  const location = useLocation();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link to="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <img
            src="/icons/app-icon.png"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
        </Link>

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((item) => {
            const isActive =
              location.pathname === item.route ||
              location.pathname.startsWith(`${item.route}/`);

            return (
              <li key={item.label}>
                <Link
                  to={item.route}
                  className={`sidebar-link ${
                    isActive ? 'bg-bank-gradient' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="relative size-6">
                    <img
                      src={item.imgURL}
                      alt={item.label}
                      className={`sidebar-label ${
                        isActive ? 'brightness-[3] invert-0' : ''
                      }`}
                    />
                  </div>
                  <p
                    className={`sidebar-label ${isActive ? '!text-white' : ''}`}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
