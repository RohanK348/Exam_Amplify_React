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
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import {isNumeric} from '../../../../functions/string'

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
const TargetSetting = (props) => {
  const {opening, setInfo, nextStep, prevStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [courses, setCourses] = useState([])
  const courselist = [
    "Diploma and above", 
    "Engineering degree and above", 
    "Degree and above", 
    "Master and above"
  ]
  const [specialisations, setSpecialisations] = useState([])
  const specialisationlist = [
    "Degree/Master-Computer or Electronics related", 
    "Degree/Master- Science or Mathematics related", 
    "Degree/Master-Others"
  ]
  const [domains, setDomains] = useState([])
  const domainlist = [
    "Automotive", 
    "Industrial",
    "IT Applications",
    "Software Consulting Companies",
    "Software Service companies",
    "Software Product companies",
    "Manufacturing",
    "Banking",
    "Retail",
    "Government",
    "Others",
  ]
  const [years, setYears] = useState([])
  const [year, setYear] = useState('')
  const yearlist = [
    "0-2",
    "2-4",
    "4-10",
    ">10",
  ]
  const [EAScore, setEAScore] = useState([])
  const EAScorelist = [
    "Top 1%",
    "Top 5%",
    "Top 10%",
    "Top 15%",
    "Top 20%",
    "Top 30%",
    "Top 50%",
    "Medium Quality",
  ]

  const handlePrev = () => {
    
    prevStep()
  }
  const validate = () => {
    let res = true
    if (courses.length === 0)
      res = false
    if (specialisations.length === 0)
      res = false
    if (domains.length === 0)
      res = false
    if (years.length === 0)
      res = false
    if (year === '' ||!isNumeric(year))
      res = false
    if (EAScore.length === 0)
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleContinue = () => {
    if (!validate())
      return
    let tmp = {}
    tmp.courses = courses
    tmp.specialisations = specialisations
    tmp.domains = domains
    tmp.years = years
    tmp.year = year
    tmp.EAScore = EAScore
    setInfo(tmp)
    nextStep()
  }

  useEffect(() => {
    setCourses(opening?.courses||[])
    setSpecialisations(opening?.specialisations||[])
    setDomains(opening?.domains||[])
    setYears(opening?.years||[])
    setYear(opening?.year||'')
    setEAScore(opening?.EAScore||[])
  }, [opening])
  return (
    <Widget
      title=""
      description={
        <span>
          Target Settings
        </span>
      }>
      <Grid container>
        <Grid item lg={6} md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{fontWeight: 'bold'}}>
              Education
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Course</div>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    value={courses}
                    onChange={(e) => setCourses(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{minWidth: '100%'}}
                  >
                    {courselist.map((name, index) => (
                      <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                        <Checkbox checked={courses.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Specialisation</div>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    value={specialisations}
                    onChange={(e) => setSpecialisations(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{minWidth: '100%'}}
                  >
                    {specialisationlist.map((name, index) => (
                      <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                        <Checkbox checked={specialisations.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} style={{fontWeight: 'bold'}}>
              Experience
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Domain</div>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    value={domains}
                    onChange={(e) => setDomains(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{minWidth: '100%'}}
                  >
                    {domainlist.map((name, index) => (
                      <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                        <Checkbox checked={domains.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Year of experience</div>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{minWidth: '100%'}}
                  >
                    {yearlist.map((name, index) => (
                      <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                        <Checkbox checked={years.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} style={{fontWeight: 'bold'}}>
              EA Score
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Course</div>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    value={EAScore}
                    onChange={(e) => setEAScore(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{minWidth: '100%'}}
                  >
                    {EAScorelist.map((name, index) => (
                      <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                        <Checkbox checked={EAScore.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Year of passing</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Year of passing"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handlePrev}>Cancel</button>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default TargetSetting
