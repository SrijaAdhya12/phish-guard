
export const ScanLine = ({ size = 200 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0"
    >
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          from="0 0"
          to="0 100"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  )
}