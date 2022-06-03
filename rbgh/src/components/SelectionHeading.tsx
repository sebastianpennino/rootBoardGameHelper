interface Props {
  playerName: string
  desc?: string
  loop: number
  totalLoops: number
}

export const SelectionHeading = (props: Props) => {
  const { loop, totalLoops, playerName, desc } = props
  return (
    <hgroup>
      <h3>
        <em title="player name">{playerName}</em>
        {desc ? ', ' : ''}
        {desc}:
      </h3>
      <h4>
        (Selection {loop + 1} of {totalLoops})
      </h4>
    </hgroup>
  )
}
