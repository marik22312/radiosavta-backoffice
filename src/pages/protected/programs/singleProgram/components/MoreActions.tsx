import React from 'react'
import {Popover, Button} from 'antd'
import { MoreOutlined } from '@ant-design/icons';
import { useEditRecordedShowModal } from '../../../../../components/EditRecordedShow/useEditRecordedShowModal';

interface MoreActionsProps { 
    programId: string | number;
}
export const MoreActions: React.FC<MoreActionsProps> = (props) => {
    const {open} = useEditRecordedShowModal();
    return (
        <>
        <Popover
        content={<a onClick={() => open(props.programId)}>Edit</a>}
        title="More Actions"
        trigger="click"
        >
        <Button type="ghost" shape="circle" icon={<MoreOutlined />} />
      </Popover>
          </>
    )
}