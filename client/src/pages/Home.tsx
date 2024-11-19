import HeaderBox from '../components/HeaderBox';
import TotalBalanceBox from '../components/TotalBalanceBox';

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox />
          <TotalBalanceBox />
        </header>
      </div>
    </section>
  );
};

export default Home;
