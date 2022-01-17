import React from 'react';

const styles = {
    position: 'absolute',
    color: '#8B0000'
}

export const Error = ({ err }) => {
    return <h3 style={styles}>Error: {err}</h3>
}