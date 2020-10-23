import React from "react";

import { Calendar, ViewKey, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import moment from "moment";
import { useTodayShows } from "../../hooks/useTodayShows";
import { IFullProgram } from "../../models/types";
const localizer = momentLocalizer(moment);

export const Schedule: React.FC = () => {
  const { isLoading, shows } = useTodayShows();

  const mapShowsToEvents = (shows: IFullProgram[]) => {
    return shows.map((show) => ({
      start: moment(show.programTimes.start_time, "h:mm").toDate(),
      end: moment(show.programTimes.start_time, "h:mm").add(1, "h").toDate(),
      title: show.name_en,
    }));
  };

  const renderCalendar = () => {
    return (
      <Calendar
        localizer={localizer}
        selectable
        events={mapShowsToEvents(shows)}
        defaultView={"agenda"}
        view={"agenda"}
        //   views={["day"]}
        defaultDate={new Date()}
        onSelectEvent={(event) => console.log(event)}
        toolbar={false}
      />
    );
  };

  const renderNoShowsToday = () => {
    return <div>No Shows!</div>;
  };
  return shows.length ? renderCalendar() : renderNoShowsToday();
};
