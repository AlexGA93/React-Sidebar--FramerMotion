# React Sidebar - Framer-Motion
React sidebar component built with ['framer-motion'](https://www.framer.com/motion/)



---
## 1. Installation
After we clone this repository, we only need to access to the root folder and install all yarn dependencies:
```
cd React-Sidebar--FramerMotion/
yarn install
```
---
## 2. Initialization

To init this application we only need to enter the following command:
```
yarn start
```
---
## 3. How it works ('< Sidebar />')

First of all we have to build our 'Sidebar' component when a couple of states to manage it during the animations.

We're oing to import all our dependencies to make it work:
```
import React, {useState,useRef} from 'react';
import useDimensions from 'react-use-dimensions';
import {motion, useCycle} from 'framer-motion';

import ToggleMenu from '../ToggleMenu/ToggleMenu';
import Navigation from '../Navigation/Navigation';

import './Sidebar.scss';
```

where:
- useState -> Deal with react states and props
- useRef -> Mutable value that exists for the lifetime of the component

- useDimensions -> measure any element in our DOM

- useCycle -> We wan to cycle throught different values like open or closed 

Inside of the Sidebar function we'll crate our states and cycles before we render anything:
```
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
```
where:
- open: 
    If Menu is opened we want to draw an rectangular area with 1000px on height. It will start with from a circle with a calculated dimensions at a calculated position in our display.
    
    If we change to opened stated, it will render a transition with the effects wrote on the code. 

- closed: 
    If Menu is closed we want to draw a static circle at the same position as open state.

    At this point it will render an animation to come back to the static circle.

Being our function declared, we're going to declare our initial states:
```
    // we need to define cycles for open and close menu
    const [isOpen, toggleOpen] = useCycle(false, true); // Initially is closed and toggle state is true

    // Define a react mutable value as null
    const containerRef = useRef(null);

    const { height } = useDimensions(containerRef);
```

The next step is to declare our components to render and connect 'Sidebar' with them:
```
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
```
---
## 4. Toggleging menu states
At this point we want to change our sidebar state from 'closed' to 'opened' and render a couple of animations. We've passed as props the sidebar porperty called toggle. With this, we can assign it to a button event.

```
export default function ToggleMenu(props) {
    // we pass toggleOpen as props from Sidebar component
    const {toggle} = props;

    return (

      <button onClick={toggle}>
      </button>
```

With this code, React will render an animation everytime we push the button and it will expand our area from the circle to the full sidebar background because the Sidebar's state toggle has been changed by the button.

But we want to Add a bars icon to change itself with every onClick iteration:

For this, inside our < button ></ button > element we're going to add a < svg > element like this:
```
 <button onClick={toggle}>
    {/*  container for SVG graphics. */}
    <svg width="23" height="23" viewBox="0 0 23 23">

        We will draw our bars icon here

    </svg>
 </button>
```

Before we start to draw we need to stop and think about what do we want. We want a 3 bars icon (when menu is closed) and it will draw a cross when menu is opened to indicate to close it.

To draw them we have to use a < motion.path ></ motion.path> with a constant variables and a copuple of modifications by the animation state:

- constant motion path's props(defined before component):
    ```
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
    ```
- Drawing every bar with it variant properties:
    ```
    <button onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            
            
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
    ```
    ---
    ## 5. Rendering our List on < Navigation />
    Turning back to Sidebar we only have to call a new component called < Navigation /> wich will render our Item list with it animations when we open (toggle) our menu.

    Thinking in our list as a singular < ul > element we want that every list element will render an animation of appear and dissapear in a transition effect. To do that we ahve to declare a variants option:
    ```
    const variants = {
        open: {
            transition: { 
                staggerChildren: 0.07, 
                delayChildren: 0.2 
            }
        },
        closed: {
            transition: { 
                staggerChildren: 0.05, 
                staggerDirection: -1 
            }
        }
    };
    ```

    To render every item of the list we must iterate as much menu items as we want. For that we could declare an array and map it to render every item with every array iteration:
    ```
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
    ```
    With this component we specify that every item in the list will be rendered with the same animation for the component.


    ---
    ## 6. Rendering every List Item
    When Menu list is open we want that every item will appear with and opacity variation and when menu is closed, every item must move throght y axix and dissappear(opacity change).

    For this, we'll declare a variants object: 
    ```
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
    ```
    And declare the component itself:
    ```
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

    
    ```
    ---
    ## 7. Adding React Router Dom

    First of all, install the library:
    ```
    yarn add react-router-dom
    ```

    And import the main component in our React App directory:
    ```
    import React from 'react';
    import {BrowserRouter as Router} from 'react-router-dom';
    import './App.scss';

    import Sidebar from './components/Sidebar/Sidebar';
    export default function App() {
    return (

        <Router className="App">
            <Sidebar />
        </Router>
    );
    }
    ```

    In second place we have to create our Routes system:
    ```
    import React from 'react';
    import {Switch, Route} from 'react-router-dom';

    // pages
    import Home from '../pages/Home/Home';
    import Add from '../pages/Add/Add';
    import Delete from '../pages/Delete/Delete';
    import Edit from '../pages/Edit/Edit';
    import Logout from '../pages/Logout/Logout';
    import View from '../pages/View/View';

    export default function Routes(){
        return (
            <Switch>
                <Route path="/" exact >
                    <Home />
                </Route>
                <Route path="/add" exact >
                    <Add />
                </Route>
                <Route path="/delete" exact >
                    <Delete />
                </Route>
                <Route path="/edit" exact >
                    <Edit />
                </Route>
                <Route path="/logout" exact >
                    <Logout />
                </Route>
                <Route path="/view" exact >
                    <View />
                </Route>
            </Switch>
        );
    }
    
    ```
At this point we need to declare a < Link></ Link> element to redirecto to it route and render a component. In this case we want to every item in the Sidebar list's element redirects to a route, so we'll modify our code:

```
    import React from 'react';
    import {Link} from 'react-router-dom';
    import {motion} from 'framer-motion';
    import {Icon, Divider} from 'semantic-ui-react';
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
    const icons = ["shield","plus","edit","eraser","power off"];
    const labels = ["View Services","Add Service","Edit Service","Delete Service","Log out"];
    const routes = ["/view","/add","/edit","/delete","/logout"]
    export default function MenuItem(props) {
        const {i} = props;
        // const style = { border: `2px solid ${colors[i]}` };
        const style = { border: '2px solid black ' };
        return (
            <>
            <motion.li
            className="motionList"
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            > 
                
                <Icon className="motionList__icon-placeholder"name={`${icons[i]}`} size="big" />
                {/* <div  className="motionList__icon-placeholder" style={style} >
                
                </div> */}
                <div className="motionList__text-placeholder" style={style}>

                    <Link to={routes[i]}>
                        {labels[i]}
                    </Link>

                </div> 
                
            </motion.li>
            <Divider horizontal className="motionList-divider"/>
            </>
        );
    }
```