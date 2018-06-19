import React from 'react';
import personService from '../services/persons'

const Person = (props) => {
  return (
    <div>
      <p>{props.person.name} {props.person.number}</p>
      <button onClick={() => props.handleClick(props.person.id)}>poista</button>
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

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newPerson: '',
      newPhone: '',
      filter: '',
      error: ''
    }
  }

  handleForm = (event) => {
    event.preventDefault()

    const personObject = {
      name: this.state.newPerson,
      number: this.state.newPhone
    }

    const same = this.state.persons.filter(p => p.name === this.state.newPerson)
    if(same.length !== 0) {
      this.updatePerson(same[0], personObject)
    } else {
      this.addPerson(personObject)
    }
  }

  addPerson = (obj) => {
    personService
      .create(obj)
      .then(response => {
        const persons = this.state.persons.filter(p => p.name !== obj.name)

        this.setState({
          persons: persons.concat(response.data),
          newPerson: '',
          newPhone: ''
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updatePerson = (old, obj) => {
    if(window.confirm('korvataanko')) {
      personService
        .update(old.id, obj)
        .then(obj => {
          const persons = this.state.persons.filter(p => p.id !== old.id)
          console.log(persons)
          this.setState({
            persons: persons.concat(obj.data)
          })
          console.log('state', this.state.persons)
        })
        .catch(error => {
          console.log('not exist')
          this.addPerson(obj)
        })
    }
  }

  deletePerson = (id) => {
    console.log(id)
    if (window.confirm('poistetaanko')) {
      personService.del(id)
        .then(response => {
          const persons = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons,
            error: 'deleted succesfully'
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
    }
  }

  handleValueChange = (event) => {
    this.setState({ newPerson: event.target.value })
  }

  handlePhoneValueChange = (event) => {
    this.setState({ newPhone: event.target.value })
  }

  applyFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        console.log('res', response)
        this.setState({persons: response.data})
      })
  }

  render() {
    const shownPersons =
      this.state.filter === '' ?
        this.state.persons :
        this.state.persons.filter(person => person.name.indexOf(this.state.filter) !== -1)

    return (
      <div>

        <Error message={this.state.error}/>

        <h2>PL</h2>

        <form onSubmit={this.handleForm}>
          <div>
            nimi: <input
            value={this.state.newPerson}
            onChange={this.handleValueChange} />
            puh: <input
            value={this.state.newPhone}
            onChange={this.handlePhoneValueChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <Filter value={this.state.filter} change={this.applyFilter} />
        <div>
          {shownPersons.map(person => <Person key={person.id} person={person} handleClick={this.deletePerson} />)}
        </div>

      </div>
    )
  }
}

export default App
