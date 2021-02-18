import { useEffect, useState } from "react";

function Dice({ rolls, setRoll }) {
  const [values, setRollValue] = useState([null]); 
  const [diceType, setDiceType] = useState(6);

  const rollDice = () => {
    const newMaxValue = Number(diceType) + 1
    const rollValue = Math.floor(Math.random() * Math.floor(newMaxValue));
    if(rolls.length <= 10 && values.length <= 10) {
      setRollValue([ ...values, rollValue ]);
      setRoll([...rolls, rollValue]);
    } else {
      setRollValue([ rollValue ])
      setRoll([ rollValue ])
    }
  }

  const chooseDice = ({ target }) => {
    setDiceType(target.value);
  }
  
  return (
    <div style={{margin: '20px'}}>
      <label for="dice">Choose a type of dice to roll: </label>
      <select id="dice" value={diceType} onChange={chooseDice}>
        <option value={4}>4-sided</option>
        <option value={6}>6-sided</option>
        <option value={10}>10-sided</option>
        <option value={12}>12-sided</option>
        <option value={20}>20-sided</option>
      </select>
      <p style={{display: 'flex', justifyContent: 'space-around'}}>
        {values.map((value, idx) => (
          <span key={idx}>{value}</span>
        ))}
      </p>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  )
}

export default function DiceGame() {
  const [firstDiceRolls, setFirstDiceRolls] = useState([]);
  const [secondDiceRolls, setSecondDiceRolls] = useState([]);
  const [total, setTotal] = useState(0);


  const calculateTotalPerDie = (diceRolls) => {
    return diceRolls.reduce((acc, ele) => {
      return acc += Number(ele);
    }, 0)
  }

  useEffect(() => {
    const firstDiceTotals = calculateTotalPerDie(firstDiceRolls);
    const secondDiceTotals = calculateTotalPerDie(secondDiceRolls);
    setTotal(Number(firstDiceTotals) + Number(secondDiceTotals));
  }, [firstDiceRolls, secondDiceRolls])

  return (
    <>
      <Dice rolls={firstDiceRolls} setRoll={setFirstDiceRolls} />
      <Dice rolls={secondDiceRolls} setRoll={setSecondDiceRolls} />
      <h1>Total: {total}</h1>
    </>
  );
}
