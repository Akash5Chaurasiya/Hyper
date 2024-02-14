import React, { useState } from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import { generateWeekViewCoordinates } from '../../utils';
import { eventHighlighter } from '../styles';

const EventHighlighter = (props) => {
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [eventNewStart, setEventNewStart] = useState(null);
    const [eventNewEnd, setEventNewEnd] = useState(null);
    const [eventTyped, setEventTyped] = useState(null);
    console.log(props);
    const getBackgroundColor = (hii) => {
        // Determine background color based on eventType
        if (hii.eventType) {
            switch (hii.eventType) {
                case 'normal':
                    return '#67e8f9';
                case 'stretching':
                    return '#bef264';
                case 'all day':
                    return '#fcd34d';
                default:
                    return '#fca5a5'; 
            }
        } else {
            return '#22c55e';
        }
        console.log(hii);
    };
    // Deletes the event from the event list
    const deleteEvent = () => {
        props.onEventDelete(props.event.id);
        setShowEditEventModal(false);
    };
    const handleChange = (change) => {
        setEventTyped(change)
    }
    // Updates the event
    const updateEvent = (title, eventType) => {
        setEventTyped(eventType);
        props.onEventUpdate(props.event.id, {
            title,
            start: eventNewStart,
            end: eventNewEnd,
            eventType
        });
        setShowEditEventModal(false);
    };

    // Opens the edit event modal and initializes the start and end time
    const openEditEventModal = () => {
        console.log(props.event.title);
        setShowEditEventModal(true);
        setEventNewStart(props.event.start);
        setEventNewEnd(props.event.end);
    };

    // Sets the updated start and end times in the state of the event being edited
    const onCurrentEventTimeChange = (dates) => {
        console.log('called');
        setEventNewStart(+dates[0]);
        setEventNewEnd(+dates[1]);
    };

    // Closes modal and does nothing more!
    const closeModal = () => {
        setShowEditEventModal(false);
    };

    return (
        <React.Fragment>
            <AddEventModal
                editMode={true}
                eventTitle={props.event.title}
                visible={showEditEventModal}
                onCancel={deleteEvent}
                onClose={closeModal}
                eventTyped={handleChange}
                onOk={updateEvent}
                eventStart={eventNewStart}
                eventEnd={eventNewEnd}
                onTimeChange={onCurrentEventTimeChange}
            />
            <div
                onClick={openEditEventModal}
                style={{
                    ...generateWeekViewCoordinates(props.event, props.startDate),
                    ...eventHighlighter,
                    backgroundColor: getBackgroundColor(props.event),
                }}
            >
                {props.event.title} <br />
                <span style={{ fontSize: 10 }}>
                    {moment(props.event.start).format('hh:mm a')}
                    {' '}
                    -
                    {' '}
                    {moment(props.event.end).format('hh:mm a')}
                </span>
            </div>
        </React.Fragment>
    );
};

export default EventHighlighter;
