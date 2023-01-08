import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import JobCard from '../JobCard'
import FilterGroups from '../FilterGroups'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [employmentId, setEmploymentId] = useState([])
  const [salaryId, setSalaryId] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  //   const jwtToken = cookies.get('jwt_token')
  //   if (jwtToken === undefined) {
  //     return <Redirect to="/login" />
  //     setIsLogged(true)
  //   }

  const getJobsDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentId.join()}&minimum_package=${salaryId}search=${searchInput}`
    // &minimum_package=${salaryRange}
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        obDescription: job.ob_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      setJobs(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getJobsDetails()
    // eslint-disable-next-line
  }, [employmentId, salaryId])

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      getJobsDetails()
    }
  }

  const changeEmployment = type => {
    setEmploymentId(prevState => [...prevState, type])

    console.log(employmentId)
  }

  const changeSalary = salary => {
    setSalaryId(salary)
    console.log(salaryId)
  }

  const renderSuccessView = () => {
    ;<div className="success-container">
      <input
        type="text"
        className="search-input"
        value={searchInput}
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onKeyDownSearchInput}
      />
      <button type="button" className="searchButton">
        <BsSearch className="search-icon" />
      </button>
      <ul className="job-items">
        {jobs.map(item => (
          <JobCard jobDetails={item} key={item.id} />
        ))}
      </ul>
    </div>
  }

  const onClickGetJobDetails = () => {
    getJobsDetails()
  }

  const renderFailureView = () => {
    ;<div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={onClickGetJobDetails}
      >
        Retry
      </button>
    </div>
  }

  const renderLoader = () => {
    ;<div>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  }

  const renderJobs = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoader()
      default:
        return null
    }
  }

  return (
    <div className="jobs-container">
      <div className="sidebar">
        <FilterGroups
          setSalaryId={setSalaryId}
          setEmploymentId={setEmploymentId}
          salaryId={salaryId}
          employmentId={employmentId}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          changeEmployment={changeEmployment}
          changeSalary={changeSalary}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
      </div>

      <div className="job-details">{renderJobs}</div>
    </div>
  )
}
export default Jobs
