import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko nimi={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <h4>{props.nimi}</h4>
  )
}

const Yhteensa = (props) => {
  const yht = props.osat.reduce( (sum,cur) => sum + cur.tehtavia , 0)

  return (
    <p>yhteensä {yht}</p>
  )
}

const Sisalto = (props) => {
  const osat = props.osat

  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
    </div>
  )
}

const Osa = (props) => {
  return (
    <p>{props.nimi} {props.tehtavia}</p>
  )
}

export default Kurssi
