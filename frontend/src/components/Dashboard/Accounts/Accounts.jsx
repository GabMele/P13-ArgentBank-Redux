// src/components/Accounts/Accounts.jsx
/**
 * Accounts component displays a list of user accounts, either from the 
 * provided `accounts` prop, Redux state, or fallback to dummy data.
 * 
 * It uses `safeAccounts` to ensure that the provided `accounts` prop is 
 * safely used. If no `accounts` prop is passed, it defaults to using 
 * `reduxAccounts` from the Redux store, or dummy data if neither are available.
 * 
 * Each account displays:
 * - The account title (e.g., checking, savings, credit card).
 * - The account balance or amount.
 * - The account description (e.g., Available Balance, Current Balance).
 * 
 * This component also includes the `Account` subcomponent for rendering 
 * each individual account's details.
 */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from "./Accounts.module.scss";

const Account = ({ title, amount, description }) => (
  <div className={styles.accountContainer}>
    <div className={styles.accountContentWrapper}>
      <h3 className={styles.accountTitle}>{title}</h3>
      <p className={styles.accountAmount}>{amount}</p>
      <p className={styles.accountAmountDescription}>{description}</p>
    </div>
    <div className={`${styles.accountCta}`}>
      <button className={styles.accountTransactionButton}>View transactions</button>
    </div>
  </div>
);

Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Accounts = ({ accounts }) => {
  /**
   * `safeAccounts` ensures that the provided `accounts` prop is used safely.
   * If no prop is passed, it defaults to an empty array to avoid runtime errors.
   */
  const reduxAccounts = useSelector((state) => state?.accounts?.data) || [];
  const safeAccounts = accounts || [];  // Default to an empty array if no prop is provided.

  const dummyAccounts = [
    { title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
    { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
  ];

  const accountsData = safeAccounts.length > 0
    ? safeAccounts
    : reduxAccounts.length > 0
      ? reduxAccounts
      : dummyAccounts;

  console.debug("accountsData render:", accountsData);
  return (
    <section className={styles.accountsWrapper}>
      <h2 className="sr-only">Accounts</h2>
      {accountsData.map((account, index) => (
        <Account key={index} {...account} />
      ))}
    </section>
  );
};

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default Accounts;
