import React, {Component} from 'react'
import Result from './Result';
import './Search.css';
class Search extends Component {
  state = {
    filter:[],
    value:'',
    found:false,
  }

  handleChange = (event) => {
    if(event.target.value.length >= 2) {
      let filtered = this.props.songs.filter(song => song.name.toLowerCase().includes(event.target.value.toLowerCase()) )
      this.setState({filter:filtered,value:event.target.value})
      if(filtered.length > 0) {
        this.setState({found:true})
      } else {
        this.setState({found:false})
      }
    }

  };

  render() {
    return(
      <div className="searchContainer">
        <div className="searchbar">
        <input id="searchBar" type="text" name="search" onChange={this.handleChange} placeholder="Start typing..."/>
        </div>
        <section type="songs">
        <Result results={this.state.filter} value={this.state.value} found={this.state.found}/>
        </section>
      </div>
    )
  }
}

export default Search;
