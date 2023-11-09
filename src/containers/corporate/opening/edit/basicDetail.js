import React, {useState, useEffect} from 'react'
import {
  Grid,
  FormControl,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250,
    },
  },
};
const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const BasicDetail = (props) => {
  const {opening, setInfo, nextStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [description, setDescription] = useState('')
  const [vacancy, setVacancy] = useState([])
  const vacancies = ["0-10", "10-50", "50-100", ">100"]
  const [title, setTitle] = useState('')

  const handleContinue = () => {
    let tmp = {}
    tmp.description = description
    tmp.vacancy = vacancy
    tmp.title = title
    setInfo(tmp)
    nextStep()
  }

  useEffect(() => {
    setDescription(opening?.description||'')
    setTitle(opening?.title||'')
    setVacancy(opening?.vacancy||[])
  }, [opening])
  return (
    <Widget
      title=""
      description={
        <span>
          Basic Details
        </span>
      }>
      <Grid container>
        <Grid item lg={6} md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Job Title</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Number of Vacancy</div>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={vacancy}
                    onChange={(e) => setVacancy(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{minWidth: '100%'}}
                  >
                    {vacancies.map((name, index) => (
                      <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                        <Checkbox checked={vacancy.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Description</div>
                {description!==''&&
                <SunEditor
                  // setContents="My contents"
                  showToolbar={true}
                  defaultValue={description}
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
                }
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
          <Link to="/corporate" style={{textDecoration: 'none'}}>
            <button className={`${classes.button} ${customeClasses.cancel}`} >Cancel</button>
          </Link>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default BasicDetail
