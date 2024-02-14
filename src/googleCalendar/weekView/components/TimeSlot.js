import React from 'react';
import { Col } from 'antd';
import { col, slot, lightHighlighter } from '../styles';
import { isTodaysDate } from '../../utils';

function TimeSlot(props) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const redLine = {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTop: '4px solid red',
        height: 0,
        margin: 0,
        padding: 0,
        zIndex: 1,
    };

    return (
        <Col
            key={props.dateStamp}
            style={
                isTodaysDate(props.dateStamp)
                    ? { ...col, ...slot, ...lightHighlighter }
                    : { ...col, ...slot }
            }
            span={3}
            onClick={() => props.openAddEventModal(props.dateStamp, props.time)}
        >
            {/* Display current time */}
            {/* Conditional rendering of red line at the current time */}
            {isTodaysDate(props.dateStamp) &&
                currentHour === props.time &&
                currentMinute >= 0 && // You might want to adjust this based on your use case
                currentMinute < 60 && (
                    <div style={redLine}></div>
                )}
        </Col>
    );
}

export default TimeSlot;
