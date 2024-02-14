import React, { useState } from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import WeekToolbar from './WeekToolbar';
import WeekHeader from './WeekHeader';
import TimeSlotGroup from './TimeSlotGroup';
import EventHighlighter from './EventHighlighter';
import { times, getAllDaysInTheWeek } from '../../utils';
import { container } from '../styles';

const WeekView = (props) => {
    const [startDate, setStartDate] = useState(+moment());
    const [weekDays, setWeekDays] = useState(getAllDaysInTheWeek());
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventStart, setEventStart] = useState(null);
    const [eventEnd, setEventEnd] = useState(null);
    const [eventType,setEventType] = useState(null);
    // Sets next week days in the state
    console.log(eventType);
    const goToNextWeek = () => {
        const dateAfter7Days = moment(startDate).add(7, 'days');
        setStartDate(+dateAfter7Days);
        setWeekDays(getAllDaysInTheWeek(dateAfter7Days));
    };

    // Sets previous week days in the state
    const goToPreviousWeek = () => {
        const dateBefore7Days = moment(startDate).subtract(7, 'days');
        setStartDate(+dateBefore7Days);
        setWeekDays(getAllDaysInTheWeek(dateBefore7Days));
    };

    // Brings today's date in the view
    const goToToday = () => {
        setStartDate(+moment());
        setWeekDays(getAllDaysInTheWeek());
    };

    // Opens the add event modal and initializes the date from the cell
    const openAddEventModal = (dateStamp, time) => {
        const start = moment(dateStamp).set('hour', time);
        const end = start.clone().add(1, 'hour');

        setShowAddEventModal(true);
        setEventStart(+start);
        setEventEnd(+end);
    };

    // Closes the add event modal
    const onCloseAddEventModal = () => {
        setShowAddEventModal(false);
    };

    // Adds the new event and closes the add event modal
    const onOkAddEventModal = (title,eventType) => {
        props.onNewEvent({
            title,
            start: eventStart,
            end: eventEnd,
            eventType
        });
        setShowAddEventModal(false);
    };

    // Saves the timeStamps of the new event in the state
    const onCurrentEventTimeChange = (dates) => {
        setEventStart(+dates[0]);
        setEventEnd(+dates[1]);
    };

    return (
        <div style={container}>
            <AddEventModal
                visible={showAddEventModal}
                onCancel={onCloseAddEventModal}
                onClose={onCloseAddEventModal}
                onOk={onOkAddEventModal}
                eventStart={eventStart}
                eventEnd={eventEnd}
                onTimeChange={onCurrentEventTimeChange}
                setEventType={setEventType}
            />

            <WeekToolbar
                goToPreviousWeek={goToPreviousWeek}
                goToNextWeek={goToNextWeek}
                startDate={startDate}
                goToToday={goToToday}
            />

            <WeekHeader weekDays={weekDays} />

            {times.map((time) => (
                <TimeSlotGroup
                    key={time}
                    time={time}
                    weekDays={weekDays}
                    events={props.events[time]}
                    openAddEventModal={openAddEventModal}
                >
                    {props.events[time] &&
                        props.events[time].map(
                            (event) =>
                                event.startWeek <= moment(startDate).week() &&
                                event.endWeek >= moment(startDate).week() && (
                                    <EventHighlighter
                                        onEventDelete={props.onEventDelete}
                                        onEventUpdate={props.onEventUpdate}
                                        key={event.title + event.end + event.start}
                                        startDate={startDate}
                                        event={event}
                                    />
                                )
                        )}
                </TimeSlotGroup>
            ))}
        </div>
    );
};

export default WeekView;
