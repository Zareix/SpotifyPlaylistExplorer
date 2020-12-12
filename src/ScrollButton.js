import React, { useState } from "react";

import { FaArrowCircleUp } from "react-icons/fa";
import { useSpring, config } from "react-spring";
import { Transition } from "react-spring/renderprops";

import "./ScrollButton.css";

const ScrollButton = () => {
  // Défini un boolean showScroll dans le state
  //  et sa fonction setShowScroll
  const [showScroll, setShowScroll] = useState(false);

  // Test si l'on affiche ou non le bouton
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop); // Lance checkScrollTop quand le scroll change

  // Spring pour scroll au top
  const [, scrollTop] = useSpring(() => ({
    immediate: true,
    config: config.slow,
    onFrame: () => {
      window.scroll(window.pageYOffset, 0);
    },
  }));

  return (
    <div className="scrollButtonH">
      <Transition
        items={showScroll}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(showScroll) =>
          showScroll &&
          ((props) => (
            <div style={props} className="scrollButton">
              <FaArrowCircleUp
                onClick={() => {
                  scrollTop();
                }}
                size={30}
                />
            </div>
          ))
        }
      </Transition>
    </div>
  );
};

export default ScrollButton;
