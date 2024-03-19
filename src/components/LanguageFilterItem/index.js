// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {LanguageFilterDetails, isActiveId, setActiveLanguageFilterId} = props
  const {id, language} = LanguageFilterDetails
  const className = isActiveId
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="language-list-container">
      <button
        type="button"
        className={className}
        onClick={onClickLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
