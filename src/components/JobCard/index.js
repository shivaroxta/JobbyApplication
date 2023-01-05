import {AiOutlineStar} from 'react-icons/ai'
import {FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    packagePerAnnum,
    location,
    obDescription,
    // eslint-disable-next-line
    id,
    employmentType,
    companyLogoUrl,
  } = jobDetails
  return (
    <li className="item">
      <div className="logo-title">
        <div className="logo">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title">
            <h1 className="company-heading">{title}</h1>
          </div>
          <div className="star">
            <AiOutlineStar className="star-rating" />
            <p className="rating"> {rating}</p>
          </div>
        </div>
      </div>
      <div className="location-type-LPA">
        <div className="location-type">
          <p className="location">
            <MdLocationOn className="location-rating" />
            {location}
          </p>
          <p className="type">
            <FaShoppingBag className="type-rating" />
            {employmentType}
          </p>
        </div>
        <div className="LPA">
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
      </div>
      <div className="Description">{obDescription}</div>
    </li>
  )
}

export default JobCard
