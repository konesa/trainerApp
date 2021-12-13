import React from 'react';
import { CalendarView } from 'kalend';
import 'kalend/dist/styles/index.css';
import Kalend, {
    OnEventClickData,
    OnNewEventClickData,
    ShowMoreMonthData,
    OnPageChangeData,
    OnSelectViewData
} from 'kalend';


export default function Calendar() {

    return (<div>
        <Kalend
            events={[]}
            initialDate={new Date().toISOString()}
            hourHeight={60}
            initialView={CalendarView.WEEK}
            disabledViews={[CalendarView.DAY]}
        />
    </div>)
}