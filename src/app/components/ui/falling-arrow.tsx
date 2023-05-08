interface FallingArrowProps {
  onClick: () => void
  className: string
}

export function FallingArrow(props: FallingArrowProps) {
  return (
    <div className={props.className + ' falling-arrow'} onClick={props.onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
