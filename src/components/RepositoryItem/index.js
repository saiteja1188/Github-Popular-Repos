// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    id,
    name,
    avatarUrl,
    forksCount,
    issuesCount,
    starsCount,
  } = repositoryDetails
  console.log(id)
  return (
    <li className="repos-list-container">
      <img src={avatarUrl} alt={name} className="repos-list-img" />
      <h1 className="repos-list-heading">{name}</h1>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-icon"
        />
        <p>{starsCount} Star</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-icon"
        />
        <p>{forksCount} Forks</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="issues"
          className="star-icon"
        />
        <p className="counts">{issuesCount} open Issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
