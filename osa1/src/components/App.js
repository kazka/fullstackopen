import React from 'react';
import axios from 'axios';

const Country = (props) => {
  return (
    <div>
      <div onClick={props.handleClick}>{props.country.name} {props.country.population}</div>
    </div>
  )
}

const One = (props) => {
  {/*if (props.shown !== 1) {
    return null
  }*/}
  console.log(props)

  return (
    <div>
      <h4>{props.country.name}</h4>
      <p>{props.country.population}</p>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter: <input value={props.value} onChange={props.change} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      current: {},
      currentSet: false
    }
  }

  applyFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  setCurrent = (obj) => {
    console.log('set', obj)
    this.setState({ current: obj })
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  render() {
    const shownCountries =
      this.state.filter === '' ?
        [] : this.state.countries.filter(country => country.name.indexOf(this.state.filter) !== -1)

    const len = shownCountries.length

    return (
      <div>
        <h2>Maat</h2>

        <Filter value={this.state.filter} change={this.applyFilter} />
        <div>
          {len < 10 ? shownCountries.map(country => <Country key={country.name} country={country} handleClick={() => {this.setCurrent(country)}} />) : 'too many'}
          <One key={this.state.current.name} country={this.state.current} />
        </div>

      </div>
    )
  }
}

export default App
