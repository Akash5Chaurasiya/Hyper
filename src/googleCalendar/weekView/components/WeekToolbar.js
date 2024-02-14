import React from 'react';
import {
  toolbar,
  toolbarDate,
  appTitle,
  alignRight,
  spacify,
  weekButtons,
} from '../styles';
import moment from 'moment';
import { Button, Col, Row, Tooltip, Icon } from 'antd';
function WeekToolbar(props) {
  const formattedDate = moment(props.startDate).format('MMM YYYY');
  return (
    <Row type="flex" gutter={4} style={toolbar}>
      <Col span={6} offset={3} style={appTitle}>
      <Icon type="calendar" style={spacify} />Meeting Calendar
      </Col>
      <Col span={3} offset={8} style={alignRight}>
        <Tooltip placement="topLeft" title={moment().format('dddd, MMM D')}>
          <Button onClick={props.goToToday}>Today</Button>
        </Tooltip>
      </Col>

      <Col span={2} style={weekButtons}>
        <Button onClick={props.goToPreviousWeek} style={spacify} icon="left" />
        <Button onClick={props.goToNextWeek} icon="right" />
      </Col>

      <Col span={2} style={toolbarDate}>
        {formattedDate}
      </Col>
      <Col span={20} style={{textAlign:'center',marginLeft:'10%',fontSize:'20px'}}>
        Click on the Respective Box to mark Your Calendars Booked!!
      </Col>
      <Col span={20} style={{textAlign:'center',marginLeft:'10%',fontSize:'15px',color:'red'}}>
        Straight Red Line Denotes the Current Time
      </Col>
    </Row>
  );
}

export default WeekToolbar;
