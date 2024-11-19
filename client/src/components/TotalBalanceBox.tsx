import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = () => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: 1</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>

          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={5000} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
