/*
useState -> deal with react states and props
useRef -> mutable value that exists for the lifetime of the component
useDimensions -> measure any element in our DOM
useCycle -> we wanto to cycle throught different values like open or closed
*/

import React, {useRef} from 'react';
import useDimensions from 'react-use-dimensions';
import {motion, useCycle} from 'framer-motion';

import ToggleMenu from '../ToggleMenu/ToggleMenu';
import Navigation from '../Navigation/Navigation';

import './Sidebar.scss';


// sidebar variant options defined to 'open' and 'close' animation
const sidebarVariants = {
  // to opened visualization we want to declare a max height(for this state we will render an animation)
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 86.5% 39px)`,
      transition: {
        type: "spring", // type of animation
        stiffness: 20,
        restDelta: 2 // End animation if distance is below this value 
      }
    }),
    closed: { // when closed we want to render a circle in the coordinades wit ha animation(transition) to close itself
      clipPath: "circle(30px at 86.5% 39px)",
      // closing to circle animation
      transition: {
        delay: 0.5, // time to deal with animation
        type: "spring",// type of animation
        stiffness: 400,
        damping: 40
      }
    }
  };

export default function Sidebar() {

  // we need to define cycles for open and close menu
  const [isOpen, toggleOpen] = useCycle(false, true); // Initially is closed and toggle state is true
  // Define a react mutable value as null
  const containerRef = useRef(null);

  const { height } = useDimensions(containerRef);
  return (
    // first smart component 'motion.nav'
    <motion.nav 
    className="motion-nav"
    initial={false}  // initial prop defined to false to use the value in 'aimate' prop
    animate={
      // We want an animation effect when component's cycle change
      isOpen ? "open" : "closed"
    }
    // variant defined as function that resolves when it's accessed
    custom={height}
    ref={containerRef}>

      {/* Configure Background - Open and Closed Animations in variants */}
      <motion.div className="background" variants={sidebarVariants} />
      
      {/* Button to display menu content by toggle the component state between open or close */}
      <ToggleMenu toggle={() =>toggleOpen()} />
  

      {/* We want to access to the siodebar content mapping the items */}
      <Navigation />
    
    </motion.nav>
      
  )
}
