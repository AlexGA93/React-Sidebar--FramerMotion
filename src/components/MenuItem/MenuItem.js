import React from 'react';
import {motion} from 'framer-motion';
import {Icon} from 'semantic-ui-react';
import './MenuItem.scss';

const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
};
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export default function MenuItem(props) {
    const {i} = props;
    const style = { border: `2px solid ${colors[i]}` };
    return (
        <motion.li
        className="motionList"
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        >
            
            <div className="motionList__icon-placeholder" style={style} >
              <Icon className="motionList__icon-placeholder__menu-icon" name="shield alternate" size="small"/>
            </div>
            <div className="motionList__text-placeholder" style={style}>Test</div> 
            
        </motion.li>
    );
}
