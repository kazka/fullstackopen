import React from 'react'
import ReactDOM from 'react-dom'
import Kurssi from './components/Kurssi'


const App = () => {
  const kurssit = [
    {
      nimi: 'Lorem ipsum',
      id: 1,
      osat: [
        {
          nimi: 'Xxx',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Yyy',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Zzz',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Aaa',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Bbb',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {kurssit.map(kurssi => <Kurssi kurssi={kurssi} />)}
    </div>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
