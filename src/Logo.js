import logo from "./spotifyLogo.svg";
import { useSpring, animated } from "react-spring";

const Logo = (props) => {
  const spring1 = useSpring({ width: 140, from: { width: 0 } });

  const spring2 = useSpring({ width: 100, from: { width: 0 } });

  return (
    <animated.img
      src={logo}
      className="mt-4 mb-2"
      style={props.tokenIsSet ? spring2 : spring1}
      alt="logo"
    />
  );
};

export default Logo;
