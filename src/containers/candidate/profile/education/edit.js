import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  DialogActions,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Edit} from '@material-ui/icons'
import {NotificationManager} from 'react-notifications'

// import {useSetting} from '../../../../provider/setting'
import {useStyles} from '../../../style/common'
import {useAsync} from '../../../../functions/utils'
import {update} from '../../../../api/education'
import {isNumeric} from '../../../../functions/string'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const EditDialog = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  // const [setting, dispatch] = useSetting()
  const {item, refresh} = props
  const [modalActive, setModalActive] = useState(false)
  const [degree, setDegree] = useState('10')
  const [branch, setBranch] = useState('')
  const [branches, setBranches] = useState([])
  const [schoolName, setSchoolName] = useState('')
  const [percentage, setPercentage] = useState('')
  const [grade, setGrade] = useState('')
  const [CGPA, setCGPA] = useState('')
  const [place, setPlace] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [courseName, setCourseName] = useState('')
  const [instituteName, setInstituteName] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [universityName, setUniversityName] = useState('')
  const [year, setYear] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setDegree(item.degree||'')
    setBranch(item.branch||'')
    setSchoolName(item.schoolName||'')
    setPercentage(item.percentage||'')
    setGrade(item.grade||'')
    setCGPA(item.CGPA||'')
    setPlace(item.place||'')
    setState(item.state||'')
    setCountry(item.country||'')
    setCourseName(item.courseName||'')
    setInstituteName(item.instituteName||'')
    setCollegeName(item.collegeName||'')
    setUniversityName(item.universityName||'')
    setYear(item.year||'')
    setIsOngoing(item.isOngoing||false)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (!isNumeric(CGPA) || !isNumeric(percentage)) {
      res = false
      NotificationManager.warning('Please input number in CGPA and percentage', 'Worning', 3000);
    }
    if (!isNumeric(year)) {
      res = false
      NotificationManager.warning('Please input number in year', 'Worning', 3000);
    }
    if ((CGPA < 1 || CGPA >= 10) && CGPA !== '') {
      res = false
      NotificationManager.warning('Please input number between 1.00 and 9.99 for CGPA', 'Worning', 3000);
    }
    if (CGPA === '' && percentage === '' && grade === '') {
      res = false
      NotificationManager.warning('One of the CGPA, percentage and grade is mandatory', 'Worning', 3000);
    }
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    let tmp = {}
    tmp.id = item.id
    tmp.degree = degree
    tmp.branch = branch
    tmp.schoolName = schoolName
    if (percentage !== '')
      tmp.percentage = percentage
    if (grade !== '')
      tmp.grade = grade
    if (CGPA !== '')
      tmp.CGPA = CGPA
    if (year !== '') {
      tmp.year = year
      tmp.isOngoing = isOngoing
    }
    tmp.place = place
    tmp.state = state
    tmp.country = country
    tmp.courseName = courseName
    tmp.instituteName = instituteName
    tmp.collegeName = collegeName
    tmp.universityName = universityName
    run(update(tmp))
    setPending(true)
  }

  useEffect(() => {
    if (degree === '+2')
      setBranches(['Science', 'Others'])
    else if (degree === 'diploma')
      setBranches(['Computer', 'Electronics', 'Electrical', 'IT', 'Others'])
    else if (degree === 'degree')
      setBranches(['Engineering-Computer related', 'Engineering-Electronics related', 'Engineering-Others', 
      'Degree-Computer/Electronics related', 'Degree-Science related', 'Degree-Others'])
    else if (degree === 'master')
      setBranches(['Engineering-Computer related', 'Engineering- Electronics related', 'Engineering-Others',
        'Degree-Computer/Electronics related', 'Master-Science related', 'Master-Others'])
    else if (degree === 'phd')
      setBranches(['Engineering-Computer related', 'Engineering- Electronics related', 'Engineering-Others',
        'Phd-Computer/Electronics related', 'Phd-Science related', 'Phd-Others'])
  }, [degree])
  useEffect(() => {
    if (branches.length !== 0)
      setBranch(branches[0])
  }, [branches])
  useEffect(() => {
    if (status === 'resolved') {
      setPending(false)
      setModalActive(false)
      refresh()
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status, run])
  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <Edit className={classes.icon} />
      </IconButton>
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
        <DialogTitle id="form-dialog-title">Edit Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Degree</div>
                <select
                  className={`form-select`}
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                >
                  <option value='10'>
                    10
                  </option>
                  <option value='+2'>
                    +2
                  </option>
                  <option value='diploma'>
                    Diploma
                  </option>
                  <option value='degree'>
                    Degree
                  </option>
                  <option value='master'>
                    Master
                  </option>
                  <option value='phd'>
                    Phd
                  </option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-element pt-8">
                <div className="flex items-center justify-start space-x-2">
                  <label className="flex items-center justify-start space-x-2">
                    <input
                      type="checkbox"
                      className={`form-checkbox h-4 w-4`}
                      checked={isOngoing}
                      onChange={(e) => setIsOngoing(e.target.checked)}
                    />
                    <span>Ongoing</span>
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
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
            {(degree==='10'||degree==='+2')&&
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">School Name</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="School Name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
            </Grid>
            }
            {degree==='diploma'&&
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Institute Name</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Institute Name"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                />
              </div>
            </Grid>
            }
            {(degree==='diploma'||degree==='degree'||degree==='master'||degree==='phd')&&
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Course Name</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </Grid>
            }
            {(degree==='degree'||degree==='master'||degree==='phd')&&
            <>
              <Grid item xs={12}>
                <div className="form-element">
                  <div className="form-label">College Name</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="College Name"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-element">
                  <div className="form-label">University Name</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Universit Name"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                  />
                </div>
              </Grid>
            </>
            }
            {degree!=='10'&&
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Branch</div>
                <select
                  className={`form-select`}
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  {branches.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            }
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Country</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">State</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Place</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Percentage (Enter at least one of it)</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">Grade (Enter at least one of it)</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-element">
                <div className="form-label">CGPA (Enter at least one of it)</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="CGPA"
                  value={CGPA}
                  onChange={(e) => setCGPA(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
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
export default EditDialog
