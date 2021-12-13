import React from "react";

import { Calendar, ViewKey, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import moment from "moment";
import { useTodayShows } from "../../hooks/useTodayShows";
import { IFullProgram } from "../../models/types";
import { Schedule as ISchedule } from "../../domain/Schedule";
const localizer = momentLocalizer(moment);

export const Schedule: React.FC = () => {
  const { isLoading, shows } = useTodayShows();

  console.log("StarTime", shows);
  const mapShowsToEvents = (shows: ISchedule[]) => {
    return shows.map((show) => {
      const startTime = moment(show.start).utc().toDate();
      console.log("StarTime", startTime);
      return {
        start: moment(show.start).utc().toDate(),
        end:
          show.type === "playlist"
            ? moment(show.end).utc().toDate()
            : moment(show.start).add(1, "hour").utc().toDate(),
        title: `${show.name} | ${
          show.type === "playlist" ? "פלייליסט" : "לייב"
        }`,
      };
    });
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
