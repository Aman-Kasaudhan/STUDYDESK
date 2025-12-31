import React from 'react';
import { TypeAnimation } from 'react-type-animation';
 

function Container12({ code }) {
  return (
    <div className="container12style">

      <TypeAnimation
        sequence={[
          code,
          2000, 
          
        ]}
        speed={30} 
        style={{ whiteSpace: 'pre-line', fontFamily: 'monospace', fontSize: '1rem' }}
        repeat={Infinity} />
    </div>
  );
}

export default Container12;
