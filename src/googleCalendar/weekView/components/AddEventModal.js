import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import AddEvent from './AddEvent';

const AddEventModal = (props) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState(null);
    useEffect(() => {
        setTitle(props.eventTitle || '');
        // setType(props.setEventType || '')
    }, [props.eventTitle]);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleTypeChange = (type) => {
        // props.eventTyped(type)
        setType(type)
    }
    const handleOk = () => {
        props.onOk(title, type);
    };
    return (
        <Modal
            visible={props.visible}
            onOk={handleOk}
            onCancel={props.onClose}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                    {props.editMode ? 'Delete' : 'Cancel'}
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {props.editMode ? 'Update Event' : 'Add Event'}
                </Button>,
            ]}
        >
            <AddEvent
                title={title}
                type={type}
                onTitleChange={handleTitleChange}
                handleTypeChange={handleTypeChange}
                start={props.eventStart}
                end={props.eventEnd}
                onTimeChange={props.onTimeChange}
                eventType={props.setEventType}
            />
        </Modal>
    );
};

export default AddEventModal;
