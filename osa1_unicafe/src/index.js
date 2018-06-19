import React from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = (props) => {
  if (props.keskiarvo === 0) {
    return (
      <div>
        'ei vielä statistiikkaa'
      </div>
    )
  }

  return  (
    <table>
      <tbody>
        <Statistic text='hyvä:' value={props.hyva} />
        <Statistic text='neutraali:' value={props.neutraali} />
        <Statistic text='huono:' value={props.huono} />
        <Statistic text='keskiarvo:' value={props.keskiarvo} />
        <Statistic text='positiivisia:' value={props.pos} />
      </tbody>
    </table>
  )

}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  addHyva = () => {
    this.setState({hyva: this.state.hyva + 1})
  }

  addNeutraali = () => {
    this.setState({neutraali: this.state.neutraali + 1})
  }

  addHuono = () => {
    this.setState({huono: this.state.huono + 1})
  }

  render() {
    const keskiarvo = () => (this.state.hyva + this.state.huono + this.state.neutraali) / 3
    const pos = () => this.state.hyva / (this.state.hyva + this.state.huono + this.state.neutraali) * 100

    return (
      <div>
        <h4>anna palautetta</h4>
        <Button handleClick={this.addHyva} text='hyvä' />
        <Button handleClick={this.addNeutraali} text='neutraali' />
        <Button handleClick={this.addHuono} text='huono' />

        <h4>statistiikka</h4>
        <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} keskiarvo={keskiarvo()} pos={pos()} />
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
