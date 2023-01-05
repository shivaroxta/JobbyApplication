import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="text-container">
        <h1 className="home-heading">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary
          <br /> information, company reviews. Find the job that fits your
          <br /> abilities and potential.
        </p>{' '}
        <Link to="/jobs">
          {' '}
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
