import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsersAndStories } from '../../actions/search_actions'
import SearchResults from './search_results'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      loading: true,
      query: ''
    }

    this.update = this.update.bind(this)
  }

  componentDidMount () {
    this.props.fetchAllUsersAndStories().then(
      this.setState({ loading: false })
    )
  }

  update (e) {
    this.setState({ query: e.target.value })
  }

  render () {
    
    if (this.state.loading) {
      return <div></div>
    }

    return (
      <div className="search-container">
        <input
          className="search-input"
          onChange={this.update}
          value={this.state.query}
          autoFocus />

        <SearchResults 
          query={this.state.query}
          stories={this.props.stories}
          users={this.props.users} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const users = Object.values(state.entities.users)
  const stories = Object.values(state.entities.stories)
  return {
    stories,
    users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsersAndStories: () => dispatch(fetchAllUsersAndStories())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Search)