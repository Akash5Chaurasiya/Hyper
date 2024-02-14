import React, { useEffect, useState } from 'react';
import moment from 'moment';

const CurrentTimeIndicator = () => {
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        // Update current time every minute
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const currentTimeStyle = {
        position: 'absolute',
        top: `${(currentTime.hours() * 60 + currentTime.minutes()) / 1440 * 100}%`, // Calculate position in percentage
        left: 0,
        right: 0,
        borderTop: '1px solid red',
        height: 0,
        margin: 0,
        padding: 0,
        zIndex: 1,
    };

    return <div style={currentTimeStyle}></div>;
};

export default CurrentTimeIndicator;
