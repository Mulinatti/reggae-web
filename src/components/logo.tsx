import Image from "next/image"

interface LogoProps {
  width: number;
  height: number;
}

const Logo = ({width, height}: LogoProps) => {
  return (
    <Image width={width} height={height} src="/logo.png" alt="" />
  )
}

export default Logo