import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeIdLanguageId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepository()
  }

  getRepository = async () => {
    const {activeIdLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeIdLanguageId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedData = fetchData.popular_repos.map(eachRepos => ({
        id: eachRepos.id,
        name: eachRepos.name,
        avatarUrl: eachRepos.avatar_url,
        forksCount: eachRepos.forks_count,
        issuesCount: eachRepos.issues_count,
        starsCount: eachRepos.stars_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryLoading = () => (
    <div>
      <Loader type="ThreeDots" hight={80} width={80} color="#0284c7" />
    </div>
  )

  renderRepositoryFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositorySuccessView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repository-List-container">
        {repositoriesData.map(repository => (
          <RepositoryItem repositoryDetails={repository} key={repository.id} />
        ))}
      </ul>
    )
  }

  renderRepositoryList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositorySuccessView()
      case apiStatusConstants.failure:
        return this.renderRepositoryFailureView()
      case apiStatusConstants.inProgress:
        return this.renderRepositoryLoading()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = id => {
    this.setState({activeIdLanguageId: id}, this.getRepository)
  }

  renderLanguageFilterList = () => {
    const {activeIdLanguageId} = this.state

    return (
      <ul className="language-menu">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            LanguageFilterDetails={eachLanguage}
            key={eachLanguage.id}
            isActiveId={eachLanguage.id === activeIdLanguageId}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="github-container">
        <div className="github-content">
          <h1 className="github-heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderRepositoryList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
