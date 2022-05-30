import { NavLink } from 'react-router-dom'

export const SelectionFooter = () => {
  return (
    <div>
      {/* priority-page */}
      {/* {loop <= players.length - 1 ? (
        <button
          className="fake-btn-next"
          onClick={setUpNextLoop}
          disabled={
            priorityArr.reduce((acc, curr) => {
              return acc + (curr !== 0 ? 1 : 0)
            }, 0) < PRIORITY_SELECTION
          }
        >
          Save & Continue
        </button>
      ) : (
        <div className="fake-btn">
          <NavLink to={`/results?type=${Methods.PRIORITY}`} className={(n) => (n.isActive ? 'active' : '')}>
            Finalize: Results Priority
          </NavLink>
        </div>
      )}
      <div className="fake-btn">
        <NavLink to="/">Back to start</NavLink>
      </div> */}
      {/* Manual page */}
      {/* <div>
        {loop < players.length - 1 ? (
          <button className="fake-btn-next" onClick={setUpNextLoop}>
            Save & Continue
          </button>
        ) : (
          <div className="fake-btn">
            <NavLink to={`/results?type=${Methods.PICK}`}>Finalize: Results Pick</NavLink>
          </div>
        )}
        <div className="fake-btn">
          <NavLink to="/">Back to start</NavLink>
        </div>
      </div> */}
      {/* Filter random faction page */}
      {/* 
      <div>
            Selected:{' '}
            {availablefactions.find((faction: SelectableFaction) => {
              return faction.selected
            })?.name || 'None'}{' '}
            (Reach:{' '}
            {availablefactions.find((faction: SelectableFaction) => {
              return faction.selected
            })?.reach || 0}
            )
          </div>

          <div>
            Total Reach: {calculateSelectedReach()} of a recommended {minReachByPlayers[players.length]}
          </div>
      
      
      {isValidSelection().success ? (
        <div className="fake-btn">
          <NavLink to={`/results?type=${Methods.RANDOM}`} className={(n) => (n.isActive ? 'active' : '')}>
            Finalize: Results Random
          </NavLink>
        </div>
      ) : (
        <>Error: {isValidSelection().msg}</>
      )}
      <div className="fake-btn">
        <NavLink to="/">Back to start</NavLink>
      </div> */}
      <div className="fake-btn">
        <NavLink to="/">Back to start</NavLink>
      </div>
    </div>
  )
}
