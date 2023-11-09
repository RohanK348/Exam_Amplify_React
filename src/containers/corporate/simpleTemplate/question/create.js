import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import {useStyles} from '../../../style/common'
import {useAsync} from '../../../../functions/utils'
import {createWithOptions as createQuestion} from '../../../../api/question'
import {create as createParagraph} from '../../../../api/paragraph'
import {create as createExamSection} from '../../../../api/examSection'
import {isNumeric} from '../../../../functions/string'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
}
const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const CreateDialog = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles();
  const {refresh, sections, brain, optionTypes} = props
  const [modalActive, setModalActive] = useState(false)
  const [description, setDescription] = useState('')
  const [mark, setMark] = useState(1)
  const [type, setType] = useState('')
  const [options, setOptions] = useState(['', '', '', '', ''])
  const [selectOption, setSelectOption] = useState(0)
  const [selectOptions, setSelectOptions] = useState([0])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleClickOpen = () => {
    setDescription('')
    setMark(1)
    if (optionTypes.length !== 0)
      setType(optionTypes[0])
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (description === '')
      res = false
    if (type !== 'PARAGRAPH') {
      if (mark === 0 || !isNumeric(mark))
        res = false
      options.forEach((item, index) => {
        if (index !== 4 && item === '')
          res = false
      })
    }
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    if (type === 'PARAGRAPH') {
      run(createParagraph({
        subTopicID: '',
        description: description,
        isAdmin: false,
      }))
    }
    else {
      let tmp = options
      if (options[4] === '') {
        tmp = options.slice(0, 4)
      }
      tmp = tmp.map((value, index) => {
        let option = {}
        option.description = value
        if (type === 'SINGLE') {
          if (selectOption === index)
            option.isTrue = true
          else
            option.isTrue = false
        }
        else if (type === 'MULTIFUL') {
          if (selectOptions.indexOf(index) > -1)
            option.isTrue = true
          else
            option.isTrue = false
        }
        return option
      })

      run(createQuestion({
        preInfor: '',
        solution: '',
        description: description,
        complexity: '',
        time: 0,
        mark: mark,
        type: type,
        activate: true,
        tags: [],
        attributes: [],
        subTopicID: '',
        paragraphID: '',
        isAdmin: false,
      }, tmp))
    }
    setAsyncState('create')
    setPending(true)
  }
  const changeSelect = (e, optionId) => {
    let answerOptions = []
    answerOptions = [...selectOptions]
    if (e.target.checked && answerOptions.indexOf(optionId) === -1) {
      answerOptions = [...answerOptions, optionId]
    }
    if (!e.target.checked) {
      const index = answerOptions.indexOf(optionId)
      if (index > -1) {
        answerOptions = [...answerOptions.slice(0, index), ...answerOptions.slice(index + 1)]
      }
    }
    setSelectOptions(answerOptions)
  }
  const changeOption = (value, index) => {
    let tmp = options
    tmp[index] = value
    setOptions(tmp)
  }

  useEffect(() => {
    if (optionTypes.length !== 0) {
      setType(optionTypes[0])
    }
  }, [optionTypes])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'create') {
        run(createExamSection({
          questionID: data.id,
          brain: brain,
          type: type,
        }))
        setAsyncState('createExamSection')
      }
      else if (asyncState === 'createExamSection') {
        let tmp = [...sections, data.id]
        setPending(false)
        setModalActive(false) 
        refresh(tmp)
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      NotificationManager.warning('Item size to create has exceeded the maximum allowed size', 'Worning', 3000);
      setPending(false)
    }
  }, [status])
  return (
    <>
      <button className={classes.button} style={{marginBottom: 10, float: 'right'}} variant="outlined" onClick={handleClickOpen}>Add Question</button>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data (max size: 300kb)
          </DialogContentText>
          <div className={classes.label}>Type</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            MenuProps={MenuProps}
          >
            {optionTypes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <div className={classes.label}>Description</div>
          <SunEditor
            // setContents="My contents"
            showToolbar={true}
            onChange={setDescription}
            setDefaultStyle="height: auto"
            setOptions={{
              buttonList: [
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "list",
                  "align",
                  "fontSize",
                  "formatBlock",
                  "table",
                  "image"
                ]
              ]
            }}
          />
          {type !== 'PARAGRAPH' &&
          <>
            <TextField
              autoFocus
              margin="dense"
              id="mark"
              label="Mark"
              inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
              type="text"
              fullWidth
              variant="outlined"
              autoComplete="off"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
              style={{marginTop: 20}}
            />
            <div className={classes.label}>Options</div>
            {options?.map((option, index) => (
            <div key={index} className="items-center pb-8 flex">
              {type === 'SINGLE'?
              <>
                <input
                  type="radio"
                  className="form-radio h-4 w-4 mr-4 border-2 border-blue-300 cursor-pointer"
                  value={index}
                  checked={selectOption===index}
                  onChange={() => setSelectOption(index)}
                />
              </>:
              type === 'MULTIFUL'?
              <>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 mr-4 border-2 border-blue-300 cursor-pointer"
                  checked={selectOptions.indexOf(index) > -1}
                  onChange={(e) => changeSelect(e, index)}
                />
              </>:''
              }
              <SunEditor
                showToolbar={true}
                onChange={(value) => changeOption(value, index)}
                setDefaultStyle="height: auto"
                setOptions={{
                  buttonList: [
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "list",
                      "align",
                      "fontSize",
                      "formatBlock",
                      "table",
                      "image"
                    ]
                  ]
                }}
              />
            </div>
            ))}
          </>
          }
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleClose} color="primary">
            Cancel
          </button>
          <button className={classes.button} onClick={handleSave} color="primary">
            Save
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default CreateDialog
