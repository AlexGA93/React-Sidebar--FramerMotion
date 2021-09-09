import React from 'react';
import {motion} from 'framer-motion';
import './ToggleMenu.scss';


const Path = props => (
  //we want to animate every path of the list
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)" // setting color
      strokeLinecap="round"
      {...props}
    />
  );



export default function ToggleMenu(props) {
    // we pass toggleOpen as props from Sidebar component
    const {toggle} = props;

    return (

      <button onClick={toggle}>
        {/*  container for SVG graphics. */}
        <svg width="23" height="23" viewBox="0 0 23 23">
          {/* viewBox -> defines the position and dimension, in user space, of an SVG viewport. */}

          {/* 3 Bars Icon Initial state, transition to cross and reverse */}
          
          {/* bar #1 */}
           <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },// when closed bar horizontal
              open: { d: "M 3 16.5 L 17 2.5" } // when open bar inclined to bottom
            }}
          />
          {/* bar #2*/}
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 }, //  must be visible when menu is open 
              open: { opacity: 0 }   // must be invisible when close to draw a cross 
            }}
            transition={{ duration: 0.1 }}
          />
          {/* bar #2*/}
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },  // when closed bar horizontal
              open: { d: "M 3 2.5 L 17 16.346" } // when open bar inclined to up
            }}
          /> 
        </svg>
      </button>
    )
}
