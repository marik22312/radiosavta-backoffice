import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import ProgramsStore from "../../stores/programs.store";

import { Card } from "../Card/Card";

interface PopupProps extends RouteComponentProps {
  onSubmit(): Promise<any>;
}

interface State {
  isLoading: boolean;
  error: string | null;
  fileToUpload: any;
  fileUrl: string;
}

@inject("programsStore")
@observer
export class AddRecordedShowPopup extends React.Component<PopupProps, {}> {
  private schema: Yup.ObjectSchema;
  constructor(props: PopupProps) {
    super(props);
    this.schema = Yup.object().shape({
      filename: Yup.string().url().required(),
    });

    this.state = {
      fileUrl: "https://via.placeholder.com/500",
    };
  }

  // private async onFormSubmit(values:any) {
  //   this.setState({
  //     isLoading: true,
  //     error: null,
  //   });
  //   const { fileToUpload } = this.state;
  //   const newValues:any = {
  //     ...values,
  //     profile_picture: fileToUpload,
  //   };
  //   try {
  //     await this.props.programsStore.getRecordedShow(newValues);
  //     return this.setState({
  //       isLoading: false,
  //       error: null,
  //     });
  //   } catch (err) {
  //     this.setState({
  //       isLoading: false,
  //       error: err.message,
  //     });
  //   }
  // }

  // private onFileChanged(event: any) {
  //   this.setState({
  //     fileUrl: URL.createObjectURL(event.target.files[0]),
  //     fileToUpload: event.target.files[0],
  //   });
  // }

  public render() {
    return (
      <div id="addRecordedShowPopup">
        <Card>
          <h2>Add Show</h2>
          <input type="text" />
          <button onClick={() => this.props.onSubmit()}>Get show</button>
        </Card>
      </div>
    );
  }
}
