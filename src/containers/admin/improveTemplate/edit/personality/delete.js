import React, { useState } from "react";
import { DeleteOutline } from "@material-ui/icons";

import { useImproveTemplate } from "../../../../../provider/improveTemplate";
import DeleteConfirm from "../../../../../components/DeleteConfirm";

const Delete = (props) => {
  const { index } = props;
  const [improveTemplate, dispatch] = useImproveTemplate();
  const [acitiveConfirm, setActiveConfirm] = useState(false);

  const handleDelete = () => {
    setActiveConfirm(true);
  };
  const deleteConfirm = (res) => {
    setActiveConfirm(false);
    if (res) {
      let personalities = improveTemplate.personalities
      if (personalities[index]?.id) {
        let deletePersonalities = [...improveTemplate?.deletePersonalities, personalities[index]]
        dispatch({type: 'SET', name: 'deletePersonalities', value: deletePersonalities})
      }
      personalities = [...personalities.slice(0, index), ...personalities.slice(index + 1)];
      dispatch({type: 'SET', name: 'personalities', value: personalities})
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
