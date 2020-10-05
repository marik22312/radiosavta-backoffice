import React from "react";

import { Calendar, ViewKey, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

export const Schedule: React.FC = () => {
  return (
    <Calendar
      localizer={localizer}
      selectable
      events={[
        {
          start: new Date(),
          end: new Date(),
          title: "test",
        },
      ]}
      defaultView={"day"}
      defaultDate={new Date()}
      onSelectEvent={(event) => console.log(event)}
    />
  );
};
