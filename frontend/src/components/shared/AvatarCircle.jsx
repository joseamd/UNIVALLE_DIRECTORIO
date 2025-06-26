import React from 'react';

const AvatarCircle = ({ icon, text, initials }) => {
  const getColorFromString = (str) =>
    `hsl(${Math.abs(str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)) % 360}, 80%, 40%)`;

  const color = getColorFromString(text);

  return (
    <span
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.6em',
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}
    >
      {icon || initials}
    </span>
  );
};

export default AvatarCircle;
