interface FallingArrowProps {
  onClick: () => void
  className: string
}

export function FallingArrow(props: FallingArrowProps) {
  return (
    <div className={'falling-arrow ' + props.className} onClick={props.onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
