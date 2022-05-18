/*
  Results shows a list of player names
  with the given faction
  and the name of the method used
*/

export function Results() {
  return (
    <div className="results-page">
      <h3>Results</h3>
      <div className="container">
        <div className="row">
          <div className="column-1">PlayerName</div>
          <div className="column-2">Cats</div>
        </div>
        <div className="row">
          <div className="column-1">PlayerName</div>
          <div className="column-2">Birds</div>
        </div>
        <div className="row">
          <div className="column-1">PlayerName</div>
          <div className="column-2">Woodland Alliance</div>
        </div>
        <div className="row">
          <div className="column-1">PlayerName</div>
          <div className="column-2">Vagabond</div>
        </div>
        <div className="row">
          <div className="column-1">PlayerName</div>
          <div className="column-2">Duchy</div>
        </div>
      </div>
      <div>
        <button>Re-roll (methodName)</button>
        <button>Go back</button>
      </div>
    </div>
  )
}
