import React from 'react';
import moment from 'moment';
import { inputStyles } from '../styles';
import { DatePicker, Input, Select } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

function AddEvent(props) {
    return (
        <React.Fragment>
            <Input
                type="text"
                placeholder="Add Title"
                value={props.title}
                style={inputStyles}
                size="large"
                autoFocus={true}
                onChange={props.onTitleChange}
            />
            <Select
                placeholder="Select Event Type"
                style={{ width: '100%', marginTop: '10px' }}
                onChange={props.handleTypeChange}
                value={props.eventType}
            >
                <Option value="" disabled hidden>
                    -- Select Event Type --
                </Option>
                <Option value="normal">Normal</Option>
                <Option value="stretching">Stretching</Option>
                <Option value="allDay">All Day</Option>
            </Select>
            <RangePicker
                style={{ width: '100%', marginTop: '30px' }}
                value={[moment(props.start), moment(props.end)]}
                onChange={props.onTimeChange}
                showTime={{
                    format: 'HH:mm',
                    hourStep: 1,
                    minuteStep: 30,
                    defaultValue: [moment(props.start), moment(props.end)],
                }}
                format="MMM Do, YYYY hh:mm a"
            />
        </React.Fragment>
    );
}

export default AddEvent;
