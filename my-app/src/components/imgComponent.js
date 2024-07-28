import React from 'react';

export default function ImgComponent() {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + '/kon.png'} alt="Kon" className="kon-image" />
    </div>
  );
}

