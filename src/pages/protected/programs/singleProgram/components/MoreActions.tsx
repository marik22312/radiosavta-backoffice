import React from "react";
import { Popover, Button, List } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useEditRecordedShowModal } from "../../../../../components/EditRecordedShow/useEditRecordedShowModal";
import { useConfirmDeleteRecordedShow } from "../../../../../components/ConfirmDeleteRecordedShow/useConfirmDeleteRecordedShow";

interface MoreActionsProps {
  recordedShowId: string | number;
}

export const MoreActions: React.FC<MoreActionsProps> = (props) => {
  const { open } = useEditRecordedShowModal();
  const { open: deleteRecordedShow } = useConfirmDeleteRecordedShow();
  return (
    <>
      <Popover
        content={
          <List
            size="small"
            renderItem={(item) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={
                      <a onClick={item.onClick} style={item.style}>
                        {item.title}
                      </a>
                    }
                  />
                </List.Item>
              );
            }}
            dataSource={[
              {
                title: "Edit",
                icon: <EditOutlined />,
                onClick: () => open(props.recordedShowId),
              },
              //   {
              //     title: "Share",
              //     icon: <ShareAltOutlined />,
              //     onClick: () => alert("Share TBD"),
              //   },
              {
                title: "Delete",
                icon: <DeleteOutlined style={{ color: "red" }} />,
                onClick: () => deleteRecordedShow(props.recordedShowId),
                style: {
                  color: "red",
                },
              },
            ]}
          ></List>
        }
        title="More Actions"
        trigger="click"
      >
        <Button type="ghost" shape="circle" icon={<MoreOutlined />} />
      </Popover>
    </>
  );
};
