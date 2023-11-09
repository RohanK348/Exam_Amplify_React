import React, { useState } from "react";
import { DeleteOutline } from "@material-ui/icons";

import { useImproveTemplate } from "../../../../../provider/improveTemplate";
import DeleteConfirm from "../../../../../components/DeleteConfirm";

const Delete = (props) => {
  const { index, brain } = props;
  const [improveTemplate, dispatch] = useImproveTemplate();
  const [acitiveConfirm, setActiveConfirm] = useState(false);

  const handleDelete = () => {
    setActiveConfirm(true);
  };
  const deleteConfirm = (res) => {
    setActiveConfirm(false);
    if (res) {
      let topics = []
      if (brain === 'right')
        topics = improveTemplate.rightTopics;
      else if (brain === 'left')
        topics = improveTemplate.leftTopics;
      if (topics.length <= index)
        return
      if (topics[index]?.id) {
        let deleteTopics = [...improveTemplate?.deleteTopics, topics[index]]
        dispatch({type: 'SET', name: 'deleteTopics', value: deleteTopics})
      }
      topics = [...topics.slice(0, index), ...topics.slice(index + 1)];
      if (brain === 'right') {
        dispatch({ type: "SET", name: "rightTopics", value: topics });
      }
      else if (brain === 'left') {
        dispatch({ type: "SET", name: "leftTopics", value: topics });
      }
    }
  };

  return (
    <>
      <DeleteConfirm open={acitiveConfirm} callback={deleteConfirm} />
      <DeleteOutline className="mr-2 cursor-pointer" onClick={handleDelete} />
    </>
  );
};
export default Delete;
