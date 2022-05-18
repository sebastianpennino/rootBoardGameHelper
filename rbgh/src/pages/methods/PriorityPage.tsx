/*
  First, randomize player order.

  Each player gives each faction a priority

  Then the finalize displays the choosing
  having priorities first then player order 
  to resolve ties.

  The reach might be out of whack
*/

export function PriorityPage() {
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
