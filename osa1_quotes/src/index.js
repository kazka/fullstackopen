import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: [0,0,0,0,0,0],
      maxIndex: 0
    }
  }

  showRandom = () => {
    this.setState({selected: Math.floor(Math.random() * anecdotes.length)})
  }

  vote = () => {
    const newPoints = [...this.state.points]
    newPoints[this.state.selected]++
    this.setState({points: newPoints})
    if (newPoints[this.state.selected] > this.state.points[this.state.maxIndex]) {
      this.setState({maxIndex: this.state.selected})
    }
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br/>
        <p>has {this.state.points[this.state.selected]} votes</p>
        <br/>
        <button onClick={this.showRandom}>vaihda</button>
        <button onClick={this.vote}>äänestä</button>

        <h4>most votes</h4>
        <p>{this.props.anecdotes[this.state.maxIndex]}</p>
        <p>has {this.state.points[this.state.maxIndex]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
