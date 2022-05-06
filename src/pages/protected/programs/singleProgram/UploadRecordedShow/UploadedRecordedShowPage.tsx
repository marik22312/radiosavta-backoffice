import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../components/Card/Card";
import { Page } from "../../../../../components/Page/Page";
import { useProgramById } from "../../../../../hooks/usePgoramById";

import { Space, Steps, Row, Col } from "antd";
import { UploadStep } from "./components/UploadStep";
import { UploadRecordedShowSteps } from "../../../../../domain/RecordedShow";
import { AddInfoStep } from "./components/AddInfoStep";
import { AllDoneStep } from "./components/AllDoneStep";
const { Step } = Steps;

const steps = [
  {
    title: "Upload To Server",
  },
  {
    title: "Edit Data",
  },
  {
    title: "You're All Set!",
  },
];
export const UploadedRecordedShowPage: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const { program } = useProgramById(programId);
  const [recordedShowId, setRecordedShowId] = useState<number | string | null>(
    881
  );

  const [currentStep, setCurrentStep] = useState(
    UploadRecordedShowSteps.Review
  );

  const onUploadStepSuccess = (args: {
    fileUrl: string;
    recordedShowId: number;
  }) => {
    setRecordedShowId(args.recordedShowId);

    setCurrentStep(UploadRecordedShowSteps.AddInfo);
  };

  const onAddInfoStepSuccess = () => {
    setCurrentStep(UploadRecordedShowSteps.Review);
  };

  const resetFlow = () => {
    setRecordedShowId(null);
    setCurrentStep(UploadRecordedShowSteps.Upload);
  };

  const CurrentView = () => {
    switch (currentStep) {
      case UploadRecordedShowSteps.Upload:
        return (
          <UploadStep
            onSuccess={(args) =>
              onUploadStepSuccess({
                fileUrl: args.fileUrl,
                recordedShowId: args.recordedShowId,
              })
            }
            onError={(err) => console.log("Err", err)}
            programId={programId}
          />
        );
      case UploadRecordedShowSteps.AddInfo:
        return (
          <AddInfoStep
            onSuccess={() => onAddInfoStepSuccess()}
            onError={() => null}
            programId={programId}
            recordedShowId={recordedShowId!}
          />
        );

      case UploadRecordedShowSteps.Review:
        return (
          <AllDoneStep
            recordedShowId={recordedShowId!}
            onClickStartOver={() => resetFlow()}
          />
        );
      default:
        return <div>no Such Step</div>;
    }
  };

  return (
    <Page
      title={`Upload Show To ${program?.name_en}`}
      breadcrumbs={["programs", program?.name_en || ""]}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Col span={24}>
            <Card>
              <Card.Content>
                <Steps current={currentStep}>
                  {steps.map((s) => (
                    <Step key={s.title} title={s.title} />
                  ))}
                </Steps>
              </Card.Content>
            </Card>
          </Col>
        </Row>
        <Card>
          <Card.Content>{CurrentView()}</Card.Content>
        </Card>
      </Space>
    </Page>
  );
};
