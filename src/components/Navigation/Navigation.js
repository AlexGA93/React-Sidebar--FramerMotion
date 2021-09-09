import React from 'react';
import {motion} from 'framer-motion';
import MenuItem from '../MenuItem/MenuItem';

import './Navigation.scss';

// List mus be rendered by transition element by element
const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};
const itemIds = [0, 1, 2, 3, 4];

export default function Navigation() {
    return (
        <motion.ul variants={variants}>
            {/* Mapping as much elements as itemsId array content */}
            {itemIds.map(i => (
                <MenuItem i={i} key={i} />
            
            ))}
        </motion.ul>
    )
}
