/*
  Pick first method

  First, randomize player order.

  Each player chooses a faction
  Then the following player has less options
  Reach value is displayed

  if finalize and no reach is meet, 
  starts over or fixes automagically for you.

*/

export function ManualPage() {
  return (
    <>
      <div>Playername - 1 of 3</div>
      <div>Available factions:</div>
      <div>Total Reach: 11 of 33</div>
      <div>
        <button>Next / Finalize </button>
      </div>
    </>
  )
}
