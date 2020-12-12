import React, { useState } from "react";

import { FaArrowCircleUp } from "react-icons/fa";
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
                  window.scrollTo(0, 0, "smooth");
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
