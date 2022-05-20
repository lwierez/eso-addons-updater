/*
Template for the components
*/

import React, { useState } from 'react';

import './template.scss';

/*
Interfaces for the component properties and states
*/
interface IProps {
  children: string; // Children is the props in <Component>children</Component>
}

interface IState {
  isClicked: boolean;
}

/*
Exemple for function components
*/
export default function Template(props: IProps) {
  // Assigning different props
  const { children } = props;

  // Creating different states
  const [isClicked, setIsClicked] = useState(false);

  // HTML part
  return (
    <button
      className={isClicked ? 'menu' : 'menu-clicker'}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >
      {children}
    </button>
  );
}

/*
Exemple for class components
*/
// Creating the class based on React.Component
// Also, implement interfaces to be able to manipulate props & states
class Menu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    // Creating props
    super(props);

    // Creating states
    this.state = {
      isClicked: false,
    };
  }

  // Rendering function
  render() {
    return (
      <button
        className={this.state.isClicked ? 'menu' : 'menu-clicker'}
        onClick={() => {
          this.setState((previousState: IState) => {
            return { isClicked: !previousState.isClicked };
          });
        }}
      >
        {this.props.children}
      </button>
    );
  }
}
